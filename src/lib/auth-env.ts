import "server-only";

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value || value === "..." || /^(changeme|replace_me)$/i.test(value)) {
    throw new Error(`Missing or invalid ${name} configuration.`);
  }
  return value;
}

export function getAuthEnvironment() {
  const secret = required("AUTH_SECRET");
  if (secret.length < 32) throw new Error("AUTH_SECRET must be at least 32 characters.");
  const url = new URL(required("AUTH_URL"));
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol !== "https:" && !(local && url.protocol === "http:")) {
    throw new Error("AUTH_URL must use HTTPS, except on localhost.");
  }
  if (url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new Error("AUTH_URL must contain only the website origin.");
  }
  return {
    secret, baseURL: url.origin,
    googleClientId: required("GOOGLE_CLIENT_ID"),
    googleClientSecret: required("GOOGLE_CLIENT_SECRET"),
  };
}
