// @ts-nocheck
"use client";

import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <>
      <header className="site-header">
          <div className="header-left">
            {/* Appears when scrolling away from hero */}
            <a href="/#hero" className="brand-mark-link" id="headerBrandMark" aria-label="NAMI Home">
              <img src="/assets/Main-logo.svg" alt="NAMI" className="brand-mark-img" />
            </a>
          </div>
      
          <div className="header-nav-wrap">
            {/* Circular Page Scroller: ( C ) ~ ( W ) ~ ( F ) ~ ( S ) */}
            <nav className="section-scroller" aria-label="Section scroller">
              {/* Node C: Concept */}
              <div className="scroller-node">
                <a href="/#philosophy" className="scroller-btn" data-section="philosophy" aria-label="Concept">
                  C
                  <span className="tooltip">Concept</span>
                </a>
              </div>
      
              <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />
      
              {/* Node W: What's On */}
              <div className="scroller-node">
                <a href="/#programming" className="scroller-btn" data-section="programming" aria-label="What’s On">
                  W
                  <span className="tooltip">What’s On</span>
                </a>
              </div>
      
              <img src="/assets/wave-2.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />
      
              {/* Node F: Food & Drinks */}
              <div className="scroller-node">
                <a href="/#menu" className="scroller-btn" data-section="menu" aria-label="Food & Drinks">
                  F
                  <span className="tooltip">Food & Drinks</span>
                </a>
              </div>
      
              <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />
      
              {/* Node S: Our Space */}
              <div className="scroller-node">
                <a href="/#space" className="scroller-btn" data-section="space" aria-label="Our Space">
                  S
                  <span className="tooltip">Our Space</span>
                </a>
              </div>
            </nav>
      
            {/* Waveform Hamburger Menu Icon (Menu-io.svg) */}
            <button className="btn-wave-hamburger" id="hamburgerBtn" aria-label="Toggle menu" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <img src="/assets/Menu-io.svg" alt="Menu" className="btn-menu-icon" />
            </button>
          </div>
        </header>
      
        {/* =========================================================
             FULL-SCREEN SLIDE-OUT MENU DRAWER
             ========================================================= */}
        <div id="menuDrawer" role="dialog" aria-modal="true">
          <div className="menu-drawer-top">
            <img src="/assets/Main-logo.svg" alt="NAMI" style={{height: '28px', width: 'auto'}} />
            <button className="btn-close-drawer" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} aria-label="Close menu">✕</button>
          </div>
      
          {/* Drawer Middle: Nav Links (Left) + Editorial Showcase Image (Right) */}
          <div className="drawer-middle">
            <nav className="drawer-nav-links" id="drawerNavLinks">
              <a href="/#philosophy" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} data-target-img="drawerImgConcept" data-tag="CONCEPT · 01" data-sub="We Compose Nights">
                <span className="drawer-nav-num">01</span> Concept
              </a>
              <a href="/#programming" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} data-target-img="drawerImgProgramming" data-tag="SCHEDULE · 02" data-sub="Weekly Programming">
                <span className="drawer-nav-num">02</span> What’s On
              </a>
              <a href="/#menu" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} data-target-img="drawerImgMenu" data-tag="RESONANCE · 03" data-sub="Robata & Libations">
                <span className="drawer-nav-num">03</span> Food & Drinks
              </a>
              <a href="/#space" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} data-target-img="drawerImgSpace" data-tag="ACOUSTICS · 04" data-sub="440Hz Sound Architecture">
                <span className="drawer-nav-num">04</span> Our Space
              </a>
              <a href="/#reservation" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.(); (window as any).openReservationModal?.(event); }} data-target-img="drawerImgReservation" data-tag="RESERVATION · 05" data-sub="Table & Listening Sessions">
                <span className="drawer-nav-num">05</span> Reservation
              </a>
            </nav>
      
            {/* Right Side Visual Showcase Inside Hamburger Menu (Enlarged, Zero Radius, Zero Outline) */}
            <div className="drawer-image-wrap">
              <div className="drawer-image-card">
                <img src="/assets/spin-gallery-8.jpg" alt="NAMI Listening Room Atmosphere" className="drawer-preview-img active" id="drawerImgDefault" loading="lazy" decoding="async" />
                <img src="/assets/spin-gallery-2.jpg" alt="Concept" className="drawer-preview-img" id="drawerImgConcept" loading="lazy" decoding="async" />
                <img src="/assets/Event-bg.jpg" alt="What’s On" className="drawer-preview-img" id="drawerImgProgramming" loading="lazy" decoding="async" />
                <img src="/assets/spin-gallery-7.jpg" alt="Food & Drinks" className="drawer-preview-img" id="drawerImgMenu" loading="lazy" decoding="async" />
                <img src="/assets/spin-gallery-4.jpg" alt="Our Space" className="drawer-preview-img" id="drawerImgSpace" loading="lazy" decoding="async" />
                <img src="/assets/spin-gallery-6.jpg" alt="Reservation" className="drawer-preview-img" id="drawerImgReservation" loading="lazy" decoding="async" />
      
                <div className="drawer-image-caption">
                  <span className="drawer-caption-tag" id="drawerCaptionTag">NAMI HI-FI</span>
                  <span className="drawer-caption-sub" id="drawerCaptionSub">Listening Room & Dining</span>
                </div>
              </div>
            </div>
          </div>
      
          <div className="drawer-bottom-info">
            <div className="drawer-info-col">
              <h4>HOURS</h4>
              <p>Wed – Sun · 7 PM – Late<br />Listening Sessions: 20:30 Onwards</p>
            </div>
            <div className="drawer-info-col">
              <h4>LOCATION</h4>
              <p>Bandra West, Mumbai,<br />Maharashtra 400050</p>
            </div>
            <div className="drawer-info-col">
              <h4>COMMUNITY</h4>
              <a href={siteConfig.social.whatsapp} target="_blank" rel="noreferrer" style={{color: '#fff', textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.45rem'}}>
                <img src="/assets/Whatsapp.svg" alt="WhatsApp" width="16" height="16" style={{display: 'block', flexShrink: 0}} />
                <span>Join WhatsApp Group →</span>
              </a>
            </div>
            <div className="drawer-info-col">
              <h4>INSTAGRAM</h4>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" style={{color: '#fff'}}>@nami.hifi</a>
            </div>
          </div>
        </div>
    </>
  );
}

