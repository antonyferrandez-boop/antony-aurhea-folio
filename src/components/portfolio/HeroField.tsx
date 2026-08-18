import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const prism = prismRef.current;
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: Point = { x: 0, y: 0 };
    const target: Point = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerActive = false;

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      target.x = pointer.x = width * 0.68;
      target.y = pointer.y = height * 0.48;
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      target.x = width * 0.68;
      target.y = height * 0.48;
      pointerActive = false;
    };

    const drawCell = (
      corners: [Point, Point, Point, Point],
      fillAlpha: number,
      strokeAlpha: number,
    ) => {
      context.beginPath();
      context.moveTo(corners[0].x, corners[0].y);
      corners.slice(1).forEach((point) => context.lineTo(point.x, point.y));
      context.closePath();
      context.fillStyle = `rgba(75, 194, 226, ${fillAlpha})`;
      context.fill();
      context.strokeStyle = `rgba(144, 225, 244, ${strokeAlpha})`;
      context.lineWidth = 0.65;
      context.stroke();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);
      pointer.x += (target.x - pointer.x) * 0.075;
      pointer.y += (target.y - pointer.y) * 0.075;

      const compact = width < 640;
      const columns = compact ? 9 : width < 1024 ? 14 : 20;
      const rows = compact ? 13 : 15;
      const horizon = height * (compact ? 0.18 : 0.25);
      const planeHeight = height * 0.95;
      const pointerRadius = Math.min(width, height) * (compact ? 0.38 : 0.34);

      for (let row = 0; row < rows; row += 1) {
        const near = row / rows;
        const far = (row + 1) / rows;
        const y0 = horizon + Math.pow(near, 1.62) * planeHeight;
        const y1 = horizon + Math.pow(far, 1.62) * planeHeight;
        const spread0 = width * (0.34 + near * 1.16);
        const spread1 = width * (0.34 + far * 1.16);
        const left0 = width * 0.58 - spread0 / 2;
        const left1 = width * 0.58 - spread1 / 2;

        for (let column = 0; column < columns; column += 1) {
          const x00 = left0 + (spread0 * column) / columns;
          const x01 = left0 + (spread0 * (column + 1)) / columns;
          const x10 = left1 + (spread1 * column) / columns;
          const x11 = left1 + (spread1 * (column + 1)) / columns;
          const centerX = (x00 + x01 + x10 + x11) / 4;
          const centerY = (y0 + y1) / 2;
          const distance = Math.hypot(centerX - pointer.x, centerY - pointer.y);
          const influence = pointerActive ? Math.max(0, 1 - distance / pointerRadius) : 0;
          const signal = (Math.sin(time * 0.00105 - row * 0.54 + column * 0.36) + 1) / 2;
          const signalBand = Math.pow(signal, 7) * (0.3 + far * 0.7);
          const lift = influence * influence * (compact ? 8 : 18);
          const gap = Math.max(0.6, far * 2.2);

          drawCell(
            [
              { x: x00 + gap, y: y0 + gap - lift },
              { x: x01 - gap, y: y0 + gap - lift },
              { x: x11 - gap, y: y1 - gap - lift },
              { x: x10 + gap, y: y1 - gap - lift },
            ],
            0.012 + signalBand * 0.12 + influence * 0.2,
            0.07 + signalBand * 0.18 + influence * 0.38,
          );
        }
      }

      const glow = context.createRadialGradient(
        pointer.x,
        pointer.y,
        0,
        pointer.x,
        pointer.y,
        pointerRadius * 1.1,
      );
      glow.addColorStop(0, `rgba(57, 188, 224, ${pointerActive ? 0.12 : 0.055})`);
      glow.addColorStop(1, "rgba(57, 188, 224, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      if (prism) {
        const dx = (pointer.x / width - 0.5) * 8;
        const dy = (pointer.y / height - 0.5) * -5;
        const drift = reducedMotion ? 0 : Math.sin(time * 0.00042) * 7;
        prism.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotateX(${62 + dy * 0.28}deg) rotateZ(${38 + drift}deg)`;
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(root);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);
    resize();
    render(0);

    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-field" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-field-canvas" />
      <div ref={prismRef} className="hero-prism">
        <span className="hero-prism-plane hero-prism-plane-one" />
        <span className="hero-prism-plane hero-prism-plane-two" />
        <span className="hero-prism-plane hero-prism-plane-three" />
        <i className="hero-prism-core" />
      </div>
      <span className="hero-field-lens" />
    </div>
  );
}
