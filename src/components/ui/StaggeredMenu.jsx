import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#111111', '#1a1a1a'], // Dark theme background layers
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/logo.png', // Default to SK Smart logo
  menuButtonColor = '#ffffff', // White button default
  openMenuButtonColor = '#000000', // Black when open inside the menu (assuming white background inside)
  changeMenuColorOnOpen = true,
  accentColor = '#FFB300', // Our brand yellow
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  bottomContent = null
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);

  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const iconRef = useRef(null);

  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);

  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const line3 = line3Ref.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !line1 || !line2 || !line3 || !icon) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(line1, { transformOrigin: '50% 50%', y: -6, rotate: 0, opacity: 1 });
      gsap.set(line2, { transformOrigin: '50% 50%', y: 0, rotate: 0, opacity: 1 });
      gsap.set(line3, { transformOrigin: '50% 50%', y: 6, rotate: 0, opacity: 1 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      // We removed the menuButtonColor initial set here, since it's handled by the useEffect below
    });
    return () => ctx.revert();
  }, [position]); // Removed menuButtonColor to prevent resetting the entire GSAP animation when the button color changes

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        );
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });

        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening) => {
    const icon = iconRef.current;
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    const l3 = line3Ref.current;
    if (!icon || !l1 || !l2 || !l3) return;

    spinTweenRef.current?.kill();

    if (opening) {
      // animate into X
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out', duration: 0.5 } })
        .to(l1, { y: 0, rotate: 45 }, 0)
        .to(l2, { opacity: 0, duration: 0.2 }, 0)
        .to(l3, { y: 0, rotate: -45 }, 0);
    } else {
      // animate back to hamburger
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut', duration: 0.35 } })
        .to(l1, { y: -6, rotate: 0 }, 0)
        .to(l2, { opacity: 1 }, 0)
        .to(l3, { y: 6, rotate: 0 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening) => {
      // Color is now handled via CSS mix-blend-difference
    },
    []
  );

  const animateText = useCallback((opening) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Mobile Hamburger / Close Toggle Button - In-flow with Header */}
      <button
        ref={toggleBtnRef}
        className="sm-toggle relative z-[10002] flex items-center justify-center w-11 h-11 rounded-xl bg-transparent border-0 cursor-pointer text-current transition-colors duration-300 p-0 focus:outline-none -mr-1"
        style={{ color: open ? openMenuButtonColor : menuButtonColor }}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
        type="button"
      >
        <span
          ref={textWrapRef}
          style={{ display: 'none' }}
          aria-hidden="true"
        >
          <span ref={textInnerRef}></span>
        </span>

        <span
          ref={iconRef}
          className="sm-icon relative w-6 h-6 shrink-0 inline-flex items-center justify-center [will-change:transform]"
          aria-hidden="true"
        >
          <span
            ref={line1Ref}
            className="sm-icon-line absolute left-0 top-1/2 w-full h-[2.5px] -mt-[1.25px] bg-current rounded-full [will-change:transform]"
          />
          <span
            ref={line2Ref}
            className="sm-icon-line absolute left-0 top-1/2 w-full h-[2.5px] -mt-[1.25px] bg-current rounded-full [will-change:transform]"
          />
          <span
            ref={line3Ref}
            className="sm-icon-line absolute left-0 top-1/2 w-full h-[2.5px] -mt-[1.25px] bg-current rounded-full [will-change:transform]"
          />
        </span>
      </button>

      {/* Slide-out Menu Panel & Overlay */}
      <div
        className={`sm-scope fixed inset-0 z-[10000] ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <div
          className={
            (className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full'
          }
          style={accentColor ? { '--sm-accent': accentColor } : undefined}
          data-position={position}
          data-open={open || undefined}
        >
          {/* Backdrop Layers */}
          <div
            ref={preLayersRef}
            className="sm-prelayers fixed top-0 right-0 bottom-0 pointer-events-none z-[5]"
            aria-hidden="true"
          >
            {(() => {
              const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
              let arr = [...raw];
              if (arr.length >= 3) {
                const mid = Math.floor(arr.length / 2);
                arr.splice(mid, 1);
              }
              return arr.map((c, i) => (
                <div
                  key={i}
                  className="sm-prelayer absolute top-0 right-0 h-screen w-full translate-x-0"
                  style={{ background: c }}
                />
              ));
            })()}
          </div>

          {/* Backdrop Darken Overlay on Tablet/Desktop if open */}
          {open && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[8] transition-opacity duration-300 hidden sm:block"
              onClick={closeMenu}
              aria-hidden="true"
            />
          )}

          {/* Slide-out Menu Content */}
          <aside
            id="staggered-menu-panel"
            ref={panelRef}
            className="staggered-menu-panel fixed top-0 right-0 h-screen w-full sm:w-[400px] md:w-[420px] max-w-full bg-white dark:bg-[#0A0A0A] flex flex-col p-[5.5rem_1.5rem_2rem_1.5rem] sm:p-[6rem_2rem_2rem_2rem] overflow-y-auto z-10 backdrop-blur-[16px] pointer-events-auto shadow-2xl border-l border-black/5 dark:border-white/10"
            style={{ WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="sm-panel-inner flex-1 flex flex-col justify-between gap-6 min-h-0">
              <ul
                className="sm-panel-list list-none m-0 p-0 flex flex-col gap-1 sm:gap-2"
                role="list"
                data-numbering={displayItemNumbering || undefined}
              >
                {items && items.length ? (
                  items.map((it, idx) => {
                    const isActive = typeof window !== 'undefined' && window.location.pathname === it.link;
                    return (
                      <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                        <Link
                          className={`sm-panel-item relative font-[800] text-lg xs:text-xl sm:text-2xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-200 inline-block no-underline py-2 pr-[1.4em] ${
                            isActive ? 'text-brand-accent font-black' : 'text-neutral-900 dark:text-white hover:text-brand-accent dark:hover:text-brand-accent'
                          }`}
                          to={it.link}
                          onClick={() => closeMenu()}
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                        >
                          <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                            {it.label}
                          </span>
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                    <span className="sm-panel-item relative text-neutral-900 dark:text-white font-semibold text-xl sm:text-2xl cursor-pointer leading-none tracking-tight uppercase inline-block no-underline pr-[1.4em]">
                      <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                        No items
                      </span>
                    </span>
                  </li>
                )}
              </ul>

              {bottomContent && (
                <div className="mt-auto border-t border-black/10 dark:border-white/10 pt-6">
                  {typeof bottomContent === 'function' ? bottomContent(closeMenu) : bottomContent}
                </div>
              )}

              {displaySocials && socialItems && socialItems.length > 0 && (
                <div className="sm-socials pt-4 flex flex-col gap-3 border-t border-black/10 dark:border-white/10" aria-label="Social links">
                  <h3 className="sm-socials-title m-0 text-xs font-black tracking-widest uppercase text-neutral-500 dark:text-neutral-400">Connect With Us</h3>
                  <ul
                    className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-6 flex-wrap"
                    role="list"
                  >
                    {socialItems.map((s, i) => (
                      <li key={s.label + i} className="sm-socials-item">
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 no-underline relative inline-block py-[2px] transition-colors duration-200 hover:text-brand-accent dark:hover:text-brand-accent"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; justify-content: center; background: transparent; border: none; cursor: pointer; line-height: 1; overflow: visible; outline: none; -webkit-tap-highlight-color: transparent; }
.sm-scope .sm-toggle:focus-visible, .sm-scope .sm-toggle:focus { outline: none; }
.sm-scope .sm-icon { position: relative; width: 24px; height: 24px; flex: 0 0 24px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2.5px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: fixed; top: 0; right: 0; width: 100vw; height: 100vh; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); display: flex; flex-direction: column; overflow-y: auto; pointer-events: auto; }
@media (min-width: 640px) {
  .sm-scope .staggered-menu-panel { width: 400px; }
}
@media (min-width: 768px) {
  .sm-scope .staggered-menu-panel { width: 420px; }
}
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-prelayers { position: fixed; top: 0; right: 0; bottom: 0; width: 100vw; pointer-events: none; z-index: 5; }
@media (min-width: 640px) {
  .sm-scope .sm-prelayers { width: 400px; }
}
@media (min-width: 768px) {
  .sm-scope .sm-prelayers { width: 420px; }
}
.sm-scope [data-position='left'] .sm-prelayers { right: auto; left: 0; }
.sm-scope .sm-prelayer { position: absolute; top: 0; right: 0; height: 100vh; width: 100%; transform: translateX(0); }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #ffda0a); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1.1rem; font-weight: 500; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #ffda0a); }
.sm-scope .sm-panel-title { margin: 0; font-size: 1rem; font-weight: 600; text-transform: uppercase; }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.25rem; }
.sm-scope .sm-panel-item { position: relative; cursor: pointer; line-height: 1.2; text-transform: uppercase; transition: background 0.25s, color 0.25s; display: inline-block; text-decoration: none; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #ffda0a); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; left: 100%; margin-left: 12px; font-size: 14px; font-weight: 700; opacity: 0.3; letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 640px) {
  .sm-scope .staggered-menu-panel, .sm-scope .sm-prelayers { width: 100vw; left: 0; right: 0; }
}
      `}</style>
    </div>
  );
};

export default StaggeredMenu;
