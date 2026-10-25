import "server-only";
import { Binary } from "mongodb";
import { getDatabase } from "./mongodb";
import type { Gender, Profile } from "./profile-schema";

export type ProfileDocument = {
  _id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  photo: Binary;
  createdAt: Date;
};

export function publicProfile(doc: Omit<ProfileDocument, "photo">): Profile {
  return {
    name: doc.name, dateOfBirth: doc.dateOfBirth, gender: doc.gender,
    imageUrl: "/api/profile/photo", createdAt: doc.createdAt.toISOString(),
  };
}

export async function getProfile(userId: string) {
  const { db } = await getDatabase();
  const profile = await db.collection<ProfileDocument>("gh_profiles").findOne(
    { _id: userId }, { projection: { photo: 0 } },
  );
  return profile ? publicProfile(profile) : null;
}

export async function createProfile(userId: string, input: Pick<Profile, "name" | "dateOfBirth" | "gender">, photo: Buffer) {
  const { db } = await getDatabase();
  const doc: ProfileDocument = { _id: userId, ...input, photo: new Binary(photo), createdAt: new Date() };
  await db.collection<ProfileDocument>("gh_profiles").insertOne(doc);
  return publicProfile(doc);
}

export async function getProfilePhoto(userId: string) {
  const { db } = await getDatabase();
  const doc = await db.collection<ProfileDocument>("gh_profiles").findOne({ _id: userId }, { projection: { photo: 1 } });
  return doc?.photo;
}
