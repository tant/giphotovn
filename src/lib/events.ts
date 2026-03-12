import { readFileSync } from 'fs';
import { join } from 'path';
import { createHmac, timingSafeEqual } from 'crypto';

interface EventEntry {
  name: string;
  slug: string;
  password: string;
}

let cachedEvents: EventEntry[] | null = null;

function parseEventsFile(): EventEntry[] {
  if (cachedEvents) return cachedEvents;

  const filePath = join(process.cwd(), 'events.md');
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const events: EventEntry[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('|') || trimmed.startsWith('| Name') || trimmed.startsWith('|---')) {
      continue;
    }
    const parts = trimmed.split('|').map((p) => p.trim()).filter(Boolean);
    if (parts.length >= 3) {
      events.push({
        name: parts[0],
        slug: parts[1],
        password: parts[2],
      });
    }
  }

  cachedEvents = events;
  return events;
}

export function findEventByPassword(password: string): EventEntry | null {
  const events = parseEventsFile();
  return events.find((e) => e.password === password) || null;
}

export function verifyPasswordForSlug(slug: string, password: string): boolean {
  const events = parseEventsFile();
  const event = events.find((e) => e.slug === slug);
  if (!event) return false;
  return event.password === password;
}

function getSecret(): string {
  const secret = process.env.EVENT_COOKIE_SECRET;
  if (!secret) throw new Error('EVENT_COOKIE_SECRET is not set');
  return secret;
}

export function generateCookieToken(slug: string): string {
  return createHmac('sha256', getSecret()).update(slug).digest('hex');
}

export function verifyCookieToken(slug: string, token: string): boolean {
  const expected = generateCookieToken(slug);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(token));
  } catch {
    return false;
  }
}
