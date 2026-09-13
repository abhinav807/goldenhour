export default function Loading() {
  return <main className="min-h-screen bg-black text-offwhite grid place-items-center p-6" aria-busy="true" aria-live="polite"><div className="text-center"><div className="font-archivo text-6xl md:text-8xl tracking-tighter">GH<span className="text-sunset">.</span></div><p className="font-space text-[10px] text-offwhite/55 tracking-[.2em] mt-6 animate-pulse">LOADING THE HOUR...</p></div></main>;
}
