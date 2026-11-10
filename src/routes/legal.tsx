import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { MaskedTitle, Overline, PageHero } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { legalDocs } from "@/data/legal";

export const Route = createFileRoute("/legal")({
  component: LegalIndexPage,
  head: () => ({
    meta: [
      { title: "Legal Centre — ARTHITECT" },
      {
        name: "description",
        content:
          "Policies and legal notices — privacy, POPIA, PAIA, cookies, terms of use, service terms, consultation and payment policies.",
      },
      { property: "og:title", content: "Legal Centre — ARTHITECT" },
      {
        property: "og:description",
        content: "Privacy, POPIA, PAIA, cookies, terms and service policies — all in one place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function LegalIndexPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <>
      {pathname === "/legal" ? (
        <>
          <PageHero
            overline="Legal Centre"
            lines={["Policies and", "notices."]}
            lead="Everything we and you are agreeing to, in plain sight. All documents are editable placeholders until finalised."
          />

          <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
            <div className="rule" />
            <ul>
              {legalDocs.map((doc) => (
                <LegalRow key={doc.slug} doc={doc} />
              ))}
            </ul>
          </section>
        </>
      ) : null}
      <Outlet />
    </>
  );
}

function LegalRow({ doc }: { doc: (typeof legalDocs)[number] }) {
  const ref = useReveal<HTMLLIElement>({ kind: "up" });
  return (
    <li ref={ref} className="border-b border-border">
      <Link
        to="/legal/$slug"
        params={{ slug: doc.slug }}
        className="group grid grid-cols-1 items-baseline gap-2 py-8 md:grid-cols-12 md:gap-6 md:py-10"
      >
        <h2 className="display-title text-2xl transition-colors group-hover:text-olive md:col-span-5 md:text-3xl">
          {doc.title}
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:col-span-6">
          {doc.summary}
        </p>
        <span className="hidden justify-self-end text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:col-span-1 md:block">
          <ArrowUpRight className="size-5" />
        </span>
      </Link>
    </li>
  );
}
