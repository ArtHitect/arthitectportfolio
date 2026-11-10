import { useEffect, useRef } from "react";
import { useRouter } from "@tanstack/react-router";
import { getGsap, prefersReducedMotion } from "@/lib/anim";

/**
 * Cinematic page-transition curtain. Slides up over the old page on
 * navigation start, then lifts away to reveal the new page.
 */
export function TransitionCurtain() {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const el = ref.current;
    if (!el) return;

    let tl: gsap.core.Timeline | null = null;

    const playIn = () => {
      tl?.kill();
      tl = gsap
        .timeline()
        .set(el, { visibility: "visible", pointerEvents: "auto" })
        .fromTo(
          el,
          { yPercent: 100, y: 0 },
          { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
        );
    };

    const playOut = () => {
      gsap.delayedCall(0.35, () => {
        tl?.kill();
        tl = gsap
          .timeline()
          .to(el, { yPercent: -100, duration: 0.7, ease: "power3.inOut" })
          .set(el, { visibility: "hidden", pointerEvents: "none", yPercent: 100 });
      });
    };

    const offBefore = router.subscribe("onBeforeLoad", playIn);
    const offResolved = router.subscribe("onResolved", playOut);
    return () => {
      offBefore();
      offResolved();
      tl?.kill();
      gsap.killTweensOf(el);
    };
  }, [router]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none invisible fixed inset-0 z-[90] bg-ink"
      style={{ transform: "translateY(100%)" }}
    >
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-overline text-paper/70">
        ARTHITECT
      </div>
    </div>
  );
}
