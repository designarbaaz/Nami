// @ts-nocheck
"use client";

export default function FaqsPage() {
  return (
    <>
      <main className="page-wrap">
      
          {/* 01. MINIMALIST NUMBERED FAQ ACCORDION */}
          <section className="faq-section" id="faqs" aria-label="Frequently Asked Questions">
            <nav className="header-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-active">FAQs</span>
            </nav>
      
            <div className="faq-hero-header">
              <h1 className="faq-display-title">
                <span className="text-gradient">FAQs</span>
              </h1>
            </div>
      
            <div className="faq-body-split">
              <div className="faq-mesh-panel">
                <div className="faq-sticky-stage">
                  <figure className="faq-bar-frame">
                    <img src="/assets/bar.webp" alt="Nami Bar Counter and Acoustic Listening Room" className="faq-bar-img" loading="eager" />
                  </figure>
                </div>
              </div>
              <div className="faq-accordion" id="faqAccordion">
              {/* FAQ 01 */}
              <div className="faq-item is-open">
                <button type="button" className="faq-trigger" aria-expanded="true" aria-controls="faq-ans-01">
                  <span className="faq-num">01</span>
                  <span className="faq-question">What is Nami, and how does the listening room experience work?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-01" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Located on the 15th floor of Mansionz One in Bandra West, Nami brings together a Japanese kissaten-inspired audiophile room, cocktail bar, and binchotan robata dining. Our custom horn-loaded rotary sound system plays curated vinyl archives and selector sets from 20:30 onwards, paired with sound-mapped cocktails and shared plates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 02 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-02">
                  <span className="faq-num">02</span>
                  <span className="faq-question">Do I need a reservation, or do you accommodate walk-in guests?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-02" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Table reservations are strongly recommended — particularly Thursday through Sunday and for prime listening seatings after 20:30. Walk-ins are welcome at the cocktail counter whenever seats open up. You can book any time through the Reservation button via Eat App.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 03 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-03">
                  <span className="faq-num">03</span>
                  <span className="faq-question">What are Nami’s operating days and weekly listening session hours?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-03" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Nami is open Wednesday through Sunday from 7:00 PM until late. Doors open for apéritifs and robata dining at 19:00, while curated vinyl programming and guest selectors take over from 20:30 onwards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 04 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-04">
                  <span className="faq-num">04</span>
                  <span className="faq-question">Is there a dress code or listening room etiquette to keep in mind?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-04" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        We encourage effortless, thoughtful evening attire rather than a rigid dress code. Inside the room, Nami is built for unhurried conversation and deep listening — please avoid flash photography so our nocturnal lighting remains undisturbed, and kindly refrain from placing glasses near the turntable console or horn speakers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 05 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-05">
                  <span className="faq-num">05</span>
                  <span className="faq-question">Do you offer vegetarian, vegan, or zero-proof beverage options?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-05" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Yes. Alongside seafood crudo and binchotan skewers, the kitchen serves plant-forward plates such as edamame tarts, charred koji-glazed vegetables, and mushroom plates, plus dedicated zero-proof highballs crafted with house-roasted teas and citrus cordials. Let us know dietary allergies in advance when booking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 06 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-06">
                  <span className="faq-num">06</span>
                  <span className="faq-question">Is valet parking available at Mansionz One on Linking Road?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-06" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Yes, valet parking operates directly outside the Mansionz One entrance on Linking Road throughout opening hours. Cabs and ride-shares can drop off at the main building lobby before taking the express lift to the 15th floor.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
      
              {/* FAQ 07 */}
              <div className="faq-item">
                <button type="button" className="faq-trigger" aria-expanded="false" aria-controls="faq-ans-07">
                  <span className="faq-num">07</span>
                  <span className="faq-question">Can I book Nami for private listening events, vinyl launches, or full buyouts?</span>
                  <span className="faq-arrow" aria-hidden="true">
                    <img src="/assets/Arrow-down.svg" alt="" width="26" height="26" className="faq-arrow-icon" />
                  </span>
                </button>
                <div className="faq-panel" id="faq-ans-07" role="region">
                  <div className="faq-panel-overflow">
                    <div className="faq-panel-grid">
                      <p className="faq-answer">
                        Yes. We regularly host intimate milestone dinners, record listening evenings, creative showcases, and full-venue buyouts with tailored selector curation and custom tasting menus. Reach out via the enquiry form below or write directly to experience@nami.in.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </section>
      
          {/* 02. GET IN TOUCH (VENUE IMAGE + ENQUIRY FORM) */}
          <section className="contact-section" id="contact" aria-label="Enquiry Form">
            <h2 className="faq-display-title contact-section-title">
              Get in <span className="text-gradient">touch</span>
            </h2>
      
            <div className="contact-split-grid">
              {/* LEFT COLUMN: Moody Venue Image */}
              <div className="contact-visual-col">
                <div className="contact-photo-frame">
                  <img src="/assets/nami-evening-crowd.avif" alt="Evening listening session and guests at NAMI Bandra West" className="contact-photo-img" />
                </div>
              </div>
      
              {/* RIGHT COLUMN: Underline Enquiry Form */}
              <div className="contact-form-col">
                <p className="contact-lead">
                  Have a question about an upcoming vinyl session, group dining, private buyout, or collaboration? Send a note below and our Bandra team will respond shortly.
                </p>
      
                <form id="enquiryForm" className="enquiry-form" onSubmit={(e) => { const event = e; (window as any).handleEnquirySubmit?.(event) }}>
                  <div className="enq-row-2">
                    <div className="enq-field">
                      <label htmlFor="enqFirstName" className="enq-label">First Name</label>
                      <input type="text" id="enqFirstName" name="firstName" placeholder="First name *" required className="enq-input" />
                    </div>
                    <div className="enq-field">
                      <label htmlFor="enqLastName" className="enq-label">Last Name</label>
                      <input type="text" id="enqLastName" name="lastName" placeholder="Last name *" required className="enq-input" />
                    </div>
                  </div>
      
                  <div className="enq-field">
                    <label htmlFor="enqEmail" className="enq-label">Email Address</label>
                    <input type="email" id="enqEmail" name="email" placeholder="Email *" required className="enq-input" />
                  </div>
      
                  <div className="enq-field">
                    <label htmlFor="enqPhone" className="enq-label">Phone Number</label>
                    <input type="tel" id="enqPhone" name="phone" placeholder="Phone number" className="enq-input" />
                  </div>
      
                  <div className="enq-field">
                    <label htmlFor="enqTopic" className="enq-label">Enquiry Type</label>
                    <select id="enqTopic" name="topic" className="enq-select" required defaultValue="">
                      <option value="" disabled>Enquiry type</option>
                      <option value="Table &amp; Listening Session">Table &amp; Listening Session</option>
                      <option value="Private Event / Venue Buyout">Private Event / Venue Buyout</option>
                      <option value="Music &amp; Selector Curation">Music &amp; Selector Curation</option>
                      <option value="Press &amp; Brand Collaboration">Press &amp; Brand Collaboration</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
      
                  <div className="enq-field">
                    <label htmlFor="enqMessage" className="enq-label">Message / Details</label>
                    <textarea id="enqMessage" name="message" rows="3" placeholder="Message or preferred date &amp; guest count (optional)" className="enq-textarea"></textarea>
                  </div>
      
                  <button type="submit" className="btn-enquiry-submit">
                    <span>Send Enquiry</span>
                    <img src="/assets/Arrow-right.svg" alt="" aria-hidden="true" width="18" height="18" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
                  </button>
      
                  <div className="enquiry-confirmation" id="enquirySuccess" role="status" aria-live="polite"></div>
                </form>
              </div>
            </div>
          </section>
      
        </main>
    </>
  );
}
