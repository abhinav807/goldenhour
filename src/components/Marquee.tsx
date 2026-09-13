interface MarqueeProps {
  reverse?: boolean;
  speed?: number;
  bg?: string;
}

export default function Marquee({ reverse = false, speed = 35, bg = "bg-black" }: MarqueeProps) {
  const items = [
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
    "GOLDENHOUR",
    "BUILD SOMETHING",
    "BREAK SOMETHING",
    "LEARN SOMETHING",
  ];

  return (
    <section className={`${bg} overflow-hidden border-y-2 border-black py-5`}>
      <div className="marquee-container">
        <div
          className="flex whitespace-nowrap font-archivo text-2xl md:text-4xl"
          style={{
            animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
            width: "max-content",
          }}
        >
          {items.map((item, i) => (
            <span key={i} className="mr-8 md:mr-12">
              <span className={i % 4 === 0 ? "text-sunset" : i % 4 === 2 ? "text-yellow" : "text-offwhite"}>
                {item}
              </span>
              <span className="text-sunset ml-8 md:mr-12">★</span>
            </span>
          ))}
          {items.map((item, i) => (
            <span key={`dup-${i}`} className="mr-8 md:mr-12">
              <span className={i % 4 === 0 ? "text-sunset" : i % 4 === 2 ? "text-yellow" : "text-offwhite"}>
                {item}
              </span>
              <span className="text-sunset ml-8 md:mr-12">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
