import React from "react";

export default function StructuredData() {
  const baseUrl = "https://imadajerry.github.io/bethel-ministry";

  // Organization / Church Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["ReligiousOrganization", "NGO"],
    "@id": `${baseUrl}/#organization`,
    name: "Bethel Ministry Mizoram",
    alternateName: [
      "Bethel Ministry",
      "Thy Kingdom Come",
      "Bethel Ministry Aizawl",
    ],
    url: `${baseUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/assets/imgs/bethel-merch-main-logo.webp`,
      caption: "Bethel Ministry Emblem",
    },
    image: `${baseUrl}/assets/imgs/hero-banner.webp`,
    description:
      "Bethel Ministry is a prominent, independent Christian evangelical organization based in Aizawl, Mizoram, India. A beacon of Healing Ministry, spiritual revival, discipleship training, and youth empowerment.",
    foundingDate: "2014",
    slogan: "Thy Kingdom Come",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aizawl",
      addressRegion: "Mizoram",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9612977836",
        contactType: "customer service",
        availableLanguage: ["English", "Mizo"],
        areaServed: ["IN", "Worldwide"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-8976717098",
        contactType: "helpline",
        availableLanguage: ["English", "Mizo"],
        areaServed: ["IN", "Worldwide"],
      },
    ],
    email: "bethelofficialministry@gmail.com",
    sameAs: [
      "https://www.youtube.com/@bethelministrymizoramaizawl",
      "https://www.instagram.com/bethel_ministry",
      "https://www.facebook.com/BethelMizoram/",
    ],
    founder: [
      {
        "@type": "Person",
        name: "Frederick Lalrindika",
        jobTitle: "General Superintendent",
      },
    ],
    member: [
      {
        "@type": "Person",
        name: "Lalremmawia",
        jobTitle: "Executive Secretary / Evangelist",
      },
      {
        "@type": "Person",
        name: "Lalruatpuia Chhakchhuak",
        jobTitle: "Secretary / Evangelist",
      },
    ],
    knowsAbout: [
      "Christian Evangelism",
      "Healing Ministry",
      "Discipleship Training",
      "Gospel Camping",
      "Youth Revival",
      "Mizoram Youth Festival",
    ],
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: `${baseUrl}/`,
    name: "Bethel Ministry Mizoram",
    alternateName: "Bethel Ministry",
    description:
      "Official website of Bethel Ministry Mizoram - Thy Kingdom Come. Exploring faith, spiritual revival, youth conferences, and evangelical camping.",
    inLanguage: ["en-US", "lus"],
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };

  // ItemList of Key Events & Programs
  const eventsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bethel Ministry Events & Programs",
    description:
      "Signature annual ministries, youth conferences, and gospel camping events organized by Bethel Ministry Mizoram.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Event",
          name: "Discipleship Training",
          description:
            "Equipping believers with foundational biblical teachings, spiritual discipline, and Christian leadership to nurture mature disciples for the Kingdom.",
          image: `${baseUrl}/assets/imgs/events/01_discipleship_training.webp`,
          organizer: {
            "@id": `${baseUrl}/#organization`,
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Bethel Ministry Center",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aizawl",
              addressRegion: "Mizoram",
              addressCountry: "IN",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Event",
          name: "Youth Summer Camp",
          description:
            "A vibrant spiritual gathering bringing youth together for fellowship, worship, and purpose-driven workshops that ignite spiritual revival.",
          image: `${baseUrl}/assets/imgs/events/03_youth_summer_camp.webp`,
          organizer: {
            "@id": `${baseUrl}/#organization`,
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Bethel Camp Grounds",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aizawl",
              addressRegion: "Mizoram",
              addressCountry: "IN",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Event",
          name: "Gospel Camping",
          description:
            "Intensive spiritual retreats filled with fervent prayer, life transformation, and heartfelt praise in a focused setting away from worldly distractions.",
          image: `${baseUrl}/assets/imgs/events/02_gospel_camping.webp`,
          organizer: {
            "@id": `${baseUrl}/#organization`,
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Bethel Camp Grounds",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aizawl",
              addressRegion: "Mizoram",
              addressCountry: "IN",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Event",
          name: "Gospel Crusade",
          description:
            "Large-scale evangelistic crusades bringing the message of salvation, healing, and hope across communities and cities with profound spiritual impact.",
          image: `${baseUrl}/assets/imgs/events/05_gospel_crusade.webp`,
          organizer: {
            "@id": `${baseUrl}/#organization`,
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Mizoram Open Grounds",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aizawl",
              addressRegion: "Mizoram",
              addressCountry: "IN",
            },
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Event",
          name: "Mizoram Youth Festival",
          description:
            "The grand annual celebration of music, worship, and spiritual revival featuring anointed gospel ministers, uniting thousands in exalted worship.",
          image: `${baseUrl}/assets/imgs/events/04_mizoram_youth_festival.webp`,
          organizer: {
            "@id": `${baseUrl}/#organization`,
          },
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: "Mizoram State Arena",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Aizawl",
              addressRegion: "Mizoram",
              addressCountry: "IN",
            },
          },
        },
      },
    ],
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About Us",
        item: `${baseUrl}/#about`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Events",
        item: `${baseUrl}/#events`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Ministry Team",
        item: `${baseUrl}/#team`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Contact",
        item: `${baseUrl}/#contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
