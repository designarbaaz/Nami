// @ts-nocheck

export default function Reserve() {
  return (
    <section id="reserve" className="section-block">
                <div className="section-eyebrow">Direct Booking</div>
                <h2 className="section-heading">Reserve a <span className="grad-accent">Table</span></h2>
                <p className="section-body">
                  Book directly on our domain. We hold seats for dinner, cocktails, and immersive listening sessions.
                </p>

                <div className="reservation-card">
                  <div className="reservation-glow"></div>

                  <div style={{position: 'relative', zIndex: 2}}>
                    <h3 style={{fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem'}}>Select Your Frequency</h3>
                    <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '500px'}}>
                      Choose your date, party size, and preferred seating zone. Instant confirmation sent via WhatsApp / Email.
                    </p>

                    <form
                      id="reservationForm"
                      name="reservation"
                      method="post"
                      action="/api/reservations"
                      onSubmit={(e) => { (window as any).handleReservationSubmit?.(e); }}
                    >
                      <div className="booking-form-grid">
                        <div className="form-group">
                          <label className="form-label" htmlFor="bookName">Full name</label>
                          <input
                            type="text"
                            id="bookName"
                            name="name"
                            className="form-input"
                            required
                            autoComplete="name"
                            placeholder="Your name"
                            maxLength={80}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="bookEmail">Email</label>
                          <input
                            type="email"
                            id="bookEmail"
                            name="email"
                            className="form-input"
                            required
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@email.com"
                            maxLength={120}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="bookPhone">Phone</label>
                          <input
                            type="tel"
                            id="bookPhone"
                            name="phone"
                            className="form-input"
                            required
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="+91 98765 43210"
                            maxLength={20}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="bookDate">Date</label>
                          <input
                            type="date"
                            id="bookDate"
                            name="date"
                            className="form-input"
                            required
                            autoComplete="off"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="bookTime">Time</label>
                          <select
                            id="bookTime"
                            name="time"
                            className="form-select"
                            required
                            defaultValue="20:30"
                            autoComplete="off"
                          >
                            <option value="" disabled>Select time</option>
                            <option value="17:30">17:30 — Early Dinner</option>
                            <option value="19:00">19:00 — Sunset Session</option>
                            <option value="20:30">20:30 — Hi-Fi Listening</option>
                            <option value="22:00">22:00 — Late Nocturnal</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="bookGuests">Guests</label>
                          <select
                            id="bookGuests"
                            name="guests"
                            className="form-select"
                            required
                            defaultValue="2"
                            autoComplete="off"
                          >
                            <option value="" disabled>Select guests</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5">5 Guests</option>
                            <option value="6">6 Guests</option>
                            <option value="7+">7+ (Group / FAM)</option>
                          </select>
                        </div>

                        <div className="form-group form-group--full">
                          <label className="form-label" htmlFor="bookZone">Seating zone</label>
                          <select
                            id="bookZone"
                            name="zone"
                            className="form-select"
                            required
                            defaultValue="listening"
                            autoComplete="off"
                          >
                            <option value="" disabled>Select zone</option>
                            <option value="listening">Horn Listening Room</option>
                            <option value="counter">Bar Counter & Turntables</option>
                            <option value="dining">Intimate Dining Booth</option>
                          </select>
                        </div>

                        <div className="form-group form-group--full">
                          <label className="form-label" htmlFor="bookNotes">Notes <span className="form-hint">(optional)</span></label>
                          <textarea
                            id="bookNotes"
                            name="notes"
                            className="form-textarea"
                            rows={3}
                            maxLength={400}
                            placeholder="Allergies, celebration, accessibility needs…"
                            autoComplete="off"
                          />
                        </div>

                        <div className="form-actions">
                          <button type="submit" className="btn-submit-booking">
                            Confirm Reservation →
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
  );
}
