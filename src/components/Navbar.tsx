"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

interface NavbarProps {
  onCallClick: () => void;
}

export default function Navbar({ onCallClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo (Home Link - leads to top) */}
          <Link
            href="/"
            onClick={handleScrollToTop}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            aria-label="Home"
            title="Bethel Ministry - Back to top"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12">
              <Image
                src="/assets/imgs/bethel-merch-banner-logo.webp"
                alt="Bethel Ministry Emblem - Home"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="sr-only">Bethel Ministry - Back to top</span>
          </Link>

          {/* Right Section: Navigation Links & Call Us Button */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8 text-[15px] font-medium text-neutral-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-black transition-colors duration-150 py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <button
              onClick={onCallClick}
              type="button"
              className="inline-flex items-center justify-center px-6 py-2 rounded-full border border-neutral-900 text-sm font-medium text-neutral-900 bg-white hover:bg-neutral-900 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            >
              Call us
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onCallClick}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-neutral-900 text-xs font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call us</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Menu
                  className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? "opacity-0 rotate-90 scale-75 pointer-events-none"
                      : "opacity-100 rotate-0 scale-100"
                  }`}
                />
                <X
                  className={`w-6 h-6 absolute transition-all duration-300 ease-in-out ${
                    mobileMenuOpen
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-75 pointer-events-none"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Smooth Animated Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${
          mobileMenuOpen
            ? "max-h-96 opacity-100 border-b border-neutral-200"
            : "max-h-0 opacity-0 border-none pointer-events-none"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-neutral-800 hover:bg-neutral-50 rounded-lg transition"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
