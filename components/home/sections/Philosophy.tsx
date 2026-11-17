// @ts-nocheck

export default function Philosophy() {
  return (
    <>
      <section id="philosophy" className="section-philosophy-minimal">
        <div className="philosophy-minimal-content">
          <h2 className="philosophy-minimal-title">
            We Don't Host Nights.
            <br />
            We Compose Them.
          </h2>
          <p className="philosophy-minimal-desc">
            It is curious, expressive and slightly unconventional. It does not
            simply serve food, drinks or music — it creates an environment where
            these things collide, overlap and influence one another.
          </p>
          <a href="#space" className="btn-our-story">
            OUR STORY
          </a>
        </div>
      </section>

      {/* Wave strap — one source, three panels; loads only when near viewport */}
      <div className="wave-video-strap" aria-hidden="true" data-lazy-video-root>
        <div className="wave-strap-grid">
          <div className="wave-strap-item">
            <video
              className="wave-strap-media"
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="none"
              data-src="/assets/wave-anim.mp4"
            />
          </div>
          <div className="wave-strap-item">
            <video
              className="wave-strap-media"
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="none"
              data-src="/assets/wave-anim.mp4"
            />
          </div>
          <div className="wave-strap-item">
            <video
              className="wave-strap-media"
              muted
              loop
              playsInline
              disablePictureInPicture
              preload="none"
              data-src="/assets/wave-anim.mp4"
            />
          </div>
        </div>
        <div className="wave-strap-overlay"></div>
      </div>
    </>
  );
}
