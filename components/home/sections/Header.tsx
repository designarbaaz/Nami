// @ts-nocheck
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <>
    <header className="site-header">
              <div className="header-left">
                {/* Appears when scrolling away from hero */}
                <a href="#hero" className="brand-mark-link" id="headerBrandMark" aria-label="NAMI Home">
                  <img src="/assets/Main-logo.svg" alt="NAMI" className="brand-mark-img" />
                </a>
              </div>

              <div className="header-nav-wrap">
                {/* Circular Page Scroller: ( I ) ~ ( P ) ~ ( S ) ~ ( M ) ~ ( R ) */}
                <nav className="section-scroller" aria-label="Section scroller">
                  {/* Node I: Intro / Hero */}
                  <div className="scroller-node">
                    <a href="#hero" className="scroller-btn active" data-section="hero" aria-label="Intro">
                      I
                      <span className="tooltip">Intro</span>
                    </a>
                  </div>

                  <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

                  {/* Node P: Philosophy */}
                  <div className="scroller-node">
                    <a href="#philosophy" className="scroller-btn" data-section="philosophy" aria-label="Philosophy">
                      P
                      <span className="tooltip">Philosophy</span>
                    </a>
                  </div>

                  <img src="/assets/wave-2.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

                  {/* Node S: Space */}
                  <div className="scroller-node">
                    <a href="#space" className="scroller-btn" data-section="space" aria-label="Space">
                      S
                      <span className="tooltip">Space</span>
                    </a>
                  </div>

                  <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

                  {/* Node M: Menu */}
                  <div className="scroller-node">
                    <a href="#menu" className="scroller-btn" data-section="menu" aria-label="Menu">
                      M
                      <span className="tooltip">Menu</span>
                    </a>
                  </div>

                  <img src="/assets/wave-2.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

                  {/* Node R: Reserve */}
                  <div className="scroller-node">
                    <a href="#reserve" className="scroller-btn" data-section="reserve" aria-label="Reserve a Table">
                      R
                      <span className="tooltip">Reserve</span>
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

              <nav className="drawer-nav-links">
                <a href="#hero" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">01</span> Intro & Welcome
                </a>
                <a href="#philosophy" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">02</span> The Philosophy
                </a>
                <a href="#programming" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">03</span> What’s On (Schedule)
                </a>
                <a href="#menu" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">04</span> Resonance Menu
                </a>
                <a href="#space" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">05</span> The Space & Sound Setup
                </a>
                <a href="#faqs" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
                  <span className="drawer-nav-num">06</span> FAQs & Etiquette
                </a>
                <a href="#reserve" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} style={{color: 'var(--c-orange)'}}>
                  <span className="drawer-nav-num" style={{color: 'var(--c-orange)'}}>07</span> Reserve a Table
                </a>
              </nav>

              <div className="drawer-bottom-info">
                <div className="drawer-info-col">
                  <h4>HOURS</h4>
                  <p>Wed – Sun · 7 PM – Late<br />Listening Sessions: 20:30 Onwards</p>
                </div>
                <div className="drawer-info-col">
                  <h4>LOCATION</h4>
                  <p>{siteConfig.address.street}, {siteConfig.address.locality},<br />{siteConfig.address.region} {siteConfig.address.postal}</p>
                </div>
                <div className="drawer-info-col">
                  <h4>COMMUNITY</h4>
                  <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'underline'}}>Join WhatsApp Group →</a>
                </div>
                <div className="drawer-info-col">
                  <h4>INSTAGRAM</h4>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" style={{color: '#fff'}}>@nami.hifi</a>
                </div>
              </div>
            </div>

        
    </>
  );
}
