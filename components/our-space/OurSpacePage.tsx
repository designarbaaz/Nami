// @ts-nocheck
"use client";

export default function OurSpacePage() {
  return (
    <>
      <main className="gallery-page-wrap">
          {/* Header & Category Filter Bar */}
          <section className="gallery-header-section">
            {/* 1. Breadcrumb - letter-spacing removed */}
            <nav className="gallery-breadcrumb" aria-label="Breadcrumb">
              <a href="/">HOME</a>
              <span className="gallery-breadcrumb-sep">/</span>
              <span className="gallery-breadcrumb-active">OUR SPACE</span>
            </nav>
      
            <h1 className="gallery-page-title">Our <span className="text-gradient">Space</span></h1>
            <p className="gallery-page-desc">
              A sanctuary of analog acoustic engineering, Japanese robata gastronomy, bespoke libations, and nocturnal listening culture. Explore our custom rotary audio architecture, vinyl archives, dining rooms, and atmospheric bar.
            </p>
      
            {/* 6. Tab UI: font-size 30px, simple bold underline active state, no border, no bg, no numbers, no letter-spacing */}
            <div className="gallery-filter-bar" role="tablist" aria-label="Gallery Categories">
              <button className="gallery-filter-pill active" data-filter="all" role="tab" aria-selected="true" onClick={(e) => { const event = e; (window as any).filterGallery?.('all') }}>
                All
              </button>
              <button className="gallery-filter-pill" data-filter="interiors" role="tab" aria-selected="false" onClick={(e) => { const event = e; (window as any).filterGallery?.('interiors') }}>
                Interiors &amp; Space
              </button>
              <button className="gallery-filter-pill" data-filter="music" role="tab" aria-selected="false" onClick={(e) => { const event = e; (window as any).filterGallery?.('music') }}>
                Music &amp; Sound
              </button>
              <button className="gallery-filter-pill" data-filter="drinks-food" role="tab" aria-selected="false" onClick={(e) => { const event = e; (window as any).filterGallery?.('drinks-food') }}>
                Drinks &amp; Food
              </button>
            </div>
          </section>
      
          {/* Justified Strips Gallery Container (26 Unique Authentic Nami Photos, Zero Repeats, No Zoom) */}
          <div className="gallery-strips-wrapper" id="galleryStripsContainer">
      
            {/* Row 1: The Nocturnal Bar Counter + Precision Tonearm + Wood-Panelled Booth */}
            <div className="gallery-strip-row" data-row-id="1">
              <div className="gallery-strip-item" style={{ flex: '1.78 1.78 0px' }} data-category="interiors" data-index="0">
                <img src="/assets/Event-bg2.avif" alt="The Nocturnal Bar Counter" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.67 0.67 0px' }} data-category="music" data-index="1">
                <img src="/assets/spin-gallery-3.avif" alt="Precision Turntable Tonearm" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.67 0.67 0px' }} data-category="interiors" data-index="2">
                <img src="/assets/spin-gallery-2.avif" alt="Acoustic Wood-Panelled Booth" loading="lazy" />
              </div>
            </div>
      
            {/* Row 2: Clarified Highball + Vinyl Selector at Decks + Vinyl Archive Lounge */}
            <div className="gallery-strip-row" data-row-id="2">
              <div className="gallery-strip-item" style={{ flex: '0.69 0.69 0px' }} data-category="drinks-food" data-index="3">
                <img src="/assets/Cocktail.avif" alt="Clarified Solar Highball" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.00 1.00 0px' }} data-category="music" data-index="4">
                <img src="/assets/Event-2.avif" alt="Vinyl Selector at the Decks" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.50 1.50 0px' }} data-category="interiors" data-index="5">
                <img src="/assets/spin-gallery-9.avif" alt="The Vinyl Archive Lounge" loading="lazy" />
              </div>
            </div>
      
            {/* Row 3: Grand Panoramic Master Acoustic Room */}
            <div className="gallery-strip-row panoramic-row" data-row-id="3">
              <div className="gallery-strip-item" style={{ flex: '2.2 2.2 0px' }} data-category="interiors" data-index="6">
                <img src="/assets/Event-bg.avif" alt="440Hz Master Acoustic Architecture" loading="lazy" />
              </div>
            </div>
      
            {/* Row 4: Robata Seasonal Dish + Pool Hall Lounge + Bar & DJ Console */}
            <div className="gallery-strip-row" data-row-id="4">
              <div className="gallery-strip-item" style={{ flex: '0.69 0.69 0px' }} data-category="drinks-food" data-index="7">
                <img src="/assets/Food.avif" alt="Robata Charcoal Seasonal Dish" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="interiors" data-index="8">
                <img src="/assets/Event-bg1.avif" alt="Ambient Pool Hall Lounge" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.75 0.75 0px' }} data-category="interiors" data-index="9">
                <img src="/assets/nami-dj-bar.avif" alt="Cocktail Bar &amp; DJ Console" loading="lazy" />
              </div>
            </div>
      
            {/* Row 5: Custom Red Horn Speaker + Ruby Negroni & Horn + Low-Lit Booths */}
            <div className="gallery-strip-row" data-row-id="5">
              <div className="gallery-strip-item" style={{ flex: '1.40 1.40 0px' }} data-category="music" data-index="10">
                <img src="/assets/nami-horn-speaker.avif" alt="Custom Red Multi-Cell Horn Speaker" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.75 0.75 0px' }} data-category="drinks-food" data-index="11">
                <img src="/assets/nami-negroni-horn.avif" alt="Ruby Negroni at the Listening Bar" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.67 0.67 0px' }} data-category="interiors" data-index="12">
                <img src="/assets/spin-gallery-5.avif" alt="Low-Lit Dining Lounge Booths" loading="lazy" />
              </div>
            </div>
      
            {/* Row 6: Miso Caramel Tart + Spinning Turntable Hands + Cocktail Carafe Pour */}
            <div className="gallery-strip-row" data-row-id="6">
              <div className="gallery-strip-item" style={{ flex: '0.69 0.69 0px' }} data-category="drinks-food" data-index="13">
                <img src="/assets/Dessert.avif" alt="Miso Caramel Sweet Tart" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.50 1.50 0px' }} data-category="music" data-index="14">
                <img src="/assets/nami-turntable-hands.avif" alt="Spinning Vinyl Turntable Decks" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="drinks-food" data-index="15">
                <img src="/assets/nami-carafe-pour.avif" alt="Clarified Cocktail Carafe Pour" loading="lazy" />
              </div>
            </div>
      
            {/* Row 7: Candlelit Guest & Cocktails + DJ Selector at Console + Edamame Tartlets */}
            <div className="gallery-strip-row" data-row-id="7">
              <div className="gallery-strip-item" style={{ flex: '0.71 0.71 0px' }} data-category="drinks-food" data-index="16">
                <img src="/assets/nami-guest-table.avif" alt="Nocturnal Dining &amp; Highballs" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.71 0.71 0px' }} data-category="music" data-index="17">
                <img src="/assets/nami-selector-booth.avif" alt="Selector Mixing on Dual Turntables" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="drinks-food" data-index="18">
                <img src="/assets/nami-edamame-tart.avif" alt="Edamame &amp; Blossom Tartlets" loading="lazy" />
              </div>
            </div>
      
            {/* Row 8: Resor Analog VU Meter + Erykah Badu Vinyl Archive + Main Listening Room */}
            <div className="gallery-strip-row" data-row-id="8">
              <div className="gallery-strip-item" style={{ flex: '0.71 0.71 0px' }} data-category="music" data-index="19">
                <img src="/assets/nami-resor-mixer.avif" alt="Resor Rotary Mixer Amber VU Meter" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '0.75 0.75 0px' }} data-category="music" data-index="20">
                <img src="/assets/nami-erykah-vinyl.avif" alt="Vinyl Records &amp; Red Acoustic Horn" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.40 1.40 0px' }} data-category="interiors" data-index="21">
                <img src="/assets/nami-bar-room.avif" alt="Nami Listening Room &amp; Bar Interior" loading="lazy" />
              </div>
            </div>
      
            {/* Row 9: Signature Coupe Cocktail + Golden Croquettes */}
            <div className="gallery-strip-row" data-row-id="9">
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="drinks-food" data-index="22">
                <img src="/assets/nami-coupe-cocktail.avif" alt="Botanical Foam Coupe Cocktail" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="drinks-food" data-index="23">
                <img src="/assets/nami-croquette-plate.avif" alt="Crispy Robata Small Plates" loading="lazy" />
              </div>
            </div>
      
            {/* Row 10: Grilled Robata Skewer + Evening Listening Crowd */}
            <div className="gallery-strip-row" data-row-id="10">
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="drinks-food" data-index="24">
                <img src="/assets/nami-robata-skewer.avif" alt="Charcoal Grilled Squid Skewer" loading="lazy" />
              </div>
              <div className="gallery-strip-item" style={{ flex: '1.33 1.33 0px' }} data-category="interiors" data-index="25">
                <img src="/assets/nami-evening-crowd.avif" alt="Evening Gathering Beneath Red Coffers" loading="lazy" />
              </div>
            </div>
      
          </div>
        </main>
    </>
  );
}
