/**
 * NAMI site interactions — edit this file for homepage behaviour.
 * Loaded from /assets/js/custom.js
 * Event data is injected as window.__NAMI_EVENTS__ from content/home.ts
 */
(function () {
  function initNamiSite(EVENTS_DATA) {
    if (!EVENTS_DATA) EVENTS_DATA = window.__NAMI_EVENTS__ || {};
    if (window.__NAMI_SITE_INIT__) return;
    window.__NAMI_SITE_INIT__ = true;

// 0. Safari / WebKit Video Autoplay & Muted State Enforcer
    function initVideoAutoplay() {
      const allVideos = document.querySelectorAll('video[autoplay]');
      allVideos.forEach(v => {
        v.muted = true;
        v.defaultMuted = true;
        v.playsInline = true;
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('webkit-playsinline', '');

        const triggerPlayback = () => {
          const promise = v.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // If Safari blocked it initially, trigger on earliest interaction
              const unlock = () => {
                v.play().catch(() => {});
                window.removeEventListener('click', unlock);
                window.removeEventListener('touchstart', unlock);
                window.removeEventListener('scroll', unlock);
              };
              window.addEventListener('click', unlock, { once: true, passive: true });
              window.addEventListener('touchstart', unlock, { once: true, passive: true });
              window.addEventListener('scroll', unlock, { once: true, passive: true });
            });
          }
        };

        if (v.readyState >= 2) {
          triggerPlayback();
        } else {
          v.addEventListener('loadedmetadata', triggerPlayback, { once: true });
          v.addEventListener('canplay', triggerPlayback, { once: true });
        }
        triggerPlayback();
      });

      // Resume on tab visibility return
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          allVideos.forEach(v => {
            if (v.paused) v.play().catch(() => {});
          });
        }
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initVideoAutoplay);
    } else {
      initVideoAutoplay();
    }

    // 1. Toast Notification Utility
    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.textContent = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2600);
    }

    // 2. Menu Drawer Toggle & Interactive Image Showcase
    function toggleMenuDrawer() {
      const drawer = document.getElementById('menuDrawer');
      drawer.classList.toggle('open');
    }

    (function initDrawerImageHover() {
      const navLinks = document.getElementById('drawerNavLinks');
      if (!navLinks) return;
      const defaultImg = document.getElementById('drawerImgDefault');
      const tagEl = document.getElementById('drawerCaptionTag');
      const subEl = document.getElementById('drawerCaptionSub');
      const items = navLinks.querySelectorAll('.drawer-nav-item');
      const allImgs = document.querySelectorAll('.drawer-preview-img');

      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          const targetId = item.getAttribute('data-target-img');
          const targetImg = document.getElementById(targetId);
          if (targetImg) {
            allImgs.forEach(img => img.classList.remove('active'));
            targetImg.classList.add('active');
          }
          if (tagEl) tagEl.textContent = item.getAttribute('data-tag') || 'NAMI HI-FI';
          if (subEl) subEl.textContent = item.getAttribute('data-sub') || 'Listening Room & Dining';
        });
      });

      navLinks.addEventListener('mouseleave', () => {
        allImgs.forEach(img => img.classList.remove('active'));
        if (defaultImg) defaultImg.classList.add('active');
        if (tagEl) tagEl.textContent = 'NAMI HI-FI';
        if (subEl) subEl.textContent = 'Listening Room & Dining';
      });
    })();

    // Event Details Data & Popup Modal System
    // EVENTS_DATA imported from @/content/home

    let activePopupEvent = null;
    let activePopupDayKey = null;

    function openEventPopup(dayKey, evt) {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      const ev = EVENTS_DATA[dayKey];
      if (!ev) return;

      activePopupEvent = ev;
      activePopupDayKey = dayKey;

      const grid = document.getElementById('calDaysGrid');
      const popup = document.getElementById('calColumnPopup');
      if (!grid || !popup) return;

      // Clear previous active cells
      grid.querySelectorAll('.cal-cell.is-active-event').forEach(c => c.classList.remove('is-active-event'));

      // Find target cell
      let targetCell = null;
      if (evt && evt.currentTarget) {
        targetCell = evt.currentTarget.closest('.cal-cell');
      }
      if (!targetCell) {
        targetCell = grid.querySelector(`[data-day="${dayKey}"]`);
      }
      if (targetCell) {
        targetCell.classList.add('is-active-event');
      }

      // Populate data
      const dateEl = document.getElementById('colPopupDate');
      const imgEl = document.getElementById('colPopupImg');
      const hzEl = document.getElementById('colPopupHz');
      const titleEl = document.getElementById('colPopupTitle');
      const genreEl = document.getElementById('colPopupGenre');
      const descEl = document.getElementById('colPopupDesc');

      if (dateEl) dateEl.textContent = ev.dateTag;
      if (imgEl) {
        imgEl.src = ev.poster;
        imgEl.alt = ev.artist;
      }
      if (hzEl) hzEl.textContent = ev.hzTag;
      if (titleEl) titleEl.textContent = ev.artist;
      if (genreEl) {
        genreEl.textContent = ev.genre + (ev.timing ? ' · ' + ev.timing : '');
      }
      if (descEl) descEl.textContent = ev.desc;

      // Position logic: SNAPPED EXACTLY TO CALENDAR BLOCKS (Covers exactly 6 boxes: 3 rows × 2 columns)
      const totalCols = 7;
      const totalRows = 5;
      const colSpan = 2;
      const rowSpan = 3;

      const cells = Array.from(grid.querySelectorAll('.cal-cell'));
      const cellIndex = cells.indexOf(targetCell);

      let colIndex = 0;
      let rowIndex = 0;
      if (cellIndex !== -1) {
        colIndex = cellIndex % totalCols;
        rowIndex = Math.floor(cellIndex / totalCols);
      } else {
        colIndex = Math.round(targetCell.offsetLeft / targetCell.offsetWidth);
        rowIndex = Math.round(targetCell.offsetTop / targetCell.offsetHeight);
      }

      // Adjust column start so card never overflows the 7 columns:
      let startCol = colIndex;
      if (startCol + colSpan > totalCols) {
        startCol = totalCols - colSpan;
      }
      if (startCol < 0) startCol = 0;

      // Adjust row start so card never overflows the 5 rows:
      let startRow = rowIndex;
      if (startRow + rowSpan > totalRows) {
        startRow = totalRows - rowSpan;
      }
      if (startRow < 0) startRow = 0;

      // Query real top-left and bottom-right cells in the DOM for 100% exact boundary alignment:
      const topLeftIndex = startRow * totalCols + startCol;
      const bottomRightIndex = (startRow + rowSpan - 1) * totalCols + (startCol + colSpan - 1);
      const topLeftCell = cells[topLeftIndex];
      const bottomRightCell = cells[bottomRightIndex];

      let left, top, width, height;
      if (topLeftCell && bottomRightCell) {
        left = topLeftCell.offsetLeft;
        top = topLeftCell.offsetTop;
        width = (bottomRightCell.offsetLeft + bottomRightCell.offsetWidth) - left;
        height = (bottomRightCell.offsetTop + bottomRightCell.offsetHeight) - top;
      } else {
        const colWidth = targetCell.offsetWidth;
        const cellHeight = targetCell.offsetHeight;
        left = startCol * colWidth;
        top = startRow * cellHeight;
        width = colSpan * colWidth;
        height = rowSpan * cellHeight;
      }

      popup.style.left = left + 'px';
      popup.style.top = top + 'px';
      popup.style.width = width + 'px';
      popup.style.height = height + 'px';

      popup.classList.add('open');
      popup.setAttribute('aria-hidden', 'false');

      // Scroll horizontal wrapper if needed so the open popup is in view
      const scrollWrap = document.querySelector('.cal-grid-scroll-wrap');
      if (scrollWrap) {
        const wrapLeft = scrollWrap.scrollLeft;
        const wrapWidth = scrollWrap.clientWidth;
        if (left < wrapLeft) {
          scrollWrap.scrollTo({ left: Math.max(0, left - 16), behavior: 'smooth' });
        } else if (left + width > wrapLeft + wrapWidth) {
          scrollWrap.scrollTo({ left: left + width - wrapWidth + 16, behavior: 'smooth' });
        }
      }
    }

    function closeEventPopup() {
      const popup = document.getElementById('calColumnPopup');
      if (popup) {
        popup.classList.remove('open');
        popup.setAttribute('aria-hidden', 'true');
      }
      const grid = document.getElementById('calDaysGrid');
      if (grid) {
        grid.querySelectorAll('.cal-cell.is-active-event').forEach(c => c.classList.remove('is-active-event'));
      }
      activePopupEvent = null;
      activePopupDayKey = null;
    }

    function bookFromPopup() {
      if (!activePopupEvent) return;
      const targetDate = activePopupEvent.dateStr;
      const artist = activePopupEvent.artist;
      closeEventPopup();
      showToast(`Tickets for ${artist} (Feb ${targetDate.split('-')[2]}) — Booking opens soon`);
    }

    // Dismiss popup on outside click (anywhere except inside the popup itself or on an event cell)
    document.addEventListener('click', function(e) {
      const popup = document.getElementById('calColumnPopup');
      if (!popup || !popup.classList.contains('open')) return;
      if (popup.contains(e.target)) return;
      if (e.target.closest('.has-event')) return;
      closeEventPopup();
    });

    // Randomize Calendar Block Gradients between var(--grad-primary), var(--grad-resonance), var(--grad-flare)
    function randomizeCalendarGradients() {
      const variants = ['grad-variant-primary', 'grad-variant-resonance', 'grad-variant-flare'];
      const eventCells = Array.from(document.querySelectorAll('.cal-cell.has-event'));
      if (!eventCells.length) return;

      const pool = [];
      while (pool.length < eventCells.length) {
        pool.push(...variants);
      }
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      eventCells.forEach((cell, idx) => {
        variants.forEach(v => cell.classList.remove(v));
        cell.classList.add(pool[idx]);
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', randomizeCalendarGradients);
    } else {
      randomizeCalendarGradients();
    }

    // Keyboard support: Escape key closes in-place popup
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeEventPopup();
      }
    });

    // Resize recalculation to keep popup perfectly aligned with calendar blocks
    window.addEventListener('resize', () => {
      if (!activePopupDayKey) return;
      const grid = document.getElementById('calDaysGrid');
      const popup = document.getElementById('calColumnPopup');
      const targetCell = document.querySelector(`.cal-cell.has-event[data-day="${activePopupDayKey}"]`);
      if (grid && popup && targetCell) {
        const totalCols = 7;
        const totalRows = 5;
        const colSpan = 2;
        const rowSpan = 3;

        const cells = Array.from(grid.querySelectorAll('.cal-cell'));
        const cellIndex = cells.indexOf(targetCell);

        let colIndex = 0;
        let rowIndex = 0;
        if (cellIndex !== -1) {
          colIndex = cellIndex % totalCols;
          rowIndex = Math.floor(cellIndex / totalCols);
        } else {
          colIndex = Math.round(targetCell.offsetLeft / targetCell.offsetWidth);
          rowIndex = Math.round(targetCell.offsetTop / targetCell.offsetHeight);
        }

        let startCol = colIndex;
        if (startCol + colSpan > totalCols) {
          startCol = totalCols - colSpan;
        }
        if (startCol < 0) startCol = 0;

        let startRow = rowIndex;
        if (startRow + rowSpan > totalRows) {
          startRow = totalRows - rowSpan;
        }
        if (startRow < 0) startRow = 0;

        const topLeftIndex = startRow * totalCols + startCol;
        const bottomRightIndex = (startRow + rowSpan - 1) * totalCols + (startCol + colSpan - 1);
        const topLeftCell = cells[topLeftIndex];
        const bottomRightCell = cells[bottomRightIndex];

        let left, top, width, height;
        if (topLeftCell && bottomRightCell) {
          left = topLeftCell.offsetLeft;
          top = topLeftCell.offsetTop;
          width = (bottomRightCell.offsetLeft + bottomRightCell.offsetWidth) - left;
          height = (bottomRightCell.offsetTop + bottomRightCell.offsetHeight) - top;
        } else {
          const colWidth = targetCell.offsetWidth;
          const cellHeight = targetCell.offsetHeight;
          left = startCol * colWidth;
          top = startRow * cellHeight;
          width = colSpan * colWidth;
          height = rowSpan * cellHeight;
        }

        popup.style.left = left + 'px';
        popup.style.top = top + 'px';
        popup.style.width = width + 'px';
        popup.style.height = height + 'px';
      }
    });

    // Select Event Date from Calendar
    function selectEventDate(dateStr, artistName) {
      showToast(`Selected ${artistName} · Feb ${dateStr.split('-')[2]}`);
    }

    // 3. First-Fold Parallax & ScrollSpy Execution
    const heroBg = document.querySelector('.hero-bg-media');
    const heroContent = document.querySelector('.hero-content');
    const heroScrollCue = document.querySelector('.hero-scroll-cue');
    const scrollerButtons = document.querySelectorAll('.scroller-btn');
    const sections = ['philosophy', 'programming', 'menu', 'space'];
    const brandMark = document.getElementById('headerBrandMark');
    const eventBanner = document.getElementById('programming') || document.getElementById('eventParallaxBanner');
    const eventImg = document.getElementById('eventParallaxImg');

    let ticking = false;

    function handleScrollEffects() {
      const scrollY = window.scrollY;
      const winHeight = window.innerHeight;

      // Parallax on First-Fold Banner
      if (scrollY <= winHeight * 1.3) {
        // Background video moves down at 0.35x speed + gentle cinematic depth scale
        if (heroBg) {
          heroBg.style.transform = `translate3d(0, ${scrollY * 0.35}px, 0) scale(${1 + scrollY * 0.00015})`;
        }
        // Center content floats at 0.18x speed with smooth dissolution
        if (heroContent) {
          const contentOpacity = Math.max(0, 1 - (scrollY / (winHeight * 0.72)));
          heroContent.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
          heroContent.style.opacity = contentOpacity;
        }
        // Bottom cue fades out quickly on scroll
        if (heroScrollCue) {
          const cueOpacity = Math.max(0, 1 - (scrollY / 180));
          heroScrollCue.style.opacity = cueOpacity;
          heroScrollCue.style.transform = `translate3d(-50%, ${scrollY * 0.45}px, 0)`;
          heroScrollCue.style.pointerEvents = cueOpacity <= 0.05 ? 'none' : 'auto';
        }
      }

      // Deep Cinematic Parallax on Full-Width Event Calendar Section
      if (eventBanner && eventImg) {
        const rect = eventBanner.getBoundingClientRect();
        if (rect.top < winHeight && rect.bottom > 0) {
          const sectionCenter = rect.top + rect.height / 2;
          const screenCenter = winHeight / 2;
          const diffFromCenter = sectionCenter - screenCenter;
          const translateY = diffFromCenter * -0.22;
          eventImg.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(1.08)`;
        }
      }

      // ScrollSpy for Top-Right Nav
      let currentSection = '';
      const scrollPos = scrollY + winHeight / 3;

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          currentSection = id;
        }
      });

      scrollerButtons.forEach(btn => {
        if (btn.getAttribute('data-section') === currentSection) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Show small brand mark in top-left when scrolling past hero
      if (scrollY > 400) {
        brandMark.classList.add('visible');
      } else {
        brandMark.classList.remove('visible');
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(handleScrollEffects);
        ticking = true;
      }
    }, { passive: true });

    // Initial calculation on load
    handleScrollEffects();

    // 3.5 MOBJOURNAL Reference: Floating Parallax Gallery in Philosophy Section (Upright & Straight)
    (function initPhilosophyParallax() {
      const section = document.getElementById('philosophy');
      if (!section) return;

      const cards = Array.from(section.querySelectorAll('.phil-card'));
      if (!cards.length) return;

      let mouseTargetX = 0;
      let mouseTargetY = 0;
      let mouseCurrentX = 0;
      let mouseCurrentY = 0;
      let isHovered = false;

      function onMouseMove(e) {
        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        // Normalized coordinates (-1 to 1)
        mouseTargetX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width * 0.5)));
        mouseTargetY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height * 0.5)));
        isHovered = true;
      }

      function onMouseLeave() {
        mouseTargetX = 0;
        mouseTargetY = 0;
        isHovered = false;
      }

      section.addEventListener('mousemove', onMouseMove, { passive: true });
      section.addEventListener('mouseleave', onMouseLeave, { passive: true });

      function updatePhilosophyParallax() {
        // Smooth lerp mouse coordinates
        mouseCurrentX += (mouseTargetX - mouseCurrentX) * 0.08;
        mouseCurrentY += (mouseTargetY - mouseCurrentY) * 0.08;

        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;

        // Execute only when section is within or near viewport
        if (rect.bottom > -120 && rect.top < winH + 120) {
          const sectionCenter = rect.top + rect.height * 0.5;
          const screenCenter = winH * 0.5;
          const scrollDiff = (sectionCenter - screenCenter) / winH; // -1 to 1

          const now = performance.now() * 0.001;

          cards.forEach((card, i) => {
            // If user is directly hovering on the card, keep hover scale clean
            if (card.matches(':hover')) return;

            const speedY = parseFloat(card.getAttribute('data-speed-y')) || 0.18;
            const speedX = parseFloat(card.getAttribute('data-speed-x')) || 0.12;
            const scrollFactor = parseFloat(card.getAttribute('data-scroll')) || 0.25;

            // Pronounced multi-speed scroll parallax: each card travels at a distinct rate on scroll
            const scrollYOffset = scrollDiff * scrollFactor * -240;

            // Interactive mouse parallax depth offset
            const mouseXOffset = mouseCurrentX * speedX * 36;
            const mouseYOffset = mouseCurrentY * speedY * 28;

            // Gentle organic ambient levitation drift
            const idleDriftY = Math.sin(now * 1.2 + i * 1.4) * 3.2;
            const idleDriftX = Math.cos(now * 0.9 + i * 1.1) * 2.2;

            const totalX = mouseXOffset + idleDriftX;
            const totalY = scrollYOffset + mouseYOffset + idleDriftY;

            // Completely straight and upright (zero rotation / tilt)
            card.style.transform = `translate3d(${totalX.toFixed(2)}px, ${totalY.toFixed(2)}px, 0)`;
          });
        }

        requestAnimationFrame(updatePhilosophyParallax);
      }

      requestAnimationFrame(updatePhilosophyParallax);
    })();

    // 4. Reference-Matched Editorial Menu Scroll Showcase (Food -> Cocktails -> Dessert)
    (function initMenuScrollShowcase() {
      const section = document.getElementById('menu');
      if (!section) return;

      const editorialSlides = section.querySelectorAll('.menu-editorial-slide');
      const heroSlides = section.querySelectorAll('.menu-hero-slide');
      const catBtns = section.querySelectorAll('.menu-cat-indicator, .menu-cat-btn');
      const railDots = section.querySelectorAll('.menu-rail-dot');
      const scrollPill = document.getElementById('menuScrollPill');

      let currentPhase = -1;

      window.setMenuPhase = function(phase) {
        if (phase === currentPhase) return;
        currentPhase = phase;

        // Update Left Panel Category Background Color (Food: #E84243, Cocktail: #004F9D, Dessert: #FFAABD)
        const phaseColors = ['#E84243', '#004F9D', '#FFAABD'];
        const leftPanel = document.getElementById('menuPanelEditorial');
        if (leftPanel && phaseColors[phase]) {
          leftPanel.style.backgroundColor = phaseColors[phase];
        }

        // Update Left Editorial Slides
        editorialSlides.forEach(slide => {
          const p = parseInt(slide.getAttribute('data-phase'), 10);
          if (p === phase) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        // Update Right Hero Slides
        heroSlides.forEach(slide => {
          const p = parseInt(slide.getAttribute('data-phase'), 10);
          if (p === phase) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        // Update Top Navigation Tabs
        catBtns.forEach(btn => {
          const p = parseInt(btn.getAttribute('data-phase'), 10);
          if (p === phase) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });

        // Update Rail Dots
        railDots.forEach(dot => {
          const p = parseInt(dot.getAttribute('data-phase'), 10);
          if (p === phase) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      };

      window.goToMenuPhase = function(phase) {
        const rect = section.getBoundingClientRect();
        const totalDist = section.offsetHeight - window.innerHeight;
        if (totalDist <= 0) return;
        const phaseFrac = phase / 2; // 0, 0.5, 1.0
        const targetScroll = window.scrollY + rect.top + (phaseFrac * totalDist) + 5;
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      };

      function updateMenuScroll() {
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;
        const totalDist = section.offsetHeight - winH;
        if (totalDist <= 0) return;

        // Scrolled distance within section: 0 to totalDist
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalDist));

        // Determine phase: 0 (Food), 1 (Cocktails), 2 (Dessert)
        let phase = 0;
        if (progress >= 0.64) {
          phase = 2; // Dessert
        } else if (progress >= 0.31) {
          phase = 1; // Cocktails
        } else {
          phase = 0; // Food
        }
        window.setMenuPhase(phase);

        // Update scroll pill along the rail track
        if (scrollPill) {
          const maxTravel = 116; // 160 - 44
          const pillY = progress * maxTravel;
          scrollPill.style.transform = `translate3d(0, ${pillY.toFixed(1)}px, 0)`;
        }
      }

      window.addEventListener('scroll', updateMenuScroll, { passive: true });
      window.addEventListener('resize', updateMenuScroll, { passive: true });
      updateMenuScroll();
    })();

    // 4.5 Full Menu Modal Controller
    window.openFullMenuModal = function(tab) {
      const modal = document.getElementById('fullMenuModal');
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (tab) {
        switchFullMenuTab(tab);
      }
    };

    window.closeFullMenuModal = function() {
      const modal = document.getElementById('fullMenuModal');
      if (!modal) return;
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    window.switchFullMenuTab = function(tabName) {
      const modal = document.getElementById('fullMenuModal');
      if (!modal) return;

      const tabs = modal.querySelectorAll('.full-menu-tab-btn');
      tabs.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const panes = modal.querySelectorAll('.full-menu-pane');
      panes.forEach(pane => {
        if (pane.id === `pane-${tabName}`) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    };

    // Keyboard support: Escape closes full menu modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeFullMenuModal();
      }
    });

    // 4. Interactive Audio Player (Web Audio API Synthesizer)
    let isPlaying = false;
    let audioCtx = null;
    let vinylNoiseNode = null;
    let osc1 = null;

    function toggleAudio() {
      isPlaying = !isPlaying;
      const playIcon = document.getElementById('playIcon');
      const pauseIcon = document.getElementById('pauseIcon');
      const eqBars = document.getElementById('eqBars');

      if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        eqBars.classList.add('playing');
        startSyntheticWarmAudio();
        showToast('Now Playing: On & On — Erykah Badu');
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        eqBars.classList.remove('playing');
        stopSyntheticWarmAudio();
        showToast('Playback Paused');
      }
    }

    function startSyntheticWarmAudio() {
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        // Generate warm analog vinyl dust crackle & gentle chord
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = (Math.random() * 2 - 1) * 0.015; // subtle tape hiss
        }

        vinylNoiseNode = audioCtx.createBufferSource();
        vinylNoiseNode.buffer = noiseBuffer;
        vinylNoiseNode.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 800; // warm analog cut

        vinylNoiseNode.connect(filter);
        filter.connect(audioCtx.destination);
        vinylNoiseNode.start();

      } catch (e) {
        console.log('Audio init prevented:', e);
      }
    }

    function stopSyntheticWarmAudio() {
      if (vinylNoiseNode) {
        try {
          vinylNoiseNode.stop();
          vinylNoiseNode.disconnect();
        } catch(e) {}
      }
    }

    // Synchronize the 3-panel wave strap video loop
    (function initWaveStrapSync() {
      const strapVideos = document.querySelectorAll('.wave-strap-media');
      if (strapVideos.length <= 1) return;

      const lead = strapVideos[0];
      const followers = Array.from(strapVideos).slice(1);

      function alignPlayback() {
        const targetTime = lead.currentTime;
        followers.forEach(v => {
          if (Math.abs(v.currentTime - targetTime) > 0.08) {
            try {
              v.currentTime = targetTime;
            } catch(e) {}
          }
        });
      }

      lead.addEventListener('timeupdate', alignPlayback);
      lead.addEventListener('play', () => {
        followers.forEach(v => {
          try { v.play(); } catch(e) {}
        });
      });
      lead.addEventListener('seeked', alignPlayback);
    })();

    // 5. Reservation Modal Handlers
    function openReservationModal(e) {
      if (e) e.preventDefault();
      const modal = document.getElementById('reservationModal');
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const dateInput = document.getElementById('resDate');
      if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    }

    function closeReservationModal() {
      const modal = document.getElementById('reservationModal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function handleReservationSubmit(e) {
      e.preventDefault();
      const date = document.getElementById('resDate').value;
      const guests = document.getElementById('resGuests').value;
      const name = document.getElementById('resName').value;
      closeReservationModal();
      showToast(`Reservation confirmed for ${name || 'you'} (${guests} guests) on ${date}! Confirmation sent.`);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeReservationModal();
      }
    });
  

    // Lazy-load wave strap videos when near viewport
    (function initLazyWaveVideos() {
      const root = document.querySelector('[data-lazy-video-root]');
      if (!root) return;
      const videos = root.querySelectorAll('video[data-src]');
      if (!videos.length) return;
      const load = () => {
        videos.forEach((v) => {
          const src = v.getAttribute('data-src');
          if (!src || v.querySelector('source')) return;
          const source = document.createElement('source');
          source.src = src;
          source.type = 'video/mp4';
          v.appendChild(source);
          v.load();
          v.play?.().catch(() => {});
        });
      };
      if (!('IntersectionObserver' in window)) {
        load();
        return;
      }
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      }, { rootMargin: '200px' });
      io.observe(root);
    })();

    window.initVideoAutoplay = initVideoAutoplay;
    window.showToast = showToast;
    window.toggleMenuDrawer = toggleMenuDrawer;
    window.openEventPopup = openEventPopup;
    window.closeEventPopup = closeEventPopup;
    window.bookFromPopup = bookFromPopup;
    window.randomizeCalendarGradients = randomizeCalendarGradients;
    window.selectEventDate = selectEventDate;
    window.handleScrollEffects = handleScrollEffects;
    window.toggleAudio = toggleAudio;
    window.startSyntheticWarmAudio = startSyntheticWarmAudio;
    window.stopSyntheticWarmAudio = stopSyntheticWarmAudio;
    window.openReservationModal = openReservationModal;
    window.closeReservationModal = closeReservationModal;
    window.handleReservationSubmit = handleReservationSubmit;
  }

  window.initNamiSite = initNamiSite;

  if (window.__NAMI_EVENTS__) {
    initNamiSite(window.__NAMI_EVENTS__);
  }
})();
