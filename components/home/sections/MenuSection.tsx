// @ts-nocheck

export default function MenuSection() {
  return (
    <section id="menu" className="section-block">
                <div className="section-eyebrow">Culinary & Mixology</div>
                <h2 className="section-heading">The <span className="grad-accent">Resonance</span> Menu</h2>
                <p className="section-body">
                  Progressive Japanese and Asian-influenced culinary dishes and sound-mapped cocktails. 
                  Each selection carries its own sonic and textural profile.
                </p>

                <div className="menu-tabs">
                  <button className="menu-tab-btn active" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('food') }}>Dishes</button>
                  <button className="menu-tab-btn" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('cocktails') }}>Cocktails [Hz]</button>
                  <button className="menu-tab-btn" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('desserts') }}>Desserts</button>
                </div>

                {/* Food Menu Tab */}
                <div id="menuFood" className="menu-items-grid">
                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Charred Koji-Glazed Root Vegetables</span>
                      <span className="item-price">700</span>
                    </div>
                    <div className="item-ingredients">Smoked carrot, black garlic, fermented chili oil, toasted sesame</div>
                    <div className="item-sonic-descriptor">Grounded · Warm · Resonant</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Aged Hamachi Crudo</span>
                      <span className="item-price">1500</span>
                    </div>
                    <div className="item-ingredients">Yuzu kosho, preserved citrus, kombu oil, shaved fennel</div>
                    <div className="item-sonic-descriptor">Textural · Umami · Expansive</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Miso-Butter Scallop</span>
                      <span className="item-price">1750</span>
                    </div>
                    <div className="item-ingredients">Sweet corn purée, brown butter dashi, chili threads</div>
                    <div className="item-sonic-descriptor">Balanced · Rhythmic · Expressive</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Charcoal-Grilled Duck Breast</span>
                      <span className="item-price">2100</span>
                    </div>
                    <div className="item-ingredients">Tamarind glaze, sour cherry, smoked tea jus</div>
                    <div className="item-sonic-descriptor">Bright · Electric · Forward</div>
                  </div>
                </div>

                {/* Cocktails Menu Tab */}
                <div id="menuCocktails" className="menu-items-grid" style={{display: 'none'}}>
                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Gin - Tonic - Cherry</span>
                      <span className="item-price">800</span>
                    </div>
                    <div className="item-ingredients">Botanical gin, artisanal tonic, fermented sour cherry infusion</div>
                    <div className="item-sonic-descriptor">[ 440 Hz ] · Root Frequency · Crisp</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">White Rum - Yuzu - Bubble Gum Syrup</span>
                      <span className="item-price">850</span>
                    </div>
                    <div className="item-ingredients">Aged white rum, fresh yuzu, craft bubblegum botanical cordial</div>
                    <div className="item-sonic-descriptor">[ 980 Hz ] · Playful Harmonic · Effervescent</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Smoked Mezcal - Oolong - Plum</span>
                      <span className="item-price">900</span>
                    </div>
                    <div className="item-ingredients">Artisanal mezcal, roasted Taiwanese oolong, salted umeboshi</div>
                    <div className="item-sonic-descriptor">[ 1760 Hz ] · Resonant Smoke · Velvet Depth</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Whisky Highball - Shiso - Soda</span>
                      <span className="item-price">850</span>
                    </div>
                    <div className="item-ingredients">Single malt Japanese whisky, red shiso leaf, crystal mountain soda</div>
                    <div className="item-sonic-descriptor">[ 3968 Hz ] · High Harmonic · Nocturnal</div>
                  </div>
                </div>

                {/* Desserts Menu Tab */}
                <div id="menuDesserts" className="menu-items-grid" style={{display: 'none'}}>
                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Dark Chocolate & Black Sesame Crémeux</span>
                      <span className="item-price">950</span>
                    </div>
                    <div className="item-ingredients">Malted barley crumble, honeycomb, sea salt</div>
                    <div className="item-sonic-descriptor">Lingering · Warm · Satisfying</div>
                  </div>

                  <div className="menu-item-card">
                    <div className="menu-item-top">
                      <span className="item-name">Miso Caramel & Roasted Hojicha Tart</span>
                      <span className="item-price">850</span>
                    </div>
                    <div className="item-ingredients">Roasted tea ganache, smoked sea salt caramel, buckwheat crust</div>
                    <div className="item-sonic-descriptor">Earth · Bass Tone · Grounded</div>
                  </div>
                </div>

                <div style={{marginTop: '3rem', textAlign: 'center'}}>
                  <button className="btn-whatsapp-footer" onClick={(e) => { const event = e; (window as any).showToast?.('Downloading Nami Menu PDF...') }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                    Download Resonance Menu (PDF)
                  </button>
                </div>
              </section>
  );
}
