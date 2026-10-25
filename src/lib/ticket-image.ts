import sharp from "sharp";
import jsQR from "jsqr";
import { MAX_QR_LENGTH, MAX_TICKET_BYTES, MAX_STORED_TICKET_BYTES, MAX_TICKET_PIXELS, QR_DECODE_SIZE } from "./ticket-schema";

export async function normalizeTicketImage(file: File) {
  if (!file.size || file.size > MAX_TICKET_BYTES) throw new Error("Choose a ticket image no larger than 4 MB.");
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) throw new Error("Choose a PNG, JPG, or WebP ticket image.");
  const bytes = Buffer.from(await file.arrayBuffer());
  const image = sharp(bytes, { limitInputPixels: MAX_TICKET_PIXELS, failOn: "warning" });
  let normalized: Buffer;
  try {
    const metadata = await image.metadata();
    if (!["png", "jpeg", "webp"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) throw new Error("Unsupported image.");
    normalized = await image.rotate().png().toBuffer();
  } catch { throw new Error("This image could not be read. Use a still PNG, JPG, or WebP under 20 megapixels."); }
  if (normalized.length > MAX_STORED_TICKET_BYTES) throw new Error("This ticket image is too complex to store. Use a smaller image.");
  const { data, info } = await sharp(normalized).resize({ width: QR_DECODE_SIZE, height: QR_DECODE_SIZE, fit: "inside", withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height, { inversionAttempts: "attemptBoth" });
  if (!qr?.data || qr.data.length > MAX_QR_LENGTH) throw new Error("No readable QR code was found. Upload a clear ticket slip containing one QR code.");
  return { image: normalized, qrData: qr.data };
}
