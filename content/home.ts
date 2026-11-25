/**
 * Editable homepage / events content.
 * Styles → public/assets/css/custom.css | Behaviour → public/assets/js/custom.js
 *
 * Calendar EVENTS_DATA is also embedded in custom.js (openEventPopup).
 * Keep this file in sync when editing event copy.
 */

export type EventItem = {
  dateNum: string;
  dateTag: string;
  hzTag: string;
  artist: string;
  title: string;
  genre: string;
  timing: string;
  attendees?: string;
  poster: string;
  desc: string;
  dateStr: string;
};

/** Calendar popup data keyed by day number (string) — index.html home. */
export const EVENTS_DATA: Record<string, EventItem> = {
  "9": {
    dateNum: "09",
    dateTag: "TUE · FEB 09",
    hzTag: "440 Hz Root",
    artist: "Atushi Maeda",
    title: "Atushi Maeda · Ambient & Jazz",
    genre: "Japanese Ambient · Spiritual Jazz",
    timing: "20:30 (Doors 19:00)",
    poster: "/assets/nami-turntable-hands.avif",
    desc: "Tokyo selector Atushi Maeda spins rare Japanese spiritual jazz, intimate environmental ambient, and early experimental Japanese synth pressings exclusively through our custom horn-loaded acoustic system.",
    dateStr: "2026-02-09",
  },
  "14": {
    dateNum: "14",
    dateTag: "SUN · FEB 14",
    hzTag: "Warm Frequencies",
    artist: "Mogasu",
    title: "Mogasu · Vinyl Soul & Rare Groove",
    genre: "Vintage Soul · Rare Groove",
    timing: "18:00 Onwards",
    poster: "/assets/nami-erykah-vinyl.avif",
    desc: "A Valentine’s rare vinyl journey through vintage American soul, slow-tempo Jamaican lovers rock, and warm disco ballads curated exclusively on original analog pressings.",
    dateStr: "2026-02-14",
  },
  "20": {
    dateNum: "20",
    dateTag: "SAT · FEB 20",
    hzTag: "3968 Hz Special · Headline",
    artist: "Yousuke Yukimatsu",
    title: "Yousuke Yukimatsu · Avant-Garde & Deep Bass",
    genre: "Tokyo Avant-Garde & Bass",
    timing: "20:30 Onwards",
    poster: "/assets/nami-horn-speaker.avif",
    desc: "Tokyo underground legend Yousuke Yukimatsu delivers an extreme contrast performance — seamlessly bridging ambient classical minimalism with crushing sub-bass frequencies and breakcore intensity.",
    dateStr: "2026-02-20",
  },
  "23": {
    dateNum: "23",
    dateTag: "TUE · FEB 23",
    hzTag: "Resonant Node",
    artist: "Occa",
    title: "Occa · Deep Hypnotic Soundscapes",
    genre: "Hypnotic Soundscapes & Ambient",
    timing: "20:30 Onwards",
    poster: "/assets/nami-resor-mixer.avif",
    desc: "Sapporo sonic architect Occa explores deep psychedelic rhythms, subterranean sub-harmonics, and meditative ambient soundscapes designed for total physical acoustic immersion.",
    dateStr: "2026-02-23",
  },
  "28": {
    dateNum: "28",
    dateTag: "SUN · FEB 28",
    hzTag: "Electric Pulse",
    artist: "Suze Ijo",
    title: "Suze Ijo · Afro-Cuban & Electronic",
    genre: "Afro-Cuban Beats & Deep House",
    timing: "19:00 Onwards",
    poster: "/assets/nami-selector-booth.avif",
    desc: "Rotterdam selector Suze Ijo brings infectious rhythms, Afro-Cuban percussions, and uplifting house gems woven seamlessly through vintage tube amplification.",
    dateStr: "2026-02-28",
  },
  "29": {
    dateNum: "29",
    dateTag: "MON · FEB 29",
    hzTag: "Nocturnal Set",
    artist: "Sunju Hargun",
    title: "Sunju Hargun · Bangkok Nightclub Selector",
    genre: "Cosmic Techno & Asian Synth",
    timing: "19:00 Onwards",
    poster: "/assets/nami-evening-crowd.avif",
    desc: "A rare leap-year nocturnal selector set by Bangkok electronic producer Sunju Hargun, exploring psychedelic Asian synth, ritualistic dub, and late-night cosmic techno.",
    dateStr: "2026-02-29",
  },
};

export type EventListItem = {
  date: string;
  time: string;
  title: string;
  poster: string;
  ariaLabel: string;
};

/** List rows for /whats-on and /index-2. */
export const EVENT_LIST: EventListItem[] = [
  {
    date: "06/09",
    time: "Wed · 20:30",
    title: "Atushi Maeda: Tokyo Jazz Kissa & Spiritual Vinyl",
    poster: "/assets/Event-1.avif",
    ariaLabel: "Reserve for Atushi Maeda",
  },
  {
    date: "12/09",
    time: "Thu · 18:00",
    title: "Mogasu: Japanese Soul Archives & Sake Tasting",
    poster: "/assets/Event-2.avif",
    ariaLabel: "Reserve for Mogasu",
  },
  {
    date: "18/09",
    time: "Fri · 20:30",
    title: "Yousuke Yukimatsu: Avant-Garde Analog Bass",
    poster: "/assets/Event-3.avif",
    ariaLabel: "Reserve for Yousuke Yukimatsu",
  },
  {
    date: "24/09",
    time: "Sat · 20:30",
    title: "Occa: Hypnotic Rotary Sound & Deep Minimal",
    poster: "/assets/Event-1.avif",
    ariaLabel: "Reserve for Occa",
  },
  {
    date: "02/10",
    time: "Sun · 19:00",
    title: "Suze Ijo: Afro-Cuban Frequencies & Acid Tube Waves",
    poster: "/assets/Event-2.avif",
    ariaLabel: "Reserve for Suze Ijo",
  },
  {
    date: "08/10",
    time: "Wed · 21:00",
    title: "Sunju Hargun: Bangkok Hi-Fi Night & Deep Waves",
    poster: "/assets/Event-3.avif",
    ariaLabel: "Reserve for Sunju Hargun",
  },
];

export type PreviousEvent = {
  title: string;
  poster: string;
  meta: string;
};

export const PREVIOUS_EVENTS: PreviousEvent[] = [
  {
    title: "Roycin: After Dark",
    poster: "/assets/Event-1.avif",
    meta: "Listening session",
  },
  {
    title: "Hamza Rahimtula: After Hours",
    poster: "/assets/Event-4.avif",
    meta: "Selector night",
  },
  {
    title: "Sindhi Curry: After Hours",
    poster: "/assets/Event-3.avif",
    meta: "Vinyl night",
  },
];

export const HOME_SECTIONS = [
  "hero",
  "philosophy",
  "programming",
  "menu",
  "space",
  "press",
  "instagram",
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number];
