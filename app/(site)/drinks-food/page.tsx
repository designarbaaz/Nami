import type { Metadata } from "next";
import DrinksFoodPage from "@/components/drinks-food/DrinksFoodPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drinks & Food",
  description:
    "Bespoke nocturnal cocktails, Japanese robata plates and seasonal desserts at Nami.",
  alternates: { canonical: absoluteUrl("/drinks-food") },
};

export default function DrinksFoodRoute() {
  return <DrinksFoodPage />;
}
