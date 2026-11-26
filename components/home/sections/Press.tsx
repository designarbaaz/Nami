// @ts-nocheck
"use client";

export default function Press() {
  return (
    <>
      <section id="press" className="section-media-mentions" aria-label="In the News and Media Mentions">
            <div className="media-mentions-container">
              
              {/* Slider Wrapper (One News Per Slide) */}
              <div className="media-slider-container" id="mediaSliderContainer">
                
                {/* Navigation Arrows (Left / Right) */}
                <button className="media-nav-arrow prev" id="mediaPrevBtn" aria-label="Previous article">
                  <img src="/assets/Arrow-left.svg" alt="Previous" width="22" height="22" className="nav-arrow-img" />
                </button>
      
                <button className="media-nav-arrow next" id="mediaNextBtn" aria-label="Next article">
                  <img src="/assets/Arrow-right.svg" alt="Next" width="22" height="22" className="nav-arrow-img" />
                </button>
      
                {/* Viewport */}
                <div className="media-slider-viewport">
                  <div className="media-slider-track" id="mediaSliderTrack">
      
                    {/* Slide 1: The Economic Times */}
                    <article className="media-slide is-active" data-index="0">
                      <div className="media-logo-wrap">
                        <svg className="media-logo-svg et-logo" viewBox="0 0 240 28" fill="currentColor" aria-label="The Economic Times">
                          <text x="0" y="21" fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', 'Times New Roman', Georgia, serif" fontSize="19" fontWeight="700" letterSpacing="0.4px">
                            <tspan fontSize="10.5" fontWeight="600" dy="-4.5" letterSpacing="1px">THE </tspan>
                            <tspan fontSize="19" fontWeight="700" dy="4.5">ECONOMIC TIMES</tspan>
                          </text>
                        </svg>
                      </div>
                      
                      <blockquote className="media-slide-quote">
                        “Mumbai’s nocturnal soundscape finds its definitive temple: Nami opens in Bandra with custom-engineered horn acoustics, rare Japanese vinyl pressings, and a boundary-blurring culinary philosophy.”
                      </blockquote>
      
                      <div className="media-card-action">
                        <a href="https://economictimes.indiatimes.com/" target="_blank" rel="noopener noreferrer" className="media-card-cta" aria-label="Read full article on The Economic Times">
                          <span>Read Full Article</span>
                          <svg className="media-cta-arrow" width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"/></svg>
                        </a>
                      </div>
                    </article>
      
                    {/* Slide 2: Business Today */}
                    <article className="media-slide" data-index="1">
                      <div className="media-logo-wrap">
                        <svg className="media-logo-svg bt-logo" viewBox="0 0 200 28" fill="currentColor" aria-label="Business Today">
                          <g transform="translate(0, 3)">
                            <path d="M4 1.5h3.6v7.2c1-.9 2.2-1.4 3.7-1.4 3.2 0 5.4 2.3 5.4 5.9 0 3.7-2.2 6-5.4 6-1.5 0-2.7-.5-3.7-1.4v1.2H4V1.5zm3.6 11.7c0 2 1.3 3.3 2.9 3.3 1.7 0 2.9-1.3 2.9-3.3 0-2-1.2-3.3-2.9-3.3-1.6 0-2.9 1.3-2.9 3.3z"/>
                            <path d="M21 4.5h3.6v2.8h3v3.1h-3v4.6c0 1 .4 1.5 1.4 1.5.6 0 1.1-.1 1.6-.3v3.2c-.8.3-1.9.4-2.8.4-2.4 0-3.8-1.2-3.8-3.8v-5.6H19V7.3h2V4.5z"/>
                            <line x1="33" y1="1" x2="33" y2="21" stroke="currentColor" strokeWidth="1.4" opacity="0.4"/>
                            <text x="42" y="16.5" fontFamily="'Chivo', sans-serif" fontSize="16.5" fontWeight="800" letterSpacing="-0.3px">Business Today</text>
                          </g>
                        </svg>
                      </div>
      
                      <blockquote className="media-slide-quote">
                        “Where analog frequencies meet sensory gastronomy — Nami redefines modern listening room culture with an uncompromising acoustic sanctuary crafted for deep nocturnal listening.”
                      </blockquote>
      
                      <div className="media-card-action">
                        <a href="https://www.businesstoday.in/" target="_blank" rel="noopener noreferrer" className="media-card-cta" aria-label="Read full article on Business Today">
                          <span>Read Full Article</span>
                          <svg className="media-cta-arrow" width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"/></svg>
                        </a>
                      </div>
                    </article>
      
                    {/* Slide 3: Mint Lounge */}
                    <article className="media-slide" data-index="2">
                      <div className="media-logo-wrap">
                        <svg className="media-logo-svg mint-logo" viewBox="0 0 160 28" fill="currentColor" aria-label="Mint Lounge">
                          <g transform="translate(0, 1)">
                            <rect x="0" y="2" width="40" height="22" rx="11" fill="rgba(255, 255, 255, 0.22)"/>
                            <text x="20" y="16.5" fontFamily="'Chivo', sans-serif" fontSize="11.5" fontWeight="800" fill="#c0c0c0" textAnchor="middle" letterSpacing="-0.2px">mint</text>
                            <text x="47" y="19" fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', 'Times New Roman', Georgia, serif" fontSize="20" fontWeight="700" letterSpacing="-0.5px">lounge</text>
                          </g>
                        </svg>
                      </div>
      
                      <blockquote className="media-slide-quote">
                        “Part Tokyo jazz kissa, part nocturnal cocktail bar: Inside Nami, where audiophile precision and charcoal-fired Japanese plates compose an unforgettable after-dark ritual.”
                      </blockquote>
      
                      <div className="media-card-action">
                        <a href="https://lifestyle.livemint.com/" target="_blank" rel="noopener noreferrer" className="media-card-cta" aria-label="Read full article on Mint Lounge">
                          <span>Read Full Article</span>
                          <svg className="media-cta-arrow" width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"/></svg>
                        </a>
                      </div>
                    </article>
      
                  </div>
                </div>
      
                {/* Pagination Dots (Interactive Indicator / Slider Navigation) */}
                <div className="media-pagination" role="tablist" aria-label="Press mentions pagination">
                  <button className="media-dot active" role="tab" aria-selected="true" aria-label="View slide 1: The Economic Times" data-index="0"></button>
                  <button className="media-dot" role="tab" aria-selected="false" aria-label="View slide 2: Business Today" data-index="1"></button>
                  <button className="media-dot" role="tab" aria-selected="false" aria-label="View slide 3: Mint Lounge" data-index="2"></button>
                </div>
      
              </div>
      
            </div>
          </section>
    </>
  );
}
