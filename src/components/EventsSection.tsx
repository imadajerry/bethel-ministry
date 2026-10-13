"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useSiteContent } from "@/context/ContentContext";
import { EventItem } from "@/data/defaultContent";
import { getAssetPath } from "@/lib/assets";

export default function EventsSection() {
  const { content } = useSiteContent();
  const eventsData = content.events;
  const eventsTexts = content.texts.events;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // References for bottom thumbnail strip scrolling
  const selectorRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Auto-play progress bar state (8 seconds per event for a calm, relaxing pace)
  const DURATION = 8000;
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [allowPlayWhileActive, setAllowPlayWhileActive] = useState<boolean>(false);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // When allowPlayWhileActive is true, movement does not pause auto-play
  const isPaused = !isAutoPlay || (isInteracting && !allowPlayWhileActive);

  // Touch gesture support for mobile swiping
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const row1 = eventsData.slice(0, 3);
  const row2 = eventsData.slice(3, 5);

  const currentEvent = selectedIndex !== null ? eventsData[selectedIndex] : null;

  // Navigation handlers
  const handleNext = useCallback(() => {
    progressRef.current = 0;
    if (progressLineRef.current) {
      progressLineRef.current.style.width = "0%";
    }
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % eventsData.length : null));
  }, []);

  const handlePrev = useCallback(() => {
    progressRef.current = 0;
    if (progressLineRef.current) {
      progressLineRef.current.style.width = "0%";
    }
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + eventsData.length) % eventsData.length : null
    );
  }, []);

  const handleClose = useCallback(() => {
    progressRef.current = 0;
    if (progressLineRef.current) {
      progressLineRef.current.style.width = "0%";
    }
    setSelectedIndex(null);
    setAllowPlayWhileActive(false);
  }, []);

  // Reset progress when index changes
  useEffect(() => {
    progressRef.current = 0;
    if (progressLineRef.current) {
      progressLineRef.current.style.width = "0%";
    }
  }, [selectedIndex]);

  // Lock body scroll when popup modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedIndex]);

  // Keyboard navigation (Arrow keys + Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev, handleClose]);

  // Progress timer: fills from 0 to 100, then advances exactly 1 event
  useEffect(() => {
    if (selectedIndex === null || isPaused) return;

    let animFrame: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      progressRef.current += (delta / DURATION) * 100;

      if (progressRef.current >= 100) {
        progressRef.current = 0;
        if (progressLineRef.current) {
          progressLineRef.current.style.width = "0%";
        }
        handleNext();
        return; // Terminate frame loop immediately to advance exactly once
      }

      if (progressLineRef.current) {
        progressLineRef.current.style.width = `${progressRef.current}%`;
      }
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [selectedIndex, isPaused, handleNext, DURATION]);

  // Pause progress when user moves around, unless user clicked Play to scroll while active
  const handleUserMovement = () => {
    if (!isAutoPlay || allowPlayWhileActive) return;
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  const handleMouseEnterContent = () => {
    if (!isAutoPlay || allowPlayWhileActive) return;
    setIsInteracting(true);
  };

  const handleMouseLeaveContent = () => {
    if (allowPlayWhileActive) return;
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    setIsInteracting(false);
  };

  // Auto-scroll the active thumbnail into center view in the selector
  useEffect(() => {
    if (selectedIndex !== null && thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  // Bottom selector manual horizontal scroll buttons
  const scrollSelector = (direction: "left" | "right") => {
    if (selectorRef.current) {
      const scrollOffset = direction === "left" ? -200 : 200;
      selectorRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
    }
  };

  // Touch handlers for swipe gesture
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
    if (!allowPlayWhileActive) {
      setIsInteracting(true);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!allowPlayWhileActive) {
      setIsInteracting(false);
    }
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  const renderCard = (event: EventItem, index: number) => (
    <div
      key={event.id}
      onClick={() => setSelectedIndex(index)}
      className="group cursor-pointer flex flex-col items-center text-center w-full"
    >
      {/* Event Card Image */}
      <div className="relative w-full aspect-[2.3/1] sm:aspect-[2.1/1] rounded-2xl overflow-hidden shadow-xs border border-neutral-100 bg-neutral-100">
        <Image
          src={getAssetPath(event.image)}
          alt={`${event.title} - Bethel Ministry Mizoram Event`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-medium shadow-md">
            View Details
          </span>
        </div>
      </div>

      {/* Event Title */}
      <h3 className="mt-3.5 text-sm sm:text-[15px] font-bold text-neutral-900 group-hover:text-brand-midnight transition-colors">
        {event.title}
      </h3>
    </div>
  );

  return (
    <section id="events" className="w-full py-10 sm:py-14 md:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight">
              {eventsTexts.title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {eventsTexts.subtitle}
            </p>
          </div>
          <span className="text-xs text-neutral-400 font-medium hidden sm:block">
            {eventsTexts.subtext}
          </span>
        </div>

        {/* Structured Events Grid */}
        <div className="space-y-6 sm:space-y-8">
          {/* Row 1: 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {row1.map((event, i) => renderCard(event, i))}
          </div>

          {/* Row 2: 2 cards centered horizontally on Desktop */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
            {row2.map((event, i) => (
              <div
                key={event.id}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
              >
                {renderCard(event, i + 3)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal matching Main Website Design Theme */}
      {currentEvent && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-5 md:p-6 animate-in fade-in duration-200 select-none"
          role="dialog"
          aria-modal="true"
          aria-label={currentEvent.title}
          onClick={handleClose}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleUserMovement}
          >
            {/* Modal Header with Progress Line at the Bottom Border */}
            <header className="relative flex items-center justify-between px-5 sm:px-7 pt-4 sm:pt-5 pb-3.5 border-b border-neutral-100 shrink-0">
              {/* Left Side: Counter, Category & Play/Pause Button with Proper Labels */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-brand-midnight/8 text-brand-midnight border border-brand-midnight/20">
                  {selectedIndex + 1} of {eventsData.length}
                </span>
                {currentEvent.category && (
                  <span className="text-xs font-medium text-neutral-500 hidden sm:inline-block">
                    {currentEvent.category}
                  </span>
                )}

                {/* Pause / Play Button with Proper Labels */}
                <button
                  type="button"
                  onClick={() => {
                    if (isPaused) {
                      // Clicking Play resumes and allows auto-scrolling even when active
                      setIsAutoPlay(true);
                      setAllowPlayWhileActive(true);
                      setIsInteracting(false);
                    } else {
                      // Clicking Pause stops auto-play
                      setIsAutoPlay(false);
                      setAllowPlayWhileActive(false);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer select-none border active:scale-95 ${
                    !isPaused
                      ? "bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200"
                      : "bg-brand-midnight/10 text-brand-midnight border-brand-midnight/30 hover:bg-brand-midnight/15"
                  }`}
                  title={!isPaused ? "Pause auto-advancing" : "Play auto-advancing"}
                >
                  {!isPaused ? (
                    <>
                      <Pause className="w-3 h-3 text-neutral-700" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-brand-midnight fill-current" />
                      <span>Play</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Side: Keyboard Navigation Badges & Close Button */}
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1 text-xs text-neutral-400">
                  <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-600">
                    ←
                  </kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-600">
                    →
                  </kbd>
                  <span className="text-[11px] mr-2">Navigate</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-mono text-neutral-600">
                    ESC
                  </kbd>
                  <span className="text-[11px]">Close</span>
                </div>

                <button
                  onClick={handleClose}
                  className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filling Progress Line along the bottom of the header */}
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-100 overflow-hidden pointer-events-none">
                <div
                  ref={progressLineRef}
                  className="h-full bg-brand-midnight will-change-[width]"
                  style={{ width: "0%" }}
                />
              </div>
            </header>

            {/* Scrollable Center Body Area */}
            <div
              className="p-4 sm:p-6 md:p-7 overflow-y-auto space-y-4 flex-1 min-h-0"
              onMouseEnter={handleMouseEnterContent}
              onMouseLeave={handleMouseLeaveContent}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Event Main Image with Cross-Fade Transition & Floating Chevrons */}
              <div className="relative w-full aspect-[2.1/1] sm:aspect-[2.15/1] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200/80 shadow-xs group">
                {eventsData.map((event, idx) => (
                  <div
                    key={event.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === selectedIndex
                        ? "opacity-100 z-10 pointer-events-auto"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={getAssetPath(event.image)}
                      alt={`${event.title} - Bethel Ministry Mizoram Program Showcase`}
                      fill
                      priority={idx === 0 || idx === selectedIndex}
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                  </div>
                ))}

                {/* Left Floating Chevron */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/40 hover:bg-white/80 text-neutral-900 border border-white/40 hover:border-white/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Previous event"
                  title="Previous event (←)"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Right Floating Chevron */}
                <button
                  onClick={handleNext}
                  className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-white/40 hover:bg-white/80 text-neutral-900 border border-white/40 hover:border-white/70 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95"
                  aria-label="Next event"
                  title="Next event (→)"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Title & Description with Smooth Transition */}
              <div
                key={currentEvent.id}
                className="space-y-1.5 pt-1 animate-in fade-in duration-500 ease-out"
              >
                <h4 className="text-lg sm:text-2xl font-bold text-neutral-900 tracking-tight">
                  {currentEvent.title}
                </h4>
                {currentEvent.description && (
                  <p className="text-xs sm:text-sm md:text-[15px] text-neutral-600 leading-relaxed text-justify">
                    {currentEvent.description}
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Dock: Selector Matching Website Palette */}
            <div className="bg-neutral-50/90 border-t border-neutral-200/80 px-4 sm:px-6 py-3 shrink-0">
              {/* Selector Top Label */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                  All Events
                </span>
                <span className="text-[10px] text-neutral-400 hidden sm:inline">
                  Select to jump directly
                </span>
              </div>

              {/* Horizontally Scrollable Selector Track */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scrollSelector("left")}
                  className="hidden sm:flex shrink-0 p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 border border-neutral-200 transition shadow-2xs"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <div
                  ref={selectorRef}
                  className="flex-1 flex items-center gap-2.5 overflow-x-auto py-1 px-0.5 scroll-smooth no-scrollbar"
                >
                  {eventsData.map((event, index) => {
                    const isActive = index === selectedIndex;
                    return (
                      <button
                        key={event.id}
                        ref={(el) => {
                          thumbnailRefs.current[index] = el;
                        }}
                        onClick={() => setSelectedIndex(index)}
                        className={`relative shrink-0 flex flex-col items-center rounded-xl p-1 transition-all text-left focus:outline-none ${
                          isActive
                            ? "ring-2 ring-brand-midnight bg-white shadow-xs border border-brand-midnight/30 scale-102"
                            : "opacity-65 hover:opacity-100 bg-white/70 hover:bg-white border border-neutral-200 hover:border-neutral-300"
                        }`}
                        style={{ width: "124px" }}
                        aria-label={`Select ${event.title}`}
                      >
                        <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-neutral-100">
                          <Image
                            src={getAssetPath(event.image)}
                            alt={`${event.title} thumbnail`}
                            fill
                            sizes="124px"
                            className="object-cover"
                          />
                        </div>
                        <span
                          className={`mt-1 text-[10px] sm:text-[11px] truncate w-full text-center px-0.5 ${
                            isActive
                              ? "text-brand-midnight font-bold"
                              : "text-neutral-700 font-medium"
                          }`}
                        >
                          {event.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => scrollSelector("right")}
                  className="hidden sm:flex shrink-0 p-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-500 hover:text-neutral-800 border border-neutral-200 transition shadow-2xs"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
