import { useEffect, useLayoutEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getGsap, prefersReducedMotion } from "@/lib/anim";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { ArrowLink, EditorialImage, MaskedTitle, Overline } from "@/components/shared";
import { availableProjects, categoryLabel, images, services } from "@/data/projects";
import { StudioHighlights } from "@/components/studio-highlights";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ARTHITECT — Interior Design & Bespoke Joinery" },
      {
        name: "description",
        content:
          "Considered interiors, kitchens, wardrobes, bespoke joinery and 3D visualisation — shaped by African craft, nature and restraint.",
      },
      { property: "og:title", content: "ARTHITECT — Interior Design & Bespoke Joinery" },
      {
        property: "og:description",
        content:
          "Considered interiors and crafted spaces, rooted in African material culture. Explore the ARTHITECT portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Home() {
  return (
    <>
      <HomeHero />
      <StatementSection />
      <PhilosophyTeaser />
      <MaterialStudies />
      <FeaturedWork />
      <ServicesIndex />
      <StudioHighlights />
      <CtaSection />
    </>
  );
}

function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { gsap } = getGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = section.querySelectorAll("[data-hero-line]");
      gsap
        .timeline({ delay: 0.25 })
        .fromTo(
          "[data-hero-img]",
          { clipPath: "inset(14% 12% 14% 12%)", scale: 1.3 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1.12, duration: 1.9, ease: "power3.inOut" },
          0,
        )
        .fromTo(
          lines,
          { yPercent: 130 },
          { yPercent: 0, duration: 1.1, stagger: 0.09, ease: "power3.out" },
          0.55,
        )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power2.out" },
          1.0,
        );

      gsap.to("[data-hero-img]", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -22,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "60% top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <video
          data-hero-img
          src={images.heroVideo}
          aria-label="Cinematic bedroom visualisation"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover will-change-transform"
          style={{ clipPath: "inset(14% 12% 14% 12%)", transform: "scale(1.3)" }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-ink/40" />

      <div
        data-hero-content
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-[10vh] md:px-10"
      >
        <p data-hero-fade className="text-overline text-paper/70">
          Interiors · Kitchens · Joinery
        </p>
        <h1 className="display-hero mt-5 text-paper">
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span data-hero-line className="block text-[13vw] md:text-[9vw]">
              Spaces that
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span data-hero-line className="block text-[13vw] md:text-[9vw]">
              hold the <em className="not-italic italic">light.</em>
            </span>
          </span>
        </h1>
        <div
          data-hero-fade
          className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-sm leading-relaxed text-paper/80 md:text-base">
            An interior design studio crafting considered spaces rooted in African material culture,
            nature and restraint.
          </p>
          <div data-hero-fade className="flex items-center gap-4 text-paper/70">
            <span className="block h-px w-16 bg-paper/40" />
            <span className="text-overline">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatementSection() {
  const ref = useReveal<HTMLElement>({ kind: "up" });
  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Overline>The practice</Overline>
        </div>
        <div className="relative isolate md:col-span-9">
          <span aria-hidden="true" className="organic-wash organic-wash--wide -right-4 top-1/4" />
          <div className="relative z-10">
            <MaskedTitle
              lines={[
                "We shape space the way",
                "the land shapes light —",
                "slowly, honestly, permanently.",
              ]}
              className="text-3xl md:text-6xl"
            />
            <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Every commission begins with listening: to the site, to the climate, and to the hands
              that will shape it. What follows is a considered interior of quiet permanence —
              geometry borrowed from African craft, materials drawn from the earth.
            </p>
            <ArrowLink to="/philosophy" className="mt-10">
              Our philosophy
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhilosophyTeaser() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <EditorialImage
          src={images.philosophyNature}
          alt="Sunlit courtyard with clay walls"
          caption="Courtyard study — texture, light and shadow"
          aspect="aspect-[4/5]"
          className="md:col-span-7"
        />
        <div className="relative isolate md:col-span-4 md:col-start-9">
          <span aria-hidden="true" className="organic-wash organic-wash--small -right-3 top-1/3" />
          <div className="relative z-10">
            <Overline className="mb-6">Philosophy</Overline>
            <MaskedTitle
              lines={["Culture, nature", "and simplicity."]}
              className="text-3xl md:text-4xl"
            />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              We draw from the geometry of African craft, the patience of natural materials and the
              discipline of minimalist design — nothing added, nothing missing.
            </p>
            <ArrowLink to="/philosophy" className="mt-8">
              Read the philosophy
            </ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialStudies() {
  return (
    <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10 md:pb-32">
      <div className="grid items-start gap-x-6 gap-y-8 md:grid-cols-12 md:gap-y-10">
        <div className="relative isolate md:col-span-5 md:col-start-2">
          <span aria-hidden="true" className="organic-wash organic-wash--small -left-5 top-1/4" />
          <div className="relative z-10">
            <Overline className="mb-5">Material studies</Overline>
            <MaskedTitle
              lines={["A closer look", "at the details."]}
              className="text-3xl md:text-5xl"
            />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Engraved Vatsonga patterns, fluted oak and dark marble — a closer look at the timber
              details carried through kitchens, wardrobes and living spaces.
            </p>
          </div>
        </div>

        <EditorialImage
          src={images.lvPattern}
          alt="Fluted oak backdrop with an engraved Vatsonga pattern"
          caption="Fluted oak and engraved Vatsonga pattern"
          aspect="aspect-[4/3]"
          className="md:col-span-7 md:col-start-1 md:row-start-2"
        />
        <EditorialImage
          src={images.kwPattern}
          alt="Engraved Vatsonga motif in fluted oak kitchen doors"
          caption="Vatsonga pattern carved into fluted oak"
          aspect="aspect-[5/6]"
          className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:mt-12"
        />
        <EditorialImage
          src={images.ktPattern}
          alt="Engraved pattern on a dark marble kitchen's oak cabinet front"
          caption="Oak engraving against dark marble"
          aspect="aspect-[5/4]"
          className="md:col-span-4 md:col-start-3"
        />
      </div>
    </section>
  );
}

function FeaturedWork() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const { gsap } = getGsap();
    if (prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 300}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add("(max-width: 767px)", () => {
      const cards = track.querySelectorAll("[data-work-card]");
      const tweens = gsap.utils.toArray(cards).map((card) =>
        gsap.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          },
        ),
      );
      return () => {
        tweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-sand/50 py-20 md:py-0">
      <div className="flex h-auto items-center overflow-hidden md:h-screen">
        <div
          ref={trackRef}
          className="flex flex-col gap-12 px-6 will-change-transform md:h-full md:flex-row md:items-center md:gap-[4vw] md:px-[6vw]"
        >
          <div className="relative isolate shrink-0 md:w-[26vw]">
            <span aria-hidden="true" className="organic-wash organic-wash--small -left-5 top-1/4" />
            <div className="relative z-10">
              <Overline className="mb-5">Selected work</Overline>
              <h2 className="display-title text-4xl md:text-5xl">Featured projects.</h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                A selection of interiors and crafted objects — each one an exercise in proportion,
                material and light.
              </p>
              <ArrowLink to="/portfolio" className="mt-8">
                View all projects
              </ArrowLink>
            </div>
          </div>

          {availableProjects.map((project) => (
            <Link
              key={project.slug}
              to="/portfolio/$slug"
              params={{ slug: project.slug }}
              data-work-card
              className="group block w-full shrink-0 md:w-[32vw]"
            >
              <div className="aspect-[4/3] overflow-hidden bg-sand md:aspect-[3/4]">
                {project.coverVideo ? (
                  <video
                    src={project.coverVideo}
                    aria-label={`${project.title} project film`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="img-editorial transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                ) : (
                  <img
                    src={project.cover}
                    alt={project.title}
                    loading="lazy"
                    className="img-editorial transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="display-title text-2xl transition-colors group-hover:text-olive md:text-3xl">
                  {project.title}
                </h3>
                <span className="text-overline shrink-0 text-muted-foreground">
                  {categoryLabel(project.category)}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{project.year}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesIndex() {
  const listRef = useReveal<HTMLUListElement>({ kind: "children", stagger: 0.07 });
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
      <div className="relative isolate mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <span aria-hidden="true" className="organic-wash organic-wash--wide right-1/4 top-0" />
        <div className="relative z-10">
          <Overline className="mb-5">What we do</Overline>
          <MaskedTitle
            lines={["Five disciplines,", "one hand."]}
            className="text-4xl md:text-6xl"
          />
        </div>
        <div className="relative z-10">
          <ArrowLink to="/services">Explore services</ArrowLink>
        </div>
      </div>
      <ul ref={listRef}>
        {services.map((service, i) => (
          <li
            key={service.id}
            className="group grid grid-cols-1 items-baseline gap-3 border-t border-border py-8 transition-colors last:border-b hover:bg-sand/50 md:grid-cols-12 md:gap-6 md:py-10"
          >
            <span className="text-overline text-muted-foreground md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="display-title text-3xl transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-4xl">
              {service.title}
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5">
              {service.description}
            </p>
            <Link
              to="/portfolio"
              search={{ category: service.id === "interior-design" ? "interiors" : service.id }}
              className="text-sm font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100 md:col-span-1 md:justify-self-end"
            >
              Work →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-8 px-6 py-28 md:flex-row md:items-end md:justify-between md:px-10 md:py-40">
        <div className="relative isolate">
          <span aria-hidden="true" className="organic-wash organic-wash--light -left-6 top-1/4" />
          <div className="relative z-10">
            <Overline className="mb-6 text-paper/50">Begin</Overline>
            <MaskedTitle
              lines={["Every project begins", "with a conversation."]}
              className="text-4xl text-paper md:text-6xl"
            />
          </div>
        </div>
        <ArrowLink to="/contact" light className="shrink-0 text-base">
          Book a consultation
        </ArrowLink>
      </div>
    </section>
  );
}
