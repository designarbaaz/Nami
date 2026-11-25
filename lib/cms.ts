/**
 * Content access layer — static today, Strapi-ready later.
 */
import {
  EVENTS_DATA,
  EVENT_LIST,
  PREVIOUS_EVENTS,
  type EventItem,
  type EventListItem,
  type PreviousEvent,
} from "@/content/home";
import { publicEnv } from "@/lib/env";

export type CmsEvent = EventItem;
export type CmsEventListItem = EventListItem;
export type CmsPreviousEvent = PreviousEvent;

/** Calendar events for the homepage popup. */
export async function getEvents(): Promise<Record<string, CmsEvent>> {
  return EVENTS_DATA;
}

/** Upcoming list rows for /whats-on and /index-2. */
export async function getEventList(): Promise<EventListItem[]> {
  return EVENT_LIST;
}

export async function getPreviousEvents(): Promise<PreviousEvent[]> {
  return PREVIOUS_EVENTS;
}

export function isCmsEnabled(): boolean {
  return Boolean(publicEnv.strapiUrl);
}
