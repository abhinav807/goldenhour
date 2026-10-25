import type { Profile } from "./profile-schema";

export type AdminAccount = {
  id: string;
  email: string;
  emailVerified: boolean;
  canEditEmail: boolean;
  name: string;
  createdAt: string;
  isAdmin: boolean;
  role: "participant" | "volunteer";
  profile: Profile | null;
};
