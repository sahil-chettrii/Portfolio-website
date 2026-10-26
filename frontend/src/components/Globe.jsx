import { useEffect, useRef } from 'react';
import prefersReducedMotion from '../hooks/prefersReducedMotion';

const COUNT = 2200;
const TILT = 0.35;

// Rough "continent" mask so the dots cluster like landmasses.
// (Placeholder: swap for real world-map data later.)
function isLand(x, y, z) {
  const v =
    Math.sin(x * 3.2 + 1.3) * Math.cos(y * 2.6) +
    Math.sin(z * 3.8 + x * 1.7) * 0.8 +
    Math.cos(y * 5.1 + z * 2.2) * 0.4;
  return v > 0.35;
}

export default function Globe() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = prefersReducedMotion();

    const points = [];
    for (let i = 0; i < COUNT; i += 1) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      const x = Math.cos(t) * r;
      const z = Math.sin(t) * r;
      points.push({ x, y, z, land: isLand(x, y, z), phase: Math.random() * Math.PI * 2 });
    }

    let w = 0;
    let h = 0;
    let R = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(Math.max(w * 0.52, 360), 780);
      cx = w / 2;
      cy = h + R * 0.5; // only the top part of the sphere is visible
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);
      const a = reduce ? 0.6 : time * 0.00012;
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const ct = Math.cos(TILT);
      const st = Math.sin(TILT);

      for (const p of points) {
        const x1 = p.x * ca + p.z * sa;
        const z1 = -p.x * sa + p.z * ca;
        const y2 = p.y * ct - z1 * st;
        const z2 = p.y * st + z1 * ct;
        if (z2 < 0) continue;

        const sx = cx + x1 * R;
        const sy = cy - y2 * R;
        if (sy > h + 4 || sy < -4) continue;

        const twinkle = 0.75 + 0.25 * Math.sin(time * 0.002 + p.phase);
        const alpha = (p.land ? 0.25 + 0.75 * z2 : 0.05 + 0.2 * z2) * twinkle;
        const size = (p.land ? 1.9 : 1.1) * (0.55 + 0.7 * z2);
        ctx.fillStyle = `rgba(0,229,160,${alpha.toFixed(3)})`;
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    if (!reduce) raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="hero__globe-canvas" aria-hidden="true" />;
}