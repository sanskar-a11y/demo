'use client';

export default function MarqueeTape() {
  const items = ['PROTEIN', 'CAFFEINE', 'ENERGY', 'FOCUS', 'POWER', 'SPYLT'];
  
  // Repeat items to fill screen width and support seamless infinite loop
  const repeatTimes = 12;
  const marqueeText = Array(repeatTimes).fill(items).flat();

  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-cream flex flex-col justify-center select-none z-10">
      <div className="relative w-full overflow-hidden py-6 md:py-8 border-y-4 border-chocolate bg-orange transform -rotate-2 scale-110 shadow-[12px_12px_0px_#523122]">
        <div className="marquee">
          <div className="marquee-content flex items-center gap-8 md:gap-16">
            {marqueeText.map((word, i) => (
              <div key={`tape-${word}-${i}`} className="flex items-center gap-8 md:gap-16">
                <span className="font-heading text-6xl md:text-8xl font-black uppercase tracking-widest select-none text-cream">
                  {word}
                </span>
                <span className="text-chocolate font-black text-6xl md:text-8xl">✦</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
