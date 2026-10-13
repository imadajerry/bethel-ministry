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

const CACHE_KEY = "bethel_site_content_cache";
const CACHE_TIME_KEY = "bethel_site_content_cache_time";

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

    // Check cache in localStorage
    if (!force && typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
        const now = Date.now();

        if (cached && cachedTime && now - parseInt(cachedTime, 10) < GOOGLE_SHEETS_CONFIG.cacheDurationMs) {
          setContent(JSON.parse(cached));
          setLastUpdated(new Date(parseInt(cachedTime, 10)).toLocaleTimeString());
          return;
        }
      } catch (e) {
        // Ignore cache parse error
      }
    }

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
