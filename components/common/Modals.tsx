// @ts-nocheck
"use client";

export default function Modals() {
  return (
    <>
      <button className="floating-reserve-cta" id="floatingReserveBtn" onClick={(e) => { const event = e; (window as any).openReservationModal?.(event) }} aria-label="Reservation">
          <span className="reserve-cta-text">Reservation</span>
          <span className="reserve-cta-divider" aria-hidden="true"></span>
          <img src="/assets/Eat_App_Logo.webp" alt="Eat App" className="reserve-eat-logo" />
        </button>
      
      <div id="reservationModal" className="reservation-modal" role="dialog" aria-modal="true" aria-hidden="true">
          <div className="reservation-modal-backdrop" onClick={(e) => { const event = e; (window as any).closeReservationModal?.() }}></div>
          <div className="reservation-modal-panel">
            <div className="reservation-modal-header">
              <div>
                <span className="reserve-eyebrow">RESERVE A TABLE</span>
                <h3 className="reserve-modal-title">Table <span className="grad-accent">Reservation</span></h3>
              </div>
              <button className="reserve-modal-close" onClick={(e) => { const event = e; (window as any).closeReservationModal?.() }} aria-label="Close modal">
                <img src="/assets/close.svg" alt="Close" width={14} height={14} style={{ display: "block", pointerEvents: "none" }} />
              </button>
            </div>
      
            <p className="reserve-modal-desc">
              Experience intimate sound-mapped culinary and listening sessions at NAMI Bandra West.
            </p>
      
            <form id="reservationForm" className="reservation-form" onSubmit={(e) => { const event = e; (window as any).handleReservationSubmit?.(event) }}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="resDate">DATE</label>
                  <input type="date" id="resDate" required className="res-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="resGuests">GUESTS</label>
                  <select id="resGuests" required className="res-input" defaultValue="2">
                    <option value="1">1 Guest (Solo Listening)</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6+">6+ Guests (Private Area)</option>
                  </select>
                </div>
              </div>
      
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="resSession">SESSION / TIME</label>
                  <select id="resSession" required className="res-input" defaultValue="21:30 – Hi-Fi Listening Focus">
                    <option value="19:30 – Dinner & First Session">19:30 – Dinner & First Session</option>
                    <option value="21:30 – Hi-Fi Listening Focus">21:30 – Hi-Fi Listening Focus</option>
                    <option value="23:30 – Nocturnal Sound & Cocktails">23:30 – Nocturnal Sound & Cocktails</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="resZone">SEATING ZONE</label>
                  <select id="resZone" required className="res-input" defaultValue="Hi-Fi Listening Room">
                    <option value="Hi-Fi Listening Room">Hi-Fi Listening Room</option>
                    <option value="Cocktail Bar Counter">Cocktail Bar Counter</option>
                    <option value="Tatami Acoustic Nook">Tatami Acoustic Nook</option>
                  </select>
                </div>
              </div>
      
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="resName">NAME</label>
                  <input type="text" id="resName" placeholder="Your name" required className="res-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="resContact">CONTACT / PHONE</label>
                  <input type="tel" id="resContact" placeholder="+91 98765 43210" required className="res-input" />
                </div>
              </div>
      
              <button type="submit" className="btn-confirm-reserve">
                <span>CONFIRM RESERVATION</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        </div>
      
        {/* =========================================================
             FULL MENU MODAL (Editorial Listening Room Menu)
             ========================================================= */}
      
      <div id="fullMenuModal" className="full-menu-modal" role="dialog" aria-modal="true" aria-hidden="true" aria-label="Nami Full Menu">
          <div className="full-menu-backdrop" onClick={(e) => { const event = e; (window as any).closeFullMenuModal?.() }}></div>
          <div className="full-menu-panel">
            <div className="full-menu-header">
              <div>
                <span className="full-menu-eyebrow">THE RESONANCE MENU</span>
                <h3 className="full-menu-title">NAMI · BANDRA WEST</h3>
              </div>
              <button type="button" className="full-menu-close" onClick={(e) => { const event = e; (window as any).closeFullMenuModal?.() }} aria-label="Close menu">✕</button>
            </div>
      
            {/* Category Tabs */}
            <div className="full-menu-tabs">
              <button type="button" className="full-menu-tab-btn active" data-tab="food" onClick={(e) => { const event = e; (window as any).switchFullMenuTab?.('food') }}>Food</button>
              <button type="button" className="full-menu-tab-btn" data-tab="cocktails" onClick={(e) => { const event = e; (window as any).switchFullMenuTab?.('cocktails') }}>Cocktails</button>
              <button type="button" className="full-menu-tab-btn" data-tab="dessert" onClick={(e) => { const event = e; (window as any).switchFullMenuTab?.('dessert') }}>Dessert</button>
              <button type="button" className="full-menu-tab-btn" data-tab="drinks" onClick={(e) => { const event = e; (window as any).switchFullMenuTab?.('drinks') }}>Wine & Sake</button>
            </div>
      
            {/* Menu Content Panes */}
            <div className="full-menu-content" id="fullMenuContent">
              {/* 1. FOOD PANE */}
              <div className="full-menu-pane active" id="pane-food">
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">RAW & CRUDO · 生</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Hamachi Truffle Crudo</span>
                      <span className="dish-item-price">₹1,250</span>
                    </div>
                    <p className="dish-item-desc">Thinly sliced yellowtail, white truffle ponzu, crispy garlic chips, micro shiso.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Bluefin Otoro Tartare</span>
                      <span className="dish-item-price">₹1,650</span>
                    </div>
                    <p className="dish-item-desc">Fatty bluefin tuna, oscietra caviar, house-cured egg yolk, nori sesame crisps.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Hokkaido Scallop Carpaccio</span>
                      <span className="dish-item-price">₹1,150</span>
                    </div>
                    <p className="dish-item-desc">Charred yuzu kosho vinaigrette, finger lime caviar, sea grape garnish.</p>
                  </div>
                </div>
      
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">BINCHOTAN ROBATA GRILL · 炉端焼き</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Miyazaki Wagyu A5 Kushiyaki</span>
                      <span className="dish-item-price">₹2,400</span>
                    </div>
                    <p className="dish-item-desc">Melt-in-mouth wagyu skewer, 25-year aged master tare, fresh Shizuoka wasabi.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">King Oyster Yakitori</span>
                      <span className="dish-item-price">₹850</span>
                    </div>
                    <p className="dish-item-desc">Smoked soy tare, togarashi crunch, charred scallion emulsion.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Kurobuta Pork Belly</span>
                      <span className="dish-item-price">₹950</span>
                    </div>
                    <p className="dish-item-desc">Glazed with saikyo miso, applewood smoke, pickled baby ginger.</p>
                  </div>
                </div>
      
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">MAINS & CLAYPOT · 釜飯</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Saikyo Miso Black Cod</span>
                      <span className="dish-item-price">₹2,200</span>
                    </div>
                    <p className="dish-item-desc">72-hour sweet miso marinade, charred hajikami ginger, dashi reduction.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Truffle & Morel Claypot Gohan</span>
                      <span className="dish-item-price">₹1,450</span>
                    </div>
                    <p className="dish-item-desc">Niigata Koshihikari rice, wild morels, shaved black winter truffle, burnt butter dashi.</p>
                  </div>
                </div>
              </div>
      
              {/* 2. COCKTAILS PANE */}
              <div className="full-menu-pane" id="pane-cocktails">
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">HARMONIC SOUND-MAPPED SIGNATURES · 440Hz</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">440Hz Clarified Milk Punch</span>
                      <span className="dish-item-price">₹1,100</span>
                    </div>
                    <p className="dish-item-desc">Japanese whisky, toasted hojicha tea, clarified coconut whey, sudachi citrus.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Sub-Bass Smoked Highball</span>
                      <span className="dish-item-price">₹950</span>
                    </div>
                    <p className="dish-item-desc">Suntory Toki, peated Islay malt mist, super-carbonated soda, pink grapefruit twist.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Crystalline Highs</span>
                      <span className="dish-item-price">₹1,050</span>
                    </div>
                    <p className="dish-item-desc">Roku Gin, elderflower liqueur, cold-brewed sencha cordial, crystalline malic acid.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">The Equalizer (Low-Fi)</span>
                      <span className="dish-item-price">₹1,200</span>
                    </div>
                    <p className="dish-item-desc">Oaxacan mezcal, umeshu plum liqueur, smoked shiso leaf, fiery ginger cordial.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Bandra Frequency</span>
                      <span className="dish-item-price">₹950</span>
                    </div>
                    <p className="dish-item-desc">Haku Vodka, local kokum shrub, Japanese myoga ginger, sparkling yuzu.</p>
                  </div>
                </div>
              </div>
      
              {/* 3. DESSERT PANE */}
              <div className="full-menu-pane" id="pane-dessert">
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">PLATED DELICACIES & LATE-NIGHT FINISHES · 甘味</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Yuzu Miso Caramel Tart</span>
                      <span className="dish-item-price">₹750</span>
                    </div>
                    <p className="dish-item-desc">Crisp Japanese citrus curd, salted white miso caramel, black sesame butter crust.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Smoked Matcha Silk</span>
                      <span className="dish-item-price">₹800</span>
                    </div>
                    <p className="dish-item-desc">Ceremonial Uji matcha ganache, roasted genmaicha crisps, white chocolate cloud.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Hibiki Valrhona Gateau</span>
                      <span className="dish-item-price">₹900</span>
                    </div>
                    <p className="dish-item-desc">70% Guanaja chocolate fondant, Hibiki Japanese Harmony mist, smoked sea salt flakes.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Black Sesame Gelato</span>
                      <span className="dish-item-price">₹550</span>
                    </div>
                    <p className="dish-item-desc">House-churned roasted black sesame, roasted kinako soybean dust, dashi tuile.</p>
                  </div>
                </div>
              </div>
      
              {/* 4. WINE & SAKE PANE */}
              <div className="full-menu-pane" id="pane-drinks">
                <div className="menu-dish-group">
                  <h4 className="dish-group-title">JAPANESE SAKE & BIODYNAMIC WINES · 酒</h4>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Dassai 23 Junmai Daiginjo</span>
                      <span className="dish-item-price">₹2,800 / glass</span>
                    </div>
                    <p className="dish-item-desc">Yamaguchi · 23% polish ratio. Ultra-refined melon, white peach, ethereal finish.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Born Gold Muroka Junmai Daiginjo</span>
                      <span className="dish-item-price">₹1,600 / glass</span>
                    </div>
                    <p className="dish-item-desc">Fukui · Unfiltered, aged at 0°C. Silky tropical mouthfeel with delicate aromatics.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Domaine de la Tourmaline Chablis</span>
                      <span className="dish-item-price">₹1,400 / glass</span>
                    </div>
                    <p className="dish-item-desc">Burgundy, France · Mineral-driven, crystalline acidity, saline oyster shell finish.</p>
                  </div>
                  <div className="menu-dish-item">
                    <div className="dish-item-top">
                      <span className="dish-item-name">Meinklang Prosa Pet-Nat Rosé</span>
                      <span className="dish-item-price">₹1,200 / glass</span>
                    </div>
                    <p className="dish-item-desc">Burgenland, Austria · Biodynamic, natural sparkling red berries, lively citrus fizz.</p>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="full-menu-footer">
              <p className="full-menu-note">Wed – Sun · 7 PM – Late · Listening Sessions 20:30 Onwards</p>
              <button type="button" className="btn-reserve-from-menu" onClick={(e) => { const event = e; (window as any).closeFullMenuModal?.(); (window as any).openReservationModal?.(event); }}>
                Reserve Table
              </button>
            </div>
          </div>
        </div>

      <div id="contactModal" className="reservation-modal" role="dialog" aria-modal="true" aria-hidden="true">
        <div
          className="reservation-modal-backdrop"
          onClick={() => (window as any).closeContactModal?.()}
        />
        <div className="reservation-modal-panel">
          <div className="reservation-modal-header">
            <div>
              <span className="reserve-eyebrow">PRIVATE EVENTS &amp; BUYOUTS</span>
              <h3 className="reserve-modal-title">
                Book Private{" "}
                <span className="grad-accent">Space</span>
              </h3>
            </div>
            <button
              className="reserve-modal-close"
              onClick={() => (window as any).closeContactModal?.()}
              aria-label="Close contact form"
            >
              <img
                src="/assets/close.svg"
                alt="Close"
                width={14}
                height={14}
                style={{ display: "block", pointerEvents: "none" }}
              />
            </button>
          </div>

          <p className="reserve-modal-desc">
            Planning a private gathering, album launch, or full-venue celebration?
            Share your event details below and our team will get in touch.
          </p>

          <form
            id="contactInquiryForm"
            className="reservation-form"
            onSubmit={(e) => {
              (window as any).handleContactSubmit?.(e);
            }}
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactName">NAME</label>
                <input
                  type="text"
                  id="contactName"
                  placeholder="Your full name"
                  required
                  className="res-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail">EMAIL OR PHONE</label>
                <input
                  type="text"
                  id="contactEmail"
                  placeholder="you@domain.com / +91"
                  required
                  className="res-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactDate">PREFERRED DATE</label>
                <input type="date" id="contactDate" required className="res-input" />
              </div>
              <div className="form-group">
                <label htmlFor="contactType">OCCASION</label>
                <select
                  id="contactType"
                  required
                  className="res-input"
                  defaultValue="Private Celebration"
                >
                  <option value="Private Celebration">Private Celebration</option>
                  <option value="Full Venue Buyout">Full Venue Buyout</option>
                  <option value="Album Launch / Listening Session">
                    Album Launch / Listening Session
                  </option>
                  <option value="Brand / Corporate Gathering">
                    Brand / Corporate Gathering
                  </option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contactNotes">EVENT DETAILS &amp; GUEST COUNT</label>
              <textarea
                id="contactNotes"
                rows={3}
                placeholder="Tell us your estimated guest count, music preferences, and format..."
                className="res-input"
                style={{ resize: "vertical" }}
              />
            </div>

            <button type="submit" className="btn-confirm-reserve">
              <span>SEND INQUIRY</span>
              <img
                src="/assets/Arrow-right.svg"
                alt=""
                aria-hidden="true"
                width={18}
                height={18}
                style={{ display: "inline-block", verticalAlign: "middle" }}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
