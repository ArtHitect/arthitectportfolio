import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, EditorialImage, MaskedTitle, Overline, PageHero } from "@/components/shared";
import { images } from "@/data/projects";
import { StudioHighlights } from "@/components/studio-highlights";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — ARTHITECT" },
      {
        name: "description",
        content:
          "An interior design and bespoke joinery studio serving projects across South Africa — craft, nature and restraint under one roof.",
      },
      { property: "og:title", content: "About — ARTHITECT" },
      {
        property: "og:description",
        content:
          "A studio of interior designers and makers — with our own joinery workshop at the centre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const VALUES = [
  {
    title: "Craft over spectacle",
    text: "We would rather perfect a shadow gap than chase a gesture. Detail is where a space earns its permanence.",
  },
  {
    title: "Local hands",
    text: "We work with South African makers, quarries and workshops, and fabricate what we can under our own roof.",
  },
  {
    title: "Climate as client",
    text: "Sun, wind and light are treated as brief-givers, not obstacles — a house should feel alive through the day.",
  },
  {
    title: "Long relationships",
    text: "Most of our work comes from past clients and their families. We design for decades, not for photographs.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        overline="About the studio"
        lines={["Designers,", "makers", "and material thinkers."]}
        lead="ARTHITECT is an interior design and making studio serving projects across South Africa, with our own joinery workshop at the centre of the practice."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-24 md:px-10">
        <EditorialImage
          src={images.heroInterior}
          alt="A completed ARTHITECT interior in warm natural materials"
          caption="Interior — clay plaster, oak and stone"
          aspect="aspect-[16/9]"
          eager
        />
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-36">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <Overline>The story</Overline>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <div className="max-w-2xl space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p className="display-title text-foreground text-2xl leading-snug md:text-3xl">
                The studio was founded on a simple observation: the spaces people love most are the
                ones their hands already know.
              </p>
              <p>
                The studio keeps refining that idea — drawing from the geometry of African craft,
                working with clay, stone and timber, and keeping the making of a project close to
                its design.
              </p>
              <p>
                Today the studio designs considered interiors and fabricates kitchens, wardrobes and
                joinery in its own workshop — so the details are carefully resolved from first
                sketch to final installation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <StudioHighlights />

      <section className="mx-auto max-w-[1600px] px-6 pb-28 md:px-10 md:pb-36">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <EditorialImage
            src={images.aboutStudio}
            alt="Inside the ARTHITECT joinery workshop"
            caption="The workshop — where drawings become objects"
            aspect="aspect-[4/5]"
            className="md:col-span-6"
          />
          <div className="md:col-span-5 md:col-start-8">
            <Overline className="mb-6">What we believe</Overline>
            <ul className="flex flex-col gap-8">
              {VALUES.map((value) => (
                <li key={value.title} className="border-b border-border pb-8 last:border-b-0">
                  <h3 className="display-title text-2xl md:text-3xl">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-sand/50">
        <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <Overline className="mb-6">Work with us</Overline>
              <MaskedTitle lines={["Come and", "talk to us."]} className="text-3xl md:text-5xl" />
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                We take on a limited number of commissions each year so that every project keeps the
                principals' hands on it. The first conversation costs nothing but an hour.
              </p>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <ArrowLink to="/contact" className="text-base">
                Book a consultation
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
