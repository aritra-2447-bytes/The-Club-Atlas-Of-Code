import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

type MenuItem = {
    label: string;
    href: string;
    ariaLabel?: string;
    rotation?: number;
    hoverStyles?: {
        bgColor?: string;
        textColor?: string;
    };
};

export type BubbleMenuProps = {
    onMenuClick?: (open: boolean) => void;
    className?: string;
    style?: CSSProperties;
    menuAriaLabel?: string;
    menuBg?: string;
    menuContentColor?: string;
    useFixedPosition?: boolean;
    items?: MenuItem[];
    animationEase?: string;
    animationDuration?: number;
    staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
    { label: 'home', href: '#', rotation: -3, hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' } },
    { label: 'about', href: '#', rotation: 3, hoverStyles: { bgColor: '#10b981', textColor: '#ffffff' } },
    { label: 'projects', href: '#', rotation: -2, hoverStyles: { bgColor: '#f59e0b', textColor: '#ffffff' } },
    { label: 'blog', href: '#', rotation: 2, hoverStyles: { bgColor: '#ef4444', textColor: '#ffffff' } },
    { label: 'contact', href: '#', rotation: -3, hoverStyles: { bgColor: '#8b5cf6', textColor: '#ffffff' } }
];

export default function BubbleMenu({
                                       onMenuClick,
                                       className,
                                       style,
                                       menuAriaLabel = 'Toggle menu',
                                       menuBg = '#fff',
                                       menuContentColor = '#111',
                                       useFixedPosition = false,
                                       items,
                                       animationEase = 'back.out(1.5)',
                                       animationDuration = 0.4,
                                       staggerDelay = 0.08
                                   }: BubbleMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);
    const bubblesRef = useRef<HTMLAnchorElement[]>([]);
    const labelRefs = useRef<HTMLSpanElement[]>([]);

    const menuItems = items?.length ? items : DEFAULT_ITEMS;

    const containerClassName = [
        'bubble-menu',
        useFixedPosition ? 'fixed' : 'absolute',
        'left-0 right-0 top-6',
        'flex items-center justify-end', // Aligned to the right corner
        'px-8',
        'pointer-events-none',
        'z-[1001]',
        className
    ]
        .filter(Boolean)
        .join(' ');

    const handleToggle = () => {
        const nextState = !isMenuOpen;
        if (nextState) setShowOverlay(true);
        setIsMenuOpen(nextState);
        onMenuClick?.(nextState);
    };

    useEffect(() => {
        const overlay = overlayRef.current;
        const bubbles = bubblesRef.current.filter(Boolean);
        const labels = labelRefs.current.filter(Boolean);
        if (!overlay || !bubbles.length) return;

        if (isMenuOpen) {
            gsap.set(overlay, { display: 'flex' });
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
            gsap.set(labels, { y: 12, autoAlpha: 0 });

            bubbles.forEach((bubble, i) => {
                const delay = i * staggerDelay;
                const tl = gsap.timeline({ delay });
                tl.to(bubble, {
                    scale: 1,
                    duration: animationDuration,
                    ease: animationEase
                });
                if (labels[i]) {
                    tl.to(
                        labels[i],
                        {
                            y: 0,
                            autoAlpha: 1,
                            duration: animationDuration,
                            ease: 'power3.out'
                        },
                        '-=' + animationDuration * 0.8
                    );
                }
            });
        } else if (showOverlay) {
            gsap.killTweensOf([...bubbles, ...labels]);
            gsap.to(labels, {
                y: 12,
                autoAlpha: 0,
                duration: 0.15,
                ease: 'power3.in'
            });
            gsap.to(bubbles, {
                scale: 0,
                duration: 0.15,
                ease: 'power3.in',
                onComplete: () => {
                    gsap.set(overlay, { display: 'none' });
                    setShowOverlay(false);
                }
            });
        }
    }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

    useEffect(() => {
        const handleResize = () => {
            if (isMenuOpen) {
                const bubbles = bubblesRef.current.filter(Boolean);
                const isDesktop = window.innerWidth >= 768;
                bubbles.forEach((bubble, i) => {
                    const item = menuItems[i];
                    if (bubble && item) {
                        const rotation = isDesktop ? (item.rotation ?? 0) : 0;
                        gsap.set(bubble, { rotation });
                    }
                });
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen, menuItems]);

    return (
        <>
            <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        @media (min-width: 768px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.04);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.96);
          }
        }
        @media (max-width: 767px) {
          .bubble-menu-items .pill-list {
            row-gap: 8px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.04);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
        }
      `}</style>

            <nav className={containerClassName} style={style} aria-label="Main navigation">
                {/* Logo bubble container removed completely */}
                <button
                    type="button"
                    className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''} inline-flex flex-col items-center justify-center rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] pointer-events-auto w-11 h-11 border-0 cursor-pointer p-0 will-change-transform`}
                    onClick={handleToggle}
                    aria-label={menuAriaLabel}
                    aria-pressed={isMenuOpen}
                    style={{ background: menuBg }}
                >
          <span
              className="menu-line block mx-auto rounded-[2px]"
              style={{
                  width: 20,
                  height: 2,
                  background: menuContentColor,
                  transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none'
              }}
          />
                    <span
                        className="menu-line short block mx-auto rounded-[2px]"
                        style={{
                            marginTop: '6px',
                            width: 20,
                            height: 2,
                            background: menuContentColor,
                            transform: isMenuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none'
                        }}
                    />
                </button>
            </nav>

            {showOverlay && (
                <div
                    ref={overlayRef}
                    className={[
                        'bubble-menu-items',
                        useFixedPosition ? 'fixed' : 'absolute',
                        'inset-x-0 top-0',
                        'flex items-start justify-center',
                        'pt-24 pb-8 md:pt-24',
                        'pointer-events-none',
                        'z-[1000]'
                    ].join(' ')}
                    aria-hidden={!isMenuOpen}
                >
                    <ul
                        className="pill-list list-none m-0 px-6 w-full max-w-[1200px] mx-auto flex flex-wrap justify-center gap-3 pointer-events-auto"
                        role="menu"
                        aria-label="Menu links"
                    >
                        {menuItems.map((item, idx) => (
                            <li
                                key={idx}
                                role="none"
                                className="pill-col flex justify-center items-stretch box-border"
                            >
                                <a
                                    role="menuitem"
                                    href={item.href}
                                    aria-label={item.ariaLabel || item.label}
                                    className="pill-link px-6 py-2.5 rounded-full no-underline shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center relative transition-[background,color] duration-300 ease-in-out box-border whitespace-nowrap overflow-hidden will-change-transform"
                                    style={
                                        {
                                            ['--item-rot']: `${item.rotation ?? 0}deg`,
                                            ['--pill-bg']: menuBg,
                                            ['--pill-color']: menuContentColor,
                                            ['--hover-bg']: item.hoverStyles?.bgColor || '#f3f4f6',
                                            ['--hover-color']: item.hoverStyles?.textColor || menuContentColor,
                                            background: 'var(--pill-bg)',
                                            color: 'var(--pill-color)',
                                            minHeight: '44px',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                        } as CSSProperties
                                    }
                                    ref={el => {
                                        if (el) bubblesRef.current[idx] = el;
                                    }}
                                >
                  <span
                      className="pill-label inline-block"
                      style={{
                          willChange: 'transform, opacity',
                          height: '1.2em',
                          lineHeight: 1.2
                      }}
                      ref={el => {
                          if (el) labelRefs.current[idx] = el;
                      }}
                  >
                    {item.label}
                  </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}