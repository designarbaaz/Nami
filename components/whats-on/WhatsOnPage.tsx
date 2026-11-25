// @ts-nocheck
"use client";

export default function WhatsOnPage() {
  return (
    <>
      <main className="page-wrap">
      
          {/* =========================================================
               01. WHAT’S ON AT NAMI (Consistent with index-2.html)
               ========================================================= */}
          <section id="programming" className="event-list-section" aria-label="What's On at Nami">
      
            {/* Background Media Wrap with Subtle Parallax & Darkness Filter */}
            <div className="event-parallax-media-wrap">
              <img src="/assets/Event-bg.avif" alt="Nami Acoustic Space &amp; Vinyl Shelves" className="event-parallax-img" id="eventParallaxImg" />
            </div>
            <div className="event-parallax-overlay"></div>
      
            {/* Centered Header */}
            <header className="event-list-header">
              <nav className="header-breadcrumb" aria-label="Breadcrumb">
                <a href="/" className="breadcrumb-link">HOME</a>
                <span className="breadcrumb-sep">/</span>
                <span className="breadcrumb-active">WHAT’S ON</span>
              </nav>
              <h1 className="event-list-title"><span className="text-gradient">What’s On at</span> Nami</h1>
              <p className="event-list-subhead">Curated vinyl archives, selector sessions &amp; Tokyo listening room culture.</p>
            </header>
      
            {/* Full-Width Edge-to-Edge Event Schedule Table */}
            <div className="event-list-table">
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-1.avif" aria-label="Atushi Maeda: Tokyo Jazz Kissa &amp; Spiritual Vinyl on 06/09">
                <span className="event-row-date">06/09</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Atushi Maeda: Tokyo Jazz Kissa &amp; Spiritual Vinyl</h2>
                </div>
                <span className="event-row-time">Wed · 20:30</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-2.avif" aria-label="Mogasu: Japanese Soul Archives &amp; Sake Tasting on 12/09">
                <span className="event-row-date">12/09</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Mogasu: Japanese Soul Archives &amp; Sake Tasting</h2>
                </div>
                <span className="event-row-time">Thu · 18:00</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-3.avif" aria-label="Yousuke Yukimatsu: Avant-Garde Analog Bass on 18/09">
                <span className="event-row-date">18/09</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Yousuke Yukimatsu: Avant-Garde Analog Bass</h2>
                </div>
                <span className="event-row-time">Fri · 20:30</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-1.avif" aria-label="Occa: Hypnotic Rotary Sound &amp; Deep Minimal on 24/09">
                <span className="event-row-date">24/09</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Occa: Hypnotic Rotary Sound &amp; Deep Minimal</h2>
                </div>
                <span className="event-row-time">Sat · 20:30</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-2.avif" aria-label="Suze Ijo: Afro-Cuban Frequencies &amp; Acid Tube Waves on 02/10">
                <span className="event-row-date">02/10</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Suze Ijo: Afro-Cuban Frequencies &amp; Acid Tube Waves</h2>
                </div>
                <span className="event-row-time">Sun · 19:00</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
              <a href="javascript:void(0)" className="event-list-row" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} data-poster="/assets/Event-3.avif" aria-label="Sunju Hargun: Bangkok Hi-Fi Night &amp; Deep Waves on 08/10">
                <span className="event-row-date">08/10</span>
                <div className="event-row-center">
                  <span className="event-status-dot"></span>
                  <h2 className="event-row-title">Sunju Hargun: Bangkok Hi-Fi Night &amp; Deep Waves</h2>
                </div>
                <span className="event-row-time">Wed · 21:00</span>
                <span className="event-row-btn" aria-hidden="true">→</span>
              </a>
      
            </div>
      
          </section>
      
          {/* =========================================================
               02. PREVIOUS EVENTS SECTION
               - 3 Previous Events in large open-box format
               - B&W Poster image, event title, date & time
               - No border, no border-radius, no shadow
               ========================================================= */}
          <section className="previous-events-section" id="previous-events" aria-label="Previous Events at Nami">
            <div className="previous-events-container">
      
              <header className="previous-events-header">
                <h2 className="previous-events-heading">
                  <span className="grad-text">Previous</span> Events
                </h2>
              </header>
      
              <div className="prev-events-grid">
      
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
      
              </div>
            </div>
          </section>
      
        </main>

      <div className="event-poster-preview-wrap" id="eventPosterPreview" aria-hidden="true">
        <img className="event-poster-img" id="eventPosterImg" src="" alt="" />
      </div>
    </>
  );
}
