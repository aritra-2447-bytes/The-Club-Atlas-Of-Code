import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export interface ScrambledTextProps {
    duration?: number;
    speed?: number;
    scrambleChars?: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
                                                         duration = 1.2,
                                                         speed = 0.5,
                                                         scrambleChars = '.:',
                                                         className = '',
                                                         style = {},
                                                         children
                                                     }) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        // 1. Split text into characters
        const split = SplitText.create(rootRef.current.querySelector('p'), {
            type: 'words, chars',
            charsClass: 'inline-block will-change-transform'
        });

        // 2. Store the original text and immediately set it to a scrambled state
        split.chars.forEach(el => {
            const c = el as HTMLElement;
            gsap.set(c, { attr: { 'data-content': c.innerHTML } });

            gsap.set(c, {
                scrambleText: {
                    text: scrambleChars.substring(0, 1),
                    chars: scrambleChars,
                    speed: 1
                }
            });
        });

        // 3. Generate a random delay between 1000ms (1s) and 2000ms (2s)
        const randomDelay = Math.random() * 1000;

        // 4. Trigger the single decode animation after the timeout
        const timer = setTimeout(() => {
            split.chars.forEach(el => {
                const c = el as HTMLElement;
                gsap.to(c, {
                    duration: duration,
                    scrambleText: {
                        text: c.dataset.content || '',
                        chars: scrambleChars,
                        speed: speed,
                        revealDelay: Math.random() * 0.2 // subtle stagger per character
                    },
                    ease: 'power1.out'
                });
            });
        }, randomDelay);

        return () => {
            clearTimeout(timer);
            split.revert();
        };
    }, [duration, speed, scrambleChars]);

    return (
        <div
            ref={rootRef}
            // Removed the clamp class completely so the passed-in className takes priority
            className={"m-[7vw] max-w-[800px] font-mono text-[#ffb829] " + className}
            style={style}
        >
            <p>{children}</p>
        </div>
    );
};

export default ScrambledText;