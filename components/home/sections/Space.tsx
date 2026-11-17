// @ts-nocheck

export default function Space() {
  return (
    <section id="space" className="space-section">
                <div className="space-header-row">
                  <div className="space-header-left">
                    <div className="section-eyebrow">The Space & Sound</div>
                    <h2 className="section-heading">Architectural <span className="grad-accent">Intimacy</span></h2>
                    <p className="section-body" style={{marginBottom: 0}}>
                      An intimate sanctuary where sound, flavour and nocturnal culture collide on their own frequency.
                    </p>
                  </div>
                  <div className="space-header-right">
                    <p className="space-header-quote">
                      "Expect thoughtful selections, easy rhythms and the occasional shift up in tempo, with DJs given the freedom to play the records they don’t always get to play elsewhere."
                    </p>
                  </div>
                </div>

                <div className="space-fine-rule"></div>

                {/* Edge-to-Edge 3-Column Photography Grid (Spin Bar Reference) */}
                <div className="spin-gallery-fullbleed">
                  <div className="spin-gallery-grid">
                    {/* Row 1 */}
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-1.jpg" alt="Listening Room & Bar Tables" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-2.jpg" alt="Warm Amber Pool Table & Cue" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-3.jpg" alt="Rotary DJ Booth & Vinyl Wall" className="spin-gallery-img" loading="lazy" />
                    </div>

                    {/* Row 2 */}
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-4.jpg" alt="Nocturnal Disco Ball & Beams" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-5.jpg" alt="Vinyl Artwork & Sconce Illumination" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-6.jpg" alt="Culinary Small Plates & Dining" className="spin-gallery-img" loading="lazy" />
                    </div>

                    {/* Row 3 */}
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-7.jpg" alt="Sound-Mapped Cocktails on Counter" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-8.jpg" alt="Listening Room Corner & Horn Acoustics" className="spin-gallery-img" loading="lazy" />
                    </div>
                    <div className="spin-gallery-cell">
                      <img src="/assets/spin-gallery-9.jpg" alt="Private Lounge Seating & Vinyl Vault" className="spin-gallery-img" loading="lazy" />
                    </div>
                  </div>
                </div>

                {/* Acoustic Specs Integration */}
                <div className="space-specs-strip">
                  <div>
                    <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-orange)', marginBottom: '0.35rem', textTransform: 'uppercase'}}>
                      ACOUSTIC SPECIFICATION
                    </div>
                    <div className="space-specs-title">The Sound System</div>
                  </div>
                  <div className="space-specs-desc">
                    Two custom 15-inch horn-loaded bass enclosures, wooden mid-horns, and compression drivers powered by Class-A tube amplification. Rotary DJ mixer with pure analog signal path.
                  </div>
                </div>
              </section>
  );
}
