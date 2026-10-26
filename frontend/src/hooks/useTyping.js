import { useEffect, useState } from 'react';
import prefersReducedMotion from './prefersReducedMotion';

// Types `text` one character at a time (runs once).
export default function useTyping(text, { startDelay = 600, speed = 110 } = {}) {
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let timer;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < text.length) timer = setTimeout(tick, speed + Math.random() * 50);
    };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, startDelay, speed]);

  return text.slice(0, count);
}