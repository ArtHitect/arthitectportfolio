import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLink, Overline } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import {
  availableProjects,
  CATEGORIES,
  categoryLabel,
  type CategoryId,
  type Project,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type Search = { category?: string };

export const Route = createFileRoute("/portfolio")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Portfolio — ARTHITECT" },
      {
        name: "description",
        content:
          "Explore interiors, kitchens, wardrobes, living spaces, bespoke joinery and 3D visualisation projects.",
      },
      { property: "og:title", content: "Portfolio — ARTHITECT" },
      {
        property: "og:description",
        content:
          "Interiors, kitchens, wardrobes, living spaces, joinery and visualisation — explore the ARTHITECT portfolio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function PortfolioPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { category } = Route.useSearch();
  const navigate = useNavigate();
  const selectedCategory = CATEGORIES.find((c) => c.id === category);
  const active = selectedCategory && !selectedCategory.comingSoon ? (category as CategoryId) : null;

  const filtered = useMemo(
    () => (active ? availableProjects.filter((p) => p.category === active) : availableProjects),
    [active],
  );

  if (pathname !== "/portfolio" && pathname !== "/portfolio/") return <Outlet />;

  const setFilter = (id: CategoryId | null) => {
    void navigate({ to: "/portfolio", search: { category: id ?? undefined }, replace: true });
  };

  return (
    <>
      <header className="mx-auto max-w-[1600px] px-6 pt-36 pb-10 md:px-10 md:pt-48">
        <Overline className="mb-6">Portfolio</Overline>
        <h1 className="display-hero text-[13vw] leading-[0.95] md:text-7xl lg:text-8xl">
          Built and
          <span className="italic"> imagined.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Interiors and crafted objects — presented large, the way they are experienced. Filter by
          discipline. Architecture is coming soon.
        </p>

        <div className="mt-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          <FilterChip
            label="All"
            active={selectedCategory === undefined}
            onClick={() => setFilter(null)}
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              label={c.comingSoon ? `${c.label} · Coming soon` : c.label}
              active={selectedCategory?.id === c.id}
              onClick={() => setFilter(c.id)}
            />
          ))}
        </div>
        <div className="rule mt-10" />
      </header>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        {!selectedCategory?.comingSoon ? (
          <div key={active ?? "all"} className="space-y-24 md:space-y-40">
            {filtered.map((project, i) => (
              <ProjectSpread key={project.slug} project={project} index={i} />
            ))}
          </div>
        ) : null}
        {selectedCategory?.comingSoon ? (
          <div className="mx-auto max-w-2xl py-20 text-center">
            <Overline className="mb-4">Coming soon</Overline>
            <h2 className="display-title text-3xl md:text-4xl">Architecture is on its way.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              For now, explore our interiors, kitchens, wardrobes, bespoke joinery and 3D
              visualisation work.
            </p>
            <button
              type="button"
              onClick={() => setFilter(null)}
              className="mt-7 border-b border-foreground/40 pb-1 text-sm font-medium hover:border-foreground"
            >
              Explore all current work
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No projects in this category yet — placeholder.
          </p>
        ) : null}
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="rule" />
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <h2 className="display-title text-3xl md:text-5xl">Have a site in mind?</h2>
          <ArrowLink to="/contact">Start the conversation</ArrowLink>
        </div>
      </section>
    </>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300",
        active
          ? "border-foreground bg-foreground text-primary-foreground"
          : "border-border bg-transparent text-muted-foreground hover:border-foreground/50 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function ProjectSpread({ project, index }: { project: Project; index: number }) {
  const imageRef = useReveal<HTMLElement>({ kind: "clip" });
  const copyRef = useReveal<HTMLDivElement>({ kind: "children", stagger: 0.1, start: "top 78%" });
  const detailsRef = useReveal<HTMLDivElement>({
    kind: "children",
    stagger: 0.14,
    start: "top 82%",
  });
  const imageCaption = project.coverVideoCaption ?? project.gallery[0]?.caption;
  const previewImages = project.coverVideo
    ? project.gallery.slice(0, 2)
    : project.gallery.slice(1, 3);

  return (
    <article className={cn(index % 2 === 1 && "md:ml-[8.333%]")}>
      <figure ref={imageRef} className="group relative overflow-hidden bg-ink">
        <Link
          to={`/portfolio/${project.slug}`}
          className="relative block aspect-[4/5] overflow-hidden md:aspect-[16/9]"
          aria-label={`${project.title}. ${project.tagline} View project details.`}
        >
          {project.coverVideo ? (
            <video
              src={project.coverVideo}
              aria-label={`${project.title} project film`}
              autoPlay
              muted
              loop
              playsInline
              preload={index === 0 ? "metadata" : "none"}
              className="img-editorial absolute inset-0 size-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <img
              src={project.cover}
              alt={project.title}
              loading={index === 0 ? "eager" : "lazy"}
              className="img-editorial absolute inset-0 size-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/5 transition-colors duration-500 group-hover:from-ink/95" />
          <div
            ref={copyRef}
            className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 text-paper sm:p-9 md:gap-7 md:p-12 lg:p-16"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Overline className="text-paper/80">
                {String(index + 1).padStart(2, "0")} / {categoryLabel(project.category)}
              </Overline>
              <span className="text-paper/50" aria-hidden="true">
                ·
              </span>
              <span className="text-xs text-paper/80">{project.year}</span>
              {imageCaption ? (
                <>
                  <span className="text-paper/50" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs text-paper/80">{imageCaption}</span>
                </>
              ) : null}
            </div>
            <div className="grid gap-3 md:grid-cols-12 md:items-end md:gap-8">
              <h2 className="display-title text-4xl leading-[0.98] sm:text-5xl md:col-span-7 md:text-6xl lg:text-7xl">
                {project.title}
              </h2>
              <p className="display-title max-w-xl text-lg leading-snug text-paper/85 sm:text-xl md:col-span-5 md:justify-self-end md:text-right lg:text-2xl">
                {project.tagline}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-paper/30 pt-3 text-xs text-paper/80 sm:text-sm">
              <span>{project.status}</span>
            </div>
          </div>
        </Link>
      </figure>
      {previewImages.length > 0 ? (
        <div
          ref={detailsRef}
          className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-border pt-5 sm:gap-x-6 md:mt-7 md:grid-cols-12 md:gap-x-6 md:pt-7"
        >
          <div className="col-span-2 mb-1 flex items-start justify-between gap-6 md:col-span-3 md:mb-0 md:flex-col md:justify-start">
            <div>
              <Overline className="text-muted-foreground">A closer look</Overline>
              <p className="display-title mt-2 max-w-[15rem] text-xl leading-tight sm:text-2xl">
                Details that make the space.
              </p>
            </div>
            <span className="pt-1 text-xs tabular-nums text-muted-foreground md:pt-0">
              02 / {String(previewImages.length).padStart(2, "0")}
            </span>
          </div>
          {previewImages.map((image, imageIndex) => (
            <figure key={image.src + image.caption} className="group min-w-0 md:col-span-4">
              {image.type === "video" ? (
                <div className="overflow-hidden bg-sand">
                  <video
                    src={image.src}
                    aria-label={image.caption}
                    controls
                    playsInline
                    preload="metadata"
                    className="img-editorial aspect-[4/3] bg-ink"
                  />
                </div>
              ) : (
                <Link
                  to={`/portfolio/${project.slug}`}
                  aria-label={`View ${image.caption} from ${project.title}`}
                  className="block"
                >
                  <div className="overflow-hidden bg-sand">
                    <img
                      src={image.src}
                      alt={image.caption}
                      loading="lazy"
                      className="img-editorial aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </Link>
              )}
              <figcaption className="mt-3 flex items-baseline gap-3">
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  0{imageIndex + 1}
                </span>
                <Link
                  to={`/portfolio/${project.slug}`}
                  className="display-title text-lg sm:text-xl"
                >
                  {image.caption}
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </article>
  );
}
