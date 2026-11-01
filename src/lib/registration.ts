export type RegistrationStatus = "closed" | "open" | "waitlist" | "ended";
export const registrationCopy = {
 closed: { label: "JOIN WHATSAPP", message: "Registration is closed. Join the community for updates." },
 open: { label: "REGISTER NOW", message: "Registration is open. One form per team." },
 waitlist: { label: "REQUEST WAITLIST", message: "Registration is full. Ask the team about the waitlist; a request does not guarantee a place." },
 ended: { label: "JOIN WHATSAPP", message: "Registration has ended. Join the community for future events." },
} as const;
export function registrationAction(status: RegistrationStatus, urls: { registration: string; community: string; waitlist: string }) {
 return { ...registrationCopy[status], href: status === "open" ? urls.registration : status === "waitlist" ? urls.waitlist : urls.community };
}
