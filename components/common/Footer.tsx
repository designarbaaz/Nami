// @ts-nocheck
"use client";

import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <footer className="site-footer" id="siteFooter">
          {/* Brand Gradient Nocturnal Atmosphere Aura (Nami Palette Only) */}
          <div className="footer-glow-aura" aria-hidden="true"></div>
      
          <div className="footer-inner">
            {/* Top Row: Editorial Nav Columns + Hanging VIP Lanyard Card */}
            <div className="footer-top-grid">
              {/* Col 1: Brand & Tagline */}
              <div className="footer-meta-col">
                <p className="footer-tagline">
                  A sensory provocateur in sound, dining, and nocturnal culture.<br />
                  Part listening room, part bar, part cultural gathering.
                </p>
                <a href={siteConfig.social.whatsapp} target="_blank" className="btn-whatsapp-footer">
                  <img src="/assets/Whatsapp.svg" alt="WhatsApp" width="18" height="18" className="whatsapp-btn-icon" />
                  <span>Join WhatsApp Community →</span>
                </a>
              </div>
      
              {/* Col 2: Navigation Links */}
              <div className="footer-links-col">
                <span className="footer-col-label">NAVIGATE</span>
                <ul className="footer-nav-list">
                  <li><a href="/concept">About</a></li>
                  <li><a href="/#programming">What’s on</a></li>
                  <li><a href="/drinks-food">Drinks & Food</a></li>
                  <li><a href="/our-space">Our space</a></li>
                  <li><a href="/#press">In the news</a></li>
                  <li><a href="javascript:void(0)" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>Reservation</a></li>
                </ul>
              </div>
      
              {/* Col 3: Hours & Address */}
              <div className="footer-links-col">
                <span className="footer-col-label">HOURS & ADDRESS</span>
                <ul className="footer-nav-list">
                  <li><span>Wed – Sun · 7pm – late</span></li>
                  <li><span>Sessions: 8:30pm onwards</span></li>
                  <li><span>Bandra West, Mumbai</span></li>
                  <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
                </ul>
              </div>
      
              {/* Col 4: Connect & Group */}
              <div className="footer-links-col">
                <span className="footer-col-label">CONNECT</span>
                <ul className="footer-nav-list">
                  <li><a href={siteConfig.social.instagram} target="_blank">Instagram (@namibombay)</a></li>
                  <li><a href="/#programming">Resident advisor</a></li>
                  <li><a href="https://abnah.com/" target="_blank">Abnah group ↗</a></li>
                </ul>
              </div>
            </div>
      
            {/* Centered Copyright & Credits Text (Directly Above Vinyl, Zero Border) */}
            <div className="footer-mid-bar">
              <span>© 2026 NAMI HI-FI. ALL RIGHTS RESERVED. BANDRA WEST, MUMBAI · SENSORY PROVOCATION</span>
            </div>
      
            {/* Half Vinyl Record (Vinyl.svg) - Touching Footer End, Smooth 3x Speed Rotation */}
            <div className="footer-vinyl-stage" aria-hidden="true">
              <div className="footer-vinyl-crop">
                <img src="/assets/Vinyl.svg" alt="" className="footer-vinyl-img" />
                <div className="footer-vinyl-glow"></div>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}
