"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import jsQR from "jsqr";
import { MAX_QR_LENGTH, MAX_STORED_TICKET_BYTES, MAX_TICKET_PIXELS, QR_DECODE_SIZE, type Ticket, type TicketEvent } from "@/lib/ticket-schema";
import s from "./Admin.module.css";

type ScanResult = { accepted: boolean; ticket: Ticket; holder: { name: string; email: string } };

export default function CheckInScanner() {
  const [serialNumber, setSerialNumber] = useState("");
  const [events, setEvents] = useState<TicketEvent[]>([]);
  const [eventKey, setEventKey] = useState("");
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventError, setEventError] = useState("");
  const [running, setRunning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [decoding, setDecoding] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const animation = useRef<number | null>(null);
  const cameraGeneration = useRef(0);
  const requestBusy = useRef(false);
  const imageBusy = useRef(false);
  const mounted = useRef(true);
  const resultHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    mounted.current = true;
    const controller = new AbortController();
    fetch("/api/admin/events", { signal: controller.signal }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Events could not be loaded.");
      if (!controller.signal.aborted) { setEvents(data.events); if (data.events.length === 1) setEventKey(data.events[0].key); }
    }).catch((cause: unknown) => {
      if (!controller.signal.aborted) setEventError(cause instanceof Error ? cause.message : "Events could not be loaded.");
    }).finally(() => { if (!controller.signal.aborted) setLoadingEvents(false); });
    return () => {
      mounted.current = false;
      controller.abort();
      cameraGeneration.current = cameraGeneration.current + 1;
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      stream.current?.getTracks().forEach((track) => track.stop());
      stream.current = null;
    };
  }, []);

  function stopCamera() {
    cameraGeneration.current++;
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    if (video.current) video.current.srcObject = null;
    setRunning(false);
    setStarting(false);
  }

  async function checkIn(qrData: string, serial?: string) {
    if (!mounted.current || requestBusy.current) return;
    stopCamera();
    if (!eventKey) { setError("Select an event before scanning a ticket."); return; }
    if (!serial && (!qrData || qrData.length > MAX_QR_LENGTH)) { setError("This QR code is not supported. Use the ticket slip for this event."); return; }
    requestBusy.current = true;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/check-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventKey, qrData, ...(serial ? { serialNumber: serial } : {}) }) });
      const data = await response.json();
      if (!mounted.current) return;
      if ((response.ok || response.status === 409) && data.ticket && data.holder) {
        setResult({ accepted: response.ok, ticket: data.ticket, holder: data.holder });
        window.requestAnimationFrame(() => resultHeading.current?.focus());
      } else { setError(data.error || "This ticket could not be checked in. Try again."); }
    } catch {
      if (mounted.current) setError("The check-in result could not be confirmed. Check your connection and scan again; a saved entry will be shown as already checked in.");
    } finally {
      requestBusy.current = false;
      if (mounted.current) setBusy(false);
    }
  }

  async function startCamera() {
    if (!eventKey || requestBusy.current || imageBusy.current || starting || result) return;
    setError("");
    if (!navigator.mediaDevices?.getUserMedia) { setError("Camera access is unavailable. Open this page over HTTPS, or choose a ticket image below."); return; }
    const generation = ++cameraGeneration.current;
    setStarting(true);
    try {
      const media = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 960 } }, audio: false });
      if (!mounted.current || generation !== cameraGeneration.current || !video.current) { media.getTracks().forEach((track) => track.stop()); return; }
      stream.current = media;
      video.current.srcObject = media;
      await video.current.play();
      if (!mounted.current || generation !== cameraGeneration.current) { media.getTracks().forEach((track) => track.stop()); return; }
      setStarting(false); setRunning(true);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Camera image could not be read.");
      let lastRead = 0;
      const readFrame = (time: number) => {
        if (!mounted.current || generation !== cameraGeneration.current || requestBusy.current) return;
        const current = video.current;
        try {
          if (current && current.readyState >= 2 && current.videoWidth > 0 && time - lastRead > 180) {
            lastRead = time;
            const scale = Math.min(1, 1280 / current.videoWidth);
            canvas.width = Math.round(current.videoWidth * scale);
            canvas.height = Math.round(current.videoHeight * scale);
            context.drawImage(current, 0, 0, canvas.width, canvas.height);
            const image = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(image.data, image.width, image.height, { inversionAttempts: "attemptBoth" });
            if (code?.data) { void checkIn(code.data); return; }
          }
        } catch {
          stopCamera();
          setError("The camera image could not be read. Restart the camera, or choose a ticket image below.");
          return;
        }
        animation.current = requestAnimationFrame(readFrame);
      };
      animation.current = requestAnimationFrame(readFrame);
    } catch (cause) {
      if (!mounted.current || generation !== cameraGeneration.current) return;
      stopCamera();
      const denied = cause instanceof DOMException && cause.name === "NotAllowedError";
      setError(denied ? "Camera permission was denied. Allow camera access in your browser, or choose a ticket image below." : "The camera could not be started. Check that it is available, or choose a ticket image below.");
    }
  }

  async function readTicketImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || requestBusy.current || imageBusy.current || result) return;
    stopCamera(); setError("");
    if (!eventKey) { setError("Select an event before scanning a ticket."); return; }
    if (file.size === 0 || file.size > MAX_STORED_TICKET_BYTES || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setError("Choose a JPG, PNG or WebP ticket image no larger than 12 MB."); return; }
    imageBusy.current = true;
    setDecoding(true);
    let bitmap: ImageBitmap | undefined;
    try {
      bitmap = await createImageBitmap(file);
      if (!mounted.current) return;
      if (bitmap.width * bitmap.height > MAX_TICKET_PIXELS) throw new Error("The image is too large. Choose a ticket image under 20 megapixels.");
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, QR_DECODE_SIZE / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("This image could not be read. Try another ticket image.");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const image = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(image.data, image.width, image.height, { inversionAttempts: "attemptBoth" });
      if (!code?.data) throw new Error("No readable QR code was found. Use a clear image of the full ticket.");
      await checkIn(code.data);
    } catch (cause) { if (mounted.current) setError(cause instanceof Error ? cause.message : "This image could not be read. Try another ticket image."); }
    finally { bitmap?.close(); imageBusy.current = false; if (mounted.current) setDecoding(false); }
  }

  const selectedEvent = events.find((event) => event.key === eventKey);
  return <div className={s.scannerLayout} data-crt-clean>
    <section className={`${s.panel} perforated-panel`} aria-labelledby="scanner-heading" aria-busy={busy || decoding}>
      <h2 id="scanner-heading">Scan a ticket</h2>
      <div className={s.field}>
        <label className={s.label} htmlFor="scan-event">Event</label>
        <select className={s.input} id="scan-event" value={eventKey} disabled={loadingEvents || busy || decoding || running || starting} onChange={(event) => { setEventKey(event.target.value); setResult(null); setError(""); }}>
          <option value="">{loadingEvents ? "Loading events…" : "Choose an event"}</option>
          {events.map((event) => <option value={event.key} key={event.key}>{event.name}{event.date ? ` · ${event.date}` : ""}</option>)}
        </select>
      </div>
      {eventError && <p role="alert" className={s.error}>{eventError} Reload the page to try again.</p>}
      {!loadingEvents && !events.length && !eventError && <p className={s.notice}>Upload at least one ticket from Accounts before checking in members.</p>}
      <form className={s.section} onSubmit={(event) => { event.preventDefault(); void checkIn("", serialNumber); }}>
        <label className={s.label} htmlFor="ticket-serial">Check in by serial number</label>
        <input id="ticket-serial" className={s.input} value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} placeholder="GH-507F1F77BCF86CD799439011" autoCapitalize="characters" autoComplete="off" required disabled={busy || decoding || Boolean(result)} />
        <button className={s.button} type="submit" disabled={!eventKey || !serialNumber.trim() || busy || decoding || Boolean(result)}>Check in participant</button>
      </form>
      <div className={s.camera}>
        <video ref={video} autoPlay playsInline muted hidden={!running} aria-label="Live ticket scanning camera" />
        {!running && <p className={s.cameraHelp}>{busy ? "Checking ticket…" : decoding ? "Reading ticket image…" : starting ? "Waiting for camera access…" : "Select the event, start the camera, and hold the ticket QR inside the view."}</p>}
      </div>
      <div className={s.actions}>
        {running || starting ? <button className={s.secondary} type="button" onClick={stopCamera}>Stop camera</button> : <button className={s.button} type="button" onClick={() => void startCamera()} disabled={!eventKey || busy || decoding || Boolean(result)}>Start camera</button>}
        {result && <button type="button" className={s.secondary} onClick={() => { setResult(null); setError(""); }}>Scan next ticket</button>}
      </div>
      <section className={s.section}>
        <label className={s.label} htmlFor="scan-image">Or scan a ticket image</label>
        <p className={s.hint}>Choosing an image checks in the ticket immediately if it is valid for the selected event.</p>
        <input className={`${s.input} ${s.file}`} id="scan-image" type="file" accept="image/jpeg,image/png,image/webp" disabled={!eventKey || busy || decoding || Boolean(result)} onChange={(event) => void readTicketImage(event)} />
      </section>
      {error && <p role="alert" className={s.error}>{error}</p>}
      {busy && <p className={s.hint} role="status">Checking ticket and saving entry…</p>}
    </section>
    <section className={`${s.panel} ${s.result} perforated-panel`} aria-label="Ticket check-in result">
      {result ? <div role="status" className={result.accepted ? s.success : s.notice}>
        <h2 className={s.resultTitle} ref={resultHeading} tabIndex={-1}>{result.accepted ? "Entry confirmed." : "Already checked in."}</h2>
        <p>{result.accepted ? "This ticket has been used. Admit this member." : "This ticket has already been used. Do not admit another entry with it."}</p>
        <dl><div><dt>Member</dt><dd>{result.holder.name}</dd></div><div><dt>Email</dt><dd>{result.holder.email}</dd></div><div><dt>Serial</dt><dd>{result.ticket.serialNumber}</dd></div><div><dt>Event</dt><dd>{result.ticket.eventName}</dd></div>{result.ticket.checkedInAt && <div><dt>Checked in</dt><dd>{new Date(result.ticket.checkedInAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST</dd></div>}</dl>
      </div> : <><h2>Ready for the next builder.</h2><p className={s.hint}>{selectedEvent ? `Checking tickets for ${selectedEvent.name}.` : "Select the event to begin."} Each ticket can be checked in once. The entry result and member’s details will appear here.</p></>}
    </section>
  </div>;
}
