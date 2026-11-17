// @ts-nocheck
"use client";

import { useEffect } from "react";
import { EVENTS_DATA } from "@/content/home";

/** All homepage DOM interactions — keep handlers here, markup in sections/. */
export function useHomeInteractions() {
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

        // Lazy-load heavy wave strap videos only when near viewport, then sync
        (function initWaveStrapLazy() {
          const root = document.querySelector('[data-lazy-video-root]');
          const strapVideos = document.querySelectorAll('.wave-strap-media');
          if (!root || !strapVideos.length) return;

          const loadAndPlay = () => {
            strapVideos.forEach((v) => {
              const src = v.getAttribute('data-src');
              if (src && !v.querySelector('source') && !v.src) {
                const source = document.createElement('source');
                source.src = src;
                source.type = 'video/mp4';
                v.appendChild(source);
                v.load();
              }
              v.muted = true;
              v.playsInline = true;
              v.play().catch(() => {});
            });

            if (strapVideos.length <= 1) return;
            const lead = strapVideos[0];
            const followers = Array.from(strapVideos).slice(1);
            const alignPlayback = () => {
              const targetTime = lead.currentTime;
              followers.forEach((v) => {
                if (Math.abs(v.currentTime - targetTime) > 0.08) {
                  try { v.currentTime = targetTime; } catch (e) {}
                }
              });
            };
            lead.addEventListener('timeupdate', alignPlayback);
            lead.addEventListener('play', () => {
              followers.forEach((v) => { try { v.play(); } catch (e) {} });
            });
            lead.addEventListener('seeked', alignPlayback);
          };

          if (!('IntersectionObserver' in window)) {
            loadAndPlay();
            return;
          }
          const io = new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                loadAndPlay();
                io.disconnect();
              }
            },
            { rootMargin: '200px 0px' }
          );
          io.observe(root);
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
}
