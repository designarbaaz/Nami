
    // 0. Fullscreen Splash Screen Controller (loader-1.mp4 Reveal, max 4s, No Skip CTA)
    (function initSplashScreen() {
      const splash = document.getElementById('splashScreen');
      const splashVid = document.getElementById('splashVideo');
      if (!splash) return;

      document.body.style.overflow = 'hidden';

      let dismissed = false;
      function dismissSplashScreen() {
        if (dismissed) return;
        dismissed = true;
        clearTimeout(maxDurationTimer);

        splash.classList.add('splash-fade-out');
        document.body.style.overflow = '';

        setTimeout(() => {
          splash.style.display = 'none';
          splash.setAttribute('aria-hidden', 'true');
        }, 900);
      }

      window.dismissSplashScreen = dismissSplashScreen;

      // Strict <= 4 seconds duration cap
      const maxDurationTimer = setTimeout(dismissSplashScreen, 4000);

      if (splashVid) {
        splashVid.addEventListener('ended', dismissSplashScreen);
        splashVid.addEventListener('error', dismissSplashScreen);
        const p = splashVid.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    })();

    // 0.1 Safari / WebKit Video Autoplay & Muted State Enforcer
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
    const EVENTS_DATA = {
      '9': {
        dateNum: '09',
        dateTag: 'TUE · DEC 09',
        hzTag: '440 Hz Root',
        artist: 'Atushi Maeda',
        title: 'Atushi Maeda · Ambient & Jazz',
        genre: 'Japanese Ambient · Spiritual Jazz',
        timing: '20:30 (Doors 19:00)',
        poster: '/assets/nami-turntable-hands.avif',
        desc: 'Tokyo selector Atushi Maeda spins rare Japanese spiritual jazz, intimate environmental ambient, and early experimental Japanese synth pressings exclusively through our custom horn-loaded acoustic system.',
        dateStr: '2026-02-09'
      },
      '14': {
        dateNum: '14',
        dateTag: 'SUN · DEC 14',
        hzTag: 'Warm Frequencies',
        artist: 'Mogasu',
        title: 'Mogasu · Vinyl Soul & Rare Groove',
        genre: 'Vintage Soul · Rare Groove',
        timing: '18:00 Onwards',
        poster: '/assets/nami-erykah-vinyl.avif',
        desc: 'A Valentine’s rare vinyl journey through vintage American soul, slow-tempo Jamaican lovers rock, and warm disco ballads curated exclusively on original analog pressings.',
        dateStr: '2026-02-14'
      },
      '20': {
        dateNum: '20',
        dateTag: 'SAT · DEC 20',
        hzTag: '3968 Hz Special · Headline',
        artist: 'Yousuke Yukimatsu',
        title: 'Yousuke Yukimatsu · Avant-Garde & Deep Bass',
        genre: 'Tokyo Avant-Garde & Bass',
        timing: '20:30 Onwards',
        poster: '/assets/nami-horn-speaker.avif',
        desc: 'Tokyo underground legend Yousuke Yukimatsu delivers an extreme contrast performance — seamlessly bridging ambient classical minimalism with crushing sub-bass frequencies and breakcore intensity.',
        dateStr: '2026-02-20'
      },
      '23': {
        dateNum: '23',
        dateTag: 'TUE · DEC 23',
        hzTag: 'Resonant Node',
        artist: 'Occa',
        title: 'Occa · Deep Hypnotic Soundscapes',
        genre: 'Hypnotic Soundscapes & Ambient',
        timing: '20:30 Onwards',
        poster: '/assets/nami-resor-mixer.avif',
        desc: 'Sapporo sonic architect Occa explores deep psychedelic rhythms, subterranean sub-harmonics, and meditative ambient soundscapes designed for total physical acoustic immersion.',
        dateStr: '2026-02-23'
      },
      '28': {
        dateNum: '28',
        dateTag: 'SUN · DEC 28',
        hzTag: 'Electric Pulse',
        artist: 'Suze Ijo',
        title: 'Suze Ijo · Afro-Cuban & Electronic',
        genre: 'Afro-Cuban Beats & Deep House',
        timing: '19:00 Onwards',
        poster: '/assets/nami-selector-booth.avif',
        desc: 'Rotterdam selector Suze Ijo brings infectious rhythms, Afro-Cuban percussions, and uplifting house gems woven seamlessly through vintage tube amplification.',
        dateStr: '2026-02-28'
      },
      '29': {
        dateNum: '29',
        dateTag: 'MON · DEC 29',
        hzTag: 'Nocturnal Set',
        artist: 'Sunju Hargun',
        title: 'Sunju Hargun · Bangkok Nightclub Selector',
        genre: 'Cosmic Techno & Asian Synth',
        timing: '19:00 Onwards',
        poster: '/assets/nami-evening-crowd.avif',
        desc: 'A rare leap-year nocturnal selector set by Bangkok electronic producer Sunju Hargun, exploring psychedelic Asian synth, ritualistic dub, and late-night cosmic techno.',
        dateStr: '2026-02-29'
      }
    };

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

      // Mixer knobs: keep route/React `active` (aria-current="page"). Do not strip it.

      // Home: fade logo in after scrolling past hero.
      // Inner pages: keep logo always visible (matches legacy page CSS).
      if (brandMark) {
        const onHomeHero = !!document.getElementById('hero');
        if (!onHomeHero || scrollY > 400) {
          brandMark.classList.add('visible');
        } else {
          brandMark.classList.remove('visible');
        }
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

      function updatePhilosophyParallax() {
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;

        // Execute only when section is within or near viewport
        if (rect.bottom > -120 && rect.top < winH + 120) {
          const sectionCenter = rect.top + rect.height * 0.5;
          const screenCenter = winH * 0.5;
          const scrollDiff = (sectionCenter - screenCenter) / winH; // -1 to 1

          cards.forEach((card) => {
            // If user is directly hovering on the card, keep hover scale clean
            if (card.matches(':hover')) return;

            const scrollFactor = parseFloat(card.getAttribute('data-scroll')) || 0.25;

            // Pronounced multi-speed scroll parallax: each card travels at a distinct rate on scroll
            // Zero movement when screen is frozen/still (strictly tied to scroll position changes)
            const scrollYOffset = scrollDiff * scrollFactor * -180;

            // Completely straight and upright (zero rotation / tilt, zero movement on frozen screen)
            card.style.transform = `translate3d(0, ${scrollYOffset.toFixed(2)}px, 0)`;
          });
        }
      }

      // Update on scroll with RAF ticking - zero movement when screen is frozen
      let philTicking = false;
      function onScroll() {
        if (!philTicking) {
          requestAnimationFrame(() => {
            updatePhilosophyParallax();
            philTicking = false;
          });
          philTicking = true;
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      // Initial placement
      updatePhilosophyParallax();
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

        // Update Left Panel Category Background (Smoky Cobalt -> Moody Crimson -> Atmospheric)
        const phaseGradients = [
          "#070707 url('/assets/Smoky-Cobalt-graddient.avif') center / cover no-repeat",
          "#070707 url('/assets/Moody-Crimson-gradient.avif') center / cover no-repeat",
          "#070707 url('/assets/Atmospheric-gradient.avif') center / cover no-repeat"
        ];
        const leftPanel = document.getElementById('menuPanelEditorial');
        if (leftPanel && phaseGradients[phase]) {
          leftPanel.style.background = phaseGradients[phase];
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
      } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        eqBars.classList.remove('playing');
        stopSyntheticWarmAudio();
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
      const date = document.getElementById('resDate')?.value || '';
      const guests = document.getElementById('resGuests')?.value || '';
      const session = document.getElementById('resSession')?.value || '';
      const zone = document.getElementById('resZone')?.value || '';
      const name = document.getElementById('resName')?.value || '';
      closeReservationModal();
      const params = new URLSearchParams({
        type: 'reservation',
        name,
        date,
        guests,
        time: session,
        seating: zone
      });
      window.location.href = `/thank-you?${params.toString()}`;
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeReservationModal();
      }
    });

    // Press Mentions One-News-Per-Slide Carousel Controller
    (function initMediaSlider() {
      const track = document.getElementById('mediaSliderTrack');
      const slides = document.querySelectorAll('.media-slide');
      const dots = document.querySelectorAll('.media-dot');
      const prevBtn = document.getElementById('mediaPrevBtn');
      const nextBtn = document.getElementById('mediaNextBtn');
      const container = document.getElementById('mediaSliderContainer');
      if (!track || !slides.length) return;

      let currentIndex = 0;
      const totalSlides = slides.length;
      let autoplayTimer = null;

      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        // Slide the track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active classes for fade & scale
        slides.forEach((s, i) => {
          s.classList.toggle('is-active', i === currentIndex);
        });

        // Update dots
        dots.forEach((d, i) => {
          const isActive = i === currentIndex;
          d.classList.toggle('active', isActive);
          d.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      function nextSlide() {
        goToSlide(currentIndex + 1);
      }

      function prevSlide() {
        goToSlide(currentIndex - 1);
      }

      if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
      if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

      dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          const idx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(idx)) {
            goToSlide(idx);
            resetAutoplay();
          }
        });
      });

      // Touch / Swipe support
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoplay();
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
      }, { passive: true });

      function handleSwipe() {
        const threshold = 40;
        if (touchEndX < touchStartX - threshold) {
          nextSlide();
        } else if (touchEndX > touchStartX + threshold) {
          prevSlide();
        }
      }

      // Autoplay with pause on hover
      function startAutoplay() {
        pauseAutoplay();
        autoplayTimer = setInterval(nextSlide, 7000);
      }

      function pauseAutoplay() {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      function resetAutoplay() {
        pauseAutoplay();
        startAutoplay();
      }

      if (container) {
        container.addEventListener('mouseenter', pauseAutoplay);
        container.addEventListener('mouseleave', startAutoplay);
      }

      startAutoplay();
    })();
  

/* ========== CONCEPT ========== */
function initHorizontalPillarsScroll() {
      const container = document.getElementById('pillarsPinnedContainer');
      const track = document.getElementById('pillarsTrack');
      if (!container || !track) return;

      let ticking = false;
      let rafId = 0;

      function updatePillarsTranslate() {
        if (window.innerWidth <= 860) {
          track.style.transform = 'none';
          return;
        }

        const rect = container.getBoundingClientRect();
        const totalScroll = container.offsetHeight - window.innerHeight;
        if (totalScroll <= 0) return;

        const scrollPassed = -rect.top;
        const progress = Math.min(Math.max(scrollPassed / totalScroll, 0), 1);
        const maxScroll = track.scrollWidth - window.innerWidth;
        if (maxScroll > 0) {
          // translate3d keeps scroll-linked motion on the compositor
          track.style.transform = `translate3d(-${(progress * maxScroll).toFixed(2)}px, 0, 0)`;
        }
      }

      function onScroll() {
        if (ticking) return;
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updatePillarsTranslate();
          ticking = false;
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      updatePillarsTranslate();

      window.__namiPageCleanup = window.__namiPageCleanup || [];
      window.__namiPageCleanup.push(function () {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (rafId) cancelAnimationFrame(rafId);
        track.style.transform = '';
      });
    }

function initImageRevealAnimation() {
      const targets = document.querySelectorAll('.reveal-on-scroll');
      if (!targets.length) return;

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach(t => observer.observe(t));
      } else {
        targets.forEach(t => t.classList.add('is-revealed'));
      }
    }

function initWaveVideoSync() {
      const videos = document.querySelectorAll('.wave-strap-media');
      if (videos.length <= 1) return;
      const master = videos[0];
      const slaves = Array.from(videos).slice(1);
      master.addEventListener('timeupdate', () => {
        slaves.forEach(s => {
          if (Math.abs(s.currentTime - master.currentTime) > 0.1) {
            try { s.currentTime = master.currentTime; } catch (e) {}
          }
        });
      });
    }

function switchSpecimen(type) {
      const pSmall = document.getElementById('panelSpecimenSmall');
      const pBig = document.getElementById('panelSpecimenBig');
      const bSmall = document.getElementById('btnSpecimenSmall');
      const bBig = document.getElementById('btnSpecimenBig');
      if (!pSmall || !pBig || !bSmall || !bBig) return;
      if (type === 'big') {
        pSmall.classList.remove('active');
        pBig.classList.add('active');
        bSmall.classList.remove('active');
        bSmall.setAttribute('aria-selected', 'false');
        bBig.classList.add('active');
        bBig.setAttribute('aria-selected', 'true');
      } else {
        pBig.classList.remove('active');
        pSmall.classList.add('active');
        bBig.classList.remove('active');
        bBig.setAttribute('aria-selected', 'false');
        bSmall.classList.add('active');
        bSmall.setAttribute('aria-selected', 'true');
      }
    }

function initSoundCarousel() {
      const carousel = document.getElementById('soundCarousel');
      const track = document.getElementById('soundCarouselTrack');
      const prevBtn = document.getElementById('soundCarouselPrev');
      const nextBtn = document.getElementById('soundCarouselNext');
      const dots = Array.from(document.querySelectorAll('#soundCarouselDots .sound-carousel-dot'));
      const viewport = document.getElementById('soundCarouselViewport');
      if (!carousel || !track || !dots.length) return;

      const totalSlides = dots.length;
      let currentIndex = 0;
      const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const signal = ac ? ac.signal : undefined;

      function goToSlide(index) {
        currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;
        track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
        dots.forEach((dot, i) => {
          const isActive = i === currentIndex;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1), { signal });
      if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1), { signal });

      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => goToSlide(idx), { signal });
      });

      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goToSlide(currentIndex - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(currentIndex + 1); }
      }, { signal });

      if (viewport) {
        let touchStartX = 0;
        viewport.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true, signal });
        viewport.addEventListener('touchend', (e) => {
          const deltaX = e.changedTouches[0].screenX - touchStartX;
          if (Math.abs(deltaX) > 40) {
            goToSlide(deltaX > 0 ? currentIndex - 1 : currentIndex + 1);
          }
        }, { passive: true, signal });
      }

      goToSlide(0);

      window.__namiPageCleanup = window.__namiPageCleanup || [];
      window.__namiPageCleanup.push(function () {
        if (ac) ac.abort();
        track.style.transform = '';
      });
    }

/* ========== WHATS-ON ========== */
function initPrevEventsCarousel() {
      const viewport = document.getElementById('prevEventsViewport');
      const track = document.getElementById('prevEventsTrack');
      const prevBtn = document.getElementById('prevCarouselPrev');
      const nextBtn = document.getElementById('prevCarouselNext');
      if (!viewport || !track || !prevBtn || !nextBtn) return;

      const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const signal = ac ? ac.signal : undefined;

      function updateNavState() {
        const maxScroll = viewport.scrollWidth - viewport.clientWidth - 4;
        prevBtn.disabled = viewport.scrollLeft <= 4;
        nextBtn.disabled = viewport.scrollLeft >= maxScroll;
      }

      function scrollByCard(dir) {
        const card = track.querySelector('.prev-event-card');
        if (!card) return;
        const gap = parseFloat(getComputedStyle(track).gap) || 28;
        const step = card.offsetWidth + gap;
        viewport.scrollBy({ left: dir * step, behavior: 'smooth' });
      }

      prevBtn.addEventListener('click', () => scrollByCard(-1), { signal });
      nextBtn.addEventListener('click', () => scrollByCard(1), { signal });
      viewport.addEventListener('scroll', updateNavState, { passive: true, signal });
      window.addEventListener('resize', updateNavState, { signal });
      updateNavState();

      window.__namiPageCleanup = window.__namiPageCleanup || [];
      window.__namiPageCleanup.push(function () {
        if (ac) ac.abort();
      });
    }

function openContactModal(e) {
      if (e && e.preventDefault) e.preventDefault();
      const modal = document.getElementById('contactModal');
      if (!modal) return;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const dateInput = document.getElementById('contactDate');
      if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
    }

function closeContactModal() {
      const modal = document.getElementById('contactModal');
      if (!modal) return;
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

function handleContactSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const date = document.getElementById('contactDate')?.value || '';
      const occasion = document.getElementById('contactType')?.value || '';
      closeContactModal();
      const params = new URLSearchParams({
        type: 'private',
        name,
        date,
        occasion
      });
      window.location.href = `/thank-you?${params.toString()}`;
    }

/* ========== INDEX-2 ========== */
function initEventListHover() {
      const rows = document.querySelectorAll('.event-list-row[data-poster]');
      const preview = document.getElementById('eventPosterPreview');
      const previewImg = document.getElementById('eventPosterImg');
      if (!rows.length || !preview || !previewImg) return;

      let mouseX = 0;
      let mouseY = 0;
      let curX = 0;
      let curY = 0;
      let isHovered = false;
      let animId = null;

      // Smooth fluid lerp loop for floating position
      function renderLoop() {
        if (!isHovered && Math.abs(curX - mouseX) < 0.1 && Math.abs(curY - mouseY) < 0.1) {
          animId = null;
          return;
        }

        // Fluid cursor tracking with lerp
        curX += (mouseX - curX) * 0.14;
        curY += (mouseY - curY) * 0.14;
        preview.style.transform = `translate3d(${curX}px, ${curY}px, 0) ${isHovered ? 'scale(1)' : 'scale(0.94)'}`;

        animId = requestAnimationFrame(renderLoop);
      }

      function updateTarget(e) {
        const pWidth = preview.offsetWidth || 320;
        const pHeight = preview.offsetHeight || 426;

        // Position poster neatly to the right of cursor
        let targetX = e.clientX + 32;
        let targetY = e.clientY - (pHeight / 2);

        // If close to right edge, flip to left of cursor so it never gets cut off
        if (targetX + pWidth > window.innerWidth - 24) {
          targetX = e.clientX - pWidth - 32;
        }

        // Clamp Y within viewport bounds
        targetY = Math.max(20, Math.min(window.innerHeight - pHeight - 20, targetY));

        mouseX = targetX;
        mouseY = targetY;

        if (!animId) {
          animId = requestAnimationFrame(renderLoop);
        }
      }

      rows.forEach(function(row) {
        row.addEventListener('mouseenter', function(e) {
          const posterUrl = row.dataset.poster;
          if (previewImg.getAttribute('src') !== posterUrl) {
            previewImg.src = posterUrl;
          }
          isHovered = true;
          preview.classList.add('is-active');

          // Initialize coordinates immediately on enter so it doesn't jump
          const pWidth = preview.offsetWidth || 320;
          const pHeight = preview.offsetHeight || 426;
          let initX = e.clientX + 32;
          let initY = e.clientY - (pHeight / 2);
          if (initX + pWidth > window.innerWidth - 24) {
            initX = e.clientX - pWidth - 32;
          }
          initY = Math.max(20, Math.min(window.innerHeight - pHeight - 20, initY));

          if (!curX && !curY) {
            curX = initX;
            curY = initY;
          }
          mouseX = initX;
          mouseY = initY;

          if (!animId) {
            animId = requestAnimationFrame(renderLoop);
          }
        });

        row.addEventListener('mousemove', function(e) {
          updateTarget(e);
        });

        row.addEventListener('mouseleave', function() {
          isHovered = false;
          preview.classList.remove('is-active');
        });

        // Keyboard support
        row.addEventListener('keydown', function(e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openReservationModal(e);
          }
        });
      });
    }

/* ========== DRINKS-FOOD ========== */
function initMenuScrollSpy() {
      const sections = Array.from(document.querySelectorAll('.menu-panel-section[data-category]'));
      const sidebarItems = Array.from(document.querySelectorAll('.sidebar-nav-item[data-target]'));
      if (!sections.length || !sidebarItems.length) return;

      function setActiveCategory(cat) {
        sidebarItems.forEach(item => {
          const isMatch = item.getAttribute('data-target') === cat;
          item.classList.toggle('active', isMatch);
          item.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
      }

      function syncCategoryFromScroll() {
        const probeY = window.innerHeight * 0.45;
        let currentCat = sections[0].getAttribute('data-category');

        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= probeY) {
            currentCat = sections[i].getAttribute('data-category');
          }
        }
        setActiveCategory(currentCat);
      }

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            syncCategoryFromScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });

      window.addEventListener('resize', syncCategoryFromScroll, { passive: true });
      syncCategoryFromScroll();

      sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const targetCat = item.getAttribute('data-target');
          const targetEl = document.getElementById(targetCat);
          setActiveCategory(targetCat);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

function setActiveCategory(cat) {
        sidebarItems.forEach(item => {
          const isMatch = item.getAttribute('data-target') === cat;
          item.classList.toggle('active', isMatch);
          item.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });
      }

function syncCategoryFromScroll() {
        const probeY = window.innerHeight * 0.45;
        let currentCat = sections[0].getAttribute('data-category');

        for (let i = 0; i < sections.length; i++) {
          const rect = sections[i].getBoundingClientRect();
          if (rect.top <= probeY) {
            currentCat = sections[i].getAttribute('data-category');
          }
        }
        setActiveCategory(currentCat);
      }

/* ========== OUR-SPACE ========== */
const GALLERY_DATA = [
      { id: 1, src: '/assets/Event-bg2.avif', ratio: 1.78, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'The Nocturnal Bar Counter', alt: 'The Nocturnal Bar Counter' },
      { id: 2, src: '/assets/spin-gallery-3.avif', ratio: 0.67, category: 'music', categoryLabel: 'Music & Sound', title: 'Precision Turntable Tonearm', alt: 'Precision Turntable Tonearm' },
      { id: 3, src: '/assets/spin-gallery-2.avif', ratio: 0.67, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Acoustic Wood-Panelled Booth', alt: 'Acoustic Wood-Panelled Booth' },
      { id: 4, src: '/assets/Cocktail.avif', ratio: 0.69, category: 'drinks-food', sub: 'drinks', categoryLabel: 'Drinks & Food', title: 'Clarified Solar Highball', alt: 'Clarified Solar Highball' },
      { id: 5, src: '/assets/Event-2.avif', ratio: 1.00, category: 'music', categoryLabel: 'Music & Sound', title: 'Vinyl Selector at the Decks', alt: 'Vinyl Selector at the Decks' },
      { id: 6, src: '/assets/spin-gallery-9.avif', ratio: 1.50, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'The Vinyl Archive Lounge', alt: 'The Vinyl Archive Lounge' },
      { id: 7, src: '/assets/Event-bg.avif', ratio: 2.20, category: 'interiors', categoryLabel: 'Interiors & Space', title: '440Hz Master Acoustic Architecture', alt: '440Hz Master Acoustic Architecture', panoramic: true },
      { id: 8, src: '/assets/Food.avif', ratio: 0.69, category: 'drinks-food', sub: 'food', categoryLabel: 'Drinks & Food', title: 'Robata Charcoal Seasonal Dish', alt: 'Robata Charcoal Seasonal Dish' },
      { id: 9, src: '/assets/Event-bg1.avif', ratio: 1.33, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Ambient Pool Hall Lounge', alt: 'Ambient Pool Hall Lounge' },
      { id: 10, src: '/assets/nami-dj-bar.avif', ratio: 0.75, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Cocktail Bar & DJ Console', alt: 'Cocktail Bar & DJ Console' },
      { id: 11, src: '/assets/nami-horn-speaker.avif', ratio: 1.40, category: 'music', categoryLabel: 'Music & Sound', title: 'Custom Red Multi-Cell Horn Speaker', alt: 'Custom Red Multi-Cell Horn Speaker' },
      { id: 12, src: '/assets/nami-negroni-horn.avif', ratio: 0.75, category: 'drinks-food', sub: 'drinks', categoryLabel: 'Drinks & Food', title: 'Ruby Negroni at the Listening Bar', alt: 'Ruby Negroni at the Listening Bar' },
      { id: 13, src: '/assets/spin-gallery-5.avif', ratio: 0.67, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Low-Lit Dining Lounge Booths', alt: 'Low-Lit Dining Lounge Booths' },
      { id: 14, src: '/assets/Dessert.avif', ratio: 0.69, category: 'drinks-food', sub: 'food', categoryLabel: 'Drinks & Food', title: 'Miso Caramel Sweet Tart', alt: 'Miso Caramel Sweet Tart' },
      { id: 15, src: '/assets/nami-turntable-hands.avif', ratio: 1.50, category: 'music', categoryLabel: 'Music & Sound', title: 'Spinning Vinyl Turntable Decks', alt: 'Spinning Vinyl Turntable Decks' },
      { id: 16, src: '/assets/nami-carafe-pour.avif', ratio: 1.33, category: 'drinks-food', sub: 'drinks', categoryLabel: 'Drinks & Food', title: 'Clarified Cocktail Carafe Pour', alt: 'Clarified Cocktail Carafe Pour' },
      { id: 17, src: '/assets/nami-guest-table.avif', ratio: 0.71, category: 'drinks-food', sub: 'drinks', categoryLabel: 'Drinks & Food', title: 'Nocturnal Dining & Highballs', alt: 'Nocturnal Dining & Highballs' },
      { id: 18, src: '/assets/nami-selector-booth.avif', ratio: 0.71, category: 'music', categoryLabel: 'Music & Sound', title: 'Selector Mixing on Dual Turntables', alt: 'Selector Mixing on Dual Turntables' },
      { id: 19, src: '/assets/nami-edamame-tart.avif', ratio: 1.33, category: 'drinks-food', sub: 'food', categoryLabel: 'Drinks & Food', title: 'Edamame & Blossom Tartlets', alt: 'Edamame & Blossom Tartlets' },
      { id: 20, src: '/assets/nami-resor-mixer.avif', ratio: 0.71, category: 'music', categoryLabel: 'Music & Sound', title: 'Resor Rotary Mixer Amber VU Meter', alt: 'Resor Rotary Mixer Amber VU Meter' },
      { id: 21, src: '/assets/nami-erykah-vinyl.avif', ratio: 0.75, category: 'music', categoryLabel: 'Music & Sound', title: 'Vinyl Records & Red Acoustic Horn', alt: 'Vinyl Records & Red Acoustic Horn' },
      { id: 22, src: '/assets/nami-bar-room.avif', ratio: 1.40, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Nami Listening Room & Bar Interior', alt: 'Nami Listening Room & Bar Interior' },
      { id: 23, src: '/assets/nami-coupe-cocktail.avif', ratio: 1.33, category: 'drinks-food', sub: 'drinks', categoryLabel: 'Drinks & Food', title: 'Botanical Foam Coupe Cocktail', alt: 'Botanical Foam Coupe Cocktail' },
      { id: 24, src: '/assets/nami-croquette-plate.avif', ratio: 1.33, category: 'drinks-food', sub: 'food', categoryLabel: 'Drinks & Food', title: 'Crispy Robata Small Plates', alt: 'Crispy Robata Small Plates' },
      { id: 25, src: '/assets/nami-robata-skewer.avif', ratio: 1.33, category: 'drinks-food', sub: 'food', categoryLabel: 'Drinks & Food', title: 'Charcoal Grilled Squid Skewer', alt: 'Charcoal Grilled Squid Skewer' },
      { id: 26, src: '/assets/nami-evening-crowd.avif', ratio: 1.33, category: 'interiors', categoryLabel: 'Interiors & Space', title: 'Evening Gathering Beneath Red Coffers', alt: 'Evening Gathering Beneath Red Coffers' }
    ];

    

function filterGallery(category) {
      currentFilter = category;

      // Update Filter Pills UI (Bold underline for active, no underline for inactive)
      document.querySelectorAll('.gallery-filter-pill').forEach(pill => {
        const isMatch = pill.getAttribute('data-filter') === category;
        pill.classList.toggle('active', isMatch);
        pill.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      const container = document.getElementById('galleryStripsContainer');
      if (!container) return;

      if (category === 'all') {
        activeDataset = [...GALLERY_DATA];
      } else {
        activeDataset = GALLERY_DATA.filter(item => item.category === category);
      }

      // Smooth Fade Transition
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.22s ease';

      setTimeout(() => {
        const rows = [];
        let currentRow = [];
        let currentRatioSum = 0;

        activeDataset.forEach((item, idx) => {
          if (item.panoramic && (category === 'all' || activeDataset.length <= 3)) {
            if (currentRow.length > 0) {
              rows.push(currentRow);
              currentRow = [];
              currentRatioSum = 0;
            }
            rows.push([item]);
            return;
          }

          currentRow.push(item);
          currentRatioSum += item.ratio;

          if (currentRatioSum >= 2.4 || currentRow.length >= 3) {
            rows.push(currentRow);
            currentRow = [];
            currentRatioSum = 0;
          }
        });

        if (currentRow.length > 0) {
          rows.push(currentRow);
        }

        // Generate Justified Rows HTML (Zero Hover Badge Overlay, Zero Zoom)
        let html = '';
        rows.forEach((r, rIdx) => {
          const isPanoramic = r.length === 1 && r[0].panoramic;
          html += `<div class="gallery-strip-row ${isPanoramic ? 'panoramic-row' : ''}" data-row-id="${rIdx + 1}">`;
          r.forEach(item => {
            const globalIndex = GALLERY_DATA.findIndex(d => d.id === item.id);
            html += `
              <div class="gallery-strip-item" style="flex: ${item.ratio} ${item.ratio} 0px;" data-category="${item.category}" data-index="${globalIndex}" >
                <img src="${item.src}" alt="${item.alt}" loading="lazy">
              </div>
            `;
          });
          html += `</div>`;
        });

        container.innerHTML = html;
        container.style.opacity = '1';
      }, 220);
    }

/* ========== FAQS ========== */
function initFaqAccordion() {
      const items = Array.from(document.querySelectorAll('#faqAccordion .faq-item'));
      if (!items.length) return;

      const ac = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const signal = ac ? ac.signal : undefined;

      items.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        if (!trigger) return;
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }, { signal });
      });

      window.__namiPageCleanup = window.__namiPageCleanup || [];
      window.__namiPageCleanup.push(function () {
        if (ac) ac.abort();
      });
    }

function handleEnquirySubmit(e) {
      e.preventDefault();
      const firstName = (document.getElementById('enqFirstName')?.value || '').trim();
      const topic = document.getElementById('enqTopic')?.value || 'your enquiry';
      const params = new URLSearchParams({
        type: 'enquiry',
        name: firstName,
        topic
      });
      window.location.href = `/thank-you?${params.toString()}`;
    }

/* ========== THANK-YOU ========== */
function populateThankYouContext() {
      const params = new URLSearchParams(window.location.search);
      const type = (params.get('type') || '').toLowerCase();
      const name = (params.get('name') || '').trim();
      const date = (params.get('date') || '').trim();
      const guests = (params.get('guests') || '').trim();
      const time = (params.get('time') || '').trim();
      const seating = (params.get('seating') || '').trim();
      const topic = (params.get('topic') || '').trim();
      const occasion = (params.get('occasion') || '').trim();

      const subtitleEl = document.getElementById('tySubtitle');
      if (!subtitleEl) return;

      const greeting = name ? `Thank you, ${name}. ` : '';

      if (type === 'reservation') {
        const partyText = guests ? `for ${guests} ${guests === '1' ? 'guest' : 'guests'}` : '';
        const dateText = date ? ` on ${date}` : '';
        const timeText = time ? ` at ${time}` : '';
        const seatText = seating ? ` in the ${seating}` : '';
        subtitleEl.textContent = `${greeting}Your table reservation request ${partyText}${dateText}${timeText}${seatText} has been received. Our concierge at Mansionz One will confirm your session shortly via WhatsApp.`;
      } else if (type === 'private') {
        const occText = occasion ? ` for ${occasion}` : '';
        const dateText = date ? ` (${date})` : '';
        subtitleEl.textContent = `${greeting}We have received your private hire inquiry${occText}${dateText}. Our events and sound curation team will reach out within 24 hours.`;
      } else if (type === 'enquiry') {
        const topicText = topic ? ` regarding ${topic}` : '';
        subtitleEl.textContent = `${greeting}Your message${topicText} has been received by our Bandra West team. Expect a personal reply within 24 hours.`;
      }
    }
let currentFilter = 'all';
let activeDataset = typeof GALLERY_DATA !== 'undefined' ? [...GALLERY_DATA] : [];


/* ========== THANK-YOU REDIRECT HELPERS ========== */
window.namiGoThankYou = function(params) {
  var q = new URLSearchParams(params || {}).toString();
  window.location.href = '/thank-you' + (q ? ('?' + q) : '');
};

/* ========== PAGE BOOTSTRAPS (Next.js-safe) ========== */
(function () {
  function safe(fn) { try { fn(); } catch (e) { console.warn('[nami]', e); } }
  window.__namiPageCleanup = window.__namiPageCleanup || [];
  window.cleanupNamiPageFeatures = function () {
    (window.__namiPageCleanup || []).forEach(function (fn) { try { fn(); } catch (e) {} });
    window.__namiPageCleanup = [];
  };
  window.initNamiPageFeatures = function () {
    window.cleanupNamiPageFeatures();
    safe(function () { if (typeof initHorizontalPillarsScroll === 'function' && document.getElementById('pillarsPinnedContainer')) initHorizontalPillarsScroll(); });
    safe(function () { if (typeof initImageRevealAnimation === 'function' && document.querySelector('.reveal-on-scroll')) initImageRevealAnimation(); });
    safe(function () { if (typeof initWaveVideoSync === 'function' && document.querySelector('.wave-video-strap video')) initWaveVideoSync(); });
    safe(function () { if (typeof initMenuScrollSpy === 'function' && document.getElementById('menuPanels')) initMenuScrollSpy(); });
    // Gallery: keep the static server-rendered rows (matches live); filterGallery runs only on pill clicks.
    safe(function () { if (typeof initEventListHover === 'function' && document.querySelector('.event-list-row')) initEventListHover(); });
    safe(function () { if (typeof initFaqAccordion === 'function' && document.querySelector('.faq-item, .faq-accordion')) initFaqAccordion(); });
    safe(function () { if (typeof initSoundCarousel === 'function' && document.getElementById('soundCarousel')) initSoundCarousel(); });
    safe(function () { if (typeof initPrevEventsCarousel === 'function' && document.getElementById('prevEventsTrack')) initPrevEventsCarousel(); });
    safe(function () { if (typeof populateThankYouContext === 'function' && document.getElementById('tySubtitle')) populateThankYouContext(); });
    document.querySelectorAll('video.wave-strap-media, video.hero-bg-media, video.splash-video').forEach(function (v) {
      try { v.muted = true; var p = v.play(); if (p && p.catch) p.catch(function(){}); } catch (e) {}
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.initNamiPageFeatures(); });
  } else {
    window.initNamiPageFeatures();
  }
})();
