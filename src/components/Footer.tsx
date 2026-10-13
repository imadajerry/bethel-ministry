import React from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";
import { getAssetPath } from "@/lib/assets";

interface FooterProps {
  onCallClick?: () => void;
}

export default function Footer({ onCallClick }: FooterProps) {
  const { content } = useSiteContent();
  const { footer, contact, social } = content.texts;

  return (
    <footer id="contact" className="w-full pt-12 pb-16 border-t border-neutral-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prayer & Counseling CTA Banner */}
        <div className="mb-14 p-6 sm:p-8 bg-neutral-50 border border-neutral-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              {footer.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600">
              {footer.ctaSubtitle}
            </p>
          </div>
          {onCallClick && (
            <button
              onClick={onCallClick}
              type="button"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{footer.ctaButtonText}</span>
            </button>
          )}
        </div>

        {/* Multi-Column Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-16">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src={getAssetPath("/assets/imgs/bethel-merch-banner-logo.webp")}
                  alt="Bethel Ministry Emblem"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-extrabold text-sm text-neutral-900 tracking-tight uppercase">
                  {footer.brandTitle}
                </span>
                <span className="block text-[11px] text-neutral-500 font-medium">
                  {footer.brandSubtitle}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed text-justify">
              {footer.bio}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
              {footer.quickLinksTitle}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <a href="#about" className="text-neutral-600 hover:text-black transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="text-neutral-600 hover:text-black transition-colors">
                  Events & Camps
                </a>
              </li>
              <li>
                <a href="#team" className="text-neutral-600 hover:text-black transition-colors">
                  Ministry Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-600 hover:text-black transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
              {footer.contactTitle}
            </h4>
            <div className="space-y-2 text-xs sm:text-[13px]">
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-neutral-600 hover:text-black transition-colors inline-flex items-center gap-2 group"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
                  <span className="break-all">{contact.email}</span>
                </a>
              </p>
              <p>
                <a
                  href={`tel:${contact.phone1.replace(/\s+/g, "")}`}
                  className="text-neutral-600 hover:text-black transition-colors inline-flex items-center gap-2 group"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
                  <span>{contact.phone1}</span>
                </a>
              </p>
              <p>
                <a
                  href={`tel:${contact.phone2.replace(/\s+/g, "")}`}
                  className="text-neutral-600 hover:text-black transition-colors inline-flex items-center gap-2 group"
                >
                  <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0" />
                  <span>{contact.phone2}</span>
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Follow & Social Media */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-900">
              {footer.followTitle}
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              {footer.socialDescription}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {/* YouTube */}
              <a
                href={social.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bethel Ministry on YouTube"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#FF0000] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                title="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bethel Ministry on Instagram"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#E4405F] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                title="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href={social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Bethel Ministry on Facebook"
                className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-[#1877F2] text-neutral-700 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs"
                title="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & 7level badge */}
        <div className="pt-8 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 text-center sm:text-left">
            © {new Date().getFullYear()} {footer.copyrightText}
          </p>

          <a
            href="https://7level.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <div className="relative w-4 h-4 shrink-0">
              <Image
                src={getAssetPath("/assets/imgs/7level_logo_outlined.webp")}
                alt="7level Logo"
                fill
                loading="lazy"
                className="object-contain"
              />
            </div>
            <span className="font-medium text-xs tracking-tight leading-none">
              Powered by{" "}
              <span className="font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                7level
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
