import sharp from "sharp";
import { MAX_PHOTO_BYTES } from "./profile-schema";

export async function normalizeProfilePhoto(file: File): Promise<Buffer> {
  if (!file.size || file.size > MAX_PHOTO_BYTES) throw new Error("Choose a photo no larger than 2 MB.");
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error("Choose a JPG, PNG, or WebP photo.");
  }
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer, { limitInputPixels: 16_000_000, failOn: "warning" });
    const metadata = await image.metadata();
    if (!["jpeg", "png", "webp"].includes(metadata.format ?? "") || (metadata.pages ?? 1) > 1) {
      throw new Error("Unsupported image.");
    }
    return await image.rotate().resize(512, 512, { fit: "cover", withoutEnlargement: true }).webp({ quality: 82 }).toBuffer();
  } catch {
    throw new Error("This photo could not be read. Choose a still JPG, PNG, or WebP under 16 megapixels.");
  }
}
