"use client";

import React, { useState } from "react";
import { X, Phone, Copy, Check } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const phoneNumbers = [
    { label: "Primary Office", number: "9612977836" },
    { label: "Alternative Line", number: "8976717098" },
  ];

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full bg-white rounded-3xl p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 border border-neutral-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neutral-100 rounded-full text-neutral-800">
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-neutral-900">
              Contact Bethel Ministry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-black rounded-full hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed text-justify">
          Reach out to our ministry offices for prayer, counseling, or event inquiries.
        </p>

        <div className="space-y-3">
          {phoneNumbers.map((item) => (
            <div
              key={item.number}
              className="flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-neutral-300 transition"
            >
              <div>
                <span className="block text-[11px] font-medium text-neutral-500">
                  {item.label}
                </span>
                <a
                  href={`tel:${item.number}`}
                  className="text-sm font-bold text-neutral-900 hover:text-blue-600 transition tracking-wide"
                >
                  +91 {item.number}
                </a>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCopy(item.number)}
                  className="p-2 text-neutral-500 hover:text-neutral-900 rounded-xl hover:bg-white transition shadow-none hover:shadow-xs"
                  title="Copy number"
                >
                  {copiedNumber === item.number ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={`tel:${item.number}`}
                  className="px-3 py-1.5 bg-neutral-900 text-white rounded-xl text-xs font-medium hover:bg-neutral-800 transition"
                >
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
