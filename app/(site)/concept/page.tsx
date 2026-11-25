import type { Metadata } from "next";
import ConceptPage from "@/components/concept/ConceptPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Concept & Philosophy",
  description:
    "A sensory provocateur in sound, dining, and nocturnal culture — Nami’s listening-room philosophy in Bandra West, Mumbai.",
  alternates: { canonical: absoluteUrl("/concept") },
};

export default function ConceptRoute() {
  return <ConceptPage />;
}
