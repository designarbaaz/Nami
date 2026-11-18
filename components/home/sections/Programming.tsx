// @ts-nocheck

export default function Programming() {
  return (
    <>
      <section id="programming" className="event-calendar-section" aria-label="What’s On at Nami">
            {/* Background Media Wrap with Subtle Parallax */}
            <div className="event-parallax-media-wrap">
              <img src="/assets/Event-bg.jpg" alt="Nami Acoustic Space & Vinyl Shelves" className="event-parallax-img" id="eventParallaxImg" />
            </div>
            {/* Atmospheric film overlay */}
            <div className="event-parallax-overlay"></div>
      
            {/* Transparent Calendar Container Over Image */}
            <div className="event-calendar-container">
              {/* Section Heading */}
              <div className="cal-header-block">
                <h2 className="section-heading" style={{margin: 0}}>What’s On at <span className="grad-accent">Nami</span></h2>
              </div>
      
              {/* 7-Column Calendar Grid Wrapper */}
              <div className="cal-grid-scroll-wrap">
                <div className="cal-grid-table">
                  {/* Day of Week Header Row */}
                  <div className="cal-dow-row">
                    <div className="cal-dow-col">MON</div>
                    <div className="cal-dow-col">TUE</div>
                    <div className="cal-dow-col">WED</div>
                    <div className="cal-dow-col">THU</div>
                    <div className="cal-dow-col">FRI</div>
                    <div className="cal-dow-col">SAT</div>
                    <div className="cal-dow-col">SUN</div>
                  </div>
      
                  {/* Calendar Days (35 Blocks: 5 rows x 7 cols) */}
                  <div className="cal-days-grid" id="calDaysGrid">
                    {/* ROW 1: Days 1 to 7 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">1</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">2</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">3</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">4</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">5</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">6</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">7</span></div>
                    </div>
      
                    {/* ROW 2: Days 8 to 14 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">8</span></div>
                    </div>
                    {/* Event Day 9: Atushi Maeda (Column 2) */}
                    <a href="javascript:void(0)" className="cal-cell has-event grad-variant-primary" data-day="9" onClick={(e) => { const event = e; (window as any).openEventPopup?.('9', event) }} aria-label="Feb 9: Atushi Maeda">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">9</span>
                        <span className="cal-badge">440 Hz</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Atushi Maeda</div>
                        <div className="cal-event-meta">20:30 · Ambient & Jazz</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">10</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">11</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">12</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">13</span></div>
                    </div>
                    {/* Event Day 14: Mogasu (Column 7) */}
                    <a href="javascript:void(0)" className="cal-cell has-event grad-variant-resonance" data-day="14" onClick={(e) => { const event = e; (window as any).openEventPopup?.('14', event) }} aria-label="Feb 14: Mogasu">
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
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">15</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">16</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">17</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">18</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">19</span></div>
                    </div>
                    {/* Event Day 20: Yousuke Yukimatsu (Headline - Column 6) */}
                    <a href="javascript:void(0)" className="cal-cell has-event is-headline grad-variant-flare" data-day="20" onClick={(e) => { const event = e; (window as any).openEventPopup?.('20', event) }} aria-label="Feb 20: Yousuke Yukimatsu">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">20</span>
                        <span className="cal-badge badge-headline">3968 Hz Special</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Yousuke Yukimatsu</div>
                        <div className="cal-event-meta">20:30 · Avant-Garde & Bass</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">21</span></div>
                    </div>
      
                    {/* ROW 4: Days 22 to 28 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">22</span></div>
                    </div>
                    {/* Event Day 23: Occa (Column 2) */}
                    <a href="javascript:void(0)" className="cal-cell has-event grad-variant-resonance" data-day="23" onClick={(e) => { const event = e; (window as any).openEventPopup?.('23', event) }} aria-label="Feb 23: Occa">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">23</span>
                        <span className="cal-badge">Resonant</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Occa</div>
                        <div className="cal-event-meta">20:30 · Hypnotic Sound</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">24</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">25</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">26</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">27</span></div>
                    </div>
                    {/* Event Day 28: Suze Ijo (Column 7) */}
                    <a href="javascript:void(0)" className="cal-cell has-event grad-variant-primary" data-day="28" onClick={(e) => { const event = e; (window as any).openEventPopup?.('28', event) }} aria-label="Feb 28: Suze Ijo">
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
                    {/* Event Day 29: Sunju Hargun (Column 1) */}
                    <a href="javascript:void(0)" className="cal-cell has-event grad-variant-flare" data-day="29" onClick={(e) => { const event = e; (window as any).openEventPopup?.('29', event) }} aria-label="Feb 29: Sunju Hargun">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">29</span>
                        <span className="cal-badge">Nocturnal</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Sunju Hargun</div>
                        <div className="cal-event-meta">19:00 · Bangkok Club Set</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">30</span></div>
                    </div>
                    {/* 5 empty cells matching reference layout */}
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
      
                    {/* IN-PLACE COLUMN EXPANDED EVENT POPUP (NO BACKGROUND BLUR) */}
                    <div className="cal-column-popup" id="calColumnPopup" aria-hidden="true">
                      <div className="col-popup-body">
                        <div className="col-popup-media">
                          <img src="/assets/spin-gallery-1.jpg" alt="Event Poster" className="col-popup-img" id="colPopupImg" />
                          {/* Subtle top vignette for contrast over any image */}
                          <div className="col-popup-top-vignette"></div>
                          <div className="col-popup-img-grad"></div>
                          {/* Date & Close Button floating directly over the image (no noisy background) */}
                          <div className="col-popup-header">
                            <span className="col-popup-date" id="colPopupDate">TUE · FEB 09</span>
                            <button type="button" className="col-popup-close" onClick={(e) => { const event = e; (window as any).closeEventPopup?.() }} aria-label="Close event details">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
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
      
                          <button type="button" className="btn-col-popup-book" id="colPopupBookBtn" onClick={(e) => { const event = e; (window as any).bookFromPopup?.() }}>
                            <span>Buy Ticket</span>
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* Mobile scroll swipe hint */}
              <div className="cal-scroll-hint" aria-hidden="true">
                <span>← Swipe to explore full calendar →</span>
              </div>
            </div>
          </section>
    </>
  );
}
