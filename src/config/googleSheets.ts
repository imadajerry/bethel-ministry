/**
 * Google Sheets Integration Configuration
 * 
 * To connect your Google Sheet to Bethel Ministry website:
 * 1. Create a Google Sheet and import the generated CSV template(s) or add your content.
 * 2. Click "Share" -> change access to "Anyone with the link can view".
 * 3. Copy the Sheet ID from the URL (the long code between /d/ and /edit).
 * 4. Paste your Sheet ID below or set NEXT_PUBLIC_GOOGLE_SHEET_ID in your .env.local file.
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Replace with your Google Sheet ID or set NEXT_PUBLIC_GOOGLE_SHEET_ID
  sheetId: process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || "",

  // Sheet Tab Names (default names matching template sheets)
  sheets: {
    texts: "Site_Texts",
    events: "Events",
    team: "Team_Members",
  },

  // Cache duration in milliseconds (default: 60 seconds)
  cacheDurationMs: 60 * 1000,

  // Enable live client-side fetching when sheetId is provided
  enableLiveFetch: true,
};
