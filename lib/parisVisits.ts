import {
  eachDayOfInterval,
  endOfDay,
  endOfISOWeek,
  setISOWeek,
  setISOWeekYear,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { fr } from "date-fns/locale";
import { formatInTimeZone, fromZonedTime, toZonedTime } from "date-fns-tz";

import type { AdminRange } from "@/lib/admin-api";

const TZ = "Europe/Paris";

export function parisDayKey(d: Date): string {
  return formatInTimeZone(d, TZ, "yyyy-MM-dd");
}

export function parisMonthKey(d: Date): string {
  return formatInTimeZone(d, TZ, "yyyy-MM");
}

/** Année ISO + numéro de semaine ISO (lundi), tel qu’en Europe/Paris. */
function parisIsoWeekKey(d: Date): string {
  return formatInTimeZone(d, TZ, "RRRR-II");
}

export function parseCreatedAt(v: unknown): Date | null {
  if (v == null) return null;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function rangeParisBounds(
  range: AdminRange,
): { start: Date; end: Date } | null {
  const now = new Date();
  const zNow = toZonedTime(now, TZ);
  if (range === "7d") {
    const startZ = startOfDay(subDays(zNow, 6));
    const endZ = endOfDay(zNow);
    return { start: fromZonedTime(startZ, TZ), end: fromZonedTime(endZ, TZ) };
  }
  if (range === "month") {
    const startZ = startOfMonth(zNow);
    const endZ = endOfDay(zNow);
    return { start: fromZonedTime(startZ, TZ), end: fromZonedTime(endZ, TZ) };
  }
  if (range === "year") {
    const startZ = startOfYear(zNow);
    const endZ = endOfDay(zNow);
    return { start: fromZonedTime(startZ, TZ), end: fromZonedTime(endZ, TZ) };
  }
  return null;
}

export function filterLogsInRange(
  logs: Record<string, unknown>[],
  range: AdminRange,
): Record<string, unknown>[] {
  const bounds = rangeParisBounds(range);
  if (!bounds) return logs;
  return logs.filter((row) => {
    const d = parseCreatedAt(row.created_at);
    if (!d) return false;
    return d >= bounds.start && d <= bounds.end;
  });
}

function trimLogsLast90DaysParis(
  logs: Record<string, unknown>[],
): Record<string, unknown>[] {
  const now = new Date();
  const zNow = toZonedTime(now, TZ);
  const startZ = startOfDay(subDays(zNow, 89));
  const start = fromZonedTime(startZ, TZ);
  return logs.filter((row) => {
    const d = parseCreatedAt(row.created_at);
    return d && d >= start;
  });
}

export function prepareLogsForChart(
  connection_logs: Record<string, unknown>[],
  range: AdminRange,
  granularity: "day" | "month" | "week",
): Record<string, unknown>[] {
  let logs = filterLogsInRange(connection_logs, range);
  if (range === "all" && granularity === "day") {
    logs = trimLogsLast90DaysParis(logs);
  }
  return logs;
}

function dayLabel(key: string): string {
  const [y, m, d] = key.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  return formatInTimeZone(utcNoon, TZ, "d MMM", { locale: fr });
}

function monthLabel(key: string): string {
  const [y, mo] = key.split("-").map(Number);
  const utcNoon = new Date(Date.UTC(y, mo - 1, 15, 12, 0, 0));
  return formatInTimeZone(utcNoon, TZ, "MMM yyyy", { locale: fr });
}

/** Clé `RRRR-II` → libellé court (plage lun–dim en Europe/Paris). */
function weekLabelFromIsoKey(key: string): string {
  const parts = key.split("-");
  if (parts.length < 2) return key;
  const isoYear = Number(parts[0]);
  const isoWeek = Number(parts[1]);
  if (!Number.isFinite(isoYear) || !Number.isFinite(isoWeek)) return key;
  const mid = new Date(Date.UTC(isoYear, 5, 15, 12, 0, 0));
  const monday = startOfISOWeek(
    setISOWeek(setISOWeekYear(mid, isoYear), isoWeek),
  );
  const sunday = endOfISOWeek(monday);
  const a = formatInTimeZone(monday, TZ, "d MMM", { locale: fr });
  const b = formatInTimeZone(sunday, TZ, "d MMM yyyy", { locale: fr });
  return `${a} – ${b}`;
}

const MAX_DAY_BUCKETS = 90;

export function buildDaySeries(
  logs: Record<string, unknown>[],
  range: AdminRange,
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const row of logs) {
    const d = parseCreatedAt(row.created_at);
    if (!d) continue;
    const k = parisDayKey(d);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const now = new Date();
  const zNow = toZonedTime(now, TZ);
  let keys: string[] = [];

  if (range === "7d" || range === "month" || range === "year") {
    const b = rangeParisBounds(range)!;
    const days = eachDayOfInterval({ start: b.start, end: b.end });
    keys = [...new Set(days.map((d) => parisDayKey(d)))].sort();
  } else {
    const startD = startOfDay(subDays(zNow, MAX_DAY_BUCKETS - 1));
    const startUtc = fromZonedTime(startD, TZ);
    const endUtc = fromZonedTime(endOfDay(zNow), TZ);
    const days = eachDayOfInterval({ start: startUtc, end: endUtc });
    keys = [...new Set(days.map((d) => parisDayKey(d)))].sort();
  }

  return keys.map((key) => ({
    label: dayLabel(key),
    count: counts.get(key) ?? 0,
  }));
}

export function buildWeekSeries(
  logs: Record<string, unknown>[],
  range: AdminRange,
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const row of logs) {
    const d = parseCreatedAt(row.created_at);
    if (!d) continue;
    const k = parisIsoWeekKey(d);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const now = new Date();
  const zNow = toZonedTime(now, TZ);
  let keys: string[] = [];

  if (range === "year") {
    const b = rangeParisBounds("year")!;
    const days = eachDayOfInterval({ start: b.start, end: b.end });
    const seen = new Set<string>();
    for (const day of days) {
      seen.add(parisIsoWeekKey(day));
    }
    keys = [...seen].sort();
  } else if (range === "all") {
    const dates = logs
      .map((r) => parseCreatedAt(r.created_at))
      .filter((d): d is Date => d != null);
    if (dates.length === 0) {
      keys = [];
    } else {
      const minT = Math.min(...dates.map((d) => d.getTime()));
      const maxT = now.getTime();
      const d0 = new Date(minT);
      const d1 = new Date(maxT);
      const days = eachDayOfInterval({ start: d0, end: d1 });
      const seen = new Set<string>();
      for (const day of days) {
        seen.add(parisIsoWeekKey(day));
      }
      keys = [...seen].sort();
    }
  }

  return keys.map((key) => ({
    label: weekLabelFromIsoKey(key),
    count: counts.get(key) ?? 0,
  }));
}

export function buildMonthSeries(
  logs: Record<string, unknown>[],
  range: AdminRange,
): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const row of logs) {
    const d = parseCreatedAt(row.created_at);
    if (!d) continue;
    const k = parisMonthKey(d);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const now = new Date();
  const zNow = toZonedTime(now, TZ);
  const y = Number(formatInTimeZone(zNow, TZ, "yyyy"));
  const m = Number(formatInTimeZone(zNow, TZ, "MM"));

  let startKey: string;
  let endKey: string;

  if (range === "7d" || range === "month") {
    startKey = `${y}-${String(m).padStart(2, "0")}`;
    endKey = startKey;
  } else if (range === "year") {
    startKey = `${y}-01`;
    endKey = `${y}-${String(m).padStart(2, "0")}`;
  } else {
    const sortedKeys = [...counts.keys()].sort();
    if (sortedKeys.length === 0) {
      startKey = formatInTimeZone(
        fromZonedTime(startOfMonth(subMonths(zNow, 11)), TZ),
        TZ,
        "yyyy-MM",
      );
    } else {
      startKey = sortedKeys[0]!;
    }
    endKey = `${y}-${String(m).padStart(2, "0")}`;
    const minStart = formatInTimeZone(
      fromZonedTime(startOfMonth(subMonths(zNow, 35)), TZ),
      TZ,
      "yyyy-MM",
    );
    if (startKey < minStart) startKey = minStart;
  }

  const keys: string[] = [];
  let cy = Number(startKey.slice(0, 4));
  let cm = Number(startKey.slice(5, 7));
  const endY = Number(endKey.slice(0, 4));
  const endM = Number(endKey.slice(5, 7));
  while (cy < endY || (cy === endY && cm <= endM)) {
    keys.push(`${cy}-${String(cm).padStart(2, "0")}`);
    cm++;
    if (cm > 12) {
      cm = 1;
      cy++;
    }
  }

  return keys.map((key) => ({
    label: monthLabel(key),
    count: counts.get(key) ?? 0,
  }));
}
