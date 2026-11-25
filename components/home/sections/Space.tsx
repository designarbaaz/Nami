// @ts-nocheck
"use client";

export default function Space() {
  return (
    <>
      <section id="space" className="space-section">
            <div className="space-header-row">
              <h2 className="section-heading">Our <span className="grad-accent">Space</span></h2>
              <p className="section-body" style={{ marginBottom: '0' }}>
                An intimate sanctuary where sound, flavour and nocturnal culture collide on their own frequency.
              </p>
            </div>
      
            <div className="space-fine-rule"></div>
      
            {/* Edge-to-Edge 3-Column Photography Grid (Spin Bar Reference) */}
            <div className="spin-gallery-fullbleed">
              <div className="spin-gallery-grid">
                {/* Row 1 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-1.avif" alt="Listening Room & Bar Tables" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-2.avif" alt="Warm Amber Pool Table & Cue" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-3.avif" alt="Rotary DJ Booth & Vinyl Wall" className="spin-gallery-img" loading="lazy" />
                </div>
      
                {/* Row 2 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-4.avif" alt="Nocturnal Disco Ball & Beams" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-5.avif" alt="Vinyl Artwork & Sconce Illumination" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-6.avif" alt="Culinary Small Plates & Dining" className="spin-gallery-img" loading="lazy" />
                </div>
      
                {/* Row 3 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-7.avif" alt="Sound-Mapped Cocktails on Counter" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-8.avif" alt="Listening Room Corner & Horn Acoustics" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-9.avif" alt="Private Lounge Seating & Vinyl Vault" className="spin-gallery-img" loading="lazy" />
                </div>
              </div>
            </div>
          </section>
    </>
  );
}
