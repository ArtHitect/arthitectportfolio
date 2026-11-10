import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/anim";

type RevealKind = "up" | "clip" | "scale" | "fade" | "lines" | "children";

interface RevealOptions {
  kind?: RevealKind;
  delay?: number;
  start?: string;
  stagger?: number;
  /** When true the element plays once and never reverses. */
  once?: boolean;
}

/**
 * Generic scroll-driven reveal. Attach the returned ref to the element
 * (or the element containing the target children).
 */
export function useReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const { kind = "up", delay = 0, start = "top 85%", stagger = 0.08, once = true } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets =
        kind === "lines"
          ? Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-line]"))
          : kind === "children"
            ? (Array.from(el.children) as HTMLElement[])
            : [el];

      if (kind === "clip") {
        gsap.fromTo(
          el,
          { clipPath: "inset(18% 8% 18% 8% round 2px)", scale: 1.04, y: 30 },
          {
            clipPath: "inset(0% 0% 0% 0% round 2px)",
            scale: 1,
            y: 0,
            duration: 1.4,
            delay,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start, toggleActions: once ? "play none none none" : "play none none reverse" },
          },
        );
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: kind === "fade" ? 0 : 56, scale: kind === "scale" ? 1.06 : 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, toggleActions: once ? "play none none none" : "play none none reverse" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [kind, delay, start, stagger, once]);

  return ref;
}

/**
 * Masked line-by-line text reveal. Wrap each visible line in a
 * `<span className="overflow-hidden block"><span data-reveal-line>…</span></span>`.
 */
export function useMaskedLines<T extends HTMLElement>(options: { delay?: number; start?: string } = {}) {
  const ref = useReveal<T>({ kind: "lines", ...options });
  return ref;
}

/** Depth parallax on an image inside its frame. */
export function useParallax<T extends HTMLElement>(amount = 12, start = "top bottom", end = "bottom top") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start, end, scrub: true },
        },
      );
    }, el.parentElement ?? el);
    return () => ctx.revert();
  }, [amount, start, end]);

  return ref;
}

/** Count-up number revealed on scroll. */
export function useCountUp(end: number, duration = 1.8) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    if (prefersReducedMotion()) {
      el.textContent = String(end);
      return;
    }
    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.value));
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [end, duration]);

  return ref;
}
