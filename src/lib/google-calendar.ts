import { google } from "googleapis";
import { TimeSlot } from "@/types";

const TIMEZONE = "Europe/Bratislava";
const BUFFER_MINUTES = 30;
const START_HOUR = 8;
const END_HOUR = 18;

function getCalendarClient() {
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || "";

  // Handle both escaped \\n (from .env files) and literal \n
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  // Strip surrounding quotes if present
  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

interface BusyBlock {
  start: number; // ms timestamp
  end: number;   // ms timestamp (includes buffer)
}

/**
 * Generates all possible start times for a given duration.
 * Slots start every 30 minutes from START_HOUR.
 * The slot must end by END_HOUR.
 */
function generateCandidateSlots(
  date: string,
  durationMinutes: number
): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const startMinutes = START_HOUR * 60;
  const endMinutes = END_HOUR * 60;

  for (let m = startMinutes; m + durationMinutes <= endMinutes; m += 30) {
    const startH = Math.floor(m / 60);
    const startM = m % 60;
    const endTotalM = m + durationMinutes;
    const endH = Math.floor(endTotalM / 60);
    const endM = endTotalM % 60;

    const start = `${date}T${startH.toString().padStart(2, "0")}:${startM.toString().padStart(2, "0")}:00`;
    const end = `${date}T${endH.toString().padStart(2, "0")}:${endM.toString().padStart(2, "0")}:00`;

    slots.push({ start, end, available: true });
  }

  return slots;
}

/**
 * Checks if a candidate slot (with its trailing buffer) collides with any busy block.
 *
 * A candidate occupies: [slotStart, slotEnd + BUFFER]
 * A busy block occupies: [busyStart, busyEnd + BUFFER] (already computed)
 *
 * Collision = the candidate's full block overlaps any busy block.
 */
function hasCollision(
  slotStartMs: number,
  slotEndMs: number,
  busyBlocks: BusyBlock[]
): boolean {
  // The candidate's full occupied range includes its own buffer
  const candidateEnd = slotEndMs + BUFFER_MINUTES * 60 * 1000;

  for (const busy of busyBlocks) {
    // Two ranges overlap if: candidateStart < busyEnd AND candidateEnd > busyStart
    if (slotStartMs < busy.end && candidateEnd > busy.start) {
      return true;
    }
  }
  return false;
}

export async function getAvailableSlots(
  date: string,
  durationMinutes: number = 60
): Promise<TimeSlot[]> {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  const startOfDay = `${date}T00:00:00`;
  const endOfDay = `${date}T23:59:59`;

  const candidates = generateCandidateSlots(date, durationMinutes);

  try {
    const response = await calendar.events.list({
      calendarId,
      timeMin: new Date(startOfDay + "+01:00").toISOString(),
      timeMax: new Date(endOfDay + "+01:00").toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      timeZone: TIMEZONE,
    });

    const events = response.data.items || [];

    // Build busy blocks: each event occupies [start, end + 30min buffer]
    const busyBlocks: BusyBlock[] = events
      .filter((e) => e.start?.dateTime && e.end?.dateTime)
      .map((e) => ({
        start: new Date(e.start!.dateTime!).getTime(),
        end:
          new Date(e.end!.dateTime!).getTime() +
          BUFFER_MINUTES * 60 * 1000,
      }));

    // Mark each candidate as available only if its full block
    // (duration + buffer) fits without collision
    return candidates.map((slot) => {
      const slotStartMs = new Date(slot.start + "+01:00").getTime();
      const slotEndMs = new Date(slot.end + "+01:00").getTime();

      return {
        ...slot,
        available: !hasCollision(slotStartMs, slotEndMs, busyBlocks),
      };
    });
  } catch (error) {
    console.error("Google Calendar API error:", error);
    // Return all slots as available on API failure
    return candidates;
  }
}

export async function createBooking(
  startTime: string,
  endTime: string,
  meno: string,
  priezvisko: string,
  adresa: string,
  telefon: string,
  zdravotnyStav: string,
  massageType: string
) {
  const calendar = getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID!;

  // Strip any existing timezone offset — we rely on timeZone parameter only
  const cleanStart = startTime.replace(/[+-]\d{2}:\d{2}$/, "").replace(/Z$/, "");
  const cleanEnd = endTime.replace(/[+-]\d{2}:\d{2}$/, "").replace(/Z$/, "");

  console.log("Creating booking:", {
    calendarId,
    startTime: cleanStart,
    endTime: cleanEnd,
    serviceEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    privateKeyLength: (process.env.GOOGLE_PRIVATE_KEY || "").length,
  });

  try {
    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `Masáž - ${meno} ${priezvisko} (${massageType})`,
        description: [
          `Klient: ${meno} ${priezvisko}`,
          `Adresa: ${adresa}`,
          `Telefón: ${telefon}`,
          `Typ masáže: ${massageType}`,
          ``,
          `Zdravotný stav:`,
          zdravotnyStav,
        ].join("\n"),
        start: { dateTime: cleanStart, timeZone: TIMEZONE },
        end: { dateTime: cleanEnd, timeZone: TIMEZONE },
      },
    });

    console.log("Booking created successfully:", event.data.id);
    return event.data;
  } catch (error: unknown) {
    const err = error as { message?: string; code?: number; errors?: unknown[] };
    console.error("Google Calendar API createBooking error:", {
      message: err.message,
      code: err.code,
      errors: err.errors,
    });
    throw error;
  }
}
