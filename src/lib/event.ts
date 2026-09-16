export const eventConfig = {
  date: "14 NOVEMBER 2026",
  isoDate: "2026-11-14T09:00:00+05:30",
  location: "DELHI / VENUE TBA",
  duration: "10 HOURS",
  entry: "FREE",
  registrationUrl: "https://luma.com/bxo7adm4",
  whatsappCommunityUrl: "https://chat.whatsapp.com/CpSkfYnkEmKAXURIWp7TQi",
  volunteerUrl: "https://forms.gle/R8cuBKNLj1ftXKfJ8",
  delhiHacksUrl: "https://www.delhihacks.me",
  nerdsRoomUrl: "https://nerdsroom.org", // Legacy archive compatibility; not used by the live event page.
  codeCraftersUrl: "https://www.codecrafters.io",
  dateStatus: "TENTATIVE",
} as const;

export const eventDateLabel = `${eventConfig.date} / ${eventConfig.dateStatus}`;
