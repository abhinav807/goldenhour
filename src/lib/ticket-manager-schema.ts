import { normalizePhone } from "./ticket-phone.ts";

export function ticketRecipient(input: Record<string, unknown>) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const rawPhone = typeof input.phone === "string" ? input.phone.trim() : "";
  const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const date = typeof input.date === "string" ? input.date : "";
  if (!name || name.length > 80 || /[\p{Cc}\p{Cf}]/u.test(name)) throw new Error("Name must be 1–80 characters without control characters.");
  const phone = rawPhone ? normalizePhone(rawPhone) : null;
  if (rawPhone && !phone) throw new Error("Enter a valid phone number, including its country code for non-Indian numbers.");
  if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) throw new Error("Enter a valid account email.");
  const parsedDate = new Date(`${date}T00:00:00Z`);
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(+parsedDate) || parsedDate.toISOString().slice(0,10) !== date || date < "1900-01-01")) throw new Error("Enter a valid event date.");
  return { name, phone, email, date };
}

// Adapted from ticket-maker-scanner's CSV parser, with strict quote validation.
export function parseTicketCsv(text: string, defaultDate: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).map((text, i) => ({ text, line: i+1 })).filter(row => row.text.trim());
  if (lines.length > 101) throw new Error("Import at most 100 participants at a time.");
  function split(line: string) {
    const cells: string[] = []; let cell = ""; let quoted = false;
    for(let i=0;i<line.length;i++) {
      const ch=line[i];
      if(ch==='"') { if(quoted && line[i+1]==='"') {cell+='"';i++;} else quoted=!quoted; }
      else if(ch===',' && !quoted) {cells.push(cell.trim());cell="";} else cell+=ch;
    }
    if(quoted) throw new Error("Unclosed CSV quote; use one participant per line.");
    return [...cells,cell.trim()];
  }
  if(lines[0] && /^name\s*(,|$)/i.test(lines[0].text.trim())) lines.shift();
  if(lines.length>100) throw new Error("Import at most 100 participants at a time.");
  const seen = new Set<string>();
  return lines.map(row => {
    try {
      const cells = split(row.text);
      if(cells.length>4) throw new Error("Expected name, phone, date, email.");
      const value=ticketRecipient({name:cells[0],phone:cells[1],date:cells[2]||defaultDate,email:cells[3]});
      const warning=value.phone && seen.has(value.phone) ? "Repeated phone number in this batch" : "";
      if(value.phone) seen.add(value.phone);
      return {line:row.line,value,error:"",warning};
    } catch(error) { return {line:row.line,value:null,error:error instanceof Error?error.message:"Invalid row",warning:""}; }
  });
}
