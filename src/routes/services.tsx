import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLink, EditorialImage, MaskedTitle, Overline, PageHero } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { availableProjects, CATEGORIES, services } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — ARTHITECT" },
      {
        name: "description",
        content:
          "Interior design, kitchens, wardrobes, bespoke joinery and 3D visualisation — designed and made under one roof.",
      },
      { property: "og:title", content: "Services — ARTHITECT" },
      {
        property: "og:description",
        content:
          "Interiors, kitchens, wardrobes, joinery and visualisation — five disciplines, one hand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function portfolioCategoryFor(id: string) {
  return id === "interior-design" ? "interiors" : id;
}

function ServicesPage() {
  return (
    <>
      <PageHero
        overline="Services"
        lines={["Five disciplines,", "one hand."]}
        lead="Interiors and the objects within them — designed, detailed and made by a single studio, so nothing is lost in translation. Architecture is coming soon."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-16 md:px-10">
        <div className="rule" />
        <ul>
          {services.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </ul>
      </section>

      <section className="bg-sand/50">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Overline className="mb-6">One roof</Overline>
              <MaskedTitle
                lines={["Designed, made", "and installed", "by us."]}
                className="text-3xl md:text-5xl"
              />
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Our joinery workshop sits at the centre of the practice. Cabinetry, kitchens and
                wardrobes are fabricated in-house, dry-fitted on site and installed by the team
                that drew them — which is why the last millimetre is never negotiable.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <ul className="flex flex-col gap-3 text-sm">
                {CATEGORIES.map((c) => (
                  <li key={c.id} className="border-b border-border pb-3 last:border-b-0">
                    {c.comingSoon ? (
                      <div className="flex items-baseline justify-between text-muted-foreground">
                        <span>{c.label}</span>
                        <span className="text-overline">Coming soon</span>
                      </div>
                    ) : (
                      <Link
                        to="/portfolio"
                        search={{ category: portfolioCategoryFor(c.id) }}
                        className="flex items-baseline justify-between transition-colors hover:text-olive"
                      >
                        {c.label}
                        <span className="text-overline text-muted-foreground">
                          {projectsCount(c.id)}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="rule" />
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <MaskedTitle lines={["Tell us what", "you're planning."]} className="text-3xl md:text-5xl" />
          <ArrowLink to="/contact">Book a consultation</ArrowLink>
        </div>
      </section>
    </>
  );
}

function projectsCount(id: string) {
  return String(availableProjects.filter((p) => p.category === id).length).padStart(2, "0");
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useReveal<HTMLLIElement>({ kind: "children", stagger: 0.06 });
  return (
    <li
      ref={ref}
      className={cn(
        "grid items-center gap-8 border-b border-border py-14 md:grid-cols-12 md:py-20",
        index % 2 === 1 && "md:[&>*:first-child]:order-2",
      )}
    >
      <EditorialImage
        src={service.image}
        alt={service.title}
        aspect="aspect-[4/3]"
        className="md:col-span-5"
      />
      <div className="md:col-span-6 md:col-start-7">
        <span className="text-overline text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <MaskedTitle lines={[service.title]} className="mt-3 text-4xl md:text-5xl" />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          {service.description}
        </p>
        <Link
          to="/portfolio"
          search={{ category: portfolioCategoryFor(service.id) }}
          className="group mt-8 inline-flex items-center gap-3 text-sm font-medium tracking-wide"
        >
          <span className="border-b border-foreground/40 pb-1 transition-colors group-hover:border-foreground">
            See this work
          </span>
        </Link>
      </div>
    </li>
  );
}
