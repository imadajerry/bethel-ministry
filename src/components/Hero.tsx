import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="top" className="w-full flex justify-center min-[1600px]:px-6 min-[1600px]:py-4">
      <div className="w-full max-w-[1600px] relative overflow-hidden aspect-[2.15/1] sm:aspect-[2.15/1] md:aspect-auto md:h-[75vh] md:max-h-[640px] md:min-h-[420px] bg-neutral-950 min-[1600px]:rounded-3xl shadow-sm">
        <Image
          src="/assets/imgs/hero-banner.webp"
          alt="Mizoram Youth Festival 2024 - Bethel Ministry Worship & Live Concert"
          fill
          priority
          fetchPriority="high"
          className="object-cover object-center"
          sizes="(max-width: 1600px) 100vw, 1600px"
        />
      </div>
    </section>
  );
}
