// @ts-nocheck
"use client";

export default function Philosophy() {
  return (
    <>
      <section id="philosophy" className="section-philosophy-minimal">
      
            {/* Floating Image Scatter Canvas (8 Strategic Cards Matching Reference Placement) */}
            <div className="phil-scatter-wrap" id="philScatterWrap" aria-hidden="true">
      
              {/* Card 1: Top Left - Analog Rotary Mixer */}
              <div className="phil-card phil-card-1" data-scroll="0.18" style={{ top: '12%', left: '6%' }}>
                <div className="phil-card-inner">
                  <img src="/assets/nami-resor-mixer.avif" alt="Analog Rotary Mixer VU Meter" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 2: Bottom Left - Cocktail & Red Horn Speaker */}
              <div className="phil-card phil-card-2" data-scroll="0.30" style={{ top: '59%', left: '14%' }}>
                <div className="phil-card-inner">
                  <img src="/assets/nami-negroni-horn.avif" alt="Cocktail &amp; Acoustic Horn" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 3: Top Right - Vinyl Selector at Console */}
              <div className="phil-card phil-card-3" data-scroll="0.22" style={{ top: '10%', right: '7%' }}>
                <div className="phil-card-inner">
                  <img src="/assets/nami-selector-booth.avif" alt="Vinyl Selector at Rotary Console" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 4: Bottom Right - Candlelit Table & Highballs */}
              <div className="phil-card phil-card-4" data-scroll="0.34" style={{ top: '64%', right: '20%' }}>
                <div className="phil-card-inner">
                  <img src="/assets/nami-guest-table.avif" alt="Nocturnal Dining &amp; Highballs" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
            </div>
      
            {/* Center Editorial Typography Stage (Z-Index 5) */}
            <div className="philosophy-minimal-content">
              <h2 className="philosophy-minimal-title">
                We Don't Host Nights.<br />
                <span className="grad-accent">We Compose</span> Them.
              </h2>
      
              <p className="philosophy-minimal-desc">
                It is curious, expressive and slightly unconventional. It does not simply serve food, drinks or music — it creates an environment where these things collide, overlap and influence one another.
              </p>
      
              <a href="/concept" className="btn-our-story">OUR STORY</a>
            </div>
          </section>
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
    </>
  );
}
