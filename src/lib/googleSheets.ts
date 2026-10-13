import { SiteContent, defaultSiteContent, EventItem, TeamMember } from "@/data/defaultContent";
import { GOOGLE_SHEETS_CONFIG } from "@/config/googleSheets";

/**
 * Robust RFC 4180 CSV parser that properly handles quotes, commas, and line breaks
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentCell.trim());
        currentCell = "";
      } else if (char === "\r") {
        // Carriage return: handle CRLF or CR
        if (nextChar === "\n") {
          i++;
        }
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = "";
      } else if (char === "\n") {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
        currentRow = [];
        currentCell = "";
      } else {
        currentCell += char;
      }
    }
  }

  // Push last remaining cell & row
  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    rows.push(currentRow);
  }

  return rows.filter((row) => row.length > 0 && row.some((cell) => cell.length > 0));
}

/**
 * Builds Google Sheets CSV export URL
 */
export function getSheetCsvUrl(sheetId: string, sheetName?: string): string {
  const cleanId = sheetId.trim();
  const base = `https://docs.google.com/spreadsheets/d/${cleanId}/gviz/tq?tqx=out:csv`;
  return sheetName ? `${base}&sheet=${encodeURIComponent(sheetName)}` : base;
}

/**
 * Deep merge updated texts into SiteContent
 */
export function applyTextsFromRows(base: SiteContent, rows: string[][]): SiteContent {
  if (rows.length < 2) return base;

  // Clone default content
  const updated: SiteContent = JSON.parse(JSON.stringify(base));

  // Identify column indices from header
  const header = rows[0].map((h) => h.toLowerCase().trim());
  const sectionIdx = header.findIndex((h) => h.includes("section"));
  const keyIdx = header.findIndex((h) => h.includes("key"));
  // Exclude sectionIdx and keyIdx so "text" in a key-column header (e.g. "call_button_text")
  // does NOT accidentally pick the key column as the value column.
  const valueIdx = header.findIndex(
    (h, idx) =>
      idx !== sectionIdx &&
      idx !== keyIdx &&
      (h.includes("value") || h.includes("content") || h.includes("text"))
  );

  if (keyIdx === -1 || valueIdx === -1) {
    return base;
  }

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const section = (sectionIdx !== -1 ? row[sectionIdx] : "").toLowerCase().trim();
    const key = (row[keyIdx] || "").trim();
    const value = row[valueIdx] !== undefined ? row[valueIdx].trim() : "";

    if (!key || value === "") continue;

    // Apply by section/key
    const s = section.replace(/[\s_-]+/g, "");
    const k = key.replace(/[\s_-]+/g, "");

    // Navbar
    if (k.match(/callbutton|navbarcall/i)) {
      updated.texts.navbar.callButtonText = value;
    }
    // Hero
    else if (k.match(/heroalt|herobanner/i)) {
      updated.texts.hero.altText = value;
    }
    // About
    else if (k.match(/abouttitle1|titleline1/i)) {
      updated.texts.about.titleLine1 = value;
    } else if (k.match(/abouttitle2|titleline2/i)) {
      updated.texts.about.titleLine2 = value;
    } else if (k.match(/aboutp1|paragraph1/i)) {
      updated.texts.about.paragraph1 = value;
    } else if (k.match(/aboutp2|paragraph2/i)) {
      updated.texts.about.paragraph2 = value;
    } else if (k.match(/aboutp3|workercount|workers/i)) {
      updated.texts.about.workerCountNote = value;
    }
    // Events Section
    else if (k.match(/eventstitle|eventsheading/i) && !k.includes("item")) {
      updated.texts.events.title = value;
    } else if (k.match(/eventssubtitle|eventssubheading/i)) {
      updated.texts.events.subtitle = value;
    } else if (k.match(/eventssubtext/i)) {
      updated.texts.events.subtext = value;
    }
    // Team Section
    else if (k.match(/teamtitle|teamheading/i) && !k.includes("member")) {
      updated.texts.team.title = value;
    }
    // Footer
    else if (k.match(/footercatatitle|ctatitle/i)) {
      updated.texts.footer.ctaTitle = value;
    } else if (k.match(/footerctasubtitle|ctasubtitle/i)) {
      updated.texts.footer.ctaSubtitle = value;
    } else if (k.match(/footerctabutton|ctabutton/i)) {
      updated.texts.footer.ctaButtonText = value;
    } else if (k.match(/footerbrandtitle|brandtitle/i)) {
      updated.texts.footer.brandTitle = value;
    } else if (k.match(/footerbrandsubtitle|brandsubtitle/i)) {
      updated.texts.footer.brandSubtitle = value;
    } else if (k.match(/footerbio|brandbio/i)) {
      updated.texts.footer.bio = value;
    } else if (k.match(/socialdesc/i)) {
      updated.texts.footer.socialDescription = value;
    } else if (k.match(/copyright/i)) {
      updated.texts.footer.copyrightText = value;
    }
    // Call Modal — must come BEFORE generic contact/phone matchers to avoid
    // "phone1_number" or "phone1label" being swallowed by the broader /phone1/ regex.
    else if (k.match(/callmodaltitle/i)) {
      updated.texts.callModal.title = value;
    } else if (k.match(/callmodaldesc/i)) {
      updated.texts.callModal.description = value;
    } else if (k.match(/phone1label/i)) {
      updated.texts.callModal.phone1Label = value;
    } else if (k.match(/phone1number/i)) {
      updated.texts.callModal.phone1Number = value;
    } else if (k.match(/phone2label/i)) {
      updated.texts.callModal.phone2Label = value;
    } else if (k.match(/phone2number/i)) {
      updated.texts.callModal.phone2Number = value;
    }
    // Contact — use stricter "contactphone" prefix so they never match modal keys
    else if (k.match(/contactemail|email/i)) {
      updated.texts.contact.email = value;
    } else if (k.match(/contactphone1|primaryphone/i)) {
      updated.texts.contact.phone1 = value;
    } else if (k.match(/contactphone2|secondaryphone/i)) {
      updated.texts.contact.phone2 = value;
    }
    // Social Links
    else if (k.match(/youtube/i)) {
      updated.texts.social.youtubeUrl = value;
    } else if (k.match(/instagram/i)) {
      updated.texts.social.instagramUrl = value;
    } else if (k.match(/facebook/i)) {
      updated.texts.social.facebookUrl = value;
    }
  }

  return updated;
}

/**
 * Parse Events table rows
 */
export function applyEventsFromRows(base: SiteContent, rows: string[][]): SiteContent {
  if (rows.length < 2) return base;

  const header = rows[0].map((h) => h.toLowerCase().trim());
  const idIdx = header.findIndex((h) => h === "id");
  const titleIdx = header.findIndex((h) => h === "title");
  const catIdx = header.findIndex((h) => h.includes("category"));
  const seasonIdx = header.findIndex((h) => h.includes("season"));
  const imgIdx = header.findIndex((h) => h.includes("image"));
  const descIdx = header.findIndex((h) => h.includes("desc"));

  if (titleIdx === -1) return base;

  const updated: SiteContent = JSON.parse(JSON.stringify(base));
  const newEvents: EventItem[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const title = row[titleIdx]?.trim();
    if (!title) continue;

    const id = idIdx !== -1 && row[idIdx]?.trim() ? row[idIdx].trim() : `event-${i}`;
    const existing = base.events.find((e) => e.id === id);

    newEvents.push({
      id,
      title,
      category: catIdx !== -1 && row[catIdx]?.trim() ? row[catIdx].trim() : existing?.category,
      season: seasonIdx !== -1 && row[seasonIdx]?.trim() ? row[seasonIdx].trim() : existing?.season,
      image: imgIdx !== -1 && row[imgIdx]?.trim() ? row[imgIdx].trim() : (existing?.image || "/assets/imgs/hero-banner.webp"),
      description: descIdx !== -1 && row[descIdx]?.trim() ? row[descIdx].trim() : existing?.description,
    });
  }

  if (newEvents.length > 0) {
    updated.events = newEvents;
  }

  return updated;
}

/**
 * Parse Team Members table rows
 */
export function applyTeamFromRows(base: SiteContent, rows: string[][]): SiteContent {
  if (rows.length < 2) return base;

  const header = rows[0].map((h) => h.toLowerCase().trim());
  const idIdx = header.findIndex((h) => h === "id");
  const nameIdx = header.findIndex((h) => h === "name");
  const roleIdx = header.findIndex((h) => h.includes("role") || h.includes("title"));
  const imgIdx = header.findIndex((h) => h.includes("image"));
  const scaleIdx = header.findIndex((h) => h.includes("scale"));

  if (nameIdx === -1) return base;

  const updated: SiteContent = JSON.parse(JSON.stringify(base));
  const newTeam: TeamMember[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = row[nameIdx]?.trim();
    if (!name) continue;

    const id = idIdx !== -1 && row[idIdx]?.trim() ? row[idIdx].trim() : `team-${i}`;
    const existing = base.team.find((t) => t.id === id);

    const scaleVal = scaleIdx !== -1 && row[scaleIdx]?.trim() ? parseFloat(row[scaleIdx].trim()) : undefined;

    newTeam.push({
      id,
      name,
      role: roleIdx !== -1 && row[roleIdx]?.trim() ? row[roleIdx].trim() : existing?.role,
      image: imgIdx !== -1 && row[imgIdx]?.trim() ? row[imgIdx].trim() : (existing?.image || "/assets/imgs/ministry-team-members/01_frederick_lalrindika.webp"),
      scale: !isNaN(scaleVal!) ? scaleVal : existing?.scale,
    });
  }

  if (newTeam.length > 0) {
    updated.team = newTeam;
  }

  return updated;
}

/**
 * Fetch and merge all sheets from Google Sheets
 */
export async function fetchGoogleSheetContent(sheetId: string): Promise<SiteContent> {
  if (!sheetId) return defaultSiteContent;

  let currentContent = defaultSiteContent;

  try {
    // 1. Fetch Site_Texts
    const textsUrl = getSheetCsvUrl(sheetId, GOOGLE_SHEETS_CONFIG.sheets.texts);
    const textsRes = await fetch(textsUrl, { cache: "no-store" });
    if (textsRes.ok) {
      const textsCsv = await textsRes.text();
      const rows = parseCSV(textsCsv);
      currentContent = applyTextsFromRows(currentContent, rows);
    }
  } catch (err) {
    console.warn("Could not load texts from Google Sheets:", err);
  }

  try {
    // 2. Fetch Events
    const eventsUrl = getSheetCsvUrl(sheetId, GOOGLE_SHEETS_CONFIG.sheets.events);
    const eventsRes = await fetch(eventsUrl, { cache: "no-store" });
    if (eventsRes.ok) {
      const eventsCsv = await eventsRes.text();
      const rows = parseCSV(eventsCsv);
      currentContent = applyEventsFromRows(currentContent, rows);
    }
  } catch (err) {
    // Optional sheet tab
  }

  try {
    // 3. Fetch Team_Members
    const teamUrl = getSheetCsvUrl(sheetId, GOOGLE_SHEETS_CONFIG.sheets.team);
    const teamRes = await fetch(teamUrl, { cache: "no-store" });
    if (teamRes.ok) {
      const teamCsv = await teamRes.text();
      const rows = parseCSV(teamCsv);
      currentContent = applyTeamFromRows(currentContent, rows);
    }
  } catch (err) {
    // Optional sheet tab
  }

  return currentContent;
}
