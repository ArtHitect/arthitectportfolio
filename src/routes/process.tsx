import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, EditorialImage, MaskedTitle, Overline, PageHero } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { images, processSteps } from "@/data/projects";

export const Route = createFileRoute("/process")({
  component: ProcessPage,
  head: () => ({
    meta: [
      { title: "Process — ARTHITECT" },
      {
        name: "description",
        content:
          "From the first conversation to the last shadow gap — interior design, bespoke joinery, material selection and installation.",
      },
      { property: "og:title", content: "Process — ARTHITECT" },
      {
        property: "og:description",
        content:
          "Five stages from first conversation to final installation — the detail is the design.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function ProcessPage() {
  return (
    <>
      <PageHero
        overline="Process"
        lines={["From conversation", "to last shadow gap."]}
        lead="A project moves through five deliberate stages. Nothing is rushed, nothing skipped — the detail is the design."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
        <EditorialImage
          src={images.aboutStudio}
          alt="The studio — drawings, models and material samples"
          caption="Studio — models, samples and drawings in progress"
          aspect="aspect-[16/9]"
          eager
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="rule" />
        <ol>
          {processSteps.map((step, i) => (
            <li key={step.number}>
              <ProcessStep step={step} index={i} />
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <Overline className="mb-6">Timelines</Overline>
            <MaskedTitle
              lines={["Slow is smooth,", "smooth is fast."]}
              className="text-3xl md:text-5xl"
            />
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Interior design timelines depend on the scope and scale of each project; a
              bespoke joinery commission typically takes six to sixteen weeks in the workshop.
              We agree a realistic programme at the outset and keep you informed at every stage.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <ArrowLink to="/contact" className="text-base">
              Start stage one
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

function ProcessStep({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  const ref = useReveal<HTMLDivElement>({ kind: "children", stagger: 0.07 });
  return (
    <div
      ref={ref}
      className="grid gap-6 border-b border-border py-12 md:grid-cols-12 md:gap-10 md:py-16"
    >
      <span
        className={
          index % 2 === 0
            ? "display-title text-clay text-6xl md:col-span-2 md:text-7xl"
            : "display-title text-clay text-6xl md:col-span-2 md:col-start-11 md:text-7xl"
        }
      >
        {step.number}
      </span>
      <div
        className={
          index % 2 === 0
            ? "md:col-span-4 md:col-start-4"
            : "md:col-span-4 md:col-start-5"
        }
      >
        <MaskedTitle lines={[step.title]} className="text-3xl md:text-4xl" />
      </div>
      <p
        className={
          index % 2 === 0
            ? "max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8 md:text-base"
            : "max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-5 md:col-start-9 md:text-base"
        }
      >
        {step.description}
      </p>
    </div>
  );
}
