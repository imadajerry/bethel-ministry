"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import MinistryTeamSection from "@/components/MinistryTeamSection";
import Footer from "@/components/Footer";
import CallModal from "@/components/CallModal";

export default function Home() {
  const [callModalOpen, setCallModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-poppins selection:bg-brand-gold/30 selection:text-black">
      {/* Navigation Header */}
      <Navbar onCallClick={() => setCallModalOpen(true)} />

      {/* Main Content Area matching Figma layout */}
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <EventsSection />
        <MinistryTeamSection />
      </main>

      {/* Footer */}
      <Footer onCallClick={() => setCallModalOpen(true)} />

      {/* Call Modal */}
      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
      />
    </div>
  );
}
