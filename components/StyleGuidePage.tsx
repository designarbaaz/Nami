// @ts-nocheck
'use client';

import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

export default function StyleGuidePage() {
  useEffect(() => {

        // Copy to Clipboard Utility
        function copyToClipboard(text, message) {
          navigator.clipboard.writeText(text).then(() => {
            showToast(message || 'Copied to clipboard!');
          }).catch(() => {
            showToast('Copied: ' + text);
          });
        }

        function showToast(msg) {
          const toast = document.getElementById('toast');
          toast.textContent = msg;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2200);
        }

        // Live Controls for Noise-texture.png
        function updateNoiseTexture(val) {
          const layer = document.getElementById('noise-layer');
          layer.style.opacity = val / 100;
          document.getElementById('grainVal').textContent = val + '%';
        }

        function updateBlendMode(mode) {
          const layer = document.getElementById('noise-layer');
          layer.style.mixBlendMode = mode;
          const spec = document.getElementById('specSample');
          if (spec) spec.style.mixBlendMode = mode;
          showToast('Blend mode: ' + mode);
        }

        function updateWarmth(val) {
          document.getElementById('warmth-layer').style.opacity = val / 100;
          document.getElementById('sepiaVal').textContent = val + '%';
        }

        let pitchActive = true;
        function toggleCanvasPitch() {
          pitchActive = !pitchActive;
          const btn = document.getElementById('toggleBgBtn');
          if (pitchActive) {
            document.body.style.backgroundColor = '#070707';
            btn.classList.add('active');
            btn.textContent = 'Pitch: #070707';
          } else {
            document.body.style.backgroundColor = '#121212';
            btn.classList.remove('active');
            btn.textContent = 'Pitch: #121212';
          }
        }

        // Type Tester Controls
        function updateTypeFamily(family) {
          const input = document.getElementById('liveTypeInput');
          input.style.fontFamily = family;
          const weightSelect = document.getElementById('weightSelect');
          if (family.includes('savate')) {
            weightSelect.innerHTML = `
              <option value="700_normal" selected>700 Bold</option>
              <option value="700_italic">700 Bold Italic</option>
              <option value="400_normal">400 Regular</option>
              <option value="400_italic">400 Regular Italic</option>
              <option value="300_normal">300 Light</option>
            `;
            updateTypeStyle('700_normal');
          } else {
            weightSelect.innerHTML = `
              <option value="900_normal">900 Black</option>
              <option value="700_normal" selected>700 Bold</option>
              <option value="600_normal">600 SemiBold</option>
              <option value="400_normal">400 Regular</option>
              <option value="300_normal">300 Light</option>
            `;
            updateTypeStyle('700_normal');
          }
        }

        function updateTypeStyle(val) {
          const parts = val.split('_');
          const input = document.getElementById('liveTypeInput');
          input.style.fontWeight = parts[0];
          input.style.fontStyle = parts[1] || 'normal';
        }

        function updateTypeSize(size) {
          document.getElementById('liveTypeInput').style.fontSize = size + 'px';
          document.getElementById('typeSizeVal').textContent = size + 'px';
        }

        // Populate Waveform Custom Font Glyphs
        const waveLetters = [
          { char: 'a', d: 'M 4 28 Q 24 6, 44 28' },
          { char: 'b', d: 'M 4 18 Q 24 4, 44 18 Q 24 38, 4 18 Z' },
          { char: 'c', d: 'M 44 14 Q 20 6, 10 24 Q 20 42, 44 34' },
          { char: 'd', d: 'M 10 14 Q 24 4, 40 24 Q 24 44, 10 34 Z' },
          { char: 'e', d: 'M 6 24 Q 24 10, 42 24 Q 24 38, 6 24 Z' },
          { char: 'f', d: 'M 10 40 Q 24 24, 24 8 Q 38 8, 40 20' },
          { char: 'g', d: 'M 40 10 Q 24 24, 24 40 Q 10 40, 8 28' },
          { char: 'h', d: 'M 6 8 Q 12 36, 24 20 Q 36 20, 42 40' },
          { char: 'i', d: 'M 24 16 L 24 40 M 24 8 A 2 2 0 1 0 24 12 A 2 2 0 1 0 24 8' },
          { char: 'j', d: 'M 30 16 L 30 36 Q 20 46, 10 38 M 30 8 A 2 2 0 1 0 30 12' },
          { char: 'k', d: 'M 8 8 L 8 40 M 36 12 Q 20 24, 10 24 Q 22 26, 38 40' },
          { char: 'l', d: 'M 24 6 L 24 38 Q 30 42, 38 38' },
          { char: 'm', d: 'M 4 36 Q 14 12, 24 24 Q 34 12, 44 36' },
          { char: 'n', d: 'M 6 36 Q 24 10, 42 36' },
          { char: 'o', d: 'M 6 24 Q 24 8, 42 24 Q 24 40, 6 24 Z' },
          { char: 'p', d: 'M 8 16 L 8 46 M 8 18 Q 24 6, 40 22 Q 24 36, 8 26' },
          { char: 'q', d: 'M 40 16 L 40 46 M 40 18 Q 24 6, 8 22 Q 24 36, 40 26' },
          { char: 'r', d: 'M 8 38 L 8 18 Q 20 12, 38 18' },
          { char: 's', d: 'M 38 14 Q 24 8, 12 20 Q 24 26, 36 32 Q 24 42, 10 36' },
          { char: 't', d: 'M 24 6 L 24 38 Q 28 42, 38 38 M 12 18 L 36 18' },
          { char: 'u', d: 'M 6 12 Q 24 38, 42 12' },
          { char: 'v', d: 'M 4 14 L 24 38 L 44 14' },
          { char: 'w', d: 'M 4 14 Q 14 38, 24 24 Q 34 38, 44 14' },
          { char: 'x', d: 'M 6 10 Q 24 24, 42 38 M 42 10 Q 24 24, 6 38' },
          { char: 'y', d: 'M 6 12 Q 24 36, 42 12 M 24 28 L 12 46' },
          { char: 'z', d: 'M 8 12 L 40 12 L 8 38 L 40 38' }
        ];

        const container = document.getElementById('waveGlyphsContainer');
        waveLetters.forEach(item => {
          const cell = document.createElement('div');
          cell.className = 'wave-cell';
          cell.innerHTML = `
            <svg className="wave-glyph-svg" viewBox="0 0 48 48">
              <path d="${item.d}" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span className="wave-char-label">${item.char.toUpperCase()}</span>
          `;
          container.appendChild(cell);
        });
  
        (window as any).copyToClipboard = copyToClipboard;
        (window as any).showToast = showToast;
        (window as any).updateNoiseTexture = updateNoiseTexture;
        (window as any).updateBlendMode = updateBlendMode;
        (window as any).updateWarmth = updateWarmth;
        (window as any).toggleCanvasPitch = toggleCanvasPitch;
        (window as any).updateTypeFamily = updateTypeFamily;
        (window as any).updateTypeStyle = updateTypeStyle;
        (window as any).updateTypeSize = updateTypeSize;

  }, []);

  return (
    <>
      <link rel="stylesheet" href="/assets/css/styleguide.css" />
      {/* High-Res Viewport Noise Layer using Noise-texture.png */}
        <div id="noise-layer"></div>

        {/* Warm Sepia Tone Analog Overlay */}
        <div id="warmth-layer"></div>

        {/* Header with Official Main-logo.svg */}
        <header className="site-header">
          <a href="#hero" className="brand-logo-wrap">
            <img src="/assets/Main-logo.svg" alt="Nami Logo" className="brand-logo-img" />
            <span className="brand-badge">BRAND ASSETS ACTIVE</span>
          </a>

          <nav className="header-nav">
            <a href="#logo">Logo & Mark</a>
            <a href="#textures">Noise Texture</a>
            <a href="#colors">Colors</a>
            <a href="#gradients">Gradients</a>
            <a href="#typography">Typography</a>
            <a href="#wavefont">Waveform Font</a>
            <a href="#cymatics">Cymatics</a>
            <a href="#components">UI Preview</a>
          </nav>

          <a href="#components" className="btn-reserve-header">Preview Mode</a>
        </header>

        <div className="container">

          {/* Interactive Atmosphere Bar */}
          <div className="controls-bar">
            <div className="control-group">
              <span className="control-label">Noise Opacity:</span>
              <input type="range" id="grainSlider" className="control-slider" min="0" max="100" defaultValue="100" onInput={(e) => { (window as any).updateNoiseTexture?.(e.currentTarget.value) }} />
              <span id="grainVal" className="control-label" style={{color: '#fff', minWidth: '38px'}}>100%</span>
            </div>

            <div className="control-group">
              <span className="control-label">Blend Mode:</span>
              <select id="blendSelect" className="control-switch" defaultValue="screen" onChange={(e) => { (window as any).updateBlendMode?.(e.currentTarget.value) }}>
                <option value="screen">Screen</option>
                <option value="overlay">Overlay</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div className="control-group">
              <span className="control-label">Sepia Warmth:</span>
              <input type="range" id="sepiaSlider" className="control-slider" min="0" max="80" defaultValue="50" onInput={(e) => { (window as any).updateWarmth?.(e.currentTarget.value) }} />
              <span id="sepiaVal" className="control-label" style={{color: '#fff', minWidth: '32px'}}>50%</span>
            </div>

            <div className="control-group">
              <button id="toggleBgBtn" className="control-switch active" onClick={(e) => { const event = e; (window as any).toggleCanvasPitch?.() }}>Pitch: #070707</button>
            </div>
          </div>

          {/* Hero Banner */}
          <section id="hero" className="hero-banner">
            <div className="hero-wave-canvas"></div>
      
            {/* Vector Wave Asset from ./assets/Vector.png */}
            <img src="/assets/Vector.png" alt="Nami Vector Wave" className="hero-vector-art" onError={(e) => { const event = e; this.style.display='none' }} />

            <div className="hero-content">
              {/* Official Main-logo.svg in Hero */}
              <img src="/assets/Main-logo.svg" alt="NAMI" className="hero-logo-display" />

              <div className="hero-tagline">Sensory Provocateur · Hi-Fi Listening Venue</div>
              <h1 className="hero-headline">Every ripple has a <span className="grad-text">rhythm</span>.<br />Every rhythm has a <span className="grad-text">flavour</span>.</h1>
              <p className="hero-sub">
                Nami is an immersive environment where high-fidelity sound, experimental culinary craft, and nocturnal culture collide. 
                Sophisticated without being formal, experimental without being intimidating, and energetic without being loud for the sake of it.
              </p>

              <div className="hero-pills">
                <span className="hero-pill">01 / CURIOUS</span>
                <span className="hero-pill">02 / SENSUAL</span>
                <span className="hero-pill">03 / ELECTRIC</span>
                <span className="hero-pill">04 / SOPHISTICATED</span>
                <span className="hero-pill">05 / PLAYFUL</span>
                <span className="hero-pill">06 / INCLUSIVE</span>
              </div>
            </div>
          </section>

          {/* SECTION: MAIN LOGO & FAVICON SYSTEM */}
          <section id="logo">
            <div className="section-eyebrow">Identity System · 01</div>
            <h2 className="section-title">Main Logo & Brand Mark</h2>
            <p className="section-desc">
              The official vector assets <strong>Main-logo.svg</strong> and <strong>favicon.svg</strong> define Nami’s visual equilibrium. 
              The logo operates strictly in Black & White with mandatory protective breathing space.
            </p>

            <div className="logo-showcase-grid">

              {/* Main Logo Card */}
              <div className="logo-card-display">
                <div>
                  <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.72rem', color: 'var(--c-orange)', marginBottom: '0.4rem'}}>PRIMARY WORDMARK</div>
                  <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem'}}>Main-logo.svg (White on Black)</h3>
                  <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem'}}>
                    The custom lettering acts as an acoustic soundwave. It must never be skewed, outlined, or distorted.
                  </p>
                </div>

                <div className="logo-safe-box">
                  <span className="logo-safe-box-tag">PROTECTED CLEARANCE ZONE</span>
                  <img src="/assets/Main-logo.svg" alt="Nami Main Logo" style={{maxWidth: '80%', height: 'auto'}} />
                </div>

                <div className="logo-safe-box inverse">
                  <span className="logo-safe-box-tag" style={{color: '#666'}}>INVERSE (BLACK ON WHITE)</span>
                  <img src="/assets/Main-logo.svg" alt="Nami Main Logo Inverse" style={{maxWidth: '80%', height: 'auto'}} />
                </div>

                <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem'}}>
                  <span>Asset: Main-logo.svg</span>
                  <span style={{color: 'var(--c-orange)', cursor: 'pointer'}} onClick={(e) => { const event = e; (window as any).copyToClipboard?.('/assets/Main-logo.svg', 'Copied Main-logo.svg path') }}>Click to copy path</span>
                </div>
              </div>

              {/* Favicon & Brand Mark Card */}
              <div className="favicon-showcase-box">
                <div>
                  <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.72rem', color: 'var(--c-orange)', marginBottom: '0.4rem'}}>BRAND MARK & ICON</div>
                  <h3 style={{fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.5rem'}}>favicon.svg</h3>
                  <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5}}>
                    The mirrored acoustic waveform mark functions as the browser favicon, mobile app icon, cocktail garnish stamp, and social avatar.
                  </p>
                </div>

                <div className="favicon-avatar-row">
                  {/* Circular Avatar with Glow */}
                  <div className="favicon-circle" title="Social Avatar / Coaster Mark">
                    <img src="/assets/favicon.svg" alt="Nami Favicon" />
                  </div>

                  {/* Square App Icon */}
                  <div className="favicon-square" title="App Icon / Favicon">
                    <img src="/assets/favicon.svg" alt="Nami Favicon" />
                  </div>

                  <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--text-secondary)'}}>
                    <div>• Browser Favicon</div>
                    <div>• Wax Seal / Stamp</div>
                    <div>• Social Avatar</div>
                  </div>
                </div>

                <div className="texture-code-block" style={{marginTop: '1rem'}}>
{`&lt;!-- Browser Favicon Integration --&gt;
      &lt;link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"&gt;`}
</div>

                <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '1.5rem'}}>
                  <span>Asset: favicon.svg</span>
                  <span style={{color: 'var(--c-orange)', cursor: 'pointer'}} onClick={(e) => { const event = e; (window as any).copyToClipboard?.('/assets/favicon.svg', 'Copied favicon.svg path') }}>Click to copy path</span>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: NOISE TEXTURE SPOTLIGHT */}
          <section id="textures">
            <div className="section-eyebrow">Tactile Foundation · 02</div>
            <h2 className="section-title">Background Noise Texture</h2>
            <p className="section-desc">
              Coated with the official <strong>Noise-texture.png</strong> (2268 × 7239 px) asset, providing genuine analog vinyl grain across the dark nocturnal canvas.
            </p>

            <div className="texture-spotlight-box">
              <div className="texture-spec-card">
                <div className="texture-spec-sample" id="specSample"></div>
                <div>
                  <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.72rem', color: 'var(--c-orange)', marginBottom: '0.4rem'}}>OFFICIAL ASSET SPEC</div>
                  <div style={{fontSize: '1.35rem', fontWeight: 700}}>Noise-texture.png</div>
                </div>
                <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '0.75rem'}}>
                  Resolution: 2268 × 7239 px · Format: 8-bit RGBA PNG
                </div>
              </div>

              <div>
                <div style={{fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem'}}>CSS Implementation:</div>
                <p style={{fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5}}>
                  Applied both to the root <code>body</code> background and as a fixed viewport overlay with <code>mix-blend-mode: screen</code> to deliver uninterrupted grain texture from the top to bottom of the page.
                </p>
                <div className="texture-code-block">
{`/* Applied Noise-texture.png on Dark Canvas */
      body {
        background-color: #070707;
        background-image: 
          radial-gradient(circle at 50% 0%, rgba(232, 66, 67, 0.15), transparent 75%),
          url('/assets/Noise-texture.png');
        background-repeat: no-repeat, repeat;
        background-position: center top, center top;
        background-size: 100% 900px, 100% auto;
      }

      #noise-layer {
        position: fixed;
        inset: 0;
        pointer-events: none;
        background: url('/assets/Noise-texture.png') repeat center top;
        background-size: 100% auto;
        mix-blend-mode: screen;
      }`}
</div>
              </div>
            </div>
          </section>

          {/* SECTION: COLOR PALETTE */}
          <section id="colors">
            <div className="section-eyebrow">Visual Foundation · 03</div>
            <h2 className="section-title">Color Palette</h2>
            <p className="section-desc">
              The Nami palette operates as a nocturnal canvas punctuated by vivid bursts of frequency and energy. 
              Focus is primarily on the first three fiery colors, with pink and cobalt reserved for resonance highlights.
            </p>

            <div className="rule-callout">
              <div className="rule-icon">⚠️</div>
              <div>
                <div className="rule-title">STRICT BRAND USAGE RULE</div>
                <div className="rule-desc">
                  <strong>Do not use flat colors.</strong> Stick strictly to approved gradients blending across these hex coordinates against nocturnal black backgrounds.
                </div>
              </div>
            </div>

            {/* Color Swatches Grid */}
            <div className="color-section-grid">

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#E84243', 'Hex #E84243') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#E84243'}}></div>
                <div className="color-meta">
                  <div className="color-name">Hi-Fi Coral Red</div>
                  <div className="color-role">Primary Wave 01</div>
                  <div className="color-values">
                    <span>#E84243</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#E65500', 'Hex #E65500') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#E65500'}}></div>
                <div className="color-meta">
                  <div className="color-name">Pulse Amber-Red</div>
                  <div className="color-role">Primary Wave 02</div>
                  <div className="color-values">
                    <span>#E65500</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#F48F24', 'Hex #F48F24') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#F48F24'}}></div>
                <div className="color-meta">
                  <div className="color-name">Frequency Orange</div>
                  <div className="color-role">Primary Wave 03</div>
                  <div className="color-values">
                    <span>#F48F24</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#FFAABD', 'Hex #FFAABD') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#FFAABD'}}></div>
                <div className="color-meta">
                  <div className="color-name">Resonance Pink</div>
                  <div className="color-role">Highlight Accent 04</div>
                  <div className="color-values">
                    <span>#FFAABD</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#004F9D', 'Hex #004F9D') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#004F9D'}}></div>
                <div className="color-meta">
                  <div className="color-name">Soundwave Cobalt</div>
                  <div className="color-role">Highlight Accent 05</div>
                  <div className="color-values">
                    <span>#004F9D</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

              <div className="color-card" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('#070707', 'Hex #070707') }}>
                <div className="color-swatch-box" style={{backgroundColor: '#070707', borderBottom: '1px solid var(--border-subtle)'}}></div>
                <div className="color-meta">
                  <div className="color-name">Nocturnal Pitch</div>
                  <div className="color-role">Canvas Foundation</div>
                  <div className="color-values">
                    <span>#070707</span>
                    <span className="copy-hint">Click to copy</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: GRADIENTS */}
          <section id="gradients">
            <div className="section-eyebrow">Fluid Dynamics · 04</div>
            <h2 className="section-title">Brand Gradients</h2>
            <p className="section-desc">
              Gradients simulate sound vibrations and organic thermal waves. They move seamlessly between hues without sharp stepped breaks.
            </p>

            <div className="gradients-grid">

              <div className="gradient-card">
                <div className="gradient-preview" style={{background: 'var(--grad-primary)'}}></div>
                <div className="gradient-info">
                  <div className="gradient-name">Signature Nami Flare</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>
                    Primary gradient for CTAs, hero typography, and active highlights.
                  </div>
                  <div className="gradient-code" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('linear-gradient(135deg, #E84243 0%, #E65500 48%, #F48F24 100%)', 'CSS Gradient Copied!') }}>
                    linear-gradient(135deg, #E84243 0%, #E65500 48%, #F48F24 100%)
                  </div>
                </div>
              </div>

              <div className="gradient-card">
                <div className="gradient-preview" style={{background: 'var(--grad-resonance)'}}></div>
                <div className="gradient-info">
                  <div className="gradient-name">Harmonic Resonance</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>
                    Sound-reactive gradient for album artwork, flyers, and nocturnal glows.
                  </div>
                  <div className="gradient-code" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('linear-gradient(135deg, #004F9D 0%, #E84243 50%, #FFAABD 100%)', 'CSS Gradient Copied!') }}>
                    linear-gradient(135deg, #004F9D 0%, #E84243 50%, #FFAABD 100%)
                  </div>
                </div>
              </div>

              <div className="gradient-card">
                <div className="gradient-preview" style={{background: 'var(--grad-flare)'}}></div>
                <div className="gradient-info">
                  <div className="gradient-name">Atmospheric Frequency</div>
                  <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem'}}>
                    Used for fluid backdrop ribbons and lighting washes.
                  </div>
                  <div className="gradient-code" onClick={(e) => { const event = e; (window as any).copyToClipboard?.('linear-gradient(135deg, #F48F24 0%, #FFAABD 50%, #004F9D 100%)', 'CSS Gradient Copied!') }}>
                    linear-gradient(135deg, #F48F24 0%, #FFAABD 50%, #004F9D 100%)
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION: TYPOGRAPHY */}
          <section id="typography">
            <div className="section-eyebrow">Language & Rhythm · 05</div>
            <h2 className="section-title">Brand Typography: Savate & Chivo</h2>
            <p className="section-desc">
              Nami operates on a complementary two-typeface system: <strong>Savate</strong> defines the poetic, editorial voice of all headings, titles, and artist spotlights, while <strong>Chivo</strong> provides functional clarity across body text, menu descriptions, forms, and metadata.
            </p>

            {/* Sub-section: Headings (Savate) */}
            <div style={{marginTop: '2.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem'}}>
                <h3 style={{fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF'}}>
                  Primary Headings Typeface: Savate
                </h3>
                <span style={{fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--c-orange)', fontWeight: 700}}>
                  Adobe Typekit: "savate", sans-serif
                </span>
              </div>
        
              <table className="typo-spec-table">
                <thead>
                  <tr>
                    <th>Role / Level</th>
                    <th>Style & Weight</th>
                    <th>Sample Rendering</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="typo-role">Display / Hero H1</td>
                    <td className="typo-meta">Savate 700 Bold · 48px</td>
                    <td className="typo-sample" style={{fontFamily: '\'savate\', sans-serif', fontSize: '2.4rem', fontWeight: 700, color: '#FFFFFF'}}>
                      A Sensory Provocateur
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Editorial Accent</td>
                    <td className="typo-meta">Savate 700 Bold Italic · 36px</td>
                    <td className="typo-sample" style={{fontFamily: '\'savate\', sans-serif', fontSize: '2rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--c-pink)'}}>
                      Where sound & nocturnal culture collide
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Section Headings</td>
                    <td className="typo-meta">Savate 400 Regular · 30px</td>
                    <td className="typo-sample" style={{fontFamily: '\'savate\', sans-serif', fontSize: '1.75rem', fontWeight: 400, color: '#FFFFFF'}}>
                      Weekly Programming & Resonance Menu
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Sonic / Tasting Notes</td>
                    <td className="typo-meta">Savate 400 Regular Italic · 22px</td>
                    <td className="typo-sample" style={{fontFamily: '\'savate\', sans-serif', fontSize: '1.35rem', fontWeight: 400, fontStyle: 'italic', color: 'var(--c-orange)'}}>
                      Aged Hamachi Crudo · Paired with Ambient Dub Techno
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Atmospheric Display</td>
                    <td className="typo-meta">Savate 300 Light · 24px</td>
                    <td className="typo-sample" style={{fontFamily: '\'savate\', sans-serif', fontSize: '1.45rem', fontWeight: 300, color: '#E0E0E0'}}>
                      Every ripple has a rhythm. Every rhythm has a flavour.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sub-section: Body & System (Chivo) */}
            <div style={{marginTop: '3.5rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem'}}>
                <h3 style={{fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF'}}>
                  Body & Interface Typeface: Chivo
                </h3>
                <span style={{fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--c-orange)', fontWeight: 700}}>
                  Google Fonts: 'Chivo', sans-serif
                </span>
              </div>

              <table className="typo-spec-table">
                <thead>
                  <tr>
                    <th>Role / Level</th>
                    <th>Style & Weight</th>
                    <th>Sample Rendering</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="typo-role">Lead Narrative / Subtitle</td>
                    <td className="typo-meta">Chivo 500 Medium · 18px</td>
                    <td className="typo-sample" style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '1.1rem', fontWeight: 500, color: '#E0E0E0'}}>
                      Part listening room, part cocktail bar, part dining experience, part cultural gathering.
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Body Copy</td>
                    <td className="typo-meta">Chivo 300 Light · 15px</td>
                    <td className="typo-sample" style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.95rem', fontWeight: 300, lineHeight: 1.6, color: '#B0B0B0'}}>
                      Nami feels like a place with its own frequency. It does not simply serve food, drinks or music; it creates an environment where these elements collide, overlap and influence one another.
                    </td>
                  </tr>
                  <tr>
                    <td className="typo-role">Navigation / UI Tags</td>
                    <td className="typo-meta">Chivo 700 Bold · 13px (Caps)</td>
                    <td className="typo-sample" style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--c-orange)', textTransform: 'uppercase'}}>
                      [ 440 HZ ] · 20:30 ONWARDS · STEREO HORN HI-FI
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Interactive Type Tester */}
            <div className="type-tester-box" style={{marginTop: '3rem'}}>
              <div className="type-tester-controls">
                <span className="control-label">Live Type Previewer:</span>
          
                <select id="fontFamilySelect" className="control-switch" defaultValue="'savate', sans-serif" onChange={(e) => { (window as any).updateTypeFamily?.(e.currentTarget.value) }}>
                  <option value="'savate', sans-serif">Savate (Headings)</option>
                  <option value="'Chivo', sans-serif">Chivo (Body)</option>
                </select>

                <select id="weightSelect" className="control-switch" defaultValue="700_normal" onChange={(e) => { (window as any).updateTypeStyle?.(e.currentTarget.value) }}>
                  <option value="700_normal">700 Bold</option>
                  <option value="700_italic">700 Bold Italic</option>
                  <option value="400_normal">400 Regular</option>
                  <option value="400_italic">400 Regular Italic</option>
                  <option value="300_normal">300 Light</option>
                </select>

                <input type="range" min="18" max="72" defaultValue="38" className="control-slider" onInput={(e) => { (window as any).updateTypeSize?.(e.currentTarget.value) }} />
                <span id="typeSizeVal" className="control-label" style={{color: '#fff'}}>38px</span>
              </div>

              <textarea id="liveTypeInput" className="type-tester-input" spellCheck={false} style={{fontFamily: '\'savate\', sans-serif', fontWeight: 700}} defaultValue="Every ripple has a rhythm. Every rhythm has a flavour." />
            </div>
          </section>

          {/* SECTION: CUSTOM WAVEFORM FONT */}
          <section id="wavefont">
            <div className="section-eyebrow">Acoustic Orthography · 06</div>
            <h2 className="section-title">Custom Waveform Font</h2>
            <p className="section-desc">
              Operating on fundamental acoustic laws, each letter vibrates along the X and Y axes. 
              Its fundamental use is for <strong>aesthetic expression and texture</strong> rather than purely functional legibility.
            </p>

            <div className="wave-font-container">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem'}}>
                <h3 style={{fontSize: '1.15rem', fontWeight: 700}}>Lower Case Wave Glyphs (A – Z)</h3>
                <span style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)'}}>Symmetric Wave Distribution</span>
              </div>

              <div className="wave-grid" id="waveGlyphsContainer">
                {/* Dynamically populated glyphs */}
              </div>

              <div style={{marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between'}}>
                <div style={{maxWidth: '480px'}}>
                  <div style={{fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', color: '#fff'}}>Baseline Axis Rule</div>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5}}>
                    Glyphs must align along the central horizontal equilibrium axis (red baseline). 
                    Stretching, skewing, or misaligning letterforms breaks the physical wave equation.
                  </p>
                </div>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                  <div style={{padding: '0.75rem 1.25rem', background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px'}}>
                    <span style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.7rem', color: '#4ade80'}}>✓ CORRECT: Centered Equilibrium</span>
                  </div>
                  <div style={{padding: '0.75rem 1.25rem', background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px'}}>
                    <span style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.7rem', color: '#f87171'}}>✕ INCORRECT: Skewed Wave Baseline</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: CYMATICS & BRAND ICONS */}
          <section id="cymatics">
            <div className="section-eyebrow">Sonic Geometry · 07</div>
            <h2 className="section-title">Cymatic Shapes & Brand Icons</h2>
            <p className="section-desc">
              Visualizing acoustic frequencies made physical. These sacred resonance patterns represent pure sound harmonics captured on matter.
            </p>

            <div className="cymatic-grid">

              <div className="cymatic-card">
                <svg className="cymatic-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" strokeWidth="1.8"/>
                  <circle cx="50" cy="50" r="26" strokeWidth="1.2" strokeDasharray="2 3"/>
                  <path d="M 50 12 C 55 25, 75 25, 75 50 C 75 75, 55 75, 50 88 C 45 75, 25 75, 25 50 C 25 25, 45 25, 50 12 Z" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="4" fill="#FFF"/>
                </svg>
                <div className="cymatic-title">Harmonic 01</div>
                <div className="cymatic-sub">440 Hz · Grounded Root</div>
              </div>

              <div className="cymatic-card">
                <svg className="cymatic-svg" viewBox="0 0 100 100">
                  <path d="M 50 8 C 65 35, 92 50, 92 50 C 92 50, 65 65, 50 92 C 35 65, 8 50, 8 50 C 8 50, 35 35, 50 8 Z" strokeWidth="1.8"/>
                  <path d="M 22 22 C 38 38, 62 38, 78 22 C 62 38, 62 62, 78 78 C 62 62, 38 62, 22 78 C 38 62, 38 38, 22 22 Z" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="3" fill="#FFF"/>
                </svg>
                <div className="cymatic-title">Harmonic 02</div>
                <div className="cymatic-sub">528 Hz · Mirrored Ripple</div>
              </div>

              <div className="cymatic-card">
                <svg className="cymatic-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="34" strokeWidth="1.5"/>
                  <circle cx="50" cy="50" r="22" strokeWidth="1.8"/>
                  <path d="M 15 50 Q 50 15, 85 50 Q 50 85, 15 50 Z" strokeWidth="1.2"/>
                  <path d="M 50 15 Q 85 50, 50 85 Q 15 50, 50 15 Z" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="3" fill="#FFF"/>
                </svg>
                <div className="cymatic-title">Harmonic 03</div>
                <div className="cymatic-sub">980 Hz · Resonant Node</div>
              </div>

              <div className="cymatic-card">
                <svg className="cymatic-svg" viewBox="0 0 100 100">
                  <path d="M 20 20 Q 50 35, 80 20 Q 65 50, 80 80 Q 50 65, 20 80 Q 35 50, 20 20 Z" strokeWidth="1.6"/>
                  <circle cx="50" cy="50" r="16" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="3" fill="#FFF"/>
                </svg>
                <div className="cymatic-title">Harmonic 04</div>
                <div className="cymatic-sub">1760 Hz · Expansive Wave</div>
              </div>

              <div className="cymatic-card">
                <svg className="cymatic-svg" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" strokeWidth="1.5" strokeDasharray="6 4"/>
                  <path d="M 50 15 L 85 50 L 50 85 L 15 50 Z" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="28" strokeWidth="1.2"/>
                  <circle cx="50" cy="50" r="5" fill="none" strokeWidth="1.5"/>
                </svg>
                <div className="cymatic-title">Harmonic 05</div>
                <div className="cymatic-sub">3968 Hz · Nocturnal Zenith</div>
              </div>

            </div>

            {/* Infinite Logo Wave Pattern */}
            <div className="pattern-showcase">
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <span style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', color: 'var(--c-orange)'}}>INFINITE WAVE PATTERN</span>
                <span style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.7rem', color: 'var(--text-muted)'}}>Tessellating Brand Monogram</span>
              </div>

              <div className="pattern-track">
                <div className="pattern-segment">
                  <svg viewBox="0 0 800 120" style={{width: '100%', height: 'auto', stroke: '#FFFFFF', fill: 'none', strokeWidth: 3.5, strokeLinecap: 'round'}}>
                    <path d="M 0 60 C 25 20, 50 20, 75 60 C 100 100, 125 100, 150 60 C 175 20, 200 20, 225 60 C 250 100, 275 100, 300 60 C 325 20, 350 20, 375 60 C 400 100, 425 100, 450 60 C 475 20, 500 20, 525 60 C 550 100, 575 100, 600 60 C 625 20, 650 20, 675 60 C 700 100, 725 100, 750 60 C 775 20, 800 20, 825 60"/>
                    <path d="M 0 60 C 25 100, 50 100, 75 60 C 100 20, 125 20, 150 60 C 175 100, 200 100, 225 60 C 250 20, 275 20, 300 60 C 325 100, 350 100, 375 60 C 400 20, 425 20, 450 60 C 475 100, 500 100, 525 60 C 550 20, 575 20, 600 60 C 625 100, 650 100, 675 60 C 700 20, 725 20, 750 60 C 775 100, 800 100, 825 60" opacity="0.4"/>
                  </svg>
                </div>
                <div className="pattern-segment">
                  <svg viewBox="0 0 800 120" style={{width: '100%', height: 'auto', stroke: '#FFFFFF', fill: 'none', strokeWidth: 3.5, strokeLinecap: 'round'}}>
                    <path d="M 0 60 C 25 20, 50 20, 75 60 C 100 100, 125 100, 150 60 C 175 20, 200 20, 225 60 C 250 100, 275 100, 300 60 C 325 20, 350 20, 375 60 C 400 100, 425 100, 450 60 C 475 20, 500 20, 525 60 C 550 100, 575 100, 600 60 C 625 20, 650 20, 675 60 C 700 100, 725 100, 750 60 C 775 20, 800 20, 825 60"/>
                    <path d="M 0 60 C 25 100, 50 100, 75 60 C 100 20, 125 20, 150 60 C 175 100, 200 100, 225 60 C 250 20, 275 20, 300 60 C 325 100, 350 100, 375 60 C 400 20, 425 20, 450 60 C 475 100, 500 100, 525 60 C 550 20, 575 20, 600 60 C 625 100, 650 100, 675 60 C 700 20, 725 20, 750 60 C 775 100, 800 100, 825 60" opacity="0.4"/>
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: UI COMPONENT PREVIEWS */}
          <section id="components">
            <div className="section-eyebrow">Practical Application · 08</div>
            <h2 className="section-title">UI Component Implementation</h2>
            <p className="section-desc">
              How brand elements integrate in real web components: the Resonance Menu item card and the What’s On event ticket.
            </p>

            <div className="mockup-grid">

              {/* Mockup 1: Resonance Menu Card */}
              <div className="menu-card-preview">
                <img src="/assets/Vector.png" alt="Wave Gradient Accent" className="menu-card-wave-bg" onError={(e) => { const event = e; this.style.display='none' }} />

                <div className="menu-header">
                  <div>
                    <div className="menu-title">The Resonance Menu</div>
                    <div style={{fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem'}}>Food · Cocktails · Frequencies</div>
                  </div>
                  <div className="menu-freq-tag">CHEVRON 01</div>
                </div>

                <div className="menu-item">
                  <div className="menu-item-row">
                    <span className="menu-item-name">Charred Koji-Glazed Root Vegetables</span>
                    <span className="menu-item-price">700</span>
                  </div>
                  <div className="menu-item-desc">Smoked carrot, black garlic, fermented chili oil, toasted sesame</div>
                  <div className="menu-item-sonic">Grounded · Warm · Resonant</div>
                </div>

                <div className="menu-item">
                  <div className="menu-item-row">
                    <span className="menu-item-name">Aged Hamachi Crudo</span>
                    <span className="menu-item-price">1500</span>
                  </div>
                  <div className="menu-item-desc">Yuzu kosho, preserved citrus, kombu oil, shaved fennel</div>
                  <div className="menu-item-sonic">Textural · Umami · Expansive</div>
                </div>

                <div className="menu-item">
                  <div className="menu-item-row">
                    <span className="menu-item-name">Charcoal-Grilled Duck Breast</span>
                    <span className="menu-item-price">2100</span>
                  </div>
                  <div className="menu-item-desc">Tamarind glaze, sour cherry, smoked tea jus</div>
                  <div className="menu-item-sonic">Bright · Electric · Forward</div>
                </div>

                <div className="menu-item">
                  <div className="menu-item-row">
                    <span className="menu-item-name">Dark Chocolate & Black Sesame Crémeux</span>
                    <span className="menu-item-price">950</span>
                  </div>
                  <div className="menu-item-desc">Malted barley crumble, honeycomb, sea salt</div>
                  <div className="menu-item-sonic">Lingering · Warm · Satisfying</div>
                </div>
              </div>

              {/* Mockup 2: What's On Event Ticket */}
              <div className="event-card-preview">
                <div className="event-glow"></div>

                <div>
                  <div className="event-date-row">
                    <span>FRIDAY · 20 JAN 2026</span>
                    <span>3968 HZ · BPM 126</span>
                  </div>

                  <div className="event-artist-name">Yousuke<br />Yukimatsu</div>

                  <p style={{color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem'}}>
                    Tokyo underground selector bridging avant-garde techno, noise textures, and cinematic bass frequencies through Nami’s custom horn sound system.
                  </p>

                  <div className="event-tags">
                    <span className="event-tag">HI-FI LISTENING</span>
                    <span className="event-tag">20:30 ONWARDS</span>
                    <span className="event-tag">EXCLUSIVE TASTE</span>
                  </div>
                </div>

                <div className="event-cta-row">
                  <button className="btn-reserve-full" onClick={(e) => { const event = e; (window as any).showToast?.('Table Reservation Drawer Opened') }}>
                    Reserve a Table
                  </button>

                  <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp-pill">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.882 2.796.882 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.768-5.77-5.768zm0 10.375c-.911 0-1.637-.251-2.457-.75l-.176-.107-1.579.414.421-1.54-.117-.186c-.544-.863-.834-1.572-.833-2.44 0-2.541 2.067-4.608 4.609-4.608 2.541 0 4.609 2.067 4.609 4.608 0 2.541-2.068 4.609-4.609 4.609z"/>
                    </svg>
                    WhatsApp Community
                  </a>
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Toast Notification */}
        <div id="toast">Copied to clipboard</div>

    </>
  );
}
