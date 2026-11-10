import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { getGsap, prefersReducedMotion } from "@/lib/anim";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { images } from "@/data/projects";
import { contactDetails } from "@/data/contact";
import brandMark from "@/assets/brand-mark.png";

const NAV_LINKS = [
  { label: "Home", to: "/", image: images.heroInterior },
  { label: "Philosophy", to: "/philosophy", image: images.philosophyNature },
  { label: "Portfolio", to: "/portfolio", image: images.workInteriors },
  { label: "Services", to: "/services", image: images.workKitchen },
  { label: "Process", to: "/process", image: images.aboutStudio },
  { label: "About", to: "/about", image: images.heroInterior },
  { label: "Contact", to: "/contact", image: images.workLiving },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Close the menu whenever navigation happens.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scroll while the menu is open.
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build the open/close timeline once (browser only).
  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const { gsap } = getGsap();
    const reduced = prefersReducedMotion();
    const d = reduced ? 0 : 1;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll<HTMLElement>("[data-nav-line]");
      const meta = el.querySelectorAll<HTMLElement>("[data-nav-meta]");
      timelineRef.current = gsap
        .timeline({ paused: true })
        .set(el, { visibility: "visible", pointerEvents: "auto" })
        .fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.75 * d, ease: "power4.inOut" },
        )
        .fromTo(
          lines,
          { yPercent: 130 },
          { yPercent: 0, duration: 0.75 * d, stagger: 0.06 * d, ease: "power3.out" },
          "-=0.28",
        )
        .fromTo(
          meta,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 * d, stagger: 0.05 * d, ease: "power2.out" },
          "<0.18",
        );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (open) tl.timeScale(1).play();
    else tl.timeScale(1.7).reverse();
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
          scrolled && !open ? "bg-paper/85 text-foreground backdrop-blur-md" : "text-paper",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 md:px-10",
            open ? "py-5" : "py-5",
          )}
        >
          <Link
            to="/"
            className="group inline-flex items-center rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            aria-label="ARTHITECT home"
          >
            <img
              src={brandMark}
              alt="ARTHITECT monogram"
              className="h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/contact"
              className={cn(
                "hidden text-sm font-medium tracking-wide transition-colors hover:opacity-70 md:block",
                open && "text-paper",
              )}
            >
              Enquire
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="group flex items-center gap-3 py-2"
            >
              <span className={cn("text-overline transition-colors", open ? "text-paper" : "")}>
                {open ? "Close" : "Menu"}
              </span>
              <span className="relative flex h-8 w-8 flex-col items-end justify-center gap-[7px]">
                <span
                  className={cn(
                    "block h-px w-8 transition-all duration-300",
                    open ? "translate-y-[4px] rotate-45 bg-paper" : "bg-current",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-5 transition-all duration-300 group-hover:w-8",
                    open ? "-translate-y-[4px] -rotate-45 bg-paper" : "bg-current",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen menu */}
      <div
        ref={overlayRef}
        className="invisible fixed inset-0 z-[60] bg-ink text-paper"
        style={{ visibility: "hidden", pointerEvents: "none", clipPath: "inset(0% 0% 100% 0%)" }}
        aria-hidden={!open}
      >
        <div className="mx-auto flex h-full max-w-[1600px] flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pt-36">
          <nav className="flex-1" aria-label="Main">
            <ul className="flex flex-col gap-1 md:gap-2">
              {NAV_LINKS.map((link, i) => (
                <li key={link.to} className="overflow-hidden">
                  <Link
                    to={link.to}
                    data-nav-line
                    onMouseEnter={() => setActiveImage(link.image)}
                    onMouseLeave={() => setActiveImage(null)}
                    onFocus={() => setActiveImage(link.image)}
                    className={cn(
                      "group flex items-baseline gap-4 py-1 md:py-0",
                      pathname === link.to ? "text-clay" : "text-paper hover:text-clay",
                    )}
                  >
                    <span className="text-overline w-8 shrink-0 text-paper/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-title text-4xl transition-transform duration-500 group-hover:translate-x-2 md:text-6xl lg:text-7xl">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div data-nav-meta className="max-w-xs text-sm leading-relaxed text-paper/60">
              Interiors · Kitchens · Wardrobes · Bespoke joinery · 3D visualisation
            </div>
            <div data-nav-meta className="flex flex-col gap-1 text-sm text-paper/60">
              <Link to="/legal" className="text-paper/80 transition-colors hover:text-paper">
                Legal Centre
              </Link>
              <a
                href={`mailto:${contactDetails.email}`}
                className="transition-colors hover:text-paper"
              >
                {contactDetails.email}
              </a>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-paper"
              >
                WhatsApp {contactDetails.phone}
              </a>
              <span>{contactDetails.serviceArea} · No showroom</span>
            </div>
          </div>
        </div>

        {/* Hover preview image (desktop) */}
        <div className="pointer-events-none absolute right-10 top-1/2 hidden h-[52vh] w-[24vw] -translate-y-1/2 overflow-hidden lg:block">
          {NAV_LINKS.map((link) => (
            <img
              key={link.to}
              src={link.image}
              alt=""
              className={cn(
                "img-editorial absolute inset-0 scale-105 object-cover transition-all duration-700",
                activeImage === link.image ? "opacity-100 scale-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
