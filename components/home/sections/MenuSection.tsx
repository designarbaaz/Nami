// @ts-nocheck

export default function MenuSection() {
  return (
    <>
      <section id="menu" className="section-block menu-editorial-scroll-track" aria-label="The Resonance Menu">
            
            {/* Sticky Viewport Stage (pins in view as you scroll through the 280vh track) */}
            <div className="menu-sticky-stage">
      
              {/* LEFT HALF: 50% Width Dark Nocturnal Editorial Canvas */}
              <div className="menu-panel-editorial" id="menuPanelEditorial">
      
                {/* Phase 0: Food Content */}
                <div className="menu-editorial-slide active" data-phase="0">
                  <div className="menu-ed-top">
                    <h3 className="menu-ed-title">food</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Food.png" alt="Hamachi Truffle Crudo & Robata Wagyu" className="menu-ed-img" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <h4 className="menu-ed-item-name">Truffle Hamachi & Robata Wagyu</h4>
                    <p className="menu-ed-item-desc">Charred binchotan skewers, sashimi dressed with aged ponzu, and umami-rich shared plates.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('food') }}>
                      VIEW FULL MENU →
                    </button>
                  </div>
                </div>
      
                {/* Phase 1: Cocktails Content */}
                <div className="menu-editorial-slide" data-phase="1">
                  <div className="menu-ed-top">
                    <h3 className="menu-ed-title">cocktails</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Cocktail.png" alt="440Hz Clarified Milk Punch" className="menu-ed-img" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <h4 className="menu-ed-item-name">440Hz Clarified Milk Punch</h4>
                    <p className="menu-ed-item-desc">Japanese whisky, toasted hojicha tea, and cold-pressed citrus balanced like an equalizer curve.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('cocktails') }}>
                      VIEW FULL MENU →
                    </button>
                  </div>
                </div>
      
                {/* Phase 2: Dessert Content */}
                <div className="menu-editorial-slide" data-phase="2">
                  <div className="menu-ed-top">
                    <h3 className="menu-ed-title">dessert</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Dessert.png" alt="Yuzu Miso Tart & Smoked Matcha Silk" className="menu-ed-img" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <h4 className="menu-ed-item-name">Yuzu Miso Tart & Matcha Silk</h4>
                    <p className="menu-ed-item-desc">Caramelized white miso, crisp citrus curd, and genmaicha foam crafted for nocturnal indulgence.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('dessert') }}>
                      VIEW FULL MENU →
                    </button>
                  </div>
                </div>
      
              </div>
      
              {/* RIGHT HALF: 50% Width Pure Full-Bleed Photography (Zero Text) */}
              <div className="menu-panel-hero" id="menuPanelHero">
      
                {/* Background Image 0: Food */}
                <div className="menu-hero-slide active" data-phase="0">
                  <img src="/assets/spin-gallery-6.jpg" alt="Nocturnal Japanese Dining at Nami" className="menu-hero-bg-img" loading="lazy" decoding="async" />
                </div>

                {/* Background Image 1: Cocktails */}
                <div className="menu-hero-slide" data-phase="1">
                  <img src="/assets/spin-gallery-7.jpg" alt="Sound-Mapped Cocktails at Nami" className="menu-hero-bg-img" loading="lazy" decoding="async" />
                </div>

                {/* Background Image 2: Dessert */}
                <div className="menu-hero-slide" data-phase="2">
                  <img src="/assets/Dessert.png" alt="Delicate Plated Desserts at Nami" className="menu-hero-bg-img" loading="lazy" decoding="async" />
                </div>
      
              </div>
      
            </div>
      
          </section>
    </>
  );
}
