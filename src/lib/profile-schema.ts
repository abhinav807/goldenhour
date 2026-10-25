export const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
export const MIN_BIRTH_DATE = "1900-01-01";
export const MAX_NAME_LENGTH = 80;
export const GENDER_OPTIONS = [
  { value: "woman", label: "Woman" },
  { value: "man", label: "Man" },
  { value: "non-binary", label: "Non-binary" },
  { value: "self-describe", label: "Another identity" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
] as const;

export type Gender = (typeof GENDER_OPTIONS)[number]["value"];
export type Profile = {
  name: string;
  dateOfBirth: string;
  gender: Gender;
  imageUrl: string;
  createdAt: string;
};
export type ProfileFields = Partial<Record<"name" | "dateOfBirth" | "gender" | "photo", string>>;

export function validateProfileFields(input: Record<string, unknown>, now = new Date()) {
  const fields: ProfileFields = {};
  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const dateOfBirth = typeof input.dateOfBirth === "string" ? input.dateOfBirth : "";
  const gender = typeof input.gender === "string" ? input.gender : "";
  if (name.length < 2 || name.length > MAX_NAME_LENGTH || /[\p{Cc}\p{Cf}]/u.test(name)) {
    fields.name = "Enter a name between 2 and 80 characters.";
  }
  const birth = new Date(`${dateOfBirth}T00:00:00.000Z`);
  const today = now.toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth) || Number.isNaN(birth.valueOf()) ||
      birth.toISOString().slice(0, 10) !== dateOfBirth || dateOfBirth < MIN_BIRTH_DATE || dateOfBirth >= today) {
    fields.dateOfBirth = "Enter a valid date of birth from 1900 and before today.";
  }
  if (!GENDER_OPTIONS.some((option) => option.value === gender)) {
    fields.gender = "Choose a gender option.";
  }
  return { fields, value: { name, dateOfBirth, gender: gender as Gender } };
}
