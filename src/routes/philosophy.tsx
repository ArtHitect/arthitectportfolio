import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, EditorialImage, MaskedTitle, Overline, PageHero } from "@/components/shared";
import { images } from "@/data/projects";

export const Route = createFileRoute("/philosophy")({
  component: PhilosophyPage,
  head: () => ({
    meta: [
      { title: "Philosophy — ARTHITECT" },
      {
        name: "description",
        content:
          "Culture, nature and simplicity — the three principles behind every ARTHITECT space.",
      },
      { property: "og:title", content: "Philosophy — ARTHITECT" },
      {
        property: "og:description",
        content: "Culture, nature and simplicity — the three principles behind every ARTHITECT space.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PILLARS = [
  {
    id: "culture",
    title: "Culture",
    image: images.aboutStudio,
    caption: "Studio — craft and conversation",
    text: "Our geometry borrows from African pattern-making: screens, thresholds and proportions that carry meaning beyond decoration. We collaborate with local makers and honour the hand in every detail.",
  },
  {
    id: "nature",
    title: "Nature",
    image: images.workLiving,
    caption: "Living pavilion — the bushveld as room",
    text: "We design with climate, not against it. Sun paths, prevailing winds and the movement of light shape our plans, so a house feels alive through the day and the seasons.",
  },
  {
    id: "simplicity",
    title: "Simplicity",
    image: images.heroInterior,
    caption: "Interior — restraint and warmth",
    text: "A restrained palette of clay plaster, oak, stone and linen lets light and proportion do the talking. Simplicity here is not absence — it is everything, resolved.",
  },
];

function PhilosophyPage() {
  return (
    <>
      <PageHero
        overline="Philosophy"
        lines={["Culture, nature", "and simplicity."]}
        lead="Three principles guide every space we shape — and every material we choose to shape it with."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
        <EditorialImage
          src={images.philosophyNature}
          alt="Courtyard with clay wall and carved opening"
          caption="The courtyard as mediator between house and landscape"
          aspect="aspect-[16/9]"
          eager
        />
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-28 text-center md:px-10 md:pb-40">
        <blockquote className="display-title text-3xl md:text-5xl">
          “A space is finished not when nothing more can be added, but when nothing
          meaningful remains to be taken away.”
        </blockquote>
        <p className="mt-8 text-overline text-muted-foreground">Studio principle — placeholder</p>
      </section>

      {PILLARS.map((pillar, i) => (
        <section key={pillar.id} className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-40">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <EditorialImage
              src={pillar.image}
              alt={pillar.title}
              caption={pillar.caption}
              aspect="aspect-[4/3]"
              className={i % 2 === 1 ? "md:col-span-6 md:col-start-7" : "md:col-span-6"}
            />
            <div className={i % 2 === 1 ? "md:col-span-5 md:col-start-1 md:row-start-1" : "md:col-span-5 md:col-start-8"}>
              <span className="display-title text-clay text-2xl">{`0${i + 1}`}</span>
              <MaskedTitle lines={[pillar.title]} className="mt-3 text-4xl md:text-5xl" />
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                {pillar.text}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="rule" />
        <div className="flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
          <MaskedTitle lines={["See the philosophy", "built."]} className="text-3xl md:text-5xl" />
          <ArrowLink to="/portfolio">Explore the portfolio</ArrowLink>
        </div>
      </section>
    </>
  );
}
