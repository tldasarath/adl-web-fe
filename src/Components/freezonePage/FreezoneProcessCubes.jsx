'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * FreezoneProcessCubes (clean overlay-capture version)
 *
 * Behavior:
 * - When component is fully visible, enable overlay capture (blocks page scroll).
 * - User scrolls (wheel/touch/keyboard) -> drive `targetProgress` from 0..TOTAL_STAGES.
 * - RAF loop smooths progress into `renderProgress`.
 * - Each card moves from center -> its slot when its stage progress (p = clamp(renderProgress - index,0,1)) increases.
 * - When renderProgress reaches TOTAL_STAGES and user idle -> release overlay and restore page scroll.
 *
 * Notes:
 * - We attach native listeners to the overlay element with passive:false to reliably prevent native scroll.
 * - The overlay only appears while capturing is active; after sequence completes overlay is removed.
 */

const cubes = [
  { id: 'consult', title: 'Consultation & Planning', desc: 'Identify the right Freezone and license category' },
  { id: 'gov', title: 'Government Coordination', desc: 'ADL liaises directly with Freezone authorities' },
  { id: 'visa', title: 'Visa & Bank\nAccount Support', desc: 'Hassle-free processing for all company essentials.' },
  { id: 'doc', title: 'Documentation &\nApplication', desc: 'We prepare and submit all legal paperwork.' },
  { id: 'license', title: 'License Issuance', desc: 'Receive your license within days.' },
];

// target slots: order = top-left, top-right, bottom-right, bottom-left
const SLOTS = [
  { x: -220, y: -200, rotY: -12, scale: 0.9, opacity: 0.95 }, // top-left
  { x: 220, y: -200, rotY: 12, scale: 0.9, opacity: 0.95 },  // top-right
  { x: 220, y: 200, rotY: 12, scale: 0.9, opacity: 0.95 },   // bottom-right
  { x: -220, y: 200, rotY: -12, scale: 0.9, opacity: 0.95 }  // bottom-left
];
const CENTER = { x: 0, y: 0, z: 0, rotY: 0, scale: 1, opacity: 1 };

const TOTAL_STAGES = 4; // number of moves before final center card remains

export default function FreezoneProcessCubes() {
  const sectionRef = useRef(null);
  const overlayRef = useRef(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastInteractionRef = useRef(0);
  const rafRef = useRef(null);

  const [renderProgress, setRenderProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const [fullyVisible, setFullyVisible] = useState(false);

  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  // detect fully-visible (top >= 0 && bottom <= viewport)
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const fully = r.top >= 0 && r.bottom <= vh;
      setFullyVisible(fully);
      if (!fully) {
        // reset
        targetProgressRef.current = 0;
      }
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);

    const obs = new IntersectionObserver(([entry]) => {
      // extra safety: ensure bounding check
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const fully = r.top >= 0 && r.bottom <= vh;
      setFullyVisible(fully && entry.isIntersecting);
      if (!fully) targetProgressRef.current = 0;
    }, { threshold: [0.25, 0.5, 0.9, 1] });

    obs.observe(el);

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  // overlay activation: when component is fully visible -> show overlay & attach listeners
  useEffect(() => {
    // helper to attach native wheel/touch handlers (passive:false) to overlay
    const overlay = overlayRef.current;
    if (!overlay) return;

    // handlers
    const onWheel = (ev) => {
      // only when capturing
      if (!capturing) return;
      ev.preventDefault();
      ev.stopPropagation();
      const raw = ev.deltaY ?? ev.wheelDelta ?? ev.detail ?? 0;
      const step = Math.sign(raw) * Math.min(40, Math.abs(raw) / 6);
      const delta = step * 0.04; // tune sensitivity
      targetProgressRef.current = clamp(targetProgressRef.current + delta, 0, TOTAL_STAGES);
      lastInteractionRef.current = performance.now();
    };

    let touchStartY = 0;
    const onTouchStart = (ev) => {
      if (!capturing) return;
      touchStartY = ev.touches?.[0]?.clientY ?? 0;
    };
    const onTouchMove = (ev) => {
      if (!capturing) return;
      ev.preventDefault();
      ev.stopPropagation();
      const y = ev.touches?.[0]?.clientY ?? 0;
      const dy = touchStartY - y;
      touchStartY = y;
      const step = Math.sign(dy) * Math.min(40, Math.abs(dy) / 6);
      targetProgressRef.current = clamp(targetProgressRef.current + step * 0.04, 0, TOTAL_STAGES);
      lastInteractionRef.current = performance.now();
    };

    const onKey = (ev) => {
      if (!capturing) return;
      if (!['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(ev.key)) return;
      ev.preventDefault();
      if (ev.key === 'ArrowDown' || ev.key === 'PageDown') {
        targetProgressRef.current = clamp(targetProgressRef.current + 1, 0, TOTAL_STAGES);
      } else if (ev.key === 'ArrowUp' || ev.key === 'PageUp') {
        targetProgressRef.current = clamp(targetProgressRef.current - 1, 0, TOTAL_STAGES);
      } else if (ev.key === 'Home') {
        targetProgressRef.current = 0;
      } else if (ev.key === 'End') {
        targetProgressRef.current = TOTAL_STAGES;
      }
      lastInteractionRef.current = performance.now();
    };

    // attach only while overlay is present/capturing
    if (capturing) {
      // block body scroll as well as extra guard
      document.documentElement.style.overflow = 'hidden';
      overlay.addEventListener('wheel', onWheel, { passive: false, capture: true });
      overlay.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
      overlay.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });
      window.addEventListener('keydown', onKey, { passive: false, capture: true });
    }

    return () => {
      try {
        overlay.removeEventListener('wheel', onWheel, { capture: true });
        overlay.removeEventListener('touchstart', onTouchStart, { capture: true });
        overlay.removeEventListener('touchmove', onTouchMove, { capture: true });
        window.removeEventListener('keydown', onKey, { capture: true });
        document.documentElement.style.overflow = '';
      } catch (err) {}
    };
  }, [capturing]);

  // when section first becomes fully visible, start capturing (activate overlay)
  useEffect(() => {
    if (fullyVisible && !capturing) {
      setCapturing(true);
      lastInteractionRef.current = performance.now();
      targetProgressRef.current = 0;
    }
    // if it leaves view while capturing, cancel
    if (!fullyVisible && capturing) {
      setCapturing(false);
      targetProgressRef.current = 0;
    }
  }, [fullyVisible, capturing]);

  // RAF smoothing loop to update currentProgress -> renderProgress
  useEffect(() => {
    const step = () => {
      const cur = currentProgressRef.current;
      const tgt = targetProgressRef.current;
      const diff = tgt - cur;
      // smoothing factor depends on diff
      const factor = Math.min(0.18 + Math.abs(diff) * 0.12, 0.85);
      const next = cur + diff * factor;
      const clamped = clamp(next, 0, TOTAL_STAGES);
      currentProgressRef.current = clamped;
      setRenderProgress(clamped);
      setPercent(Math.round((clamped / TOTAL_STAGES) * 100));
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // auto-release overlay when finished (or returned to 0) and user idle
  useEffect(() => {
    const id = setInterval(() => {
      const cur = currentProgressRef.current;
      const tgt = targetProgressRef.current;
      const idle = performance.now() - lastInteractionRef.current > 220;
      if (capturing && idle) {
        if (cur >= TOTAL_STAGES - 0.01 && tgt >= TOTAL_STAGES - 0.01) {
          // reached end -> release forward
          setCapturing(false);
          // let page continue naturally (overlay removed above by cleanup)
        } else if (cur <= 0.01 && tgt <= 0.01) {
          // reached start -> release backward
          setCapturing(false);
        }
      }
    }, 140);
    return () => clearInterval(id);
  }, [capturing]);

  // compute transform for each card based on renderProgress
  const computeTransform = (index) => {
    // progress applied to each card: p = clamp(renderProgress - index, 0, 1)
    const p = clamp(renderProgress - index, 0, 1);
    // start all at center with small stacked Z offset
    const baseZ = (cubes.length - index) * 20; // topmost has largest z
    if (index >= 0 && index <= 3) {
      // animate from CENTER -> SLOTS[index]
      const eased = ease(p);
      const slot = SLOTS[index];
      const x = CENTER.x + (slot.x - CENTER.x) * eased;
      const y = CENTER.y + (slot.y - CENTER.y) * eased;
      const rotY = CENTER.rotY + (slot.rotY - CENTER.rotY) * eased;
      const scale = CENTER.scale + (slot.scale - CENTER.scale) * eased;
      const opacity = CENTER.opacity + (slot.opacity - CENTER.opacity) * eased;
      const zIndex = 2000 - index * 10 - Math.round(eased * 50);
      return {
        transform: `translate3d(${x}px, ${y}px, 0px) rotateY(${rotY}deg) scale(${scale})`,
        opacity,
        zIndex
      };
    } else {
      // index 4 (final center card) - stays in center but slightly adjusts stack depth when others moved
      const depthShift = Math.min(1, clamp(renderProgress / TOTAL_STAGES, 0, 1));
      const scale = 1 + 0.02 * depthShift;
      const zIndex = 1200 + Math.round(depthShift * 100);
      const opacity = 1;
      return {
        transform: `translate3d(${CENTER.x}px, ${CENTER.y}px, 0px) rotateY(0deg) scale(${scale})`,
        opacity,
        zIndex
      };
    }
  };

  // small helper to allow clicking to forcibly start/stop for dev
  const onManualAdvance = (dir = 1) => {
    targetProgressRef.current = clamp(targetProgressRef.current + dir, 0, TOTAL_STAGES);
    lastInteractionRef.current = performance.now();
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 lg:py-24 overflow-hidden bg-black min-h-screen flex items-center"
    >
      {/* overlay element that captures wheel/touch while capturing=true */}
      {capturing && (
        <div
          ref={overlayRef}
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            // overlay is invisible but captures events
            background: 'transparent',
            pointerEvents: 'auto'
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              From Idea to
              <br />
              Incorporation
              <br />
              We Handle Everything
            </h2>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
              ADL Business Solutions provides end-to-end guidance throughout your Freezone
              setup journey. We help you choose the right jurisdiction, prepare legal
              documents, acquire your license, open a bank account, and manage visa
              processing — ensuring a stress-free setup experience.
            </p>

            {/* dev helpers (remove in prod) */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onManualAdvance(-1)}
                className="px-3 py-1 rounded bg-slate-800 text-white text-sm"
              >
                ←
              </button>
              <button
                onClick={() => onManualAdvance(1)}
                className="px-3 py-1 rounded bg-slate-800 text-white text-sm"
              >
                →
              </button>
              <div className="text-gray-400 text-sm ml-3">Progress: {Math.round(renderProgress*100)/100}</div>
            </div>
          </div>

          <div className="lg:col-span-3 flex items-center justify-center">
            <div className="relative w-full h-96 lg:h-[600px] flex items-center justify-center" style={{ perspective: 1400 }}>
              {/* stack area */}
              {cubes.map((cube, index) => {
                const s = computeTransform(index);
                return (
                  <motion.div
                    key={cube.id}
                    className="absolute flex items-center justify-center will-change-transform"
                    style={{
                      transform: s.transform,
                      opacity: s.opacity,
                      zIndex: s.zIndex,
                      transition: 'transform 420ms cubic-bezier(.2,.9,.2,1), opacity 220ms linear'
                    }}
                  >
                    <div
                      className="w-48 h-56 sm:w-56 sm:h-64 lg:w-64 lg:h-72 rounded-2xl border border-white/20 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col justify-between relative bg-gradient-to-br from-white/5 to-transparent"
                      style={{ backdropFilter: 'blur(8px)' }}
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ mixBlendMode: 'overlay' }} />
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                        <h4 className="text-white font-bold text-lg sm:text-xl leading-tight mb-3">
                          {cube.title}
                        </h4>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                          {cube.desc}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <div className="w-12 h-12 border-r-2 border-b-2 border-white/10 rounded-full" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs animate-pulse">
                {fullyVisible ? (capturing ? `${percent}%` : 'Scroll to interact →') : 'Scroll'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* progress HUD */}
      {capturing && percent > 0 && percent < 100 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-50 pointer-events-none">
          <div className="w-40 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${percent}%`, transition: 'width 120ms linear' }} />
          </div>
          <span className="text-gray-400 text-xs font-medium">{percent}%</span>
        </div>
      )}
    </section>
  );
}
