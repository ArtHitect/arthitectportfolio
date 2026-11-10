import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArrowLink, Overline } from "@/components/shared";
import { getLegalDoc, legalDocs } from "@/data/legal";

export const Route = createFileRoute("/legal/$slug_")({
  beforeLoad: ({ params }) => {
    if (!getLegalDoc(params.slug)) throw notFound();
  },
  component: LegalDocPage,
  head: ({ params }) => {
    const doc = getLegalDoc(params.slug);
    return {
      meta: [
        { title: doc ? `${doc.title} — ARTHITECT` : "Legal — ARTHITECT" },
        { name: "description", content: doc?.summary ?? "ARTHITECT legal document." },
        { property: "og:title", content: doc ? `${doc.title} — ARTHITECT` : "Legal — ARTHITECT" },
        { property: "og:description", content: doc?.summary ?? "ARTHITECT legal document." },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
});

function LegalDocPage() {
  const { slug } = Route.useParams();
  const doc = getLegalDoc(slug);
  if (!doc) return null;

  return (
    <>
      <header className="mx-auto max-w-4xl px-6 pt-36 pb-14 md:px-10 md:pt-48">
        <Link
          to="/legal"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Legal Centre
        </Link>
        <Overline className="mt-10 mb-5">Legal</Overline>
        <h1 className="display-hero text-4xl leading-tight md:text-6xl">{doc.title}</h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {doc.summary}
        </p>
        <p className="mt-4 text-overline text-muted-foreground/70">{doc.updated}</p>
        <div className="rule mt-12" />
      </header>

      <article className="mx-auto max-w-4xl px-6 pb-32 md:px-10">
        <div className="flex flex-col gap-12">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="display-title text-2xl md:text-3xl">{section.heading}</h2>
              <div className="mt-5 flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul className="flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[0.65em] block h-px w-4 shrink-0 bg-border" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </section>
          ))}
        </div>

        <div className="rule mt-16" />
        <div className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between">
          <h2 className="display-title text-2xl md:text-3xl">Questions about this policy?</h2>
          <ArrowLink to="/contact">Contact the studio</ArrowLink>
        </div>

        <nav aria-label="Other legal documents" className="mt-4 flex flex-col gap-3 text-sm">
          {legalDocs
            .filter((d) => d.slug !== doc.slug)
            .map((d) => (
              <Link
                key={d.slug}
                to="/legal/$slug"
                params={{ slug: d.slug }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {d.title}
              </Link>
            ))}
        </nav>
      </article>
    </>
  );
}
