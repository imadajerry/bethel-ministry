"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContent, defaultSiteContent } from "@/data/defaultContent";
import { GOOGLE_SHEETS_CONFIG } from "@/config/googleSheets";
import { fetchGoogleSheetContent } from "@/lib/googleSheets";

interface ContentContextType {
  content: SiteContent;
  isLoading: boolean;
  isLiveConnected: boolean;
  lastUpdated: string | null;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultSiteContent,
  isLoading: false,
  isLiveConnected: false,
  lastUpdated: null,
  refreshContent: async () => {},
});

// v2: bumped to invalidate stale cache that may contain "phone1_number" placeholder values
const CACHE_KEY = "bethel_site_content_cache_v2";
const CACHE_TIME_KEY = "bethel_site_content_cache_time_v2";

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const loadContent = useCallback(async (force = false) => {
    const sheetId = GOOGLE_SHEETS_CONFIG.sheetId;
    if (!sheetId || !GOOGLE_SHEETS_CONFIG.enableLiveFetch) {
      return;
    }

    setIsLiveConnected(true);

    // 1. Instantly hydrate from cache for 0ms initial render
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          setContent(JSON.parse(cached));
        }
      } catch (e) {
        // Ignore cache parse error
      }
    }

    // 2. Always fetch fresh content from Google in the background (no blocking delay)
    setIsLoading(true);
    try {
      const fetched = await fetchGoogleSheetContent(sheetId);
      setContent(fetched);
      const timeStr = new Date().toLocaleTimeString();
      setLastUpdated(timeStr);

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(fetched));
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        } catch (e) {
          // LocalStorage quota or access error
        }
      }
    } catch (err) {
      console.warn("Failed to fetch live Google Sheets content:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <ContentContext.Provider
      value={{
        content,
        isLoading,
        isLiveConnected,
        lastUpdated,
        refreshContent: () => loadContent(true),
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(ContentContext);
  return context;
}
