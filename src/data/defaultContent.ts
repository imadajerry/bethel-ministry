export interface EventItem {
  id: string;
  title: string;
  category?: string;
  season?: string;
  image: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role?: string;
  image: string;
  scale?: number;
}

export interface SiteTexts {
  navbar: {
    callButtonText: string;
  };
  hero: {
    altText: string;
  };
  about: {
    titleLine1: string;
    titleLine2: string;
    paragraph1: string;
    paragraph2: string;
    workerCountNote: string;
  };
  events: {
    title: string;
    subtitle: string;
    subtext: string;
  };
  team: {
    title: string;
  };
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButtonText: string;
    brandTitle: string;
    brandSubtitle: string;
    bio: string;
    quickLinksTitle: string;
    contactTitle: string;
    followTitle: string;
    socialDescription: string;
    copyrightText: string;
  };
  contact: {
    email: string;
    phone1: string;
    phone2: string;
  };
  social: {
    youtubeUrl: string;
    instagramUrl: string;
    facebookUrl: string;
  };
  callModal: {
    title: string;
    description: string;
    phone1Label: string;
    phone1Number: string;
    phone2Label: string;
    phone2Number: string;
  };
}

export interface SiteContent {
  texts: SiteTexts;
  events: EventItem[];
  team: TeamMember[];
}

export const defaultSiteContent: SiteContent = {
  texts: {
    navbar: {
      callButtonText: "Call us",
    },
    hero: {
      altText: "Mizoram Youth Festival 2024 - Bethel Ministry Worship & Live Concert",
    },
    about: {
      titleLine1: "BETHEL MINISTRY",
      titleLine2: "MIZORAM",
      paragraph1:
        "Bethel Ministry is a prominent, independent Christian evangelical organization based in Aizawl, Mizoram, India. The ministry serves as a beacon of Healing Ministry, spiritual revival, youth empowerment, and modern evangelism across the region.",
      paragraph2:
        "Anchored on the core values of scriptural truth, prayer, and deep community transformation, the organization focuses heavily on fostering spiritual renewal in India and abroad.",
      workerCountNote:
        "Over 300 full-time and part-time workers serve with Bethel Ministry.",
    },
    events: {
      title: "Events",
      subtitle:
        "Transformative gatherings, crusades, and spiritual empowerment programs",
      subtext: "Click any event to explore details",
    },
    team: {
      title: "Ministry Team",
    },
    footer: {
      ctaTitle: "Need Prayer or Spiritual Counseling?",
      ctaSubtitle:
        "Our evangelists and ministry team are here to pray with you and support your journey.",
      ctaButtonText: "Call Helpline",
      brandTitle: "Bethel Ministry",
      brandSubtitle: "Thy Kingdom Come • ESTD 2014",
      bio: "Bethel Ministry is an evangelical organization based in Aizawl, Mizoram, serving as a beacon of Healing Ministry, spiritual revival, discipleship training, and youth empowerment.",
      quickLinksTitle: "Quick Links",
      contactTitle: "Contact Us",
      followTitle: "Follow & Watch",
      socialDescription:
        "Watch gospel messages, youth camp worship, and stay connected with our community.",
      copyrightText: "Bethel Ministry Mizoram. All rights reserved.",
    },
    contact: {
      email: "bethelofficialministry@gmail.com",
      phone1: "+91 9612677836",
      phone2: "+91 8258883165",
    },
    social: {
      youtubeUrl: "https://www.youtube.com/@bethelministrymizoramaizawl",
      instagramUrl: "https://www.instagram.com/bethel_ministry",
      facebookUrl: "https://www.facebook.com/BethelMizoram/",
    },
    callModal: {
      title: "Contact Bethel Ministry",
      description:
        "Reach out to our ministry offices for prayer, counseling, or event inquiries.",
      phone1Label: "Primary Office",
      phone1Number: "9612677836",
      phone2Label: "Helpline",
      phone2Number: "8258883165",
    },
  },
  events: [
    {
      id: "discipleship",
      title: "Discipleship Training",
      category: "Leadership & Foundation",
      season: "Annual Ministry Program",
      image: "/assets/imgs/events/01_discipleship_training.webp",
      description:
        "Equipping believers with foundational biblical teachings, spiritual discipline, and Christian leadership to nurture mature disciples for the Kingdom.",
    },
    {
      id: "summer-camp",
      title: "Youth Summer Camp",
      category: "Youth Empowerment",
      season: "Summer Gathering",
      image: "/assets/imgs/events/03_youth_summer_camp.webp",
      description:
        "A vibrant spiritual gathering bringing youth together for fellowship, worship, and purpose-driven workshops that ignite spiritual revival.",
    },
    {
      id: "gospel-camping",
      title: "Gospel Camping",
      category: "Spiritual Retreat",
      season: "Spiritual Renewal",
      image: "/assets/imgs/events/02_gospel_camping.webp",
      description:
        "Intensive spiritual retreats filled with fervent prayer, life transformation, and heartfelt praise in a focused setting away from worldly distractions.",
    },
    {
      id: "crusade",
      title: "Gospel Crusade",
      category: "Mass Evangelism",
      season: "Community Outreach",
      image: "/assets/imgs/events/05_gospel_crusade.webp",
      description:
        "Large-scale evangelistic crusades bringing the message of salvation, healing, and hope across communities and cities with profound spiritual impact.",
    },
    {
      id: "youth-festival",
      title: "Mizoram Youth Festival",
      category: "Worship & Revival",
      season: "Statewide Celebration",
      image: "/assets/imgs/events/04_mizoram_youth_festival.webp",
      description:
        "The grand annual celebration of music, worship, and spiritual revival featuring anointed gospel ministers, uniting thousands in exalted worship.",
    },
  ],
  team: [
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
      scale: 1.2,
    },
    {
      id: "lalruatpuia",
      name: "Lalruatpuia Chhakchhuak",
      role: "(Secretary / Evangelist)",
      image: "/assets/imgs/ministry-team-members/03_lalruatpuia_chhakchhuak.webp",
      scale: 1.2,
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
      scale: 1.1,
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
  ],
};
