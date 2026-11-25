// @ts-nocheck
"use client";

export default function EventListProgramming() {
  return (
    <>
      <section id="programming" className="event-list-section" aria-label="What's On at Nami">
      
            {/* Background Media Wrap with Subtle Parallax */}
            <div className="event-parallax-media-wrap">
              <img src="/assets/Event-bg.avif" alt="Nami Acoustic Space &amp; Vinyl Shelves" className="event-parallax-img" id="eventParallaxImg" />
            </div>
            {/* Atmospheric film overlay */}
            <div className="event-parallax-overlay"></div>
      
            <div className="event-list-header">
              <h2 className="section-heading"><span className="grad-accent">What’s On at</span> Nami</h2>
              <p className="section-body" style={{ marginBottom: '0' }}>
                Curated vinyl archives, selector sessions &amp; Tokyo listening room culture.
              </p>
            </div>
      
            <div className="event-list-table">
      
              {/* EV-1 */}
              <div className="event-list-row" data-poster="/assets/Event-1.avif" role="button" tabindex="0" aria-label="Reserve for Atushi Maeda" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">06/09</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Atushi Maeda: Tokyo Jazz Kissa &amp; Spiritual Vinyl</span>
                </div>
                <span className="event-list-time"><strong>Wed · 20:30</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
              {/* EV-2 */}
              <div className="event-list-row" data-poster="/assets/Event-2.avif" role="button" tabindex="0" aria-label="Reserve for Mogasu" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">12/09</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Mogasu: Japanese Soul Archives &amp; Sake Tasting</span>
                </div>
                <span className="event-list-time"><strong>Thu · 18:00</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
              {/* EV-3 */}
              <div className="event-list-row" data-poster="/assets/Event-3.avif" role="button" tabindex="0" aria-label="Reserve for Yousuke Yukimatsu" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">18/09</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Yousuke Yukimatsu: Avant-Garde Analog Bass</span>
                </div>
                <span className="event-list-time"><strong>Fri · 20:30</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
              {/* EV-4 */}
              <div className="event-list-row" data-poster="/assets/Event-1.avif" role="button" tabindex="0" aria-label="Reserve for Occa" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">24/09</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Occa: Hypnotic Rotary Sound &amp; Deep Minimal</span>
                </div>
                <span className="event-list-time"><strong>Sat · 20:30</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
              {/* EV-5 */}
              <div className="event-list-row" data-poster="/assets/Event-2.avif" role="button" tabindex="0" aria-label="Reserve for Suze Ijo" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">02/10</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Suze Ijo: Afro-Cuban Frequencies &amp; Acid Tube Waves</span>
                </div>
                <span className="event-list-time"><strong>Sun · 19:00</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
              {/* EV-6 */}
              <div className="event-list-row" data-poster="/assets/Event-3.avif" role="button" tabindex="0" aria-label="Reserve for Sunju Hargun" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }}>
                <span className="event-list-date">08/10</span>
                <div className="event-list-info">
                  <span className="event-list-title"><span className="event-list-dot"></span>Sunju Hargun: Bangkok Hi-Fi Night &amp; Deep Waves</span>
                </div>
                <span className="event-list-time"><strong>Wed · 21:00</strong></span>
                <span className="event-list-arrow" aria-hidden="true">→</span>
              </div>
      
            </div>
      
            {/* Bottom Explore More CTA (Rounded Gradient) */}
            <div className="event-list-action">
              <a href="/whats-on" className="btn-event-explore" aria-label="Explore More Sessions">
                <span>Explore More</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
      
          </section>
            <div className="event-poster-preview-wrap" id="eventPosterPreview" aria-hidden="true">
              <img className="event-poster-img" id="eventPosterImg" src="" alt="" />
            </div>
    </>
  );
}
