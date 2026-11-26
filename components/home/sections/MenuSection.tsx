// @ts-nocheck
"use client";

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
                    <h3 className="menu-ed-title">Food</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Food.avif" alt="Hamachi Truffle Crudo & Robata Wagyu" className="menu-ed-img" loading="eager" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <p className="menu-ed-item-desc">Charred binchotan skewers, sashimi dressed with aged ponzu, and umami-rich shared plates.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('food') }}>
                      VIEW FULL MENU
                    </button>
                  </div>
                </div>
      
                {/* Phase 1: Cocktails Content */}
                <div className="menu-editorial-slide" data-phase="1">
                  <div className="menu-ed-top">
                    <h3 className="menu-ed-title">Cocktails</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Cocktail.avif" alt="440Hz Clarified Milk Punch" className="menu-ed-img" loading="lazy" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <p className="menu-ed-item-desc">Japanese whisky, toasted hojicha tea, and cold-pressed citrus balanced like an equalizer curve.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('cocktails') }}>
                      VIEW FULL MENU
                    </button>
                  </div>
                </div>
      
                {/* Phase 2: Dessert Content */}
                <div className="menu-editorial-slide" data-phase="2">
                  <div className="menu-ed-top">
                    <h3 className="menu-ed-title">Dessert</h3>
                  </div>
                  <div className="menu-ed-frame-wrap">
                    <div className="menu-ed-frame">
                      <img src="/assets/Dessert.avif" alt="Yuzu Miso Tart & Smoked Matcha Silk" className="menu-ed-img" loading="lazy" />
                    </div>
                  </div>
                  <div className="menu-ed-bottom">
                    <p className="menu-ed-item-desc">Caramelized white miso, crisp citrus curd, and genmaicha foam crafted for nocturnal indulgence.</p>
                    <button type="button" className="btn-menu-view-full" onClick={(e) => { const event = e; (window as any).openFullMenuModal?.('dessert') }}>
                      VIEW FULL MENU
                    </button>
                  </div>
                </div>
      
              </div>
      
              {/* RIGHT HALF: 50% Width Pure Full-Bleed Photography (Zero Text) */}
              <div className="menu-panel-hero" id="menuPanelHero">
      
                {/* Background Image 0: Food */}
                <div className="menu-hero-slide active" data-phase="0">
                  <img src="/assets/nami-edamame-tart.avif" alt="Nocturnal Japanese Dining at Nami" className="menu-hero-bg-img" />
                </div>
      
                {/* Background Image 1: Cocktails */}
                <div className="menu-hero-slide" data-phase="1">
                  <img src="/assets/nami-carafe-pour.avif" alt="Sound-Mapped Cocktails at Nami" className="menu-hero-bg-img" />
                </div>
      
                {/* Background Image 2: Dessert */}
                <div className="menu-hero-slide" data-phase="2">
                  <img src="/assets/nami-coupe-cocktail.avif" alt="Nocturnal Digestifs &amp; Sweets at Nami" className="menu-hero-bg-img" />
                </div>
      
              </div>
      
            </div>
      
          </section>
    </>
  );
}
