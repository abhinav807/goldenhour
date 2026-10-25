"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Camera } from "lucide-react";
import { GENDER_OPTIONS, MAX_NAME_LENGTH, MAX_PHOTO_BYTES, MIN_BIRTH_DATE, type Profile, type ProfileFields } from "@/lib/profile-schema";
import ProfileSummary from "./ProfileSummary";
import SignOutButton from "./SignOutButton";
import s from "./Auth.module.css";

export default function ProfileForm({ email, defaultName, today }: { email: string; defaultName: string; today: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [fields, setFields] = useState<ProfileFields>({});
  const [preview, setPreview] = useState("");
  const [created, setCreated] = useState<Profile | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);
  useEffect(() => { if (created) successRef.current?.focus(); }, [created]);

  function choosePhoto(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    setFields((current) => ({ ...current, photo: undefined }));
    setPreview("");
    if (!selected) return;
    let message = "";
    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) message = "Choose a JPG, PNG, or WebP image.";
    else if (selected.size > MAX_PHOTO_BYTES) message = "Choose an image smaller than 2 MB.";
    else if (selected.size === 0) message = "This file is empty. Choose another image.";
    if (message) {
      event.target.value = "";
      setFields((current) => ({ ...current, photo: message }));
      return;
    }
    setPreview(URL.createObjectURL(selected));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setExpired(false);
    setFields({});
    try {
      const response = await fetch("/api/profile", { method: "POST", body: data });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          router.replace("/profile");
          router.refresh();
          return;
        }
        if (response.status === 401) setExpired(true);
        const fieldErrors: ProfileFields = {};
        for (const key of ["name", "dateOfBirth", "gender", "photo"] as const) {
          const value = result.fields?.[key];
          if (typeof value === "string") fieldErrors[key] = value;
          else if (Array.isArray(value)) fieldErrors[key] = value.join(" ");
        }
        setFields(fieldErrors);
        setError(response.status === 401 ? "Your session has expired. Log in again to finish your profile." : result.error || "Your profile couldn’t be saved. Check your details and try again.");
        window.requestAnimationFrame(() => errorRef.current?.focus());
        return;
      }
      if (!result.profile) throw new Error("Profile response missing");
      setCreated(result.profile);
    } catch {
      setError("Couldn’t save your profile. Check your connection and try again.");
      window.requestAnimationFrame(() => errorRef.current?.focus());
    } finally {
      setBusy(false);
    }
  }

  if (created) return <div tabIndex={-1} ref={successRef}><ProfileSummary profile={created} email={email} created /></div>;

  return <>
    <div className={s.signedIn}><div><p className={s.hint}>Logged in as</p><p className={s.hint}><strong>{email}</strong></p></div><SignOutButton /></div>
    <h2>Make it yours.</h2>
    <p className={s.hint}>All four details are required to create your profile.</p>
    <form className={s.form} onSubmit={submit} aria-busy={busy}>
      <div className={s.field}>
        <label htmlFor="profile-name" className={s.label}>Full name</label>
        <input className={s.input} id="profile-name" name="name" autoComplete="name" required minLength={2} maxLength={MAX_NAME_LENGTH} defaultValue={defaultName === "New member" ? "" : defaultName} disabled={busy} aria-invalid={Boolean(fields.name)} aria-describedby={fields.name ? "name-error" : undefined} />
        {fields.name && <p className={s.fieldError} id="name-error">{fields.name}</p>}
      </div>
      <div className={s.field}>
        <label htmlFor="profile-dob" className={s.label}>Date of birth</label>
        <input className={s.input} id="profile-dob" name="dateOfBirth" type="date" autoComplete="bday" required min={MIN_BIRTH_DATE} max={today} disabled={busy} aria-invalid={Boolean(fields.dateOfBirth)} aria-describedby={fields.dateOfBirth ? "dob-error" : undefined} />
        {fields.dateOfBirth && <p className={s.fieldError} id="dob-error">{fields.dateOfBirth}</p>}
      </div>
      <div className={s.field}>
        <label htmlFor="profile-gender" className={s.label}>Gender</label>
        <select className={s.input} id="profile-gender" name="gender" required defaultValue="" disabled={busy} aria-invalid={Boolean(fields.gender)} aria-describedby={fields.gender ? "gender-error" : undefined}>
          <option value="" disabled>Select an option</option>
          {GENDER_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
        {fields.gender && <p className={s.fieldError} id="gender-error">{fields.gender}</p>}
      </div>
      <div className={s.field}>
        <label htmlFor="profile-photo" className={s.label}>Profile picture</label>
        <div className={s.upload}>
          {preview ? <Image src={preview} width={80} height={80} alt="Selected profile picture preview" unoptimized className={s.avatar} /> : <div className={`${s.avatar} ${s.avatarPlaceholder}`} aria-hidden="true"><Camera size={26} /></div>}
          <div className={s.uploadInfo}><p id="photo-help" className={s.hint}>JPG, PNG, or WebP.<br />Maximum 2 MB.</p></div>
        </div>
        <input className={`${s.input} ${s.fileInput}`} id="profile-photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" required onChange={choosePhoto} disabled={busy} aria-invalid={Boolean(fields.photo)} aria-describedby={`photo-help${fields.photo ? " photo-error" : ""}`} />
        {fields.photo && <p className={s.fieldError} id="photo-error">{fields.photo}</p>}
      </div>
      <button className={s.button} type="submit" disabled={busy}>{busy ? "Creating your profile…" : "Create my profile"}<ArrowRight size={17} aria-hidden="true" /></button>
    </form>
    {error && <div className={s.error} role="alert" tabIndex={-1} ref={errorRef}>{error}{expired && <> <Link href="/login">Log in again</Link>.</>}</div>}
  </>;
}
