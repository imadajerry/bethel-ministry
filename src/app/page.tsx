import React from "react";
import HomePageClient from "@/components/HomePageClient";
import StructuredData from "@/components/StructuredData";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bethel Ministry Mizoram | Thy Kingdom Come - Official Website",
  description:
    "Bethel Ministry is a prominent Christian evangelical organization based in Aizawl, Mizoram, India. A beacon of Healing Ministry, spiritual revival, youth conferences, and discipleship training.",
  alternates: {
    canonical: "./",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <HomePageClient />
    </>
  );
}
