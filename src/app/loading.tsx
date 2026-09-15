import Image from "next/image";

export default function Loading() {
  return <main className="loading-screen min-h-screen bg-black text-offwhite grid place-items-center p-6" aria-busy="true" aria-live="polite">
    <div className="text-center loading-mark">
      <Image src="/brand/goldenhour-symbol.png" alt="GoldenHour logo" width={500} height={500} priority className="mx-auto w-28 h-28 md:w-36 md:h-36 object-contain" />
      <div className="font-archivo text-6xl md:text-8xl tracking-tighter mt-5">GH<span className="text-sunset">.</span></div>
      <p className="font-space text-[10px] text-offwhite/55 tracking-[.2em] mt-6">LOADING THE HOUR...</p>
    </div>
  </main>;
}
