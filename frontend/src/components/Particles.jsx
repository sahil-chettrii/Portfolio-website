import { useEffect, useRef } from 'react';
import prefersReducedMotion from '../hooks/prefersReducedMotion';

// Small green dots drifting upward and fading in and out.
export default function Particles({ count = 45 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let w = 0;
    let h = 0;
    let raf = 0;

    const make = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.6,
      vy: Math.random() * 0.25 + 0.05,
      vx: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.6 + 0.25,
      phase: Math.random() * Math.PI * 2,
    });

    let dots = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: count }, make);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        if (!prefersReducedMotion()) {
          d.y -= d.vy;
          d.x += d.vx;
          if (d.y < -10) {
            d.y = h + 10;
            d.x = Math.random() * w;
          }
        }
        const alpha = d.a * (0.5 + 0.5 * Math.sin(t / 1000 + d.phase));
        ctx.fillStyle = `rgba(0,229,160,${alpha.toFixed(3)})`;
        ctx.shadowColor = 'rgba(0,229,160,0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return <canvas ref={ref} className="hero__particles" aria-hidden="true" />;
}