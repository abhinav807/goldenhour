const MASTER_ADMIN_EMAILS = new Set([
  "abhinavgoyal300@gmail.com",
  "yadivya070909@gmail.com",
]);

export function isMasterAdminEmail(email: string) {
  return MASTER_ADMIN_EMAILS.has(email.trim().toLowerCase());
}

export function isMasterAdmin(user: { email: string; emailVerified?: boolean } | null | undefined) {
  return Boolean(user?.emailVerified && isMasterAdminEmail(user.email));
}
