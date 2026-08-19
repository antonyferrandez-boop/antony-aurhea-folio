import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

const TAU = Math.PI * 2;

export function HeroField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!root || !canvas || !context) return;
    const interactionRoot = root.closest<HTMLElement>(".hero-sticky") ?? root;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const pointer: Point = { x: 0, y: 0 };
    const target: Point = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastFrame = 0;
    let visible = true;
    let pointerActive = false;
    let touchImpulseUntil = 0;
    let rowGradients: CanvasGradient[] = [];
    let ribbonTop: Point[] = [];
    let ribbonBottom: Point[] = [];

    const resize = () => {
      const bounds = root.getBoundingClientRect();
      const compact = bounds.width < 640;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.1 : 1.35);
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      target.x = pointer.x = width * (compact ? 0.62 : 0.7);
      target.y = pointer.y = height * 0.5;
      const rows = compact ? 13 : width < 1024 ? 18 : 24;
      rowGradients = Array.from({ length: rows }, (_, row) => {
        const depth = row / Math.max(1, rows - 1);
        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, "rgba(76, 193, 224, 0)");
        gradient.addColorStop(compact ? 0.18 : 0.3, `rgba(90, 202, 230, ${0.1 + depth * 0.08})`);
        gradient.addColorStop(0.72, `rgba(108, 220, 244, ${0.32 + depth * 0.32})`);
        gradient.addColorStop(1, "rgba(55, 173, 205, 0)");
        return gradient;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      pointerActive = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (finePointer) return;
      onPointerMove(event);
      touchImpulseUntil = performance.now() + 720;
      if (visible && !reducedMotion) start();
    };

    const onPointerLeave = () => {
      target.x = width * 0.7;
      target.y = height * 0.5;
      pointerActive = false;
    };

    const curvePoint = (x: number, baseY: number, row: number, rowCount: number, time: number) => {
      const normalizedX = x / width;
      const depth = row / Math.max(1, rowCount - 1);
      const envelope = Math.sin(Math.min(1, Math.max(0, normalizedX)) * Math.PI);
      const primary = Math.sin(normalizedX * TAU * 1.18 + time * 0.00042 + row * 0.21);
      const secondary = Math.sin(normalizedX * TAU * 2.85 - time * 0.00025 + row * 0.47);
      const amplitude = height * (0.018 + depth * 0.046) * envelope;
      let y = baseY + primary * amplitude + secondary * amplitude * 0.28;

      if (pointerActive && (finePointer || time < touchImpulseUntil)) {
        const radius = Math.max(150, width * 0.18);
        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, 1 - distance / radius);
        const ripple = Math.sin(distance * 0.032 - time * 0.004) * height * 0.014;
        y += (pointer.y - y) * influence * 0.12 + ripple * influence * influence;
      }

      return y;
    };

    const drawWave = (row: number, rowCount: number, time: number) => {
      const compact = width < 640;
      const startY = height * (compact ? 0.24 : 0.12);
      const fieldHeight = height * (compact ? 0.64 : 0.78);
      const depth = row / Math.max(1, rowCount - 1);
      const baseY = startY + depth * fieldHeight;
      const step = compact ? 18 : 22;

      context.beginPath();
      for (let x = -step; x <= width + step; x += step) {
        const y = curvePoint(x, baseY, row, rowCount, time);
        if (x === -step) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = rowGradients[row] ?? "rgba(108, 220, 244, 0.16)";
      context.lineWidth = 0.78 + depth * 1.08;
      context.stroke();

      if (row % (compact ? 5 : 4) !== 0) return;
      const nodeX = width * (0.48 + ((row * 0.137 + time * 0.000015) % 0.42));
      const nodeY = curvePoint(nodeX, baseY, row, rowCount, time);
      context.beginPath();
      context.arc(nodeX, nodeY, 1.15 + depth * 0.65, 0, TAU);
      context.fillStyle = `rgba(126, 228, 248, ${0.3 + depth * 0.36})`;
      context.fill();
    };

    const drawRibbon = (time: number) => {
      const compact = width < 640;
      const points = compact ? 22 : 36;
      const center = height * (compact ? 0.52 : 0.56);
      if (ribbonTop.length !== points + 1) {
        ribbonTop = Array.from({ length: points + 1 }, () => ({ x: 0, y: 0 }));
        ribbonBottom = Array.from({ length: points + 1 }, () => ({ x: 0, y: 0 }));
      }

      for (let index = 0; index <= points; index += 1) {
        const x = (index / points) * width;
        const normalizedX = x / width;
        const envelope = Math.sin(normalizedX * Math.PI);
        const wave = Math.sin(normalizedX * TAU * 1.3 + time * 0.00038) * height * 0.072 * envelope;
        const thickness = height * (0.015 + 0.016 * Math.sin(normalizedX * Math.PI));
        ribbonTop[index]!.x = x;
        ribbonTop[index]!.y = center + wave - thickness;
        ribbonBottom[index]!.x = x;
        ribbonBottom[index]!.y = center + wave + thickness;
      }

      const fill = context.createLinearGradient(width * 0.25, 0, width, 0);
      fill.addColorStop(0, "rgba(48, 169, 202, 0)");
      fill.addColorStop(0.68, "rgba(68, 190, 221, 0.15)");
      fill.addColorStop(1, "rgba(48, 169, 202, 0)");
      context.beginPath();
      ribbonTop.forEach((point, index) => {
        if (index === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      });
      for (let index = ribbonBottom.length - 1; index >= 0; index -= 1) {
        const point = ribbonBottom[index]!;
        context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.fillStyle = fill;
      context.fill();
    };

    const render = (time: number) => {
      const compact = width < 640;
      const frameInterval = 1000 / (compact ? 30 : 45);
      if (time - lastFrame >= frameInterval || reducedMotion) {
        lastFrame = time;
        context.clearRect(0, 0, width, height);
        pointer.x += (target.x - pointer.x) * 0.075;
        pointer.y += (target.y - pointer.y) * 0.075;

        drawRibbon(time);
        const rows = compact ? 13 : width < 1024 ? 18 : 24;
        for (let row = 0; row < rows; row += 1) drawWave(row, rows, time);

        const glowRadius = Math.min(width, height) * (compact ? 0.42 : 0.3);
        const glow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          glowRadius,
        );
        glow.addColorStop(0, `rgba(66, 190, 222, ${pointerActive ? 0.11 : 0.055})`);
        glow.addColorStop(1, "rgba(66, 190, 222, 0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, width, height);
      }

      if (!reducedMotion && visible && !document.hidden)
        frame = window.requestAnimationFrame(render);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(render);
    };

    const onVisibilityChange = () => {
      if (document.hidden) window.cancelAnimationFrame(frame);
      else if (visible && !reducedMotion) start();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        if (visible && !reducedMotion) start();
        else window.cancelAnimationFrame(frame);
      },
      { rootMargin: "15% 0px" },
    );
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) render(0);
    });

    resizeObserver.observe(root);
    visibilityObserver.observe(root);
    interactionRoot.addEventListener("pointermove", onPointerMove, { passive: true });
    interactionRoot.addEventListener("pointerdown", onPointerDown, { passive: true });
    interactionRoot.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    render(0);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      interactionRoot.removeEventListener("pointermove", onPointerMove);
      interactionRoot.removeEventListener("pointerdown", onPointerDown);
      interactionRoot.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="hero-field" aria-hidden="true">
      <span className="hero-aurora hero-aurora-one" />
      <span className="hero-aurora hero-aurora-two" />
      <canvas ref={canvasRef} className="hero-field-canvas" />
      <span className="hero-field-lens" />
      <span className="hero-field-grain" />
    </div>
  );
}
