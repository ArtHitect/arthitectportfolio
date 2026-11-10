import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

let ready = false;

/**
 * Lazily register GSAP plugins (browser only). Import is SSR-safe;
 * registration happens on first call from a browser effect.
 */
export function getGsap() {
  if (typeof window !== "undefined" && !ready) {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ready = true;
  }
  return { gsap, ScrollTrigger, SplitText };
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
