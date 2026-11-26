// @ts-nocheck
"use client";

export default function ConceptPage() {
  return (
    <>
      <main id="mainContent">
      
          {/* 1. HERO FOLD (CENTER ALIGNED + WAVE STRAP) */}
          <section className="concept-hero-fold">
            <div className="concept-hero-content">
              <nav className="concept-breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span className="crumb-sep">/</span>
                <span className="crumb-curr">Concept</span>
              </nav>
      
              <h1 className="concept-hero-title">
                A Sensory <span className="text-gradient">Provocateur</span>
              </h1>
      
              <p className="concept-hero-desc">
                Part listening room, part bar, part dining experience, part cultural gathering.
                Nami exists on its own acoustic and culinary frequency in Bandra&nbsp;West, Mumbai
                — where analog sound, Japanese robata gastronomy, and nocturnal hospitality&nbsp;converge.
              </p>
            </div>
      
            {/* 3X REPEATING WAVE VIDEO STRAP SEPARATOR (Exact Match to Homepage) */}
            <div className="wave-video-strap" aria-hidden="true">
              <div className="wave-strap-grid">
                <div className="wave-strap-item">
                  <video className="wave-strap-media" autoPlay muted loop playsInline playsInline disablePictureInPicture preload="auto">
                    <source src="/assets/wave-anim.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="wave-strap-item">
                  <video className="wave-strap-media" autoPlay muted loop playsInline playsInline disablePictureInPicture preload="auto">
                    <source src="/assets/wave-anim.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="wave-strap-item">
                  <video className="wave-strap-media" autoPlay muted loop playsInline playsInline disablePictureInPicture preload="auto">
                    <source src="/assets/wave-anim.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="wave-strap-overlay"></div>
            </div>
          </section>
      
          {/* 2. SIX BRAND PILLARS (PINNED HORIZONTAL SCROLL)
               - 2.5 cards visible in first view
               - Enlarged images
               - Zero borders on images
               - Number font weight 100
               - No "SCROLL TO DISCOVER" / No "FOUNDATIONS"
               ========================================================= */}
          <section className="pillars-pinned-container" id="pillarsPinnedContainer">
            <div className="pillars-sticky-viewport" id="pillarsStickyViewport">
              {/* Pinned Top Header (Minimal: Title Only) */}
              <div className="pillars-top-bar">
                <div className="pillars-section-meta">
                  <h2 className="pillars-section-title">Six Brand <span className="text-gradient">Pillars</span></h2>
                </div>
              </div>
      
              {/* Horizontal Track Window */}
              <div className="pillars-track-window">
                <div className="pillars-horizontal-track" id="pillarsTrack">
      
                  {/* 01. CURIOUS (Stagger High) */}
                  <article className="pillar-col-card stagger-high">
                    <span className="pillar-editorial-num">01</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/nami-erykah-vinyl.avif" alt="Pillar 01: Curious" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Curious</h3>
                      <span className="pillar-editorial-tagline">Curious, not conventional</span>
                      <p className="pillar-editorial-body">
                        Nami is always exploring. We look for unexpected combinations in sound, flavour, people, imagery, and experience — fascinated by what happens when seemingly distinct creative worlds meet.
                      </p>
                    </div>
                  </article>
      
                  {/* 02. SENSUAL (Stagger Low) */}
                  <article className="pillar-col-card stagger-low">
                    <span className="pillar-editorial-num">02</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/nami-coupe-cocktail.avif" alt="Pillar 02: Sensual" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Sensual</h3>
                      <span className="pillar-editorial-tagline">Sensual, not seductive</span>
                      <p className="pillar-editorial-body">
                        Nami communicates through the senses. Texture, colour, sound, taste, light, and movement are equally essential. A tactile world you experience deeply rather than simply observe.
                      </p>
                    </div>
                  </article>
      
                  {/* 03. ELECTRIC (Stagger High) */}
                  <article className="pillar-col-card stagger-high">
                    <span className="pillar-editorial-num">03</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/nami-turntable-hands.avif" alt="Pillar 03: Electric" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Electric</h3>
                      <span className="pillar-editorial-tagline">Electric, not chaotic</span>
                      <p className="pillar-editorial-body">
                        An underlying pulse animates Nami after dark. Warm analog waveforms, rotary frequencies, and artist selector programming cultivate a living, dynamic nocturnal momentum.
                      </p>
                    </div>
                  </article>
      
                  {/* 04. SOPHISTICATED (Stagger Low) */}
                  <article className="pillar-col-card stagger-low">
                    <span className="pillar-editorial-num">04</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/nami-carafe-pour.avif" alt="Pillar 04: Sophisticated" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Sophisticated</h3>
                      <span className="pillar-editorial-tagline">Sophisticated, not precious</span>
                      <p className="pillar-editorial-body">
                        There is meticulous craft behind every experimentation. Considered robata cooking, architectural acoustic dampening, and refined minimalism that understands quality without needing to proclaim it.
                      </p>
                    </div>
                  </article>
      
                  {/* 05. PLAYFUL (Stagger High) */}
                  <article className="pillar-col-card stagger-high">
                    <span className="pillar-editorial-num">05</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/Event-bg1.avif" alt="Pillar 05: Playful" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Playful</h3>
                      <span className="pillar-editorial-tagline">Playful, not childish</span>
                      <p className="pillar-editorial-body">
                        We don’t take ourselves too seriously. Unexpected flavor harmonies, surreal audio flourishes, and playful acoustic nods give Nami an enduring sense of lightness and discovery.
                      </p>
                    </div>
                  </article>
      
                  {/* 06. INCLUSIVE (Stagger Low) */}
                  <article className="pillar-col-card stagger-low">
                    <span className="pillar-editorial-num">06</span>
                    <div className="pillar-editorial-frame reveal-on-scroll">
                      <img src="/assets/nami-evening-crowd.avif" alt="Pillar 06: Inclusive" className="pillar-editorial-img" loading="lazy" />
                    </div>
                    <div className="pillar-editorial-info">
                      <h3 className="pillar-editorial-name">Inclusive</h3>
                      <span className="pillar-editorial-tagline">Exclusive taste, inclusive spirit</span>
                      <p className="pillar-editorial-body">
                        At our core, Nami is built around community. Selectors, diners, artists, and nocturnal wanderers are not merely patrons; they actively become part of our shared cultural frequency.
                      </p>
                    </div>
                  </article>
      
                </div>
              </div>
            </div>
          </section>
      
          {/* 3. WHAT WE SERVE (FULL-BLEED EDGE-TO-EDGE IMAGES)
               - NO TAGS, NO HAIRLINE TEXTS, NO CTAS
               ========================================================= */}
          <section className="fullbleed-features-section" aria-label="Our Sounds">
      
            <header className="sounds-section-header">
              <h2 className="sounds-section-heading">Our <span className="text-gradient">Sounds</span></h2>
              <p className="sounds-section-subhead">Precision analog acoustics, bespoke wooden horn loudspeakers, and deep Tokyo listening room heritage.</p>
            </header>
      
            {/* Our Sounds: Left Horizontal Image Carousel + Right Editorial Copy */}
            <div className="feature-edge-row image-left">
              <div className="feature-edge-media">
                <div className="sound-carousel" id="soundCarousel" tabIndex={0} aria-roledescription="carousel" aria-label="Our Sounds Gallery">
                  <div className="sound-carousel-viewport" id="soundCarouselViewport">
                    <button type="button" className="sound-carousel-arrow prev" id="soundCarouselPrev" aria-label="Previous sound photo">
                      <img src="/assets/Arrow-left.svg" alt="" width="20" height="20" />
                    </button>
                    <div className="sound-carousel-track" id="soundCarouselTrack">
                      <div className="sound-carousel-slide">
                        <img src="/assets/nami-horn-speaker.avif" alt="Custom wooden horn loudspeakers at Nami" loading="eager" />
                      </div>
                      <div className="sound-carousel-slide">
                        <img src="/assets/nami-resor-mixer.avif" alt="Precision rotary mixer and analog tube controls" loading="lazy" />
                      </div>
                      <div className="sound-carousel-slide">
                        <img src="/assets/nami-turntable-hands.avif" alt="Selector cueing vinyl records on analog turntable" loading="lazy" />
                      </div>
                      <div className="sound-carousel-slide">
                        <img src="/assets/nami-selector-booth.avif" alt="Tokyo kissaten-inspired selector booth at Nami" style={{ objectPosition: 'center 24%' }} loading="lazy" />
                      </div>
                    </div>
                    <button type="button" className="sound-carousel-arrow next" id="soundCarouselNext" aria-label="Next sound photo">
                      <img src="/assets/Arrow-right.svg" alt="" width="20" height="20" />
                    </button>
                  </div>
                  <div className="sound-carousel-dots" id="soundCarouselDots" role="tablist" aria-label="Sound photos pagination">
                    <button type="button" className="sound-carousel-dot active" data-slide="0" aria-label="Slide 1" aria-selected="true"></button>
                    <button type="button" className="sound-carousel-dot" data-slide="1" aria-label="Slide 2" aria-selected="false"></button>
                    <button type="button" className="sound-carousel-dot" data-slide="2" aria-label="Slide 3" aria-selected="false"></button>
                    <button type="button" className="sound-carousel-dot" data-slide="3" aria-label="Slide 4" aria-selected="false"></button>
                  </div>
                </div>
              </div>
              <div className="feature-edge-content">
                <h3 className="feature-edge-title">440Hz Rotary Sound &amp; Tokyo Archives</h3>
                <p className="feature-edge-desc">
                  Engineered around custom wooden horn loudspeakers, precision rotary mixers, and discrete analog vacuum tube amplification. Our sessions take inspiration from Tokyo’s legendary jazz kissaten culture — where music is played with devotion, fidelity, and unhurried nuance.
                </p>
              </div>
            </div>
      
          </section>
      
          {/* 4. CLOSING RESERVATION CTA (VIEW PROGRAMMING REMOVED) */}
          <section className="concept-closing-cta">
            <h2 className="closing-title">Enter The Frequency</h2>
            <p className="closing-desc">
              Reservations are recommended for listening counter sessions and robata dining.
              Walk-ins welcomed for late-night vinyl sessions and highballs.
            </p>
            <div className="closing-actions">
              <button type="button" className="btn-cta-primary" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} aria-label="Make a Reservation">
                <span>Reservation</span>
                <span className="reserve-cta-divider" aria-hidden="true"></span>
                <img src="/assets/Eat_App_Logo.webp" alt="Eat App" className="reserve-eat-logo" />
              </button>
            </div>
          </section>
      
          {/* 5. BESPOKE CUSTOM TYPOGRAPHY SPECIMEN SECTION */}
          <section className="concept-font-section" id="brand-font" aria-label="Bespoke Custom Font Specimen">
            <div className="font-section-container">
              {/* Section Header */}
              <div className="font-section-header">
                <h2 className="font-section-title">The Nami <span className="text-gradient">Waveform Typeface</span></h2>
                <p className="font-section-desc">
                  Each letterform is sculpted from analog sound waves, harmonic oscillations, and Japanese wave geometries — applied across social media, campaign advertising, spatial wayfinding, and printed menus.
                </p>
              </div>
      
              {/* Specimen View controls (Lowercase vs Uppercase) */}
              <div className="font-controls-bar">
                <div className="font-toggle-group" role="tablist" aria-label="Character set selection">
                  <button type="button" className="font-toggle-btn active" id="btnSpecimenSmall" role="tab" aria-selected="true" aria-controls="panelSpecimenSmall" onClick={(e) => { const event = e; (window as any).switchSpecimen?.('small') }}>
                    <span>Lowercase</span>
                  </button>
                  <button type="button" className="font-toggle-btn" id="btnSpecimenBig" role="tab" aria-selected="false" aria-controls="panelSpecimenBig" onClick={(e) => { const event = e; (window as any).switchSpecimen?.('big') }}>
                    <span>Uppercase</span>
                  </button>
                </div>
              </div>
      
              {/* Specimen Grid Display Canvas (Hairline Grid from SVG) */}
              <div className="font-specimen-card reveal-on-scroll">
                <div className="font-specimen-scroll" id="fontSpecimenScroll">
                  <div className="font-specimen-pane active" id="panelSpecimenSmall" role="tabpanel" aria-labelledby="btnSpecimenSmall">
                    <img src="/assets/Small-letters.svg" alt="Nami Custom Typeface — Lowercase Character Set" className="font-specimen-img" loading="lazy" />
                  </div>
                  <div className="font-specimen-pane" id="panelSpecimenBig" role="tabpanel" aria-labelledby="btnSpecimenBig">
                    <img src="/assets/Big-letters.svg" alt="Nami Custom Typeface — Uppercase Character Set" className="font-specimen-img" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </section>
      
        </main>
    </>
  );
}
