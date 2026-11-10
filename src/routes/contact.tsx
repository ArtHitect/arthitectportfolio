import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLink, MaskedTitle, Overline, PageHero } from "@/components/shared";
import { useReveal } from "@/hooks/use-gsap-reveal";
import { cn } from "@/lib/utils";
import { contactDetails } from "@/data/contact";
import { buildWhatsAppEnquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — ARTHITECT" },
      {
        name: "description",
        content:
          "Start a conversation about interior design, kitchens, wardrobes, bespoke joinery or 3D visualisation projects anywhere in South Africa.",
      },
      { property: "og:title", content: "Contact — ARTHITECT" },
      {
        property: "og:description",
        content: "Every project begins with a conversation. Book a consultation with the studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const SERVICE_OPTIONS = [
  "Interior design",
  "Kitchen",
  "Wardrobe / dressing room",
  "Bespoke joinery",
  "3D visualisation",
  "Not sure yet",
];

function ContactPage() {
  return (
    <>
      <PageHero
        overline="Contact"
        lines={["Every project begins", "with a conversation."]}
        lead="Tell us about your site, your family or your idea — however early it is. We reply within two working days."
      />

      <section className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <div className="grid gap-16 md:grid-cols-12">
          {/* Details */}
          <div className="md:col-span-4">
            <Overline className="mb-6">The studio</Overline>
            <ul className="flex flex-col gap-5 text-sm">
              <li>
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="display-title text-2xl transition-colors hover:text-olive"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.phoneHref}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {contactDetails.phone}
                </a>
              </li>
              <li>
                <a
                  href={contactDetails.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Message us on WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 text-sm">
              <div>
                <p className="text-overline text-muted-foreground">Where we work</p>
                <p className="mt-1 text-muted-foreground">{contactDetails.serviceArea}.</p>
                <p className="mt-2 text-muted-foreground">{contactDetails.showroom}.</p>
              </div>
            </div>

            <ArrowLink to="/portfolio" className="mt-10">
              See the work first
            </ArrowLink>
          </div>

          {/* Form */}
          <div className="md:col-span-7 md:col-start-6">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

function EnquiryForm() {
  const ref = useReveal<HTMLDivElement>({ kind: "children", stagger: 0.05 });
  const [sent, setSent] = useState(false);
  const [service, setService] = useState<string>(SERVICE_OPTIONS[0]);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const enquiry = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      service,
      message: String(formData.get("message") ?? "").trim(),
    };
    const url = buildWhatsAppEnquiryUrl(enquiry);
    const whatsappWindow = window.open(url, "_blank");

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      setWhatsappUrl(url);
      setSent(true);
      return;
    }

    window.location.assign(url);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-start justify-center border border-border bg-sand/40 p-10 md:p-16">
        <Overline className="mb-6">WhatsApp is ready</Overline>
        <MaskedTitle lines={["One last", "step."]} className="text-3xl md:text-5xl" />
        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          Your enquiry is waiting in WhatsApp. Review the message and press Send to deliver it to
          the studio.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-olive"
        >
          Open WhatsApp
        </a>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setWhatsappUrl("");
          }}
          className="mt-8 text-sm font-medium underline underline-offset-4 transition-colors hover:text-olive"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className="flex flex-col gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your full name" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" placeholder="+27 (0)… optional" />
        <Field
          label="Location of project"
          name="location"
          placeholder="City or town, e.g. Constantia"
        />
      </div>

      <fieldset>
        <legend className="text-overline mb-4 text-muted-foreground">What do you need?</legend>
        <div className="flex flex-wrap gap-2.5">
          {SERVICE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setService(option)}
              aria-pressed={service === option}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium tracking-wide transition-all duration-300",
                service === option
                  ? "border-foreground bg-foreground text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-3">
        <span className="text-overline text-muted-foreground">About the project</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="The site, the family, the timeline — anything that helps us listen."
          className="w-full resize-none border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
        />
      </label>

      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground transition-colors hover:bg-olive"
        >
          Continue to WhatsApp
        </button>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
          WhatsApp will open with your enquiry filled in. You’ll need to press Send in WhatsApp to
          deliver it.{" "}
          <a href={`mailto:${contactDetails.email}`} className="underline underline-offset-2">
            Or email us instead
          </a>
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-overline text-muted-foreground">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground"
      />
    </label>
  );
}
