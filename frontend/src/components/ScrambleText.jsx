import { useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../hooks/prefersReducedMotion';

const CHARS = '!<>-_\\/[]{}=+*^?#01';

// "Hacker decode" effect: random characters resolve into the real text
// the first time the element scrolls into view.
export default function ScrambleText({ text, duration = 900 }) {
  const ref = useRef(null);
  const [out, setOut] = useState(() =>
    prefersReducedMotion() ? text : text.replace(/\S/g, '_')
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let raf;

    const run = () => {
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const reveal = Math.floor(p * text.length);
        setOut(
          text
            .split('')
            .map((c, i) =>
              c === ' ' ? ' ' : i < reveal ? c : CHARS[Math.floor(Math.random() * CHARS.length)]
            )
            .join('')
        );
        if (p < 1) raf = requestAnimationFrame(step);
        else setOut(text);
      };
      raf = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  return (
    <span ref={ref} aria-label={text}>
      {out}
    </span>
  );
}