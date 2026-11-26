// @ts-nocheck
"use client";

export default function WhatsOnPage() {
  return (
    <>
      <main className="page-wrap">
      
          {/* =========================================================
               01. WHAT’S ON MONTHLY CALENDAR (Similar to /)
               ========================================================= */}
          <section id="programming" className="event-calendar-section" aria-label="What’s On at Nami">
      
            <div className="event-parallax-media-wrap">
              <img src="/assets/Event-bg.avif" alt="Nami Acoustic Space &amp; Vinyl Shelves" className="event-parallax-img" id="eventParallaxImg" />
            </div>
            <div className="event-parallax-overlay"></div>
      
            <div className="event-calendar-container">
              <header className="cal-header-block">
                <nav className="header-breadcrumb" aria-label="Breadcrumb">
                  <a href="/" className="breadcrumb-link">HOME</a>
                  <span className="breadcrumb-sep">/</span>
                  <span className="breadcrumb-active">WHAT’S ON</span>
                </nav>
                <h1 className="event-list-title"><span className="text-gradient">What’s On at</span> Nami</h1>
                <p className="event-list-subhead">Curated vinyl archives, selector sessions &amp; Tokyo listening room culture.</p>
              </header>
      
              <h2 className="cal-month-heading">December 2026</h2>
      
              <div className="cal-grid-scroll-wrap">
                <div className="cal-grid-table">
                  <div className="cal-dow-row">
                    <div className="cal-dow-col">MON</div>
                    <div className="cal-dow-col">TUE</div>
                    <div className="cal-dow-col">WED</div>
                    <div className="cal-dow-col">THU</div>
                    <div className="cal-dow-col">FRI</div>
                    <div className="cal-dow-col">SAT</div>
                    <div className="cal-dow-col">SUN</div>
                  </div>
      
                  <div className="cal-days-grid" id="calDaysGrid">
                    {/* ROW 1: Days 1 to 7 */}
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">1</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">2</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">3</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">4</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">5</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">6</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">7</span></div></div>
      
                    {/* ROW 2: Days 8 to 14 */}
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">8</span></div></div>
                    <a href="#" className="cal-cell has-event grad-variant-primary" data-day="9" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('9', e) }} aria-label="Dec 9: Atushi Maeda">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">9</span>
                        <span className="cal-badge">440 Hz</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Atushi Maeda</div>
                        <div className="cal-event-meta">20:30 · Ambient &amp; Jazz</div>
                      </div>
                    </a>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">10</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">11</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">12</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">13</span></div></div>
                    <a href="#" className="cal-cell has-event grad-variant-resonance" data-day="14" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('14', e) }} aria-label="Dec 14: Mogasu">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">14</span>
                        <span className="cal-badge">Warm Freq</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Mogasu</div>
                        <div className="cal-event-meta">18:00 · Vinyl Soul</div>
                      </div>
                    </a>
      
                    {/* ROW 3: Days 15 to 21 */}
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">15</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">16</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">17</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">18</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">19</span></div></div>
                    <a href="#" className="cal-cell has-event is-headline grad-variant-flare" data-day="20" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('20', e) }} aria-label="Dec 20: Yousuke Yukimatsu">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">20</span>
                        <span className="cal-badge badge-headline">3968 Hz Special</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Yousuke Yukimatsu</div>
                        <div className="cal-event-meta">20:30 · Avant-Garde &amp; Bass</div>
                      </div>
                    </a>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">21</span></div></div>
      
                    {/* ROW 4: Days 22 to 28 */}
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">22</span></div></div>
                    <a href="#" className="cal-cell has-event grad-variant-resonance" data-day="23" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('23', e) }} aria-label="Dec 23: Occa">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">23</span>
                        <span className="cal-badge">Resonant</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Occa</div>
                        <div className="cal-event-meta">20:30 · Hypnotic Sound</div>
                      </div>
                    </a>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">24</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">25</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">26</span></div></div>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">27</span></div></div>
                    <a href="#" className="cal-cell has-event grad-variant-primary" data-day="28" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('28', e) }} aria-label="Dec 28: Suze Ijo">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">28</span>
                        <span className="cal-badge">Electric</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Suze Ijo</div>
                        <div className="cal-event-meta">19:00 · Afro-Cuban Beats</div>
                      </div>
                    </a>
      
                    {/* ROW 5: Days 29 to 30 + 5 empty cells */}
                    <a href="#" className="cal-cell has-event grad-variant-flare" data-day="29" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('29', e) }} aria-label="Dec 29: Sunju Hargun">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">29</span>
                        <span className="cal-badge">Nocturnal</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Sunju Hargun</div>
                        <div className="cal-event-meta">19:00 · Bangkok Club Set</div>
                      </div>
                    </a>
                    <div className="cal-cell"><div className="cal-cell-top"><span className="cal-cell-num">30</span></div></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
      
                    {/* In-Place Expanded Event Popup Card */}
                    <div className="cal-column-popup" id="calColumnPopup" aria-hidden="true">
                      <div className="col-popup-body">
                        <div className="col-popup-media">
                          <img src="/assets/nami-turntable-hands.avif" alt="Event Poster" className="col-popup-img" id="colPopupImg" />
                          <div className="col-popup-top-vignette"></div>
                          <div className="col-popup-img-grad"></div>
                          <div className="col-popup-header">
                            <span className="col-popup-date" id="colPopupDate">TUE · DEC 09</span>
                            <button type="button" className="col-popup-close" onClick={(e) => { const event = e; closeEventPopup() }} aria-label="Close event details">
                              <img src="/assets/close.svg" alt="Close" width="14" height="14" style={{ display: 'block', pointerEvents: 'none' }} />
                            </button>
                          </div>
                        </div>
      
                        <div className="col-popup-info">
                          <div className="col-popup-badge-wrap">
                            <span className="col-popup-hz" id="colPopupHz">440 Hz Root</span>
                          </div>
                          <h4 className="col-popup-title" id="colPopupTitle">Atushi Maeda</h4>
                          <div className="col-popup-genre" id="colPopupGenre">Japanese Ambient · Spiritual Jazz · 20:30 (Doors 19:00)</div>
                          <p className="col-popup-desc" id="colPopupDesc">
                            Tokyo selector Atushi Maeda spins rare Japanese spiritual jazz, intimate environmental ambient, and early experimental Japanese synth pressings exclusively through our custom horn-loaded acoustic system.
                          </p>
                          <button type="button" className="btn-col-popup-book" id="colPopupBookBtn" onClick={(e) => { const event = e; bookFromPopup(event) }}>
                            <span>Reserve Spot</span>
                            <img src="/assets/Arrow-right.svg" alt="" aria-hidden="true" width="18" height="18" style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'brightness(0) invert(1)' }} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      
              <div className="cal-scroll-hint" aria-hidden="true">
                <span>← Swipe to explore full calendar →</span>
              </div>
            </div>
      
          </section>
      
          {/* =========================================================
               02. PREVIOUS EVENTS CAROUSEL
               - Aligned with calendar 1180px width, centered heading, left/right arrows
               - Open-box format (NO border, border-radius, or shadow)
               ========================================================= */}
          <section className="previous-events-section" id="previous-events" aria-label="Previous Events at Nami">
            <div className="previous-events-container">
      
              <header className="previous-events-header">
                <h2 className="previous-events-heading">
                  <span className="grad-text">Previous</span> Events
                </h2>
              </header>
      
              <div className="prev-carousel-stage">
                <button type="button" className="prev-nav-arrow prev" id="prevCarouselPrev" aria-label="Previous events">
                  <img src="/assets/Arrow-left.svg" alt="Previous" width="22" height="22" className="nav-arrow-img" />
                </button>
      
                <button type="button" className="prev-nav-arrow next" id="prevCarouselNext" aria-label="Next events">
                  <img src="/assets/Arrow-right.svg" alt="Next" width="22" height="22" className="nav-arrow-img" />
                </button>
      
                <div className="prev-events-carousel-viewport" id="prevEventsViewport">
                  <div className="prev-events-track" id="prevEventsTrack">
      
                    {/* Previous Event 1 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/Event-1.avif" alt="Roycin: After Dark" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Roycin: After Dark — Analog Frequency Session</h3>
                      <p className="prev-event-datetime">20 Nov 2026 · 21:00</p>
                    </article>
      
                    {/* Previous Event 2 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/Event-4.avif" alt="Hamza Rahimtula: After Hours" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Hamza Rahimtula: After Hours — Indo-Acid Rotary Hi-Fi</h3>
                      <p className="prev-event-datetime">14 Nov 2026 · 21:00</p>
                    </article>
      
                    {/* Previous Event 3 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/Event-3.avif" alt="Sindhi Curry: After Hours" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Sindhi Curry: After Hours — Tokyo Vinyl Archive</h3>
                      <p className="prev-event-datetime">07 Nov 2026 · 21:00</p>
                    </article>
      
                    {/* Previous Event 4 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/Event-2.avif" alt="Kohra: Subterranean Harmonics" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Kohra: Subterranean Harmonics &amp; Vinyl Ritual</h3>
                      <p className="prev-event-datetime">31 Oct 2026 · 21:00</p>
                    </article>
      
                    {/* Previous Event 5 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/nami-dj-bar.avif" alt="Zokhuma: Analog Jazz Kissa" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Zokhuma: Analog Jazz Kissa &amp; Deep Disco</h3>
                      <p className="prev-event-datetime">24 Oct 2026 · 20:30</p>
                    </article>
      
                    {/* Previous Event 6 */}
                    <article className="prev-event-card">
                      <div className="prev-event-poster">
                        <img src="/assets/nami-guest-table.avif" alt="Priyanjana: Late Night Turntable Sessions" className="prev-event-poster-img" loading="lazy" />
                      </div>
                      <h3 className="prev-event-title">Priyanjana: Late Night Turntable Sessions</h3>
                      <p className="prev-event-datetime">17 Oct 2026 · 21:00</p>
                    </article>
      
                  </div>
                </div>
              </div>
            </div>
          </section>
      
          {/* =========================================================
               03. BOOK YOUR PRIVATE SPACE (CENTERED, ZERO MARGIN ABOVE FOOTER)
               ========================================================= */}
          <section className="private-space-banner" id="private-events" aria-label="Book Your Private Space at Nami">
            <img src="/assets/nami-bar-room.avif" alt="Nami Listening Bar &amp; Acoustic Room for Private Events" className="private-space-bg" loading="lazy" />
            <div className="private-space-overlay" aria-hidden="true"></div>
      
            <div className="private-space-inner">
              <p className="private-space-desc">
                Host an intimate celebration, vinyl listening session, or full-venue buyout crafted around our custom 440Hz sound system, Japanese robata dining, and bespoke cocktail menus in Bandra West.
              </p>
              <a href="#contactModal" className="btn-private-cta" onClick={(e) => { const event = e; (window as any).openContactModal?.(event) }}>
                <span>Inquire For Private Booking</span>
                <span>→</span>
              </a>
            </div>
          </section>
      
        </main>
    </>
  );
}
