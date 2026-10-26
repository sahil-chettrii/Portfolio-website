import { useEffect, useState } from 'react';
import prefersReducedMotion from './prefersReducedMotion';

// Types each line, waits, clears, and starts again forever.
// `lines` must be a stable array (define it outside the component).
export default function useTerminal(
  lines,
  { charMs = 40, linePause = 380, restartPause = 3500 } = {}
) {
  const [done, setDone] = useState(() => (prefersReducedMotion() ? lines : []));
  const [current, setCurrent] = useState('');

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let timer;
    let li = 0;
    let ci = 0;
    setDone([]);
    setCurrent('');

    const tick = () => {
      if (cancelled) return;
      if (li >= lines.length) {
        timer = setTimeout(() => {
          li = 0;
          ci = 0;
          setDone([]);
          setCurrent('');
          tick();
        }, restartPause);
        return;
      }
      const line = lines[li];
      if (ci < line.length) {
        ci += 1;
        setCurrent(line.slice(0, ci));
        timer = setTimeout(tick, charMs);
      } else {
        setDone((d) => [...d, line]);
        setCurrent('');
        li += 1;
        ci = 0;
        timer = setTimeout(tick, linePause);
      }
    };

    timer = setTimeout(tick, 900);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [lines, charMs, linePause, restartPause]);

  return { done, current };
}
