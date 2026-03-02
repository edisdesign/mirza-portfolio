import { motion, useTransform } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
const heroPortrait = "";

const NAME_TEXT = "MIRZA   SMAJLOVIĆ";
const REPEAT_COUNT = 6;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const clipLayerRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const hoveringRef = useRef(false);
  const touchTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Parallax
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const imageY = useTransform(() => `${scrollProgress * 25}%`);
  const imageScale = useTransform(() => 1 + scrollProgress * 0.1);
  const overlayOpacity = useTransform(
    () => Math.min(scrollProgress / 0.5, 1) * 0.4
  );

  // JS-driven marquee
  useEffect(() => {
    let offset = 0;
    let raf: number;
    const speed = 0.5;

    const tick = () => {
      offset -= speed;
      const container = textContainerRef.current;
      const measure = measureRef.current;
      if (container && measure) {
        const halfWidth = measure.scrollWidth / 2;
        if (halfWidth > 0 && Math.abs(offset) >= halfWidth) {
          offset += halfWidth;
        }
        container.style.setProperty("--mx", `${offset}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cursor tracking — direct DOM updates, no React state
  const circleRadius = 120;

  const updateCursorDOM = useCallback(() => {
    const { x, y } = mouseRef.current;
    const hovering = hoveringRef.current;
    const r = circleRadius;

    if (clipLayerRef.current) {
      clipLayerRef.current.style.clipPath = hovering
        ? `circle(${r}px at ${x}px ${y}px)`
        : `circle(0px at ${x}px ${y}px)`;
    }
    if (cursorRingRef.current) {
      cursorRingRef.current.style.left = `${x - r}px`;
      cursorRingRef.current.style.top = `${y - r}px`;
      cursorRingRef.current.style.opacity = hovering ? "1" : "0";
    }
  }, []);

  useEffect(() => {
    const el = textContainerRef.current;
    if (!el) return;

    const getPos = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = getPos(e.clientX, e.clientY);
      updateCursorDOM();
    };

    const onMouseEnter = () => {
      hoveringRef.current = true;
      updateCursorDOM();
    };

    const onMouseLeave = () => {
      hoveringRef.current = false;
      mouseRef.current = { x: -200, y: -200 };
      updateCursorDOM();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = getPos(t.clientX, t.clientY);
        hoveringRef.current = true;
        updateCursorDOM();
        if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        mouseRef.current = getPos(t.clientX, t.clientY);
        updateCursorDOM();
      }
    };

    const onTouchEnd = () => {
      touchTimeoutRef.current = setTimeout(() => {
        hoveringRef.current = false;
        mouseRef.current = { x: -200, y: -200 };
        updateCursorDOM();
      }, 1500);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [updateCursorDOM]);

  const renderSpans = () =>
    Array.from({ length: REPEAT_COUNT }).map((_, i) => (
      <span
        key={i}
        className="font-['Outfit'] text-[30vw] md:text-[14vw] leading-none tracking-[-0.02em] whitespace-nowrap select-none shrink-0 px-[2vw]"
        style={{
          fontWeight: 800,
          transform: "scaleY(1.3)",
          transformOrigin: "center",
        }}
      >
        {NAME_TEXT}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.4) 30%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.4) 30%, transparent 70%)",
        }}
      >
        <div
          className="w-full h-full opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Portrait image */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className="absolute inset-0"
        >
          <img
            src={heroPortrait}
            alt="Mirza Smajlović"
            className="w-full h-full object-cover object-top grayscale brightness-[0.4]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />
      </div>

      {/* Scrolling text */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 flex items-center cursor-none"
        style={{ "--mx": "0px" } as React.CSSProperties}
      >
        {/* Outlined layer */}
        <div className="w-full overflow-hidden">
          <div
            ref={measureRef}
            className="flex whitespace-nowrap py-[6vw] will-change-transform"
            style={{
              width: "max-content",
              transform: "translateX(var(--mx))",
              color: "transparent",
              WebkitTextStroke: "1.5px rgba(245, 240, 235, 0.25)",
            }}
          >
            {renderSpans()}
          </div>
        </div>

        {/* Filled layer — clip-path driven by ref, not state */}
        <div
          ref={clipLayerRef}
          className="absolute inset-0 flex items-center overflow-hidden pointer-events-none"
          style={{
            clipPath: "circle(0px at -200px -200px)",
            transition: "clip-path 0.15s ease-out",
            willChange: "clip-path",
          }}
        >
          <div className="w-full overflow-hidden">
            <div
              className="flex whitespace-nowrap py-[6vw] will-change-transform text-white"
              style={{
                width: "max-content",
                transform: "translateX(var(--mx))",
              }}
            >
              {renderSpans()}
            </div>
          </div>
        </div>

        {/* Cursor circle outline — driven by ref */}
        <div
          ref={cursorRingRef}
          className="absolute pointer-events-none z-10 rounded-full border border-[#c9a96e]/50"
          style={{
            width: circleRadius * 2,
            height: circleRadius * 2,
            left: -200,
            top: -200,
            opacity: 0,
            willChange: "left, top, opacity",
            boxShadow: "0 0 40px rgba(201, 169, 110, 0.08)",
          }}
        />
      </div>

      {/* Top left label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="absolute top-28 left-6 md:left-12 pointer-events-none"
      >
        <p className="font-['Inter'] text-white/30 text-[11px] tracking-[0.3em] uppercase">
          Portfolio — 2026
        </p>
      </motion.div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12 pointer-events-none z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <p className="font-['Inter'] text-white/50 text-[11px] tracking-[0.25em] uppercase">
              Visoko, Bosna i Hercegovina
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="md:text-right"
          >
            <p
              className="font-['Outfit'] text-white text-[20px] md:text-[36px] leading-tight tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Akademski Slikar
            </p>
            <p
              className="font-['Outfit'] text-white text-[20px] md:text-[36px] leading-tight tracking-[-0.02em]"
              style={{ fontWeight: 300 }}
            >
              Figuracija & Ekspresija
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
