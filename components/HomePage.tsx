// @ts-nocheck
'use client';

import { useEffect } from "react";
import "./home.css";

export default function HomePage() {
  useEffect(() => {

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
          if (!toast) return;
          toast.textContent = msg;
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 2600);
        }

        // 2. Menu Drawer Toggle
        function toggleMenuDrawer() {
          const drawer = document.getElementById('menuDrawer');
          if (!drawer) return;
          drawer.classList.toggle('open');
        }

        // Event Details Data & Popup Modal System
        const EVENTS_DATA = {
          '9': {
            dateNum: '09',
            dateTag: 'TUE · FEB 09',
            hzTag: '440 Hz Root',
            artist: 'Atushi Maeda',
            title: 'Atushi Maeda · Ambient & Jazz',
            genre: 'Japanese Ambient · Spiritual Jazz · Tokyo Archives',
            timing: '20:30 Onwards (Doors open 19:00)',
            attendees: '38 Guests Attending · Counter Seats Available',
            poster: '/assets/spin-gallery-1.jpg',
            desc: 'Tokyo selector Atushi Maeda spins rare Japanese spiritual jazz, intimate environmental ambient, and early experimental Japanese synth pressings exclusively through our custom horn-loaded acoustic system.',
            dateStr: '2026-02-09'
          },
          '14': {
            dateNum: '14',
            dateTag: 'SUN · FEB 14',
            hzTag: 'Warm Frequencies',
            artist: 'Mogasu',
            title: 'Mogasu · Vinyl Soul & Rare Groove',
            genre: 'Vintage Soul · Slow-Tempo Lovers Rock · Rare Groove',
            timing: '18:00 Onwards (Golden Hour Session)',
            attendees: '56 Guests Attending · High Demand',
            poster: '/assets/spin-gallery-2.jpg',
            desc: 'A Valentine’s rare vinyl journey through vintage American soul, slow-tempo Jamaican lovers rock, and warm disco ballads curated exclusively on original analog pressings.',
            dateStr: '2026-02-14'
          },
          '15': {
            dateNum: '15',
            dateTag: 'MON · FEB 15',
            hzTag: '980 Hz Harmonic',
            artist: 'Jerrau',
            title: 'Jerrau · Leftfield Disco & Dub',
            genre: 'Dub Reggae · Leftfield Disco · Post-Punk Funk',
            timing: '20:30 Onwards',
            attendees: '44 Guests Attending · Booths Available',
            poster: '/assets/spin-gallery-3.jpg',
            desc: 'Amsterdam selector Jerrau brings hypnotic Jamaican dub plates, leftfield disco excursions, and driving polyrhythmic grooves calibrated to our sub-bass manifold.',
            dateStr: '2026-02-15'
          },
          '20': {
            dateNum: '20',
            dateTag: 'SAT · FEB 20',
            hzTag: '3968 Hz Special · Headline',
            artist: 'Yousuke Yukimatsu',
            title: 'Yousuke Yukimatsu · Avant-Garde & Deep Bass',
            genre: 'Tokyo Avant-Garde · Sub-Bass Manifold · Experimental',
            timing: '20:30 Onwards (Headline Showcase)',
            attendees: '72 Guests Attending · Selling Fast',
            poster: '/assets/spin-gallery-6.jpg',
            desc: 'Tokyo underground legend Yousuke Yukimatsu delivers an extreme contrast performance — seamlessly bridging ambient classical minimalism with crushing sub-bass frequencies and breakcore intensity.',
            dateStr: '2026-02-20'
          },
          '23': {
            dateNum: '23',
            dateTag: 'TUE · FEB 23',
            hzTag: 'Resonant Node',
            artist: 'Occa',
            title: 'Occa · Deep Hypnotic Soundscapes',
            genre: 'Hypnotic Techno · Deep Ambient · Subterranean Waves',
            timing: '20:30 Onwards',
            attendees: '35 Guests Attending · Listening Tables Open',
            poster: '/assets/spin-gallery-4.jpg',
            desc: 'Sapporo sonic architect Occa explores deep psychedelic rhythms, subterranean sub-harmonics, and meditative ambient soundscapes designed for total physical acoustic immersion.',
            dateStr: '2026-02-23'
          },
          '28': {
            dateNum: '28',
            dateTag: 'SUN · FEB 28',
            hzTag: 'Electric Pulse',
            artist: 'Suze Ijo',
            title: 'Suze Ijo · Afro-Cuban & Electronic',
            genre: 'Afro-Cuban Percussion · Deep House · Global Groove',
            timing: '19:00 Onwards',
            attendees: '48 Guests Attending · Limited Counter Left',
            poster: '/assets/spin-gallery-7.jpg',
            desc: 'Rotterdam selector Suze Ijo brings infectious rhythms, Afro-Cuban percussions, and uplifting house gems woven seamlessly through vintage tube amplification.',
            dateStr: '2026-02-28'
          },
          '29': {
            dateNum: '29',
            dateTag: 'MON · FEB 29',
            hzTag: 'Nocturnal Set',
            artist: 'Sunju Hargun',
            title: 'Sunju Hargun · Bangkok Nightclub Selector',
            genre: 'Cosmic Techno · Asian Synth · Psychedelic Dub',
            timing: '19:00 Onwards (Leap Night Special)',
            attendees: '52 Guests Attending · Special Event',
            poster: '/assets/spin-gallery-8.jpg',
            desc: 'A rare leap-year nocturnal selector set by Bangkok electronic producer Sunju Hargun, exploring psychedelic Asian synth, ritualistic dub, and late-night cosmic techno.',
            dateStr: '2026-02-29'
          },
          '30': {
            dateNum: '30',
            dateTag: 'TUE · FEB 30',
            hzTag: 'Deep Listening',
            artist: 'Vinyl Archives',
            title: 'Deep Listening · Open Decks Session',
            genre: 'Archival Vinyl · Private Pressings · Audiophile Social',
            timing: '19:00 Onwards (Community Social)',
            attendees: '29 Guests Attending · Open Seating',
            poster: '/assets/spin-gallery-9.jpg',
            desc: 'Our weekly communal listening session. Guests and resident collectors share rare test pressings, unreleased white labels, and archival vinyl on our reference turntable system.',
            dateStr: '2026-02-30'
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
          const timingEl = document.getElementById('colPopupTiming');
          const attendeesEl = document.getElementById('colPopupAttendees');
          const descEl = document.getElementById('colPopupDesc');

          if (dateEl) dateEl.textContent = ev.dateTag;
          if (imgEl) {
            imgEl.src = ev.poster;
            imgEl.alt = ev.artist;
          }
          if (hzEl) hzEl.textContent = ev.hzTag;
          if (titleEl) titleEl.textContent = ev.artist;
          if (genreEl) genreEl.textContent = ev.genre;
          if (timingEl) timingEl.textContent = ev.timing;
          if (attendeesEl) attendeesEl.textContent = ev.attendees;
          if (descEl) descEl.textContent = ev.desc;

          // Position: snap to calendar grid (requires a resolved target cell)
          if (targetCell) {
            const colWidth = targetCell.offsetWidth || grid.offsetWidth / 7;
            const cellHeight = targetCell.offsetHeight || 120;
            const totalCols = 7;
            const totalRows = 5;

            const colIndex = Math.round(targetCell.offsetLeft / colWidth);
            const rowIndex = Math.round(targetCell.offsetTop / cellHeight);

            const colSpan = grid.offsetWidth < 768 ? 2 : 3;
            const rowSpan = 3;

            let startCol = colIndex;
            if (startCol + colSpan > totalCols) startCol = totalCols - colSpan;
            if (startCol < 0) startCol = 0;

            let startRow = rowIndex;
            if (startRow + rowSpan > totalRows) startRow = totalRows - rowSpan;
            if (startRow < 0) startRow = 0;

            const left = startCol * colWidth;
            const top = startRow * cellHeight;
            const width = colSpan * colWidth;
            const height = rowSpan * cellHeight;

            popup.style.left = left + 'px';
            popup.style.top = top + 'px';
            popup.style.width = width + 'px';
            popup.style.height = height + 'px';

            const scrollWrap = document.querySelector('.cal-grid-scroll-wrap');
            if (scrollWrap) {
              const wrapLeft = scrollWrap.scrollLeft;
              const wrapWidth = scrollWrap.clientWidth;
              if (left < wrapLeft) {
                scrollWrap.scrollTo({ left: Math.max(0, left - 20), behavior: 'smooth' });
              } else if (left + width > wrapLeft + wrapWidth) {
                scrollWrap.scrollTo({
                  left: left + width - wrapWidth + 20,
                  behavior: 'smooth',
                });
              }
            }
          }

          popup.classList.add('open');
          popup.setAttribute('aria-hidden', 'false');
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

          const bookDateInput = document.getElementById('bookDate');
          if (bookDateInput) {
            bookDateInput.value = targetDate;
          }
          showToast(`Selected ${artist} · Feb ${targetDate.split('-')[2]}`);

          const reserveSec = document.getElementById('reserve');
          if (reserveSec) {
            reserveSec.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // Dismiss popup on outside click (anywhere except inside the popup itself or on an event cell)
        document.addEventListener('click', function(e) {
          const popup = document.getElementById('calColumnPopup');
          if (!popup || !popup.classList.contains('open')) return;
          const target = e.target instanceof Element ? e.target : null;
          if (!target) return;
          if (popup.contains(target)) return;
          if (target.closest('.has-event')) return;
          closeEventPopup();
        });

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
            const colWidth = targetCell.offsetWidth;
            const cellHeight = targetCell.offsetHeight;
            const totalCols = 7;
            const totalRows = 5;

            const colIndex = Math.round(targetCell.offsetLeft / colWidth);
            const rowIndex = Math.round(targetCell.offsetTop / cellHeight);

            const colSpan = (grid.offsetWidth < 768) ? 2 : 3;
            const rowSpan = 3;

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

            popup.style.left = (startCol * colWidth) + 'px';
            popup.style.top = (startRow * cellHeight) + 'px';
            popup.style.width = (colSpan * colWidth) + 'px';
            popup.style.height = (rowSpan * cellHeight) + 'px';
          }
        });

        // Select Event Date from Calendar to Booking Form
        function selectEventDate(dateStr, artistName) {
          const bookDateInput = document.getElementById('bookDate');
          if (bookDateInput) {
            bookDateInput.value = dateStr;
          }
          showToast(`Selected ${artistName} · Feb ${dateStr.split('-')[2]}`);
        }

        // 3. First-Fold Parallax & ScrollSpy Execution
        const heroBg = document.querySelector('.hero-bg-media');
        const heroContent = document.querySelector('.hero-content');
        const heroScrollCue = document.querySelector('.hero-scroll-cue');
        const scrollerButtons = document.querySelectorAll('.scroller-btn');
        const sections = ['hero', 'philosophy', 'space', 'menu', 'reserve'];
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

          // Subtle Parallax on Full-Width Event Banner
          if (eventBanner && eventImg) {
            const rect = eventBanner.getBoundingClientRect();
            if (rect.top < winHeight && rect.bottom > 0) {
              const progress = (rect.top - winHeight / 2) / (winHeight / 2 + rect.height / 2);
              const translateY = progress * 50;
              eventImg.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
            }
          }

          // ScrollSpy for Top-Right Nav
          let currentSection = 'hero';
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

        // 4. Menu Tabs (Food / Cocktails / Desserts)
        function switchMenuTab(tab) {
          document.querySelectorAll('.menu-tab-btn').forEach(btn => btn.classList.remove('active'));
          event.target.classList.add('active');

          document.getElementById('menuFood').style.display = (tab === 'food') ? 'grid' : 'none';
          document.getElementById('menuCocktails').style.display = (tab === 'cocktails') ? 'grid' : 'none';
          document.getElementById('menuDesserts').style.display = (tab === 'desserts') ? 'grid' : 'none';
        }

        // 5. FAQ Accordions
        function toggleFaq(button) {
          const item = button.parentElement;
          const answer = item.querySelector('.faq-answer');
          const isOpen = item.classList.contains('active');

          // Close all
          document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
          });

          if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
          }
        }

        // 6. Direct Reservation Handler (Strapi-ready payload shape)
        function handleReservationSubmit(e) {
          e.preventDefault();
          const form = e.currentTarget;
          if (!(form instanceof HTMLFormElement)) return;
          if (!form.reportValidity()) return;

          const data = new FormData(form);
          const payload = {
            name: String(data.get('name') || '').trim(),
            email: String(data.get('email') || '').trim(),
            phone: String(data.get('phone') || '').trim(),
            date: String(data.get('date') || ''),
            time: String(data.get('time') || ''),
            guests: String(data.get('guests') || ''),
            zone: String(data.get('zone') || ''),
            notes: String(data.get('notes') || '').trim(),
          };

          // Frontend-only for now — swap this for Strapi/API POST later
          console.info('[nami] reservation payload', payload);
          showToast(`Reservation requested for ${payload.guests} · ${payload.date} at ${payload.time}`);
          form.reset();

          const dateInput = form.elements.namedItem('date');
          if (dateInput instanceof HTMLInputElement) {
            const today = new Date();
            const iso = today.toISOString().slice(0, 10);
            dateInput.value = iso;
            dateInput.min = iso;
          }
        }

        // Default booking date = today (and block past dates)
        (function initBookingDateDefaults() {
          const dateInput = document.getElementById('bookDate');
          if (!(dateInput instanceof HTMLInputElement)) return;
          const today = new Date().toISOString().slice(0, 10);
          dateInput.min = today;
          if (!dateInput.value || dateInput.value < today) {
            dateInput.value = today;
          }
        })();

        // 7. Interactive Audio Player (Web Audio API Synthesizer)
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
  
        // Expose only handlers used by JSX onClick bridges
        (window as any).showToast = showToast;
        (window as any).toggleMenuDrawer = toggleMenuDrawer;
        (window as any).openEventPopup = openEventPopup;
        (window as any).closeEventPopup = closeEventPopup;
        (window as any).bookFromPopup = bookFromPopup;
        (window as any).selectEventDate = selectEventDate;
        (window as any).switchMenuTab = switchMenuTab;
        (window as any).toggleFaq = toggleFaq;
        (window as any).handleReservationSubmit = handleReservationSubmit;
        (window as any).toggleAudio = toggleAudio;

  }, []);

  return (
    <>
      {/* Official Noise Texture Overlay */}
        <div id="noise-layer"></div>

        {/* Warm Analog Tube Glow */}
        <div id="warmth-layer"></div>

        {/* =========================================================
             FIXED TOP NAVIGATION (Exact Match to User Reference)
             ========================================================= */}
        <header className="site-header">
          <div className="header-left">
            {/* Appears when scrolling away from hero */}
            <a href="#hero" className="brand-mark-link" id="headerBrandMark" aria-label="NAMI Home">
              <img src="/assets/Main-logo.svg" alt="NAMI" className="brand-mark-img" />
            </a>
          </div>

          <div className="header-nav-wrap">
            {/* Circular Page Scroller: ( I ) ~ ( P ) ~ ( S ) ~ ( M ) ~ ( R ) */}
            <nav className="section-scroller" aria-label="Section scroller">
              {/* Node I: Intro / Hero */}
              <div className="scroller-node">
                <a href="#hero" className="scroller-btn active" data-section="hero" aria-label="Intro">
                  I
                  <span className="tooltip">Intro</span>
                </a>
              </div>

              <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

              {/* Node P: Philosophy */}
              <div className="scroller-node">
                <a href="#philosophy" className="scroller-btn" data-section="philosophy" aria-label="Philosophy">
                  P
                  <span className="tooltip">Philosophy</span>
                </a>
              </div>

              <img src="/assets/wave-2.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

              {/* Node S: Space */}
              <div className="scroller-node">
                <a href="#space" className="scroller-btn" data-section="space" aria-label="Space">
                  S
                  <span className="tooltip">Space</span>
                </a>
              </div>

              <img src="/assets/wave-1.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

              {/* Node M: Menu */}
              <div className="scroller-node">
                <a href="#menu" className="scroller-btn" data-section="menu" aria-label="Menu">
                  M
                  <span className="tooltip">Menu</span>
                </a>
              </div>

              <img src="/assets/wave-2.svg" className="scroller-wave-sep" alt="" aria-hidden="true" />

              {/* Node R: Reserve */}
              <div className="scroller-node">
                <a href="#reserve" className="scroller-btn" data-section="reserve" aria-label="Reserve a Table">
                  R
                  <span className="tooltip">Reserve</span>
                </a>
              </div>
            </nav>

            {/* Waveform Hamburger Menu Icon (Menu-io.svg) */}
            <button className="btn-wave-hamburger" id="hamburgerBtn" aria-label="Toggle menu" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <img src="/assets/Menu-io.svg" alt="Menu" className="btn-menu-icon" />
            </button>
          </div>
        </header>

        {/* =========================================================
             FULL-SCREEN SLIDE-OUT MENU DRAWER
             ========================================================= */}
        <div id="menuDrawer" role="dialog" aria-modal="true">
          <div className="menu-drawer-top">
            <img src="/assets/Main-logo.svg" alt="NAMI" style={{height: '28px', width: 'auto'}} />
            <button className="btn-close-drawer" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} aria-label="Close menu">✕</button>
          </div>

          <nav className="drawer-nav-links">
            <a href="#hero" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">01</span> Intro & Welcome
            </a>
            <a href="#philosophy" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">02</span> The Philosophy
            </a>
            <a href="#programming" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">03</span> What’s On (Schedule)
            </a>
            <a href="#menu" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">04</span> Resonance Menu
            </a>
            <a href="#space" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">05</span> The Space & Sound Setup
            </a>
            <a href="#faqs" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }}>
              <span className="drawer-nav-num">06</span> FAQs & Etiquette
            </a>
            <a href="#reserve" className="drawer-nav-item" onClick={(e) => { const event = e; (window as any).toggleMenuDrawer?.() }} style={{color: 'var(--c-orange)'}}>
              <span className="drawer-nav-num" style={{color: 'var(--c-orange)'}}>07</span> Reserve a Table
            </a>
          </nav>

          <div className="drawer-bottom-info">
            <div className="drawer-info-col">
              <h4>HOURS</h4>
              <p>Wed – Sun · 7 PM – Late<br />Listening Sessions: 20:30 Onwards</p>
            </div>
            <div className="drawer-info-col">
              <h4>LOCATION</h4>
              <p>Bandra West, Mumbai,<br />Maharashtra 400050</p>
            </div>
            <div className="drawer-info-col">
              <h4>COMMUNITY</h4>
              <a href="https://chat.whatsapp.com/" target="_blank" style={{color: '#fff', textDecoration: 'underline'}}>Join WhatsApp Group →</a>
            </div>
            <div className="drawer-info-col">
              <h4>INSTAGRAM</h4>
              <a href="https://instagram.com/" target="_blank" style={{color: '#fff'}}>@nami.hifi</a>
            </div>
          </div>
        </div>

        {/* =========================================================
             HERO ENTRANCE (Exact Reference Match: Center Big Logo)
             ========================================================= */}
        <section id="hero" className="hero-entrance">
          {/* Looping Vinyl Video Background (Safari-Optimized, Audio-Free, Zero Ghost Logo) */}
          <video className="hero-bg-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
            <source src="/assets/vinyl-loop.mp4" type="video/mp4" />
          </video>

          <div className="hero-content">
            {/* Huge Big Center Logo (Max 1024px) */}
            <svg className="hero-big-logo" id="heroMainLogo" width="822" height="151" viewBox="0 0 822 151" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="NAMI">
      <defs>
      <style dangerouslySetInnerHTML={{ __html: `
        .nami-letter { transform-box: fill-box; transform-origin: 50% 50%; will-change: transform; }
        .nami-letter-i-dot { animation: logoWave_i_dot 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-n { animation: logoWave_n 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-m { animation: logoWave_m 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-a { animation: logoWave_a 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        .nami-letter-i-stem { animation: logoWave_i_stem 2000ms infinite cubic-bezier(0.42, 0, 0.58, 1); }
        @keyframes logoWave_i_dot {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          4.96% { transform: translateY(-0.207px) scaleY(1.0450); }
          10.60% { transform: translateY(0.069px) scaleY(0.9850); }
          16.46% { transform: translateY(-0.161px) scaleY(1.0350); }
          23.00% { transform: translateY(0.046px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          36.53% { transform: translateY(-0.207px) scaleY(1.0450); }
          42.17% { transform: translateY(0.069px) scaleY(0.9850); }
          48.03% { transform: translateY(-0.161px) scaleY(1.0350); }
          54.57% { transform: translateY(0.046px) scaleY(0.9900); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          59.96% { transform: translateY(-0.207px) scaleY(1.0450); }
          65.60% { transform: translateY(0.069px) scaleY(0.9850); }
          71.46% { transform: translateY(-0.161px) scaleY(1.0350); }
          78.00% { transform: translateY(0.046px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          91.53% { transform: translateY(-0.207px) scaleY(1.0450); }
          97.17% { transform: translateY(0.069px) scaleY(0.9850); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_n {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          4.06% { transform: translateY(-0.731px) scaleY(1.0250); }
          9.47% { transform: translateY(0.292px) scaleY(0.9900); }
          15.33% { transform: translateY(-1.169px) scaleY(1.0400); }
          21.65% { transform: translateY(0.438px) scaleY(0.9850); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          35.63% { transform: translateY(-0.731px) scaleY(1.0250); }
          41.04% { transform: translateY(0.292px) scaleY(0.9900); }
          46.90% { transform: translateY(-1.169px) scaleY(1.0400); }
          53.22% { transform: translateY(0.438px) scaleY(0.9850); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          59.06% { transform: translateY(-0.731px) scaleY(1.0250); }
          64.47% { transform: translateY(0.292px) scaleY(0.9900); }
          70.33% { transform: translateY(-1.169px) scaleY(1.0400); }
          76.65% { transform: translateY(0.438px) scaleY(0.9850); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          90.63% { transform: translateY(-0.731px) scaleY(1.0250); }
          96.04% { transform: translateY(0.292px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_m {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          5.64% { transform: translateY(-0.829px) scaleY(1.0350); }
          11.73% { transform: translateY(0.237px) scaleY(0.9900); }
          17.59% { transform: translateY(-0.592px) scaleY(1.0250); }
          24.35% { transform: translateY(0.237px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          37.21% { transform: translateY(-0.829px) scaleY(1.0350); }
          43.30% { transform: translateY(0.237px) scaleY(0.9900); }
          49.16% { transform: translateY(-0.592px) scaleY(1.0250); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          60.64% { transform: translateY(-0.829px) scaleY(1.0350); }
          66.73% { transform: translateY(0.237px) scaleY(0.9900); }
          72.59% { transform: translateY(-0.592px) scaleY(1.0250); }
          79.35% { transform: translateY(0.237px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          92.21% { transform: translateY(-0.829px) scaleY(1.0350); }
          98.30% { transform: translateY(0.237px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_a {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          3.61% { transform: translateY(-0.355px) scaleY(1.0200); }
          8.57% { transform: translateY(0.178px) scaleY(0.9900); }
          14.43% { transform: translateY(-0.622px) scaleY(1.0350); }
          20.75% { transform: translateY(0.178px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          35.18% { transform: translateY(-0.355px) scaleY(1.0200); }
          40.14% { transform: translateY(0.178px) scaleY(0.9900); }
          46.00% { transform: translateY(-0.622px) scaleY(1.0350); }
          52.32% { transform: translateY(0.178px) scaleY(0.9900); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          58.61% { transform: translateY(-0.355px) scaleY(1.0200); }
          63.57% { transform: translateY(0.178px) scaleY(0.9900); }
          69.43% { transform: translateY(-0.622px) scaleY(1.0350); }
          75.75% { transform: translateY(0.178px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          90.18% { transform: translateY(-0.355px) scaleY(1.0200); }
          95.14% { transform: translateY(0.178px) scaleY(0.9900); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
        @keyframes logoWave_i_stem {
          0.00% { transform: translateY(0.000px) scaleY(1.0000); }
          6.31% { transform: translateY(-0.743px) scaleY(1.0500); }
          12.63% { transform: translateY(0.223px) scaleY(0.9850); }
          18.49% { transform: translateY(-0.446px) scaleY(1.0300); }
          24.81% { transform: translateY(0.149px) scaleY(0.9900); }
          31.57% { transform: translateY(0.000px) scaleY(1.0000); }
          37.88% { transform: translateY(-0.743px) scaleY(1.0500); }
          44.20% { transform: translateY(0.223px) scaleY(0.9850); }
          50.06% { transform: translateY(-0.446px) scaleY(1.0300); }
          55.00% { transform: translateY(0.000px) scaleY(1.0000); }
          61.31% { transform: translateY(-0.743px) scaleY(1.0500); }
          67.63% { transform: translateY(0.223px) scaleY(0.9850); }
          73.49% { transform: translateY(-0.446px) scaleY(1.0300); }
          79.80% { transform: translateY(0.149px) scaleY(0.9900); }
          86.57% { transform: translateY(0.000px) scaleY(1.0000); }
          92.88% { transform: translateY(-0.743px) scaleY(1.0500); }
          100.00% { transform: translateY(0.000px) scaleY(1.0000); }
        }
      ` }} />
      </defs>
      <g className="nami-letter nami-letter-i-dot">
        <path d="M780.391 11.7857C780.391 18.2947 775.956 23.5715 770.488 23.5715C765.019 23.5715 760.568 18.2789 760.568 11.7857C760.568 5.29252 765.019 0 770.488 0C775.956 0 780.391 5.27672 780.391 11.7857Z" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-n">
        <path d="M171.404 149.265C171.308 150.055 170.609 150.639 169.846 150.639C169.766 150.639 169.703 150.639 169.639 150.639C136.782 146.563 118.835 126.31 109.599 110.021C105.148 102.201 102.541 94.8862 100.236 88.4088C99.5365 86.4498 98.853 84.5539 98.1694 82.7371C87.3917 54.6315 68.3161 39.4016 47.1264 41.9768C27.7647 44.3466 12.3929 61.3459 9.73823 83.3375C6.55897 109.516 5.63698 125.488 5.06472 135.03C4.715 141.018 4.50834 144.636 3.96787 146.816C3.92018 146.99 3.8407 147.164 3.74532 147.322L3.45919 147.748C3.04588 148.333 2.28286 148.57 1.59932 148.317C0.931674 148.064 0.502474 147.385 0.581956 146.674C0.788608 144.746 0.677333 141.35 0.502474 135.726C0.152755 124.003 -0.530786 102.138 0.725022 62.3412C1.90135 25.4515 29.5291 2.14861 55.5832 0.947918C68.7135 0.347573 80.6358 5.16614 90.0941 14.8981C100.824 25.9255 107.628 42.435 110.346 63.9368C110.696 66.7806 110.95 69.9877 111.204 73.3528C111.745 80.5885 112.381 88.7722 114.352 98.2829C118.453 118.015 135.51 142.756 170.053 147.495C170.911 147.622 171.515 148.412 171.404 149.265Z" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-m">
        <path d="M698.636 147.954C700.528 148.364 703.151 148.759 704.422 148.87C704.74 148.902 705.074 148.87 705.408 148.87C706.203 148.838 706.934 148.159 706.982 147.369C707.029 146.5 706.378 146.058 705.456 145.9C703.882 145.647 701.72 145.236 699.956 144.794C698.795 144.51 693.629 142.819 692.055 142.156C664.539 130.654 657.958 104.918 657.958 104.918C648.769 72.0099 644.032 47.4905 624.893 47.0956C612.891 46.7954 602.034 59.1657 592.465 86.2602C591.05 90.2889 582.212 118.932 574.311 118.489C565.377 117.984 559.623 82.3106 557.461 71.7887C550.657 38.4379 534.205 29.2906 523.729 29.0852C503.016 28.706 490.983 49.4338 481.572 82.3738C479.013 91.3316 475.039 102.517 473.195 107.415C459.285 144.431 433.978 146.548 429.13 147.306C428.272 147.432 427.699 148.222 427.811 149.075C427.906 149.865 428.605 150.45 429.368 150.45C429.432 150.45 429.496 150.45 429.559 150.45C455.438 147.653 469.252 138.364 485.085 108.505C492.525 94.4755 503.954 69.4663 523.236 69.4663C538.624 69.4663 546.858 87.1607 551.087 101.458C560.291 132.692 573.31 144.304 587.473 123.497C591.924 116.957 600.174 99.6416 602.352 95.8342C607.852 86.2128 618.741 72.4523 630.52 79.1825C639.883 84.5382 646.21 100.684 651.408 111.017C656.829 121.791 669.959 141.855 698.652 148.001" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-a">
        <path d="M419.275 148.775C419.211 149.613 418.48 150.229 417.638 150.213C404.714 149.676 389.803 141.208 383.445 137.574C382.348 136.958 381.505 136.468 380.933 136.168C371.522 131.381 363.654 126.341 356.039 121.459C330.796 105.313 312.563 93.6382 269.866 113.781C264.063 116.53 257.8 119.674 251.203 122.976C226.882 135.157 199.318 148.965 180.878 150.734H180.719C179.956 150.734 179.288 150.197 179.161 149.439C179.018 148.633 179.559 147.875 180.369 147.733C182.038 147.448 183.072 147.243 184.534 146.895C194.883 144.431 205.819 141.524 227.295 124.24C227.327 124.208 227.359 124.193 227.391 124.161C234.019 119.232 241.491 110.385 249.423 101.016C258.897 89.8308 268.673 78.2504 278.179 71.9784C293.662 61.7567 306.077 58.0598 317.3 60.3506C334.818 63.9369 349.156 81.5523 371.077 114.966C371.856 116.135 372.476 117.052 372.953 117.747C373.001 117.778 373.064 117.842 373.096 117.889C373.668 118.616 374.257 119.342 374.845 120.053C377.579 123.355 380.281 126.246 383.111 128.885C383.143 128.916 383.159 128.932 383.19 128.948C385.702 131.191 401.296 145.394 417.94 147.053C418.782 147.132 419.386 147.906 419.307 148.759" fill="white"/>
      </g>
      <g className="nami-letter nami-letter-i-stem">
        <path d="M821.054 147.338C821.054 148.206 820.355 148.902 819.497 148.917C804.602 149.107 791.408 140.718 785.033 131.571C784.159 130.322 781.838 126.294 781.6 125.852C778.786 120.654 772.857 102.675 766.228 112.691C765.624 113.592 764.448 115.235 763.812 116.341C759.456 124.05 749.283 135.899 736.756 142.124C732.973 143.988 729.317 145.426 725.947 146.563C723.689 147.401 719.858 148.175 716.949 148.759C716.806 148.791 715.63 148.933 715.503 148.933C714.803 148.933 714.168 148.475 713.977 147.796C713.738 146.958 714.199 146.105 715.026 145.852L718.221 145.3C720.145 144.952 722.195 144.446 724.643 143.625C749.871 134.256 755.069 114.034 760.108 94.4123L760.33 93.5592C760.521 92.8483 760.712 92.011 760.935 91.1104C763.319 81.2047 765.862 72.3575 771.076 72.8473C771.124 72.8473 771.172 72.8473 771.235 72.8789C776.116 73.653 779.486 86.4183 783.984 109.611C784.747 113.544 785.463 116.562 785.812 117.778C791.487 137.511 805.079 143.467 810.722 144.699C810.769 144.699 810.833 144.699 810.881 144.731H810.913C813.122 145.268 815.443 145.584 817.811 145.679H817.843C817.843 145.679 817.923 145.679 817.955 145.679C818.559 145.71 819.067 145.726 819.512 145.742C820.371 145.773 821.07 146.469 821.07 147.322" fill="white"/>
      </g>
      </svg>


            {/* Short Subtitle Uppercase */}
            <p className="hero-welcome-strap">
              LISTENING BAR · DRINKS · FOOD
            </p>
          </div>

          {/* Scroll down indicator with custom wave arrow */}
          <a href="#philosophy" className="hero-scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <img src="/assets/down-arrow-flat.svg" alt="Scroll Down" className="cue-wave-arrow" />
          </a>
        </section>

        {/* =========================================================
             BOTTOM RIGHT: NOW PLAYING AUDIO WIDGET (Reference Match)
             ========================================================= */}
        <div className="now-playing-widget">
          <div className="now-playing-text">
            <span className="track-title">On & On</span>
            <span className="track-artist">Erykah Badu</span>
          </div>

          {/* Play/Pause Button */}
          <button className="btn-audio-toggle" id="audioToggleBtn" onClick={(e) => { const event = e; (window as any).toggleAudio?.() }} aria-label="Play/Pause track">
            <svg id="playIcon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg id="pauseIcon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{display: 'none'}}>
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>

          {/* Animated Equalizer Badge */}
          <div className="audio-badge-circle" title="Horn Sound System Active">
            <div className="waveform-bars" id="eqBars">
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
              <div className="waveform-bar"></div>
            </div>
          </div>
        </div>

        {/* =========================================================
             PAGE CONTENT (Sitemap Sections)
             ========================================================= */}
        <main className="page-wrap">

          {/* 01. BRAND PHILOSOPHY / STORY (Minimalist Editorial Reference Match) */}
          <section id="philosophy" className="section-philosophy-minimal">
            <div className="philosophy-minimal-content">
              <h2 className="philosophy-minimal-title">
                We Don't Host Nights.<br />
                We Compose Them.
              </h2>
              <p className="philosophy-minimal-desc">
                It is curious, expressive and slightly unconventional. It does not simply serve food, drinks or music — it creates an environment where these things collide, overlap and influence one another.
              </p>
              <a href="#space" className="btn-our-story">OUR STORY</a>
            </div>
          </section>

          {/* 3X REPEATING WAVE VIDEO STRAP SEPARATOR (assets/wave-anim.mp4) */}
          <div className="wave-video-strap" aria-hidden="true">
            <div className="wave-strap-grid">
              <div className="wave-strap-item">
                <video className="wave-strap-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
                  <source src="/assets/wave-anim.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="wave-strap-item">
                <video className="wave-strap-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
                  <source src="/assets/wave-anim.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="wave-strap-item">
                <video className="wave-strap-media" autoPlay muted loop playsInline disablePictureInPicture preload="auto">
                  <source src="/assets/wave-anim.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
            <div className="wave-strap-overlay"></div>
          </div>

          {/* 02. WHAT'S ON / EVENT CALENDAR OVERLAY (assets/Event-bg.jpg) */}
          <section id="programming" className="event-calendar-section" aria-label="Sound Schedule and Events Calendar">
            {/* Background Media Wrap with Subtle Parallax */}
            <div className="event-parallax-media-wrap">
              <img src="/assets/Event-bg.jpg" alt="Nami Acoustic Space & Vinyl Shelves" className="event-parallax-img" id="eventParallaxImg" />
            </div>
            {/* Atmospheric film overlay */}
            <div className="event-parallax-overlay"></div>

            {/* Transparent Calendar Container Over Image */}
            <div className="event-calendar-container">
              {/* Section Heading */}
              <div className="cal-header-block">
                <h2 className="section-heading" style={{margin: 0}}>Weekly <span className="grad-accent">Programming</span></h2>
              </div>

              {/* 7-Column Calendar Grid Wrapper */}
              <div className="cal-grid-scroll-wrap">
                <div className="cal-grid-table">
                  {/* Day of Week Header Row */}
                  <div className="cal-dow-row">
                    <div className="cal-dow-col">MON</div>
                    <div className="cal-dow-col">TUE</div>
                    <div className="cal-dow-col">WED</div>
                    <div className="cal-dow-col">THU</div>
                    <div className="cal-dow-col">FRI</div>
                    <div className="cal-dow-col">SAT</div>
                    <div className="cal-dow-col">SUN</div>
                  </div>

                  {/* Calendar Days (35 Blocks: 5 rows x 7 cols) */}
                  <div className="cal-days-grid" id="calDaysGrid">
                    {/* ROW 1: Days 1 to 7 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">1</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">2</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">3</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">4</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">5</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">6</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">7</span></div>
                    </div>

                    {/* ROW 2: Days 8 to 14 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">8</span></div>
                    </div>
                    {/* Event Day 9: Atushi Maeda (Column 2) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="9" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('9', e); }} aria-label="Feb 9: Atushi Maeda">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">9</span>
                        <span className="cal-badge">440 Hz</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Atushi Maeda</div>
                        <div className="cal-event-meta">20:30 · Ambient & Jazz</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">10</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">11</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">12</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">13</span></div>
                    </div>
                    {/* Event Day 14: Mogasu (Column 7) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="14" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('14', e); }} aria-label="Feb 14: Mogasu">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">14</span>
                        <span className="cal-badge">Warm Freq</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Mogasu</div>
                        <div className="cal-event-meta">18:00 · Vinyl Soul</div>
                      </div>
                    </a>

                    {/* ROW 3: Days 15 to 21 */}
                    {/* Event Day 15: Jerrau (Column 1) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="15" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('15', e); }} aria-label="Feb 15: Jerrau">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">15</span>
                        <span className="cal-badge">980 Hz</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Jerrau</div>
                        <div className="cal-event-meta">20:30 · Leftfield Dub</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">16</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">17</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">18</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">19</span></div>
                    </div>
                    {/* Event Day 20: Yousuke Yukimatsu (Headline - Column 6) */}
                    <a href="#reserve" className="cal-cell has-event is-headline" data-day="20" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('20', e); }} aria-label="Feb 20: Yousuke Yukimatsu">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">20</span>
                        <span className="cal-badge badge-headline">3968 Hz Special</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Yousuke Yukimatsu</div>
                        <div className="cal-event-meta">20:30 · Avant-Garde & Bass</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">21</span></div>
                    </div>

                    {/* ROW 4: Days 22 to 28 */}
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">22</span></div>
                    </div>
                    {/* Event Day 23: Occa (Column 2) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="23" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('23', e); }} aria-label="Feb 23: Occa">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">23</span>
                        <span className="cal-badge">Resonant</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Occa</div>
                        <div className="cal-event-meta">20:30 · Hypnotic Sound</div>
                      </div>
                    </a>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">24</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">25</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">26</span></div>
                    </div>
                    <div className="cal-cell">
                      <div className="cal-cell-top"><span className="cal-cell-num">27</span></div>
                    </div>
                    {/* Event Day 28: Suze Ijo (Column 7) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="28" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('28', e); }} aria-label="Feb 28: Suze Ijo">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">28</span>
                        <span className="cal-badge">Electric</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Suze Ijo</div>
                        <div className="cal-event-meta">19:00 · Afro-Cuban Beats</div>
                      </div>
                    </a>

                    {/* ROW 5: Days 29 to 30 + 5 empty cells */}
                    {/* Event Day 29: Sunju Hargun (Column 1) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="29" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('29', e); }} aria-label="Feb 29: Sunju Hargun">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">29</span>
                        <span className="cal-badge">Nocturnal</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Sunju Hargun</div>
                        <div className="cal-event-meta">19:00 · Bangkok Club Set</div>
                      </div>
                    </a>
                    {/* Event Day 30: Vinyl Archives (Column 2) */}
                    <a href="#reserve" className="cal-cell has-event" data-day="30" onClick={(e) => { e.preventDefault(); (window as any).openEventPopup?.('30', e); }} aria-label="Feb 30: Vinyl Archives">
                      <div className="cal-cell-top">
                        <span className="cal-cell-num">30</span>
                        <span className="cal-badge">Deep Listening</span>
                      </div>
                      <div className="cal-event-body">
                        <div className="cal-event-artist">Vinyl Archives</div>
                        <div className="cal-event-meta">19:00 · Open Decks Session</div>
                      </div>
                    </a>
                    {/* 5 empty cells matching reference layout */}
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>
                    <div className="cal-cell is-empty" aria-hidden="true"></div>

                    {/* IN-PLACE COLUMN EXPANDED EVENT POPUP (NO BACKGROUND BLUR) */}
                    <div className="cal-column-popup" id="calColumnPopup" aria-hidden="true">
                      <div className="col-popup-header">
                        <span className="col-popup-date" id="colPopupDate">TUE · FEB 09</span>
                        <button type="button" className="col-popup-close" onClick={(e) => { const event = e; (window as any).closeEventPopup?.() }} aria-label="Close event details">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="col-popup-body">
                        <div className="col-popup-media">
                          <img src="/assets/spin-gallery-1.jpg" alt="Event Poster" className="col-popup-img" id="colPopupImg" />
                          <div className="col-popup-img-grad"></div>
                        </div>

                        <div className="col-popup-info">
                          <div className="col-popup-badge-wrap">
                            <span className="col-popup-hz" id="colPopupHz">440 Hz Root</span>
                          </div>
                          <h4 className="col-popup-title" id="colPopupTitle">Atushi Maeda</h4>
                          <div className="col-popup-genre" id="colPopupGenre">Japanese Ambient & Jazz</div>

                          <div className="col-popup-meta-block">
                            <div className="col-popup-meta-row">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </svg>
                              <div>
                                <span className="meta-label">Timing</span>
                                <span className="meta-val" id="colPopupTiming">20:30 (Doors 19:00)</span>
                              </div>
                            </div>
                            <div className="col-popup-meta-row">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <div>
                                <span className="meta-label">Attendees & Guests</span>
                                <span className="meta-val" id="colPopupAttendees">38 Confirmed</span>
                              </div>
                            </div>
                          </div>

                          <p className="col-popup-desc" id="colPopupDesc">
                            Curated vinyl selections & experimental electronic producers playing exclusively through our custom horn-loaded acoustic system.
                          </p>

                          <button type="button" className="btn-col-popup-book" id="colPopupBookBtn" onClick={(e) => { const event = e; (window as any).bookFromPopup?.() }}>
                            <span>Book Tickets</span>
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile scroll swipe hint */}
              <div className="cal-scroll-hint" aria-hidden="true">
                <span>← Swipe to explore full calendar →</span>
              </div>

              {/* Reserve CTA */}
              <div className="cal-footer-block">
                <a href="#reserve" className="btn-cal-action">
                  <span>Reserve A Table</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* 03. THE RESONANCE MENU */}
          <section id="menu" className="section-block">
            <div className="section-eyebrow">Culinary & Mixology</div>
            <h2 className="section-heading">The <span className="grad-accent">Resonance</span> Menu</h2>
            <p className="section-body">
              Progressive Japanese and Asian-influenced culinary dishes and sound-mapped cocktails. 
              Each selection carries its own sonic and textural profile.
            </p>

            <div className="menu-tabs">
              <button className="menu-tab-btn active" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('food') }}>Dishes</button>
              <button className="menu-tab-btn" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('cocktails') }}>Cocktails [Hz]</button>
              <button className="menu-tab-btn" onClick={(e) => { const event = e; (window as any).switchMenuTab?.('desserts') }}>Desserts</button>
            </div>

            {/* Food Menu Tab */}
            <div id="menuFood" className="menu-items-grid">
              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Charred Koji-Glazed Root Vegetables</span>
                  <span className="item-price">700</span>
                </div>
                <div className="item-ingredients">Smoked carrot, black garlic, fermented chili oil, toasted sesame</div>
                <div className="item-sonic-descriptor">Grounded · Warm · Resonant</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Aged Hamachi Crudo</span>
                  <span className="item-price">1500</span>
                </div>
                <div className="item-ingredients">Yuzu kosho, preserved citrus, kombu oil, shaved fennel</div>
                <div className="item-sonic-descriptor">Textural · Umami · Expansive</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Miso-Butter Scallop</span>
                  <span className="item-price">1750</span>
                </div>
                <div className="item-ingredients">Sweet corn purée, brown butter dashi, chili threads</div>
                <div className="item-sonic-descriptor">Balanced · Rhythmic · Expressive</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Charcoal-Grilled Duck Breast</span>
                  <span className="item-price">2100</span>
                </div>
                <div className="item-ingredients">Tamarind glaze, sour cherry, smoked tea jus</div>
                <div className="item-sonic-descriptor">Bright · Electric · Forward</div>
              </div>
            </div>

            {/* Cocktails Menu Tab */}
            <div id="menuCocktails" className="menu-items-grid" style={{display: 'none'}}>
              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Gin - Tonic - Cherry</span>
                  <span className="item-price">800</span>
                </div>
                <div className="item-ingredients">Botanical gin, artisanal tonic, fermented sour cherry infusion</div>
                <div className="item-sonic-descriptor">[ 440 Hz ] · Root Frequency · Crisp</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">White Rum - Yuzu - Bubble Gum Syrup</span>
                  <span className="item-price">850</span>
                </div>
                <div className="item-ingredients">Aged white rum, fresh yuzu, craft bubblegum botanical cordial</div>
                <div className="item-sonic-descriptor">[ 980 Hz ] · Playful Harmonic · Effervescent</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Smoked Mezcal - Oolong - Plum</span>
                  <span className="item-price">900</span>
                </div>
                <div className="item-ingredients">Artisanal mezcal, roasted Taiwanese oolong, salted umeboshi</div>
                <div className="item-sonic-descriptor">[ 1760 Hz ] · Resonant Smoke · Velvet Depth</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Whisky Highball - Shiso - Soda</span>
                  <span className="item-price">850</span>
                </div>
                <div className="item-ingredients">Single malt Japanese whisky, red shiso leaf, crystal mountain soda</div>
                <div className="item-sonic-descriptor">[ 3968 Hz ] · High Harmonic · Nocturnal</div>
              </div>
            </div>

            {/* Desserts Menu Tab */}
            <div id="menuDesserts" className="menu-items-grid" style={{display: 'none'}}>
              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Dark Chocolate & Black Sesame Crémeux</span>
                  <span className="item-price">950</span>
                </div>
                <div className="item-ingredients">Malted barley crumble, honeycomb, sea salt</div>
                <div className="item-sonic-descriptor">Lingering · Warm · Satisfying</div>
              </div>

              <div className="menu-item-card">
                <div className="menu-item-top">
                  <span className="item-name">Miso Caramel & Roasted Hojicha Tart</span>
                  <span className="item-price">850</span>
                </div>
                <div className="item-ingredients">Roasted tea ganache, smoked sea salt caramel, buckwheat crust</div>
                <div className="item-sonic-descriptor">Earth · Bass Tone · Grounded</div>
              </div>
            </div>

            <div style={{marginTop: '3rem', textAlign: 'center'}}>
              <button className="btn-whatsapp-footer" onClick={(e) => { const event = e; (window as any).showToast?.('Downloading Nami Menu PDF...') }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                Download Resonance Menu (PDF)
              </button>
            </div>
          </section>

          {/* 04. THE SPACE & SOUND SETUP (Spin Bar Style Full-Bleed Reference) */}
          <section id="space" className="space-section">
            <div className="space-header-row">
              <div className="space-header-left">
                <div className="section-eyebrow">The Space & Sound</div>
                <h2 className="section-heading">Architectural <span className="grad-accent">Intimacy</span></h2>
                <p className="section-body" style={{marginBottom: 0}}>
                  An intimate sanctuary where sound, flavour and nocturnal culture collide on their own frequency.
                </p>
              </div>
              <div className="space-header-right">
                <p className="space-header-quote">
                  "Expect thoughtful selections, easy rhythms and the occasional shift up in tempo, with DJs given the freedom to play the records they don’t always get to play elsewhere."
                </p>
              </div>
            </div>

            <div className="space-fine-rule"></div>

            {/* Edge-to-Edge 3-Column Photography Grid (Spin Bar Reference) */}
            <div className="spin-gallery-fullbleed">
              <div className="spin-gallery-grid">
                {/* Row 1 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-1.jpg" alt="Listening Room & Bar Tables" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-2.jpg" alt="Warm Amber Pool Table & Cue" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-3.jpg" alt="Rotary DJ Booth & Vinyl Wall" className="spin-gallery-img" loading="lazy" />
                </div>

                {/* Row 2 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-4.jpg" alt="Nocturnal Disco Ball & Beams" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-5.jpg" alt="Vinyl Artwork & Sconce Illumination" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-6.jpg" alt="Culinary Small Plates & Dining" className="spin-gallery-img" loading="lazy" />
                </div>

                {/* Row 3 */}
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-7.jpg" alt="Sound-Mapped Cocktails on Counter" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-8.jpg" alt="Listening Room Corner & Horn Acoustics" className="spin-gallery-img" loading="lazy" />
                </div>
                <div className="spin-gallery-cell">
                  <img src="/assets/spin-gallery-9.jpg" alt="Private Lounge Seating & Vinyl Vault" className="spin-gallery-img" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Acoustic Specs Integration */}
            <div className="space-specs-strip">
              <div>
                <div style={{fontFamily: '\'Chivo\', sans-serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-orange)', marginBottom: '0.35rem', textTransform: 'uppercase'}}>
                  ACOUSTIC SPECIFICATION
                </div>
                <div className="space-specs-title">The Sound System</div>
              </div>
              <div className="space-specs-desc">
                Two custom 15-inch horn-loaded bass enclosures, wooden mid-horns, and compression drivers powered by Class-A tube amplification. Rotary DJ mixer with pure analog signal path.
              </div>
            </div>
          </section>

          {/* 05. FAQS & ETIQUETTE */}
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

          {/* 06. RESERVE A TABLE (On-Domain Booking Engine) */}
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

        </main>

        {/* =========================================================
             FOOTER
             ========================================================= */}
        <footer className="site-footer">
          <div className="footer-container">
            <div>
              <img src="/assets/Main-logo.svg" alt="NAMI" className="footer-logo" />
              <p style={{maxWidth: '340px', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
                A sensory provocateur in sound, dining, and nocturnal culture. 
                Part listening room, part bar, part cultural gathering.
              </p>

              {/* WhatsApp Community Link (Replaces Newsletter) */}
              <a href="https://chat.whatsapp.com/" target="_blank" className="btn-whatsapp-footer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.586 1.761.882 2.796.882 3.183 0 5.769-2.587 5.77-5.767 0-3.181-2.587-5.768-5.77-5.768zm0 10.375c-.911 0-1.637-.251-2.457-.75l-.176-.107-1.579.414.421-1.54-.117-.186c-.544-.863-.834-1.572-.833-2.44 0-2.541 2.067-4.608 4.609-4.608 2.541 0 4.609 2.067 4.609 4.608 0 2.541-2.068 4.609-4.609 4.609z"/>
                </svg>
                Join WhatsApp Community
              </a>
            </div>

            <div className="footer-col">
              <h5>HOURS</h5>
              <p>Wednesday – Sunday<br />7:00 PM – Late</p>
              <p>Listening Sessions<br />8:30 PM Onwards</p>
            </div>

            <div className="footer-col">
              <h5>LOCATION & CONTACT</h5>
              <p>Bandra West, Mumbai,<br />Maharashtra 400050</p>
              <p>experience@nami.in</p>
            </div>

            <div className="footer-col">
              <h5>SOCIAL & GROUP</h5>
              <a href="https://instagram.com/" target="_blank">Instagram (@nami.hifi)</a>
              <a href="#programming">Resident Advisor</a>
              <a href="https://abnah.com/" target="_blank" style={{marginTop: '1rem', color: 'var(--c-orange)'}}>ABNAH Group →</a>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 NAMI HI-FI. ALL RIGHTS RESERVED.</span>
            <span>DESIGNED FOR SENSORY PROVOCATION</span>
          </div>
        </footer>

        {/* Notification Toast */}
        <div id="toast">Copied to clipboard</div>

        {/* =========================================================
             JAVASCRIPT LOGIC
             ========================================================= */}

    </>
  );
}
