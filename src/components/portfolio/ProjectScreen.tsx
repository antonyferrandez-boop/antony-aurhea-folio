import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export function ProjectScreen({
  children,
  className,
  motionKey,
}: {
  children: ReactNode;
  className?: string;
  motionKey: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        gsap.fromTo(
          ".project-screen-plate",
          { autoAlpha: 0, y: 68, scale: 0.94, rotationX: 3.2 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 86%", once: true },
          },
        );
      });

      media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
        const plate = root.querySelector<HTMLElement>(".project-screen-plate");
        const mediaElement = root.querySelector<HTMLElement>(".project-screen-media");
        if (!plate || !mediaElement) return;

        const rotateX = gsap.quickTo(plate, "rotationX", { duration: 0.45, ease: "power3.out" });
        const rotateY = gsap.quickTo(plate, "rotationY", { duration: 0.45, ease: "power3.out" });
        const mediaX = gsap.quickTo(mediaElement, "x", { duration: 0.6, ease: "power3.out" });
        const mediaY = gsap.quickTo(mediaElement, "y", { duration: 0.6, ease: "power3.out" });

        const onPointerMove = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
          const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotateY(horizontal * 4.5);
          rotateX(vertical * -3.25);
          mediaX(horizontal * -12);
          mediaY(vertical * -9);
        };

        const onPointerLeave = () => {
          rotateX(0);
          rotateY(0);
          mediaX(0);
          mediaY(0);
        };

        root.addEventListener("pointermove", onPointerMove);
        root.addEventListener("pointerleave", onPointerLeave);

        return () => {
          root.removeEventListener("pointermove", onPointerMove);
          root.removeEventListener("pointerleave", onPointerLeave);
        };
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, [motionKey]);

  return (
    <div ref={rootRef} className={cn("project-screen-root", className)}>
      <div className="project-screen-plate">{children}</div>
    </div>
  );
}
