// @ts-nocheck
"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";

const KNOB = (
  <svg className="knob-svg" viewBox="0 0 24 23.5" aria-hidden="true">
    <g className="knob-rotor">
      <path
        className="knob-dial"
        d="M18.3,12.2c0,3.5-2.8,6.3-6.3,6.3s-6.3-2.8-6.3-6.3,2.1-5.4,4.9-6.1c0,0,.2,0,.3,0,.4-.1.7-.2,1.1-.2s.7,0,1.1.1c.1,0,.2,0,.3.1C16.2,6.8,18.3,9.3,18.3,12.2Z"
      />
      <path
        className="knob-notch"
        d="M13.1,6.1c-.4-.1-.7-.1-1.1-.1s-.8,0-1.1,0l.3-2.4h1.5L13.1,6.1Z"
      />
      <rect className="knob-notch-tip" x="11.8" y="3.6" width=".4" height=".7" />
    </g>
  </svg>
);

function scrollerClass(active: boolean) {
  return active ? "scroller-btn active" : "scroller-btn";
}

function drawerClass(active: boolean) {
  return active ? "drawer-nav-item active" : "drawer-nav-item";
}

export default function Header() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";
  const onConcept = pathname.startsWith("/concept");
  const onWhatsOn = pathname.startsWith("/whats-on");
  const onDrinks = pathname.startsWith("/drinks-food");
  const onSpace = pathname.startsWith("/our-space");

  // Home keeps in-page anchors for C/W/F; subpages use routes (matches index-2 + page HTML).
  const hrefConcept = isHome ? "/#philosophy" : "/concept";
  const hrefWhatsOn = isHome ? "/#programming" : "/whats-on";
  const hrefDrinks = isHome ? "/#menu" : "/drinks-food";
  const hrefSpace = "/our-space";

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          <a href="/" className="brand-mark-link" id="headerBrandMark" aria-label="NAMI Home">
            <img src="/assets/Main-logo.svg" alt="NAMI" className="brand-mark-img" />
          </a>
        </div>

        <div className="header-nav-wrap">
          <nav className="section-scroller" aria-label="Section scroller">
            <div className="scroller-node">
              <a
                href={hrefConcept}
                className={scrollerClass(onConcept)}
                data-section="philosophy"
                aria-label="Concept"
                aria-current={onConcept ? "page" : undefined}
              >
                {KNOB}
                <span className="knob-label">C</span>
                <span className="tooltip">Concept</span>
              </a>
            </div>

            <div className="scroller-node">
              <a
                href={hrefWhatsOn}
                className={scrollerClass(onWhatsOn)}
                data-section="programming"
                aria-label="What’s on"
                aria-current={onWhatsOn ? "page" : undefined}
              >
                {KNOB}
                <span className="knob-label">W</span>
                <span className="tooltip">What’s on</span>
              </a>
            </div>

            <div className="scroller-node">
              <a
                href={hrefDrinks}
                className={scrollerClass(onDrinks)}
                data-section="menu"
                aria-label="Drinks & Food"
                aria-current={onDrinks ? "page" : undefined}
              >
                {KNOB}
                <span className="knob-label">F</span>
                <span className="tooltip">Drinks & Food</span>
              </a>
            </div>

            <div className="scroller-node">
              <a
                href={hrefSpace}
                className={scrollerClass(onSpace)}
                data-section="space"
                aria-label="Our Space"
                aria-current={onSpace ? "page" : undefined}
              >
                {KNOB}
                <span className="knob-label">S</span>
                <span className="tooltip">Our Space</span>
              </a>
            </div>
          </nav>

          <button
            className="btn-wave-hamburger"
            id="hamburgerBtn"
            aria-label="Toggle menu"
            onClick={(e) => {
              (window as any).toggleMenuDrawer?.();
            }}
          >
            <img src="/assets/Menu-io.svg" alt="Menu" className="btn-menu-icon" />
          </button>
        </div>
      </header>

      <div id="menuDrawer" role="dialog" aria-modal="true">
        <div className="menu-drawer-top">
          <img src="/assets/Main-logo.svg" alt="NAMI" style={{ height: 28, width: "auto" }} />
          <button
            className="btn-close-drawer"
            onClick={() => (window as any).toggleMenuDrawer?.()}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="drawer-middle">
          <nav className="drawer-nav-links" id="drawerNavLinks">
            <a
              href="/concept"
              className={drawerClass(onConcept)}
              onClick={() => (window as any).toggleMenuDrawer?.()}
              data-target-img="drawerImgConcept"
              data-tag="CONCEPT · 01"
              data-sub="We Compose Nights"
            >
              <span className="drawer-nav-num">01</span> Concept
            </a>
            <a
              href="/whats-on"
              className={drawerClass(onWhatsOn)}
              onClick={() => (window as any).toggleMenuDrawer?.()}
              data-target-img="drawerImgProgramming"
              data-tag="SCHEDULE · 02"
              data-sub="Weekly Programming"
            >
              <span className="drawer-nav-num">02</span> What’s On
            </a>
            <a
              href="/drinks-food"
              className={drawerClass(onDrinks)}
              onClick={() => (window as any).toggleMenuDrawer?.()}
              data-target-img="drawerImgMenu"
              data-tag="RESONANCE · 03"
              data-sub="Robata & Libations"
            >
              <span className="drawer-nav-num">03</span> Drinks & Food
            </a>
            <a
              href="/our-space"
              className={drawerClass(onSpace)}
              onClick={() => (window as any).toggleMenuDrawer?.()}
              data-target-img="drawerImgSpace"
              data-tag="ACOUSTICS · 04"
              data-sub="440Hz Sound Architecture"
            >
              <span className="drawer-nav-num">04</span> Our Space
            </a>
            <a
              href="/#reservation"
              className="drawer-nav-item"
              onClick={(e) => {
                (window as any).toggleMenuDrawer?.();
                (window as any).openReservationModal?.(e);
              }}
              data-target-img="drawerImgReservation"
              data-tag="RESERVATION · 05"
              data-sub="Table & Listening Sessions"
            >
              <span className="drawer-nav-num">05</span> Reservation
            </a>
          </nav>

          <div className="drawer-image-wrap">
            <div className="drawer-image-card">
              <img
                src="/assets/nami-dj-bar.avif"
                alt="NAMI Listening Room Atmosphere"
                className="drawer-preview-img active"
                id="drawerImgDefault"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/assets/nami-erykah-vinyl.avif"
                alt="Concept"
                className="drawer-preview-img"
                id="drawerImgConcept"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/assets/nami-selector-booth.avif"
                alt="What’s On"
                className="drawer-preview-img"
                id="drawerImgProgramming"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/assets/nami-negroni-horn.avif"
                alt="Drinks & Food"
                className="drawer-preview-img"
                id="drawerImgMenu"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/assets/nami-resor-mixer.avif"
                alt="Our Space"
                className="drawer-preview-img"
                id="drawerImgSpace"
                loading="lazy"
                decoding="async"
              />
              <img
                src="/assets/nami-guest-table.avif"
                alt="Reservation"
                className="drawer-preview-img"
                id="drawerImgReservation"
                loading="lazy"
                decoding="async"
              />

              <div className="drawer-image-caption">
                <span className="drawer-caption-tag" id="drawerCaptionTag">
                  NAMI HI-FI
                </span>
                <span className="drawer-caption-sub" id="drawerCaptionSub">
                  Listening Room & Dining
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-bottom-info">
          <div className="drawer-info-col">
            <h4>Hours</h4>
            <p>
              Wed – Sun · 7 PM – Late
              <br />
              Listening Sessions: 20:30 Onwards
            </p>
          </div>
          <div className="drawer-info-col">
            <h4>Location</h4>
            <p>
              Bandra West, Mumbai,
              <br />
              Maharashtra 400050
            </p>
          </div>
          <div className="drawer-info-col">
            <h4>Community</h4>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#c0c0c0",
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <img
                src="/assets/Whatsapp.svg"
                alt="WhatsApp"
                width="16"
                height="16"
                style={{ display: "block", flexShrink: 0 }}
              />
              <span>Join WhatsApp Group →</span>
            </a>
          </div>
          <div className="drawer-info-col">
            <h4>Instagram</h4>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#c0c0c0",
                textDecoration: "underline",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <img
                src="/assets/Instagram.svg"
                alt="Instagram"
                width="16"
                height="16"
                style={{ display: "block", flexShrink: 0 }}
              />
              <span>@namibombay</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
