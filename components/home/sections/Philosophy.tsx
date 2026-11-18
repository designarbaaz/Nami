// @ts-nocheck

export default function Philosophy() {
  return (
    <>
      <section id="philosophy" className="section-philosophy-minimal">
      
            {/* Floating Image Scatter Canvas (8 Strategic Cards Matching Reference Placement) */}
            <div className="phil-scatter-wrap" id="philScatterWrap" aria-hidden="true">
      
              {/* Card 1: Top Center (above headline) - Fast & agile tiny accent */}
              <div className="phil-card phil-card-1" data-speed-y="0.22" data-speed-x="0.08" data-scroll="0.48" style={{top: '11%', left: '49%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-7.jpg" alt="Horn Acoustic Shelves" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 2: Top Left - Heavy slow anchor */}
              <div className="phil-card phil-card-2" data-speed-y="0.14" data-speed-x="0.10" data-scroll="0.15" style={{top: '13%', left: '7%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-2.jpg" alt="Amber Pool Table" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 3: Mid Left (Indented inward) - Moderate-fast small card */}
              <div className="phil-card phil-card-3" data-speed-y="0.20" data-speed-x="0.08" data-scroll="0.38" style={{top: '47%', left: '14%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/gallery-1.jpg" alt="Acoustic Turntables" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 4: Bottom Left - Medium pace card */}
              <div className="phil-card phil-card-4" data-speed-y="0.16" data-speed-x="0.09" data-scroll="0.22" style={{top: '71%', left: '5%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-8.jpg" alt="Glassware & Amber Glow" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 5: Top Right - Slower large anchor */}
              <div className="phil-card phil-card-5" data-speed-y="0.15" data-speed-x="-0.10" data-scroll="0.18" style={{top: '11%', right: '7%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-4.jpg" alt="Nocturnal Lights" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 6: Mid Right (Indented inward) - Fast small card */}
              <div className="phil-card phil-card-6" data-speed-y="0.22" data-speed-x="-0.08" data-scroll="0.42" style={{top: '41%', right: '14%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-3.jpg" alt="Rotary DJ Booth" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 7: Bottom Right - Moderate pace medium-large card */}
              <div className="phil-card phil-card-7" data-speed-y="0.18" data-speed-x="-0.09" data-scroll="0.28" style={{top: '67%', right: '6%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-1.jpg" alt="Listening Room Booths" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
              {/* Card 8: Bottom Center (below copy) - Fastest tiny accent card */}
              <div className="phil-card phil-card-8" data-speed-y="0.24" data-speed-x="0.08" data-scroll="0.52" style={{top: '78%', left: '39%'}}>
                <div className="phil-card-inner">
                  <img src="/assets/spin-gallery-9.jpg" alt="Low-Lit Intimate Lounge" className="phil-card-img" loading="lazy" />
                </div>
              </div>
      
            </div>
      
            {/* Center Editorial Typography Stage (Z-Index 5) */}
            <div className="philosophy-minimal-content">
              <h2 className="philosophy-minimal-title">
                We Don't Host Nights.<br />
                We Compose Them.
              </h2>
      
              <p className="philosophy-minimal-desc">
                It is curious, expressive and slightly unconventional. It does not simply serve food, drinks or music — it creates an environment where these things collide, overlap and influence one another.
              </p>
      
              <a href="#space" className="btn-our-story">OUR STORY</a>
            </div>
          </section>
      
          {/* 3X REPEATING WAVE VIDEO STRAP SEPARATOR (assets/wave-anim.mp4) */}
          <div className="wave-video-strap" data-lazy-video-root aria-hidden="true">
            <div className="wave-strap-grid">
              <div className="wave-strap-item">
                <video className="wave-strap-media" muted loop playsInline disablePictureInPicture preload="none" data-src="/assets/wave-anim.mp4" />
              </div>
              <div className="wave-strap-item">
                <video className="wave-strap-media" muted loop playsInline disablePictureInPicture preload="none" data-src="/assets/wave-anim.mp4" />
              </div>
              <div className="wave-strap-item">
                <video className="wave-strap-media" muted loop playsInline disablePictureInPicture preload="none" data-src="/assets/wave-anim.mp4" />
              </div>
            </div>
            <div className="wave-strap-overlay"></div>
          </div>
    </>
  );
}
