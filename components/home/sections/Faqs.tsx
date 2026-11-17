// @ts-nocheck

export default function Faqs() {
  return (
    <section id="faqs" className="section-block">
                <div className="section-eyebrow">Good to Know</div>
                <h2 className="section-heading">Frequently <span className="grad-accent">Asked</span></h2>
                <p className="section-body">
                  A few essential guidelines to help you get the most out of your visit to Nami.
                </p>

                <div className="faq-list">
                  <div className="faq-item">
                    <button className="faq-question" onClick={(e) => { (window as any).toggleFaq?.(e.currentTarget); }}>
                      <span>Do you accept walk-ins or are reservations required?</span>
                      <span className="faq-toggle-icon">+</span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        We highly recommend booking through our official website to secure listening room tables during peak evening hours (20:00 – Late). However, we always hold space at our cocktail bar counter for walk-ins on a first-come, first-served basis.
                      </div>
                    </div>
                  </div>

                  <div className="faq-item">
                    <button className="faq-question" onClick={(e) => { (window as any).toggleFaq?.(e.currentTarget); }}>
                      <span>What is the listening room policy?</span>
                      <span className="faq-toggle-icon">+</span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        Nami is conversational, not silent like a library. However, during dedicated listening sessions (after 20:30), we ask guests to keep conversation at a respectful level so everyone can appreciate the nuances of the sound system.
                      </div>
                    </div>
                  </div>

                  <div className="faq-item">
                    <button className="faq-question" onClick={(e) => { (window as any).toggleFaq?.(e.currentTarget); }}>
                      <span>Can I book for groups larger than 6 guests?</span>
                      <span className="faq-toggle-icon">+</span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        Yes. For groups of 7 or more or private venue buyouts, please select "Private Event" in the reservation form or connect with us directly via our WhatsApp Community link.
                      </div>
                    </div>
                  </div>

                  <div className="faq-item">
                    <button className="faq-question" onClick={(e) => { (window as any).toggleFaq?.(e.currentTarget); }}>
                      <span>What is the FAM Loyalty Program?</span>
                      <span className="faq-toggle-icon">+</span>
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-inner">
                        FAM is our private community of regular guests and music lovers. Members receive priority table bookings, access to secret listening sessions, limited vinyl pressings, and invites to test menu experiments.
                      </div>
                    </div>
                  </div>
                </div>
              </section>
  );
}
