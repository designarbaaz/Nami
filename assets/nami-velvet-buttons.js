/**
 * NAMI Hi-Fi — Live WebGL Liquid Gradient Engine (Buttons + Headings)
 * - Floating Reservation CTA (.floating-reserve-cta / .floating-reserve-pill): Velvet Nightwave (with border, no shadow)
 * - All other gradient buttons: Midnight Rose Fold (borderless, no shadow)
 * - All gradient headings: Midnight Rose Fold (clipped text texture, motion: true)
 */
(function initNamiButtonGradients() {
  if (typeof window === "undefined" || window.__namiVelvetInit) return;
  window.__namiVelvetInit = true;

  const PRESETS = {
    velvetwave: {
      id: "velvetwave",
      name: "Velvet Nightwave",
      colors: ["#080C18", "#0E4B8E", "#8C2D52", "#D66824", "#0A2B5E"],
      angle: 0.42,
      grain: 0.18,
      warp: 0.55,
      motion: true,
      pocketX: 0.72,
      pocketY: 0.28,
      pocketRadius: 0.52
    },
    rosefold: {
      id: "rosefold",
      name: "Midnight Rose Fold",
      colors: ["#0047AB", "#111318", "#D98A9C", "#C2434A", "#0A5CBF"],
      angle: -0.52,
      grain: 0.12,
      warp: 0.3,
      motion: true,
      pocketX: 0.78,
      pocketY: 0.78,
      pocketRadius: 0.56
    }
  };

  const FLOATING_SELECTOR = ".floating-reserve-cta, .floating-reserve-pill";
  const BUTTON_SELECTOR = [
    ".btn-confirm-reserve",
    ".btn-our-story",
    ".btn-cal-explore",
    ".btn-event-explore",
    ".btn-col-popup-book",
    ".btn-reserve-from-menu",
    ".btn-cta-primary",
    ".btn-private-cta",
    ".btn-enquiry-submit"
  ].join(", ");

  const HEADING_SELECTOR = [
    ".section-heading span.grad-accent",
    ".philosophy-minimal-title span.grad-accent",
    ".reserve-modal-title span.grad-accent",
    ".reserve-modal-title span[style*='background-clip']",
    ".concept-hero-title .text-gradient",
    ".pillars-section-title .text-gradient",
    ".font-section-title .text-gradient",
    ".menu-page-title .text-gradient",
    ".gallery-page-title .text-gradient",
    ".event-list-title .text-gradient",
    ".previous-events-heading .grad-text",
    ".faq-display-title .text-gradient"
  ].join(", ");

  function injectStyles() {
    if (document.getElementById("nami-velvet-btn-styles")) return;
    const style = document.createElement("style");
    style.id = "nami-velvet-btn-styles";
    style.textContent = `
      [data-velvet-btn] {
        isolation: isolate;
        overflow: hidden;
        color: #FFFFFF !important;
        box-shadow: none !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.42);
      }
      [data-velvet-btn]:hover {
        box-shadow: none !important;
      }
      [data-velvet-btn][data-velvet-rel="1"] {
        position: relative;
      }
      [data-velvet-btn].has-velvet-canvas {
        background-image: none !important;
      }

      /* Floating Reservation CTA keeps Velvet Nightwave + glass border (no shadow) */
      [data-velvet-btn="velvetwave"] {
        border: 1px solid rgba(255, 255, 255, 0.22) !important;
      }
      [data-velvet-btn="velvetwave"].has-velvet-canvas {
        background-color: #080C18 !important;
      }

      /* All other gradient buttons use Midnight Rose Fold with zero border and zero shadow */
      [data-velvet-btn="rosefold"],
      [data-velvet-btn="rosefold"]:hover {
        border: none !important;
        outline: none;
        box-shadow: none !important;
      }
      [data-velvet-btn="rosefold"].has-velvet-canvas {
        background-color: #111318 !important;
      }

      /* Gradient headings use Midnight Rose Fold clipped to text */
      [data-rosefold-heading="rosefold"] {
        -webkit-background-clip: text !important;
        background-clip: text !important;
        color: transparent !important;
        -webkit-text-fill-color: transparent !important;
        background-size: 100% 100% !important;
        background-repeat: no-repeat !important;
        display: inline-block;
      }

      .nami-velvet-canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        pointer-events: none;
        border-radius: inherit;
        display: block;
      }
    `;
    document.head.appendChild(style);
  }

  function hexToVec3(hex) {
    const clean = hex.replace("#", "");
    return [
      parseInt(clean.slice(0, 2), 16) / 255,
      parseInt(clean.slice(2, 4), 16) / 255,
      parseInt(clean.slice(4, 6), 16) / 255
    ];
  }

  const GL_W = 640;
  const GL_H = 240;
  const glCanvas = document.createElement("canvas");
  glCanvas.width = GL_W;
  glCanvas.height = GL_H;
  const gl = glCanvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: true })
    || glCanvas.getContext("experimental-webgl", { preserveDrawingBuffer: true, antialias: true });

  let glProgram = null;
  const uniforms = {};

  if (gl) {
    const vertSrc = `
      attribute vec2 aPos;
      varying vec2 vUv;
      void main() {
        vUv = aPos * 0.5 + 0.5;
        gl_Position = vec4(aPos, 0.0, 1.0);
      }
    `;
    const fragSrc = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform float uGrain;
      uniform float uWarp;
      uniform float uAngle;
      uniform float uPocketX;
      uniform float uPocketY;
      uniform float uPocketRadius;
      uniform vec2 uResolution;
      uniform vec3 uC0;
      uniform vec3 uC1;
      uniform vec3 uC2;
      uniform vec3 uC3;
      uniform vec3 uC4;

      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * 0.1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }

      float vnoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        float a = hash12(i);
        float b = hash12(i + vec2(1.0, 0.0));
        float c = hash12(i + vec2(0.0, 1.0));
        float d = hash12(i + vec2(1.0, 1.0));
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main() {
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 p = vUv - 0.5;
        p.x *= aspect;

        float cs = cos(uAngle);
        float sn = sin(uAngle);
        vec2 r = vec2(p.x * cs - p.y * sn, p.x * sn + p.y * cs);

        float n1 = vnoise(p * 1.9 + vec2(uTime * 0.07, -uTime * 0.05));
        float n2 = vnoise(p * 4.2 + vec2(-uTime * 0.06, uTime * 0.08));

        float wave = sin(r.y * (3.8 + uWarp * 1.4) + (n1 - 0.5) * (2.6 * uWarp) + sin(r.x * 2.1 - uTime * 0.14) * 0.95);
        float ribbonCoord = clamp(0.5 + (r.y * 0.56) + wave * 0.25 + (n2 - 0.5) * 0.18 * uWarp, 0.0, 1.0);

        vec3 col = mix(uC0, uC1, smoothstep(0.04, 0.34, ribbonCoord));
        col = mix(col, uC2, smoothstep(0.30, 0.62, ribbonCoord));
        col = mix(col, uC3, smoothstep(0.58, 0.92, ribbonCoord));

        vec2 dp = (vUv - vec2(uPocketX, uPocketY)) + (vec2(n1, n2) - 0.5) * (0.16 * uWarp);
        dp.x *= 0.85;
        dp.y *= 1.15;
        float pocketMask = 1.0 - smoothstep(uPocketRadius * 0.42, uPocketRadius, length(dp));
        col = mix(col, uC4, clamp(pocketMask * 0.88, 0.0, 1.0));

        vec2 fineCoord = gl_FragCoord.xy + vec2(floor(mod(uTime * 4.0, 19.0)), 0.0);
        float gFine = hash12(fineCoord) - 0.5;
        float gCoarse = hash12(floor(fineCoord * 0.58)) - 0.5;
        float grain = (gFine * 0.68 + gCoarse * 0.32) * (uGrain * 1.12);
        col += vec3(grain);

        float vig = smoothstep(1.05, 0.24, length(vUv - 0.5));
        col *= mix(0.84, 1.0, vig);

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }

    const vs = compile(gl.VERTEX_SHADER, vertSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (vs && fs) {
      glProgram = gl.createProgram();
      gl.attachShader(glProgram, vs);
      gl.attachShader(glProgram, fs);
      gl.linkProgram(glProgram);
      if (gl.getProgramParameter(glProgram, gl.LINK_STATUS)) {
        gl.useProgram(glProgram);
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const aPos = gl.getAttribLocation(glProgram, "aPos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        ["uTime", "uGrain", "uWarp", "uAngle", "uPocketX", "uPocketY", "uPocketRadius", "uResolution", "uC0", "uC1", "uC2", "uC3", "uC4"]
          .forEach(name => { uniforms[name] = gl.getUniformLocation(glProgram, name); });
      } else {
        glProgram = null;
      }
    }
  }

  const fallbackTile = document.createElement("canvas");
  fallbackTile.width = GL_W;
  fallbackTile.height = GL_H;
  function paintFallback2D(preset, timeVal) {
    const ctx = fallbackTile.getContext("2d");
    if (!ctx) return;
    const shift = Math.sin(timeVal * 0.45) * 0.08;
    const grad = ctx.createLinearGradient(0, 0, GL_W, GL_H);
    grad.addColorStop(0.0, preset.colors[0]);
    grad.addColorStop(Math.max(0.12, 0.28 + shift), preset.colors[1]);
    grad.addColorStop(Math.min(0.75, 0.58 + shift), preset.colors[2]);
    grad.addColorStop(0.86, preset.colors[3]);
    grad.addColorStop(1.0, preset.colors[4]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GL_W, GL_H);
  }

  function renderMaster(preset, timeVal) {
    if (!gl || !glProgram) {
      paintFallback2D(preset, timeVal);
      return fallbackTile;
    }
    gl.viewport(0, 0, GL_W, GL_H);
    gl.useProgram(glProgram);
    gl.uniform1f(uniforms.uTime, timeVal);
    gl.uniform1f(uniforms.uGrain, preset.grain);
    gl.uniform1f(uniforms.uWarp, preset.warp);
    gl.uniform1f(uniforms.uAngle, preset.angle);
    gl.uniform1f(uniforms.uPocketX, preset.pocketX);
    gl.uniform1f(uniforms.uPocketY, preset.pocketY);
    gl.uniform1f(uniforms.uPocketRadius, preset.pocketRadius);
    gl.uniform2f(uniforms.uResolution, GL_W, GL_H);
    gl.uniform3fv(uniforms.uC0, hexToVec3(preset.colors[0]));
    gl.uniform3fv(uniforms.uC1, hexToVec3(preset.colors[1]));
    gl.uniform3fv(uniforms.uC2, hexToVec3(preset.colors[2]));
    gl.uniform3fv(uniforms.uC3, hexToVec3(preset.colors[3]));
    gl.uniform3fv(uniforms.uC4, hexToVec3(preset.colors[4]));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    return glCanvas;
  }

  const buttonRecords = new Map();
  const headingEls = new Set();

  /* Dedicated compact canvas for syncing Rose Fold onto clipped heading text */
  const TEXT_W = 320;
  const TEXT_H = 96;
  const textCanvas = document.createElement("canvas");
  textCanvas.width = TEXT_W;
  textCanvas.height = TEXT_H;
  const textCtx = textCanvas.getContext("2d");
  let lastHeadingSyncMs = 0;

  function attachButton(btn, presetKey) {
    if (!btn || buttonRecords.has(btn)) return;
    btn.setAttribute("data-velvet-btn", presetKey);

    const cs = window.getComputedStyle(btn);
    if (cs.position === "static") {
      btn.setAttribute("data-velvet-rel", "1");
    }

    let canvas = btn.querySelector(":scope > .nami-velvet-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "nami-velvet-canvas";
      canvas.setAttribute("aria-hidden", "true");
      btn.insertBefore(canvas, btn.firstChild);
    }
    btn.classList.add("has-velvet-canvas");

    buttonRecords.set(btn, {
      btn,
      presetKey,
      canvas,
      ctx: canvas.getContext("2d")
    });
  }

  function scanElements() {
    document.querySelectorAll(FLOATING_SELECTOR).forEach(el => attachButton(el, "velvetwave"));
    document.querySelectorAll(BUTTON_SELECTOR).forEach(el => attachButton(el, "rosefold"));
    document.querySelectorAll(HEADING_SELECTOR).forEach(el => {
      if (!headingEls.has(el)) {
        el.setAttribute("data-rosefold-heading", "rosefold");
        headingEls.add(el);
      }
    });
  }

  function syncHeadingsFromRosefold(srcCanvas, nowMs, forceSync) {
    if (!textCtx || headingEls.size === 0) return;
    const visibleHeadings = [];
    headingEls.forEach(el => {
      if (el.isConnected && el.getBoundingClientRect().width > 0) {
        visibleHeadings.push(el);
      }
    });
    if (visibleHeadings.length === 0) return;
    if (!forceSync && nowMs - lastHeadingSyncMs < 140) return;
    lastHeadingSyncMs = nowMs;

    /* Crop bright core ribbon band and guarantee readable luminance floor for #070707 backdrops */
    textCtx.save();
    textCtx.globalCompositeOperation = "source-over";
    textCtx.filter = "brightness(1.18) contrast(1.03)";
    textCtx.drawImage(srcCanvas, 0, Math.round(GL_H * 0.16), GL_W, Math.round(GL_H * 0.68), 0, 0, TEXT_W, TEXT_H);
    textCtx.filter = "none";
    textCtx.globalCompositeOperation = "lighten";
    const floorGrad = textCtx.createLinearGradient(0, 0, TEXT_W, 0);
    floorGrad.addColorStop(0.0, "#75333E");
    floorGrad.addColorStop(0.46, "#563A5C");
    floorGrad.addColorStop(1.0, "#1E5BB5");
    textCtx.fillStyle = floorGrad;
    textCtx.fillRect(0, 0, TEXT_W, TEXT_H);
    textCtx.restore();

    try {
      const dataUrl = textCanvas.toDataURL("image/png");
      const bgVal = `url("${dataUrl}")`;
      visibleHeadings.forEach(el => {
        el.style.backgroundImage = bgVal;
      });
    } catch (err) {
      /* Fallback CSS gradient remains intact if dataURL fails */
    }
  }

  function drawAll(timeVal, nowMs, forceHeadings) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rosefoldSrc = null;

    ["velvetwave", "rosefold"].forEach(presetKey => {
      const visibleRecs = [];
      buttonRecords.forEach(rec => {
        if (rec.presetKey === presetKey && rec.btn.isConnected && rec.ctx && rec.btn.clientWidth > 0 && rec.btn.clientHeight > 0) {
          visibleRecs.push(rec);
        }
      });

      const needsHeadingRender = presetKey === "rosefold" && headingEls.size > 0;
      if (visibleRecs.length === 0 && !needsHeadingRender) return;

      const srcCanvas = renderMaster(PRESETS[presetKey], timeVal);
      if (presetKey === "rosefold") rosefoldSrc = srcCanvas;

      visibleRecs.forEach(rec => {
        const targetW = Math.max(64, Math.min(Math.round(rec.btn.clientWidth * dpr), GL_W));
        const targetH = Math.max(24, Math.min(Math.round(rec.btn.clientHeight * dpr), GL_H));
        if (rec.canvas.width !== targetW || rec.canvas.height !== targetH) {
          rec.canvas.width = targetW;
          rec.canvas.height = targetH;
        }

        const btnAspect = targetW / targetH;
        let sw = GL_W;
        let sh = Math.round(GL_W / Math.max(btnAspect, 1.4));
        if (sh > GL_H) {
          sh = GL_H;
          sw = Math.min(GL_W, Math.round(GL_H * btnAspect));
        }
        const sx = Math.max(0, Math.round((GL_W - sw) * 0.5));
        const sy = Math.max(0, Math.round((GL_H - sh) * 0.45));

        rec.ctx.drawImage(srcCanvas, sx, sy, sw, sh, 0, 0, targetW, targetH);
      });
    });

    if (rosefoldSrc) {
      syncHeadingsFromRosefold(rosefoldSrc, nowMs, forceHeadings);
    }
  }

  function boot() {
    injectStyles();
    scanElements();

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enableMotion = !prefersReduced;

    let simTime = 1.4;
    let lastNow = performance.now();
    drawAll(simTime, lastNow, true);

    const observer = new MutationObserver(() => {
      scanElements();
      drawAll(simTime, performance.now(), true);
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "aria-hidden"] });

    window.addEventListener("resize", () => drawAll(simTime, performance.now(), true), { passive: true });

    if (enableMotion) {
      function tick(now) {
        if (!document.hidden) {
          const dt = Math.min((now - lastNow) / 1000, 0.1);
          simTime += dt * 0.45;
          drawAll(simTime, now, false);
        }
        lastNow = now;
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    window.__namiButtonConfigs = {
      floating: PRESETS.velvetwave,
      buttons: PRESETS.rosefold,
      headings: PRESETS.rosefold
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
