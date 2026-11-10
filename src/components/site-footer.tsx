import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { MaskedTitle, Overline } from "@/components/shared";
import { CATEGORIES } from "@/data/projects";
import { contactDetails } from "@/data/contact";

const STUDIO_LINKS = [
  { label: "About", to: "/about" },
  { label: "Philosophy", to: "/philosophy" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="rule border-paper/15" />
        <div className="grid gap-14 py-16 md:grid-cols-12 md:gap-8 md:py-24">
          <div className="md:col-span-5">
            <Overline className="mb-6 text-paper/50">Start a project</Overline>
            <MaskedTitle
              lines={["Let's shape", "something", "timeless."]}
              className="text-4xl text-paper md:text-5xl"
            />
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-3 text-sm font-medium tracking-wide text-paper"
            >
              <span className="border-b border-paper/40 pb-1 transition-colors group-hover:border-paper">
                Book a consultation
              </span>
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <Overline className="mb-6 text-paper/50">Studio</Overline>
            <ul className="flex flex-col gap-3 text-sm text-paper/75">
              {STUDIO_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <Overline className="mb-6 text-paper/50">Work</Overline>
            <ul className="flex flex-col gap-3 text-sm text-paper/75">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  {c.comingSoon ? (
                    <span className="text-paper/50">{c.label} — Coming soon</span>
                  ) : (
                    <Link
                      to="/portfolio"
                      search={{ category: c.id }}
                      className="transition-colors hover:text-paper"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <Overline className="mb-6 text-paper/50">Contact</Overline>
            <ul className="flex flex-col gap-3 text-sm text-paper/75">
              <li>
                <a href={`mailto:${contactDetails.email}`} className="transition-colors hover:text-paper">
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <a href={contactDetails.phoneHref} className="transition-colors hover:text-paper">
                  {contactDetails.phone}
                </a>
              </li>
              <li>
                <a href={contactDetails.whatsappHref} target="_blank" rel="noreferrer" className="transition-colors hover:text-paper">
                  WhatsApp us
                </a>
              </li>
              <li className="text-paper/50">{contactDetails.serviceArea}. {contactDetails.showroom}.</li>
              <li>
                <Link to="/legal" className="transition-colors hover:text-paper">
                  Legal Centre
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule border-paper/15" />
        <div className="flex flex-col gap-3 py-8 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} ARTHITECT. All rights reserved.</span>
          <span>Interiors · Kitchens · Bespoke joinery — South Africa</span>
        </div>

        <div className="overflow-hidden pb-6" aria-hidden>
          <div className="display-title translate-y-[0.18em] text-center text-[18vw] leading-none text-paper/10">
            ARTHITECT
          </div>
        </div>
      </div>
    </footer>
  );
}
