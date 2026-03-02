import { useEffect, useRef, useState, useCallback } from "react";

interface Fiber {
  x: number;
  y: number;
  x2: number;
  y2: number;
  age: number;
  width: number;
  opacity: number;
}

interface Grain {
  x: number;
  y: number;
  age: number;
  size: number;
  opacity: number;
}

const MAX_FIBERS = 800;
const MAX_GRAINS = 400;
const MAX_AGE = 150;
const FADE_START = 0.55;

export function ChalkCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fibersRef = useRef<Fiber[]>([]);
  const grainsRef = useRef<Grain[]>([]);
  const prevRef = useRef({ x: -1, y: -1 });
  const animRef = useRef<number>(0);

  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  const addStrokes = useCallback((x: number, y: number) => {
    const prev = prevRef.current;
    if (prev.x < 0) {
      prevRef.current = { x, y };
      return;
    }

    const dx = x - prev.x;
    const dy = y - prev.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 2) return;

    // Normalize direction
    const nx = dx / dist;
    const ny = dy / dist;
    // Perpendicular
    const px = -ny;
    const py = nx;

    const fibers = fibersRef.current;
    const grains = grainsRef.current;

    // Number of interpolation steps along the movement
    const steps = Math.min(Math.ceil(dist / 3), 6);

    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const bx = prev.x + dx * t;
      const by = prev.y + dy * t;

      // Main charcoal fibers: several parallel strokes with perpendicular offset
      const fiberCount = 2 + Math.floor(Math.random() * 3);
      for (let f = 0; f < fiberCount; f++) {
        // Spread fibers across the "width" of the charcoal stick
        const spread = (Math.random() - 0.5) * 8;
        const fx = bx + px * spread;
        const fy = by + py * spread;

        // Each fiber is a short line segment along movement direction
        const len = 3 + Math.random() * 6;
        // Slight angle variation to mimic irregular charcoal texture
        const angleJitter = (Math.random() - 0.5) * 0.4;
        const fnx = nx * Math.cos(angleJitter) - ny * Math.sin(angleJitter);
        const fny = nx * Math.sin(angleJitter) + ny * Math.cos(angleJitter);

        fibers.push({
          x: fx,
          y: fy,
          x2: fx + fnx * len,
          y2: fy + fny * len,
          age: 0,
          width: 0.3 + Math.random() * 1.8,
          opacity: 0.06 + Math.random() * 0.14,
        });
      }

      // Scattered grain particles — the dusty charcoal residue
      if (Math.random() > 0.3) {
        const grainCount = 1 + Math.floor(Math.random() * 3);
        for (let g = 0; g < grainCount; g++) {
          // More spread than fibers
          const gx = bx + (Math.random() - 0.5) * 18;
          const gy = by + (Math.random() - 0.5) * 18;
          grains.push({
            x: gx,
            y: gy,
            age: 0,
            size: 0.2 + Math.random() * 0.8,
            opacity: 0.03 + Math.random() * 0.06,
          });
        }
      }
    }

    // Occasional smudge marks — wider, fainter strokes
    if (dist > 10 && Math.random() > 0.6) {
      const sx = x + (Math.random() - 0.5) * 12;
      const sy = y + (Math.random() - 0.5) * 12;
      const sLen = 4 + Math.random() * 8;
      fibers.push({
        x: sx,
        y: sy,
        x2: sx + nx * sLen + (Math.random() - 0.5) * 3,
        y2: sy + ny * sLen + (Math.random() - 0.5) * 3,
        age: 0,
        width: 1.5 + Math.random() * 2.5,
        opacity: 0.03 + Math.random() * 0.05,
      });
    }

    // Trim arrays
    if (fibers.length > MAX_FIBERS) {
      fibersRef.current = fibers.slice(-MAX_FIBERS);
    }
    if (grains.length > MAX_GRAINS) {
      grainsRef.current = grains.slice(-MAX_GRAINS);
    }

    prevRef.current = { x, y };
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const heroEl = document.getElementById("hero-section");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
          prevRef.current = { x: -1, y: -1 };
          return;
        }
      }
      addStrokes(e.clientX, e.clientY);
    },
    [addStrokes]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw fibers (charcoal strokes)
      const fibers = fibersRef.current;
      let fIdx = 0;
      ctx.strokeStyle = "rgb(201, 169, 110)";
      ctx.lineCap = "round";

      for (let i = 0; i < fibers.length; i++) {
        const f = fibers[i];
        f.age++;
        if (f.age > MAX_AGE) continue;

        const fadeRatio = f.age / MAX_AGE;
        const alpha =
          fadeRatio > FADE_START
            ? f.opacity * (1 - (fadeRatio - FADE_START) / (1 - FADE_START))
            : f.opacity;

        if (alpha > 0.003) {
          ctx.globalAlpha = alpha;
          ctx.lineWidth = f.width;
          ctx.beginPath();
          ctx.moveTo(f.x, f.y);
          ctx.lineTo(f.x2, f.y2);
          ctx.stroke();
          fibers[fIdx++] = f;
        }
      }
      fibers.length = fIdx;

      // Draw grains (dust particles)
      const grains = grainsRef.current;
      let gIdx = 0;
      ctx.fillStyle = "rgb(201, 169, 110)";

      for (let i = 0; i < grains.length; i++) {
        const g = grains[i];
        g.age++;
        if (g.age > MAX_AGE) continue;

        const fadeRatio = g.age / MAX_AGE;
        const alpha =
          fadeRatio > FADE_START
            ? g.opacity * (1 - (fadeRatio - FADE_START) / (1 - FADE_START))
            : g.opacity;

        if (alpha > 0.003) {
          ctx.globalAlpha = alpha;
          ctx.fillRect(
            g.x - g.size * 0.5,
            g.y - g.size * 0.5,
            g.size,
            g.size
          );
          grains[gIdx++] = g;
        }
      }
      grains.length = gIdx;

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  if (isTouchDevice) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
    />
  );
}
