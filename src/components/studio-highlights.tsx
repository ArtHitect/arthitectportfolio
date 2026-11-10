import { useReveal } from "@/hooks/use-gsap-reveal";
import { MaskedTitle, Overline } from "@/components/shared";

const HIGHLIGHTS = [
  {
    number: "01",
    title: "Considered interiors",
    description:
      "Thoughtful spatial planning, natural materials and refined details, shaped around the way you live.",
  },
  {
    number: "02",
    title: "Joinery with Done Deal",
    description:
      "A joinery collaboration with Done Deal brings made-to-measure cabinetry and considered detailing to each project.",
  },
  {
    number: "03",
    title: "Blum hardware",
    description:
      "We work with Blum hardware, selected to bring precise, reliable movement to kitchens, wardrobes and bespoke joinery.",
  },
];

export function StudioHighlights() {
  const listRef = useReveal<HTMLUListElement>({ kind: "children", stagger: 0.1 });

  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
        <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Overline className="mb-5">What sets the work apart</Overline>
            <MaskedTitle
              lines={["Thoughtful by design.", "Considered in every detail."]}
              className="text-3xl md:text-5xl"
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-base">
            A hands-on design approach, supported by trusted collaborators and carefully chosen
            materials and hardware.
          </p>
        </div>

        <ul ref={listRef} className="grid gap-8 md:grid-cols-3 md:gap-10">
          {HIGHLIGHTS.map((highlight) => (
            <li key={highlight.number} className="border-t border-border pt-5">
              <span className="text-overline text-muted-foreground">{highlight.number}</span>
              <h3 className="display-title mt-5 text-2xl md:text-3xl">{highlight.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {highlight.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
