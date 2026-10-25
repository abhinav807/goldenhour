import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { GENDER_OPTIONS, type Profile } from "@/lib/profile-schema";
import SignOutButton from "./SignOutButton";
import s from "./Auth.module.css";

export default function ProfileSummary({ profile, email, created = false }: { profile: Profile; email: string; created?: boolean }) {
  const birthday = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${profile.dateOfBirth}T00:00:00Z`));
  return <>
    {created && <div role="status">
      <div className={s.successMark}><Check size={30} aria-hidden="true" /></div>
      <h2>Congrats! Your profile is created.</h2>
      <p className={s.hint}>You’re all set, {profile.name}. Welcome to GoldenHour.</p>
    </div>}
    <div className={s.profileHeading}>
      <Image src={profile.imageUrl} alt={`${profile.name}’s profile picture`} width={80} height={80} unoptimized className={s.avatar} />
      <div><h2>{profile.name}</h2><p className={s.hint}>{email}</p></div>
    </div>
    <dl className={s.details}>
      <div><dt>Date of birth</dt><dd>{birthday}</dd></div>
      <div><dt>Gender</dt><dd>{GENDER_OPTIONS.find((option) => option.value === profile.gender)?.label ?? profile.gender}</dd></div>
    </dl>
    <div className={s.actions}>
      <Link href="/" className={s.button}>Back to home <ArrowRight size={17} aria-hidden="true" /></Link>
      {created && <Link href="/profile" className={s.secondary}>View my profile</Link>}
    </div>
    {!created && <div className={s.switch}><SignOutButton /></div>}
  </>;
}
