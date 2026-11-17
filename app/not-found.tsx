import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#070707",
        color: "#fff",
        fontFamily: "Chivo, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ letterSpacing: "0.2em", color: "#A6A6A6", fontSize: "0.8rem" }}>
          404
        </p>
        <h1 style={{ fontFamily: "savate, sans-serif", fontSize: "2.4rem" }}>
          Signal lost
        </h1>
        <p style={{ color: "#A6A6A6", marginBottom: "1.5rem" }}>
          This frequency is not on the {siteConfig.name} dial.
        </p>
        <Link
          href="/"
          style={{
            color: "#F48F24",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}
