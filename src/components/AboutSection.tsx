import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-8 sm:py-12 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-8 space-y-5 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold uppercase tracking-tight text-neutral-900 leading-[1.15]">
              BETHEL MINISTRY
              <span className="block mt-1">MIZORAM</span>
            </h1>

            <div className="space-y-4 text-[13px] sm:text-[14px] md:text-[15px] text-neutral-700 leading-relaxed max-w-2xl text-justify">
              <p className="text-justify">
                Bethel Ministry is a prominent, independent Christian evangelical organization based in Aizawl, Mizoram, India. The ministry serves as a beacon of Healing Ministry, spiritual revival, youth empowerment, and modern evangelism across the region.
              </p>
              <p className="text-justify">
                Anchored on the core values of scriptural truth, prayer, and deep community transformation, the organization focuses heavily on fostering spiritual renewal in India and abroad.
              </p>
              <p className="font-medium text-neutral-800 text-justify">
                Over 300 full-time and part-time workers serve with Bethel Ministry.
              </p>
            </div>
          </div>

          {/* Right Emblem Column */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <Image
                src="/assets/imgs/bethel-merch-banner-logo.webp"
                alt="Bethel Ministry Emblem - Thy Kingdom Come ESTD 2014"
                fill
                loading="lazy"
                className="object-contain"
                sizes="(max-width: 768px) 240px, 288px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
