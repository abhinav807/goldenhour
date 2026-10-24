import Image from "next/image";
import { team } from "@/lib/team";
import HoloCard from "./HoloCard";
import s from "./Editorial.module.css";

export default function Team({ event = false }: { event?: boolean }) {
  return (
    <section id={event ? "organizers" : "founders"} className={s.section}>
      <div className={s.wrap}>
        <header className={s.sectionHead}>
          <div>
            <p className={s.eyebrow}>The people / GoldenHour Delhi</p>
            <h2 className={s.heading}>
              BUILT BY
              <br />
              BUILDERS.
            </h2>
          </div>
          <p className={s.body}>
            The people turning a shared idea into a place for your next one.
          </p>
        </header>
        <div className={s.teamGrid}>
          {team.map((person, i) => (
            <HoloCard key={person.name} preset={i < 2 ? "gold" : "shards"}>
              <article className={s.person}>
                <div className={s.portrait}>
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1100px) 45vw, 560px"
                  />
                </div>
                <div className={s.personInfo}>
                  <p>{event ? person.eventRole : person.role}</p>
                  <h3>{person.name.toUpperCase()}</h3>
                  <div className={s.passMeta}>
                    <span>GH / CREW {String(i + 1).padStart(2, "0")}</span>
                    <span className={s.barcode} aria-hidden="true" />
                  </div>
                </div>
              </article>
            </HoloCard>
          ))}
        </div>
      </div>
    </section>
  );
}
