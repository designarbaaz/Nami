// @ts-nocheck
"use client";

export default function ThankYouPage() {
  return (
    <>
      <main className="thank-you-page">
          <div className="ty-aura-bg" aria-hidden="true"></div>
      
          <div className="ty-inner">
            <nav className="header-breadcrumb" aria-label="Breadcrumb">
              <a href="/" className="breadcrumb-link">Home</a>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-active">Thank You</span>
            </nav>
      
            <h1 className="ty-display-title">Thank <span className="grad-accent">You</span></h1>
      
            <p className="ty-subtitle" id="tySubtitle">
              Your request has been received by our Bandra West listening room concierge. We will reach out shortly via WhatsApp or email to confirm your evening at Nami.
            </p>
      
            <div className="ty-meta-grid">
              <div className="ty-meta-col">
                <span className="ty-meta-label">LISTENING HOURS</span>
                <div className="ty-meta-value">
                  Wed – Sun · 7 PM – Late<br />
                  Vinyl Sessions · 20:30 Onwards
                </div>
              </div>
              <div className="ty-meta-col">
                <span className="ty-meta-label">THE ROOM</span>
                <div className="ty-meta-value">
                  <a href="https://www.google.com/maps?cid=16846005869033154503" target="_blank" rel="noopener noreferrer">15th Fl, Mansionz One, Linking Rd ↗</a><br />
                  Bandra West, Mumbai 400050
                </div>
              </div>
              <div className="ty-meta-col">
                <span className="ty-meta-label">CONCIERGE</span>
                <div className="ty-meta-value">
                  <a href="tel:+912248900440">+91 22 4890 0440</a><br />
                  <a href="mailto:experience@nami.in">experience@nami.in</a>
                </div>
              </div>
            </div>
      
            <div className="ty-actions">
              <a href="/" className="btn-ty-primary">
                <span>BACK TO HOME</span>
                <img src="/assets/Arrow-right.svg" alt="" aria-hidden="true" width="18" height="18" style={{ display: 'inline-block', verticalAlign: 'middle' }} />
              </a>
              <a href="/whats-on" className="btn-ty-secondary">
                <span>EXPLORE WHAT'S ON</span>
              </a>
              <a href="/drinks-food" className="btn-ty-secondary">
                <span>DRINKS &amp; FOOD</span>
              </a>
            </div>
          </div>
        </main>
    </>
  );
}
