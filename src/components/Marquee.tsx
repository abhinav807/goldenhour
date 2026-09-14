interface MarqueeProps {
  reverse?: boolean;
  speed?: number;
  bg?: string;
  borderColor?: string;
}

export default function Marquee({ reverse = false, speed = 35, bg = "bg-black", borderColor = "border-sunset" }: MarqueeProps) {
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
    <section className={`${bg} overflow-hidden border-y-2 ${borderColor} py-4 md:py-5 w-full`}>
      <div className="overflow-hidden whitespace-nowrap">
        <div
          className="inline-flex whitespace-nowrap font-archivo text-xl md:text-3xl lg:text-4xl"
          style={{
            animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          }}
        >
          {[...items, ...items].map((item, i) => (
            <span key={i} className="mr-6 md:mr-10 inline-flex items-center">
              <span className={
                i % 6 === 0 ? "text-sunset" :
                i % 6 === 2 ? "text-yellow" :
                i % 6 === 4 ? "text-sunset/60" :
                "text-offwhite"
              }>
                {item}
              </span>
              <span className="text-sunset ml-6 md:ml-10 text-lg md:text-2xl">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
