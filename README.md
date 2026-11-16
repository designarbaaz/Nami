# NAMI — Hi-Fi Listening Room & Dining Experience

> Part listening room, part cocktail bar, part dining experience. An intimate sanctuary where sound, flavour, and nocturnal culture collide on their own frequency.

Benchmark: [Spin Bar (Amsterdam)](https://www.spin-bar.nl/)

---

## 🎧 Features & Deliverables
- **Homepage (`index.html`)**:
  - Centerpiece `Main-logo.svg` hero entrance with looping turntable video background (`assets/vinyl-loop.mp4`).
  - Hardware-accelerated multi-plane parallax scroll effect (`requestAnimationFrame` & `translate3d`).
  - Top-right circular section scroller `( I )` ~ `( P )` ~ `( S )` ~ `( M )` ~ `( R )` with 1.5px border and fluid wave connectors (`wave-1.svg` & `wave-2.svg`).
  - 42px borderless wave hamburger menu trigger (`assets/Menu-io.svg`) with full-screen slide-out drawer.
  - Minimalist brand story fold: *"We Don't Host Nights. We Compose Them."* with `OUR STORY` pill action.
  - Full-bleed 3-column photography gallery matching Spin Bar Amsterdam with integrated horn loudspeaker acoustic specifications.
  - Interactive Web Audio API vinyl warmth synthesizer and live sound system status.
- **Brand Style Guide (`styleguide.html`)**:
  - Complete design system with color palette, typography hierarchy, UI components, and brand tokens.

---

## 🔤 Typography
- **Headings**: Adobe Typekit **Savate** (`font-family: "savate", sans-serif;`)
- **Body & Interface**: Google Fonts **Chivo** (`font-family: 'Chivo', sans-serif;`)

---

## 🚀 Live Demo on GitHub Pages
To enable GitHub Pages:
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select `Deploy from a branch`.
3. Choose branch `main` and folder `/ (root)`. Click **Save**.
4. The live site will be accessible at:
   - **Homepage**: `https://<your-username>.github.io/<repo-name>/`
   - **Style Guide**: `https://<your-username>.github.io/<repo-name>/styleguide.html`
