/**
 * Editable homepage content.
 * Change copy/data here — section components stay markup-only.
 * When new HTML lands in `_legacy`, map fields into this file.
 */

export type EventItem = {
  dateNum: string;
  dateTag: string;
  hzTag: string;
  artist: string;
  title: string;
  genre: string;
  timing: string;
  attendees: string;
  poster: string;
  desc: string;
  dateStr: string;
};

/** Calendar popup data keyed by day number (string). */
export const EVENTS_DATA: Record<string, EventItem> = {
  "9": {
    dateNum: "09",
    dateTag: "TUE · FEB 09",
    hzTag: "440 Hz Root",
    artist: "Atushi Maeda",
    title: "Atushi Maeda · Ambient & Jazz",
    genre: "Japanese Ambient · Spiritual Jazz · Tokyo Archives",
    timing: "20:30 Onwards (Doors open 19:00)",
    attendees: "38 Guests Attending · Counter Seats Available",
    poster: "/assets/spin-gallery-1.jpg",
    desc: "Tokyo selector Atushi Maeda spins rare Japanese spiritual jazz, intimate environmental ambient, and early experimental Japanese synth pressings exclusively through our custom horn-loaded acoustic system.",
    dateStr: "2026-02-09",
  },
  "14": {
    dateNum: "14",
    dateTag: "SUN · FEB 14",
    hzTag: "Warm Frequencies",
    artist: "Mogasu",
    title: "Mogasu · Vinyl Soul & Rare Groove",
    genre: "Vintage Soul · Slow-Tempo Lovers Rock · Rare Groove",
    timing: "18:00 Onwards (Golden Hour Session)",
    attendees: "56 Guests Attending · High Demand",
    poster: "/assets/spin-gallery-2.jpg",
    desc: "A Valentine’s rare vinyl journey through vintage American soul, slow-tempo Jamaican lovers rock, and warm disco ballads curated exclusively on original analog pressings.",
    dateStr: "2026-02-14",
  },
  "15": {
    dateNum: "15",
    dateTag: "MON · FEB 15",
    hzTag: "980 Hz Harmonic",
    artist: "Jerrau",
    title: "Jerrau · Leftfield Disco & Dub",
    genre: "Dub Reggae · Leftfield Disco · Post-Punk Funk",
    timing: "20:30 Onwards",
    attendees: "44 Guests Attending · Booths Available",
    poster: "/assets/spin-gallery-3.jpg",
    desc: "Amsterdam selector Jerrau brings hypnotic Jamaican dub plates, leftfield disco excursions, and driving polyrhythmic grooves calibrated to our sub-bass manifold.",
    dateStr: "2026-02-15",
  },
  "20": {
    dateNum: "20",
    dateTag: "SAT · FEB 20",
    hzTag: "3968 Hz Special · Headline",
    artist: "Yousuke Yukimatsu",
    title: "Yousuke Yukimatsu · Avant-Garde & Deep Bass",
    genre: "Tokyo Avant-Garde · Sub-Bass Manifold · Experimental",
    timing: "20:30 Onwards (Headline Showcase)",
    attendees: "72 Guests Attending · Selling Fast",
    poster: "/assets/spin-gallery-6.jpg",
    desc: "Tokyo underground legend Yousuke Yukimatsu delivers an extreme contrast performance — seamlessly bridging ambient classical minimalism with crushing sub-bass frequencies and breakcore intensity.",
    dateStr: "2026-02-20",
  },
  "23": {
    dateNum: "23",
    dateTag: "TUE · FEB 23",
    hzTag: "Resonant Node",
    artist: "Occa",
    title: "Occa · Deep Hypnotic Soundscapes",
    genre: "Hypnotic Techno · Deep Ambient · Subterranean Waves",
    timing: "20:30 Onwards",
    attendees: "35 Guests Attending · Listening Tables Open",
    poster: "/assets/spin-gallery-4.jpg",
    desc: "Sapporo sonic architect Occa explores deep psychedelic rhythms, subterranean sub-harmonics, and meditative ambient soundscapes designed for total physical acoustic immersion.",
    dateStr: "2026-02-23",
  },
  "28": {
    dateNum: "28",
    dateTag: "SUN · FEB 28",
    hzTag: "Electric Pulse",
    artist: "Suze Ijo",
    title: "Suze Ijo · Afro-Cuban & Electronic",
    genre: "Afro-Cuban Percussion · Deep House · Global Groove",
    timing: "19:00 Onwards",
    attendees: "48 Guests Attending · Limited Counter Left",
    poster: "/assets/spin-gallery-7.jpg",
    desc: "Rotterdam selector Suze Ijo brings infectious rhythms, Afro-Cuban percussions, and uplifting house gems woven seamlessly through vintage tube amplification.",
    dateStr: "2026-02-28",
  },
  "29": {
    dateNum: "29",
    dateTag: "MON · FEB 29",
    hzTag: "Nocturnal Set",
    artist: "Sunju Hargun",
    title: "Sunju Hargun · Bangkok Nightclub Selector",
    genre: "Cosmic Techno · Asian Synth · Psychedelic Dub",
    timing: "19:00 Onwards (Leap Night Special)",
    attendees: "52 Guests Attending · Special Event",
    poster: "/assets/spin-gallery-8.jpg",
    desc: "A rare leap-year nocturnal selector set by Bangkok electronic producer Sunju Hargun, exploring psychedelic Asian synth, ritualistic dub, and late-night cosmic techno.",
    dateStr: "2026-02-29",
  },
  "30": {
    dateNum: "30",
    dateTag: "TUE · FEB 30",
    hzTag: "Deep Listening",
    artist: "Vinyl Archives",
    title: "Deep Listening · Open Decks Session",
    genre: "Archival Vinyl · Private Pressings · Audiophile Social",
    timing: "19:00 Onwards (Community Social)",
    attendees: "29 Guests Attending · Open Seating",
    poster: "/assets/spin-gallery-9.jpg",
    desc: "Our weekly communal listening session. Guests and resident collectors share rare test pressings, unreleased white labels, and archival vinyl on our reference turntable system.",
    dateStr: "2026-02-30",
  },
};

/** Section order for the homepage — edit this list to reorder/remove blocks. */
export const HOME_SECTIONS = [
  "hero",
  "philosophy",
  "programming",
  "menu",
  "space",
  "faqs",
  "reserve",
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number];
