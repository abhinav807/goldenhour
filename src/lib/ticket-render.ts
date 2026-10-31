import sharp from "sharp";

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!);
export async function renderTicket(qr: Buffer, details: { name: string; serial: string; eventName: string; date: string; venue: string }) {
  const text = (value: string, y: number, size: number, color = "#171711") => `<text x="360" y="${y}" text-anchor="middle" font-family="sans-serif" font-size="${size}" fill="${color}">${escape(value)}</text>`;
  const holes = Array.from({ length: 28 }, (_, i) => `<circle cx="40" cy="${55 + i * 40}" r="10" fill="black"/><circle cx="680" cy="${55 + i * 40}" r="10" fill="black"/>`).join("");
  const mask = `<mask id="edge"><rect x="40" y="24" width="640" height="1150" rx="18" fill="white"/>${holes}</mask>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1200"><defs>${mask}</defs><g mask="url(#edge)"><rect x="40" y="24" width="640" height="1150" fill="#fff9e9"/><rect x="40" y="650" width="640" height="255" fill="#ff6938"/>${text("GOLDENHOUR / ADMIT ONE", 85, 20)}<rect x="120" y="115" width="480" height="480" fill="white"/>${text("SCAN AT THE DOOR", 625, 17)}${text(details.eventName, 710, 29)}${text("PARTICIPANT", 758, 14)}${text(details.name, 805, details.name.length > 28 ? 20 : 29)}${text(details.date, 863, 23)}<path d="M60 925 H660" stroke="#171711" stroke-width="2" stroke-dasharray="9 9"/>${text("YOUR UNIQUE TICKET NUMBER", 970, 15)}${text(details.serial, 1014, 23)}${text(details.venue, 1063, 16)}${text("ONE TICKET · ONE ENTRY · BUILD SOMETHING GREAT", 1128, 12)}</g></svg>`;
  // Composite the QR inside its untouched white quiet zone.
  return sharp(Buffer.from(svg)).composite([{ input: qr, left: 120, top: 115 }]).png().toBuffer();
}
