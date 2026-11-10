import { useEffect, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import Lenis from "lenis";
import { getGsap, prefersReducedMotion } from "@/lib/anim";
import { getLenis, setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling wired into GSAP's ticker + ScrollTrigger,
 * with per-route ScrollTrigger refresh.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return <>{children}</>;
}
