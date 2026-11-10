import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ArrowLink, Overline } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { categoryLabel, getNextProject, getProject, type GalleryImage } from "@/data/projects";

export const Route = createFileRoute("/portfolio/$slug_")({
  beforeLoad: ({ params }) => {
    if (!getProject(params.slug)) throw notFound();
  },
  component: ProjectPage,
  head: ({ params }) => {
    const project = getProject(params.slug);
    return {
      meta: [
        { title: project ? `${project.title} — ARTHITECT` : "Project — ARTHITECT" },
        {
          name: "description",
          content: project?.intro ?? "A project by ARTHITECT.",
        },
        {
          property: "og:title",
          content: project ? `${project.title} — ARTHITECT` : "Project — ARTHITECT",
        },
        { property: "og:description", content: project?.intro ?? "A project by ARTHITECT." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) return null;
  const next = getNextProject(slug);

  return (
    <>
      {/* Full-bleed cover */}
      <section className="relative h-[86svh] min-h-[560px] overflow-hidden bg-ink">
        {project.coverVideo ? (
          <video
            src={project.coverVideo}
            aria-label={`${project.title} project film`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={project.cover}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transform: "scale(1.08)" }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-14 md:px-10 md:pb-20">
          <Overline className="mb-5 text-paper/70">
            {categoryLabel(project.category)} — {project.year}
          </Overline>
          <h1 className="display-hero max-w-5xl text-[12vw] text-paper md:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-paper/80 md:text-base">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Facts + intro */}
      <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <dl className="md:col-span-3">
            {[
              ["Year", project.year],
              ["Status", project.status],
              ["Discipline", categoryLabel(project.category)],
            ].map(([label, value]) => (
              <div key={label} className="border-t border-border py-4 last:border-b">
                <dt className="text-overline text-muted-foreground">{label}</dt>
                <dd className="mt-1 text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-8 md:col-start-5">
            <p className="display-title text-2xl leading-snug md:text-4xl">{project.intro}</p>
            <div className="mt-10 max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
        <GalleryImage
          media={project.gallery[0] ?? { src: project.cover, caption: project.title }}
          aspect="aspect-[16/9]"
          eager
        />
        <div className="mt-16 grid gap-x-[4vw] gap-y-16 md:grid-cols-2 md:mt-24">
          {project.gallery.slice(1).map((media, i) => (
            <GalleryImage
              key={media.src + String(i)}
              media={media}
              aspect={i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"}
            />
          ))}
        </div>
      </section>

      {/* Next project + CTA */}
      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="rule" />
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <Overline>Next project</Overline>
          <ArrowLink to={`/portfolio/${next.slug}`}>{next.title}</ArrowLink>
        </div>

        <div className="group relative overflow-hidden bg-ink">
          <Link
            to={`/portfolio/${next.slug}`}
            className="block"
            aria-label={`View next project: ${next.title}`}
          >
            {next.coverVideo ? (
              <video
                src={next.coverVideo}
                aria-label={`${next.title} project film`}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="img-editorial h-[42vh] min-h-[320px] opacity-80 transition-all duration-[1.4s] ease-out group-hover:scale-[1.04] group-hover:opacity-100 md:h-[56vh]"
              />
            ) : (
              <img
                src={next.cover}
                alt={next.title}
                loading="lazy"
                className="img-editorial h-[42vh] min-h-[320px] opacity-80 transition-all duration-[1.4s] ease-out group-hover:scale-[1.04] group-hover:opacity-100 md:h-[56vh]"
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper">
              <span className="text-overline text-paper/70">Continue viewing</span>
              <span className="display-title flex items-center gap-3 text-4xl md:text-6xl">
                {next.title}
                <ArrowUpRight className="size-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-10" />
              </span>
            </div>
          </Link>
        </div>

        <div className="mt-20 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="display-title text-3xl md:text-5xl">
            A project of your own
            <span className="italic"> in mind?</span>
          </h2>
          <ArrowLink to="/contact">Start the conversation</ArrowLink>
        </div>
      </section>
    </>
  );
}

function GalleryImage({
  media,
  aspect,
  eager,
}: {
  media: GalleryImage;
  aspect: string;
  eager?: boolean;
}) {
  const ref = useReveal<HTMLElement>({ kind: "clip" });
  return (
    <figure ref={ref}>
      <div className={`overflow-hidden bg-sand ${aspect}`}>
        {media.type === "video" ? (
          <video
            src={media.src}
            aria-label={media.caption}
            controls
            playsInline
            preload="metadata"
            className="img-editorial bg-ink"
          />
        ) : (
          <img
            src={media.src}
            alt={media.caption}
            loading={eager ? "eager" : "lazy"}
            className="img-editorial scale-[1.12] will-change-transform"
          />
        )}
      </div>
      {media.caption ? (
        <figcaption className="mt-3 flex items-baseline gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-px w-6 translate-y-[-3px] bg-border" />
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
