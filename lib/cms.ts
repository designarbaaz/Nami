/**
 * Content access layer — static today, Strapi-ready later.
 *
 * For now everything reads from `content/*.ts`.
 * When Strapi is live, swap implementations here only — pages stay unchanged.
 */

import { EVENTS_DATA, type EventItem } from "@/content/home";
import { publicEnv } from "@/lib/env";

export type CmsEvent = EventItem;

/** Calendar events for the homepage. */
export async function getEvents(): Promise<Record<string, CmsEvent>> {
  // Future: if (publicEnv.strapiUrl) return fetchFromStrapi(...)
  return EVENTS_DATA;
}

/** True when a Strapi base URL is configured (CMS mode). */
export function isCmsEnabled(): boolean {
  return Boolean(publicEnv.strapiUrl);
}
