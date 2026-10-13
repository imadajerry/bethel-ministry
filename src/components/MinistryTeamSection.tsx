import React from "react";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  role?: string;
  image: string;
  scale?: number;
}

const teamMembers: TeamMember[] = [
  {
    id: "frederick",
    name: "Frederick Lalrindika",
    role: "(General Superintendent)",
    image: "/assets/imgs/ministry-team-members/01_frederick_lalrindika.webp",
    scale: 1.0,
  },
  {
    id: "lalremmawia",
    name: "Lalremmawia",
    role: "(Executive Secretary / Evangelist)",
    image: "/assets/imgs/ministry-team-members/02_lalremmawia.webp",
    scale: 1.20,
  },
  {
    id: "lalruatpuia",
    name: "Lalruatpuia Chhakchhuak",
    role: "(Secretary / Evangelist)",
    image: "/assets/imgs/ministry-team-members/03_lalruatpuia_chhakchhuak.webp",
    scale: 1.20,
  },
  {
    id: "ricky",
    name: "Ricky Zohmingliana",
    image: "/assets/imgs/ministry-team-members/04_ricky_zohmingliana.webp",
    scale: 1.0,
  },
  {
    id: "isaac",
    name: "Isaac Vanlalhruaia",
    image: "/assets/imgs/ministry-team-members/05_isaac_vanlalhruaia.webp",
    scale: 1.18,
  },
  {
    id: "vanlalnghaka",
    name: "C. Vanlalnghaka",
    image: "/assets/imgs/ministry-team-members/06_c._vanlalnghaka.webp",
    scale: 1.22,
  },
  {
    id: "malsawmsanga",
    name: "C. Malsawmsanga",
    image: "/assets/imgs/ministry-team-members/07_c._malsawmsanga.webp",
    scale: 1.10,
  },
  {
    id: "nixon",
    name: "Nixon Vanlalruata",
    image: "/assets/imgs/ministry-team-members/08_nixon_vanlalruata.webp",
    scale: 1.35,
  },
  {
    id: "vanlalngheta",
    name: "C. Vanlalngheta",
    image: "/assets/imgs/ministry-team-members/09_c._vanlalngheta.webp",
    scale: 1.22,
  },
  {
    id: "ngurnunmawii",
    name: "Ngurnunmawii Chhakchhuak",
    image: "/assets/imgs/ministry-team-members/10_ngurnunmawii_chhakchhuak.webp",
    scale: 1.08,
  },
  {
    id: "lalrinfeli",
    name: "Lalrinfeli",
    image: "/assets/imgs/ministry-team-members/11_lalrinfeli.webp",
    scale: 1.0,
  },
  {
    id: "jennifer",
    name: "Jennifer Lalremruati",
    image: "/assets/imgs/ministry-team-members/12_jennifer_lalremruati.webp",
    scale: 1.35,
  },
  {
    id: "lalrinsangi",
    name: "K. Lalrinsangi",
    image: "/assets/imgs/ministry-team-members/13_k._lalrinsangi.webp",
    scale: 1.14,
  },
];

export default function MinistryTeamSection() {
  // Mobile groupings (original Figma mobile row hierarchy)
  const mobileRow1 = teamMembers.slice(0, 3);
  const mobileRow2 = teamMembers.slice(3, 6);
  const mobileRow3 = teamMembers.slice(6, 9);
  const mobileRow4 = teamMembers.slice(9, 11);
  const mobileRow5 = teamMembers.slice(11, 13);

  // Desktop groupings (compact multi-member rows)
  const desktopRow1 = teamMembers.slice(0, 7);
  const desktopRow2 = teamMembers.slice(7, 13);

  const renderCard = (member: TeamMember, mode: "mobile" | "desktop" = "desktop") => (
    <div
      key={member.id}
      className={`flex flex-col bg-white border border-neutral-200/80 rounded-xl overflow-hidden shadow-xs w-full ${
        mode === "desktop"
          ? "max-w-[135px] sm:max-w-[145px] md:max-w-[155px]"
          : "max-w-none"
      }`}
    >
      {/* 1:1 Aspect Ratio Full-Bleed Photo with normalized zoom */}
      <div className="relative w-full aspect-square bg-white overflow-hidden">
        <Image
          src={member.image}
          alt={`${member.name}${member.role ? ` ${member.role}` : ""} - Bethel Ministry Leadership`}
          fill
          style={{
            transform: member.scale ? `scale(${member.scale})` : undefined,
            transformOrigin: "top center",
          }}
          className="object-cover"
          sizes="(max-width: 640px) 140px, 160px"
        />
      </div>

      {/* Label strip directly beneath */}
      <div
        className={`w-full bg-neutral-50/80 border-t border-neutral-100 flex flex-col items-center text-center flex-1 justify-center ${
          mode === "mobile"
            ? "px-1.5 py-1.5 sm:py-2 min-h-[46px] sm:min-h-[52px]"
            : "px-2 py-2 sm:py-2.5 min-h-[54px]"
        }`}
      >
        <h3
          className={`font-bold text-neutral-900 leading-tight ${
            mode === "mobile" ? "text-[10px] sm:text-xs" : "text-[11px] sm:text-xs"
          }`}
        >
          {member.name}
        </h3>
        {member.role && (
          <p
            className={`text-center text-neutral-500 font-medium mt-0.5 leading-tight ${
              mode === "mobile" ? "text-[8.5px] sm:text-[9.5px]" : "text-[9px] sm:text-[10px]"
            }`}
          >
            {member.role}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section id="team" className="w-full py-10 sm:py-14 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 mb-8 sm:mb-12 tracking-tight">
          Ministry Team
        </h2>

        {/* 1. Mobile View: Strict 3-in-a-row on rows 1-3 (Prevents 2,1 wrapping on phones <480px) */}
        <div className="block md:hidden space-y-3.5 sm:space-y-4">
          {/* Row 1: 3 members */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
            {mobileRow1.map((m) => renderCard(m, "mobile"))}
          </div>

          {/* Row 2: 3 members */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
            {mobileRow2.map((m) => renderCard(m, "mobile"))}
          </div>

          {/* Row 3: 3 members */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto">
            {mobileRow3.map((m) => renderCard(m, "mobile"))}
          </div>

          {/* Row 4: 2 members centered */}
          <div className="flex justify-center gap-2 sm:gap-3 max-w-md mx-auto">
            {mobileRow4.map((m) => (
              <div key={m.id} className="w-[calc((100%-1rem)/3)]">
                {renderCard(m, "mobile")}
              </div>
            ))}
          </div>

          {/* Row 5: 2 members centered */}
          <div className="flex justify-center gap-2 sm:gap-3 max-w-md mx-auto">
            {mobileRow5.map((m) => (
              <div key={m.id} className="w-[calc((100%-1rem)/3)]">
                {renderCard(m, "mobile")}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Desktop View: Compact Layout with more members per row */}
        <div className="hidden md:flex md:flex-col space-y-6">
          {/* Desktop Row 1: 7 members */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            {desktopRow1.map((m) => renderCard(m, "desktop"))}
          </div>

          {/* Desktop Row 2: 6 members */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-5">
            {desktopRow2.map((m) => renderCard(m, "desktop"))}
          </div>
        </div>
      </div>
    </section>
  );
}
