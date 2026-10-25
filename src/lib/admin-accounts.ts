import "server-only";
import { Binary, MongoServerError, ObjectId } from "mongodb";
import { getDatabase } from "./mongodb";
import { isMasterAdmin, isMasterAdminEmail } from "./admin-policy";
import { ApiError, objectId } from "./api-access";
import { publicProfile, type ProfileDocument } from "./profiles";
import { normalizeProfilePhoto } from "./profile-photo";
import { validateProfileFields } from "./profile-schema";
import type { AdminAccount } from "./admin-schema";

type AccountDocument = { _id: ObjectId; email: string; emailVerified: boolean; name: string; createdAt: Date; updatedAt: Date };
const publicAccount = (user: AccountDocument, profile: ProfileDocument | null, hasGoogleAccount: boolean): AdminAccount => ({
  id: String(user._id), email: user.email, emailVerified: user.emailVerified,
  canEditEmail: !isMasterAdminEmail(user.email) && !hasGoogleAccount,
  name: profile?.name ?? user.name, createdAt: user.createdAt.toISOString(), isAdmin: isMasterAdmin(user),
  profile: profile ? { ...publicProfile(profile), imageUrl: `/api/admin/accounts/${user._id}/photo` } : null,
});
const accountProjection = { email: 1, emailVerified: 1, name: 1, createdAt: 1, updatedAt: 1 };

export async function getAccount(id: string) {
  const { db } = await getDatabase();
  const user = await db.collection<AccountDocument>("gh_auth_user").findOne({ _id: objectId(id) }, { projection: accountProjection });
  if (!user) return null;
  const [profile, googleAccount] = await Promise.all([
    db.collection<ProfileDocument>("gh_profiles").findOne({ _id: id }, { projection: { photo: 0 } }),
    db.collection("gh_auth_account").findOne({ userId: user._id, providerId: "google" }, { projection: { _id: 1 } }),
  ]);
  return publicAccount(user, profile, Boolean(googleAccount));
}

export async function listAccounts({ q = "", page = 1 }: { q?: string; page?: number } = {}) {
  const { db } = await getDatabase();
  const search = q.trim().slice(0, 100);
  const pattern = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Profile names can differ from the authentication account's original name.
  // Keep the join optional so pending profiles remain searchable by email/name.
  const searchStages = search ? [
    { $lookup: {
      from: "gh_profiles",
      let: { userId: { $toString: "$_id" } },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
        { $project: { _id: 0, name: 1 } },
      ],
      as: "searchProfile",
    } },
    { $match: { $or: [
      { email: { $regex: pattern, $options: "i" } },
      { name: { $regex: pattern, $options: "i" } },
      { "searchProfile.name": { $regex: pattern, $options: "i" } },
    ] } },
  ] : [];
  const pageSize = 20;
  const collection = db.collection<AccountDocument>("gh_auth_user");
  const total = search
    ? (await collection.aggregate<{ total: number }>([{ $project: accountProjection }, ...searchStages, { $count: "total" }]).next())?.total ?? 0
    : await collection.countDocuments({});
  const currentPage = Math.max(1, Math.min(Math.max(1, Math.ceil(total / pageSize)), Number.isFinite(page) ? Math.floor(page) : 1));
  const users = await collection.aggregate<AccountDocument>([
    { $project: accountProjection }, ...searchStages,
    { $sort: { createdAt: -1, _id: -1 } }, { $skip: (currentPage - 1) * pageSize }, { $limit: pageSize },
    { $project: accountProjection },
  ]).toArray();
  const [profiles, googleAccounts] = await Promise.all([
    db.collection<ProfileDocument>("gh_profiles").find({ _id: { $in: users.map((user) => String(user._id)) } }, { projection: { name: 1, dateOfBirth: 1, gender: 1, createdAt: 1 } }).toArray(),
    db.collection<{ userId: ObjectId }>("gh_auth_account").find({ userId: { $in: users.map((user) => user._id) }, providerId: "google" }, { projection: { _id: 0, userId: 1 } }).toArray(),
  ]);
  const byId = new Map(profiles.map((profile) => [profile._id, profile]));
  const googleUserIds = new Set(googleAccounts.map((account) => String(account.userId)));
  return { accounts: users.map((user) => publicAccount(user, byId.get(String(user._id)) ?? null, googleUserIds.has(String(user._id)))), total, page: currentPage, pageSize };
}

export async function editAccount(id: string, form: FormData, actorId: string) {
  const userId = objectId(id);
  const { db, client } = await getDatabase();
  const user = await db.collection<AccountDocument>("gh_auth_user").findOne({ _id: userId });
  if (!user) throw new ApiError(404, "This account no longer exists.");
  const existing = await db.collection<ProfileDocument>("gh_profiles").findOne({ _id: id }, { projection: { photo: 0 } });
  const rawEmail = form.get("email");
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || /[\p{Cc}\p{Cf}]/u.test(email)) {
    throw new ApiError(400, "Enter a valid email address.", { email: "Enter a valid email address." });
  }
  const emailChanged = email !== user.email.toLowerCase();
  if (emailChanged && (isMasterAdminEmail(user.email) || isMasterAdminEmail(email))) {
    throw new ApiError(403, "Master admin email addresses cannot be changed or assigned to another account.");
  }
  if (emailChanged && await db.collection("gh_auth_account").findOne({ userId, providerId: "google" }, { projection: { _id: 1 } })) {
    throw new ApiError(403, "Google-linked accounts must keep their Google sign-in email.", { email: "This email is tied to the account’s Google identity and cannot be changed." });
  }
  const name = form.get("name");
  const dateOfBirth = form.get("dateOfBirth");
  const gender = form.get("gender");
  const image = form.get("photo");
  const hasPhoto = image instanceof File && image.size > 0;
  const hasProfileData = Boolean(existing || dateOfBirth || gender || hasPhoto);
  const validation = validateProfileFields({ name, dateOfBirth, gender });
  if (!hasProfileData) { delete validation.fields.dateOfBirth; delete validation.fields.gender; }
  if (hasProfileData && !existing && !hasPhoto) validation.fields.photo = "Choose a photo to finish this profile.";
  if (Object.keys(validation.fields).length) throw new ApiError(400, "Check the highlighted fields.", validation.fields);
  let photo: Buffer | undefined;
  if (hasPhoto) {
    try { photo = await normalizeProfilePhoto(image); }
    catch (error) { throw new ApiError(400, error instanceof Error ? error.message : "Choose another photo."); }
  }
  const transaction = client.startSession();
  try {
    await transaction.withTransaction(async () => {
      const now = new Date();
      await db.collection<AccountDocument>("gh_auth_user").updateOne({ _id: userId }, { $set: { name: validation.value.name, email, updatedAt: now, ...(emailChanged ? { emailVerified: false } : {}) } }, { session: transaction });
      if (hasProfileData) {
        await db.collection<ProfileDocument>("gh_profiles").updateOne({ _id: id }, {
          $set: { ...validation.value, ...(photo ? { photo: new Binary(photo) } : {}) },
          $setOnInsert: { createdAt: now },
        }, { upsert: true, session: transaction });
      }
      if (emailChanged) await db.collection("gh_auth_session").deleteMany({ userId }, { session: transaction });
      await db.collection("gh_admin_audit").insertOne({ actorId, targetId: id, action: "account.edit", emailChanged, photoChanged: hasPhoto, at: now }, { session: transaction });
    });
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) throw new ApiError(409, "Another account already uses that email address.");
    throw error;
  } finally { await transaction.endSession(); }
  return getAccount(id);
}
