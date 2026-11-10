/*
 * Legal Centre — editable placeholder content.
 * Replace every section below with final legal text, company details and
 * registration information once supplied.
 */

export interface LegalSection {
  heading: string;
  body: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How ARTHITECT collects, uses and safeguards your personal information.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "When you enquire about our services we collect the information you provide directly — your name, contact details and anything you choose to tell us about your project.",
        ],
      },
      {
        heading: "How we use your information",
        body: [
          "We use your information solely to respond to enquiries, prepare proposals, deliver our services and comply with our legal obligations. We do not sell personal information.",
        ],
      },
      {
        heading: "Your rights",
        body: ["You may request access to, correction of, or deletion of your personal information at any time."],
      },
    ],
  },
  {
    slug: "popia-notice",
    title: "POPIA Notice",
    summary: "Our processing of personal information under the Protection of Personal Information Act.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Responsible party",
        body: [
          "ARTHITECT is the responsible party for the processing of personal information described in this notice, as contemplated in the Protection of Personal Information Act, 2013.",
        ],
      },
      {
        heading: "Purpose of processing",
        body: ["We process personal information for the purposes set out in this notice, including:"],
        list: [
          "Responding to project enquiries and preparing proposals.",
          "Contract administration, invoicing and payment.",
          "Marketing communications, where you have opted in.",
        ],
      },
      {
        heading: "Information officer",
        body: [
          "Our Information Officer can be contacted regarding any POPIA matter. Contact details will be published here once finalised.",
        ],
      },
    ],
  },
  {
    slug: "paia-manual",
    title: "PAIA Manual",
    summary: "Manual in terms of Section 51 of the Promotion of Access to Information Act.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Purpose of this manual",
        body: [
          "This manual describes the categories of records held by ARTHITECT and the process for requesting access to them under the Promotion of Access to Information Act, 2000.",
        ],
      },
      {
        heading: "Categories of records",
        body: ["We hold the following categories of records:"],
        list: [
          "Company records — registration, statutory and financial records.",
          "Client and project records — briefs, agreements, drawings and correspondence.",
          "Employment records and operational records.",
        ],
      },
      {
        heading: "Request procedure",
        body: [
          "Requests must be made on the prescribed form to our Information Officer. We will respond within the statutory period. Request forms and fees will be published once finalised.",
        ],
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    summary: "How this website uses cookies and similar technologies.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "What we use",
        body: [
          "This website uses only essential cookies required for its operation. No advertising or third-party tracking cookies are set.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You may clear or block cookies through your browser settings. Blocking essential cookies may affect how the website functions.",
        ],
      },
    ],
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    summary: "The terms governing your use of this website.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Use of the website",
        body: [
          "By using this website you agree to these terms. The website and its content are provided for information about ARTHITECT and our services.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All content on this website — including imagery, text and design — is owned by or licensed to ARTHITECT and may not be reproduced without written permission.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "We take reasonable care to keep website information current, but we do not warrant its completeness and accept no liability for reliance placed on it.",
        ],
      },
    ],
  },
  {
    slug: "design-service-terms",
    title: "Design Service Terms",
    summary: "The terms on which we provide interior design and bespoke joinery services.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Engagement",
        body: [
          "Services are engaged by written agreement. Each agreement defines scope, stages, fees, timelines and deliverables for the specific project.",
        ],
      },
      {
        heading: "Stages of work",
        body: [
          "Our services typically follow the stages set out in our Process page — consultation, concept, design development, documentation and realisation.",
        ],
      },
      {
        heading: "Client responsibilities",
        body: [
          "Timely decisions, access to the site and prompt payment of fees keep a project on programme. We will advise you of any delay these cause.",
        ],
      },
    ],
  },
  {
    slug: "consultation-policy",
    title: "Consultation Policy",
    summary: "Booking, rescheduling and fees for design consultations.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Booking a consultation",
        body: [
          "Initial consultations are arranged through our Contact page or by telephone. Where travel beyond our service area is required, a call-out fee may apply.",
        ],
      },
      {
        heading: "Rescheduling and cancellation",
        body: [
          "Consultations may be rescheduled once, subject to 48 hours' notice. Missed consultations without notice may forfeit the consultation fee.",
        ],
      },
    ],
  },
  {
    slug: "payment-policy",
    title: "Payment Policy",
    summary: "Fee structures, invoicing and payment terms.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Fees",
        body: [
          "Fees are quoted per project stage, as either fixed amounts or percentages of construction cost, as set out in your service agreement.",
        ],
      },
      {
        heading: "Invoicing and terms",
        body: ["Invoices are issued at the commencement of each stage and are payable within the period stated on the invoice."],
        list: [
          "A deposit is required before design work begins.",
          "Fabrication deposits are invoiced separately before workshop production.",
        ],
      },
    ],
  },
  {
    slug: "intellectual-property-policy",
    title: "Intellectual Property Policy",
    summary: "Ownership and permitted use of designs, drawings and imagery.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Our rights",
        body: [
          "All designs, drawings, models, renders and documents produced by ARTHITECT remain our intellectual property, licensed to you for the specific project in your agreement.",
        ],
      },
      {
        heading: "Portfolio use",
        body: [
          "We reserve the right to photograph completed work and publish it in our portfolio, unless your agreement provides otherwise.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    summary: "General disclaimer regarding website content and imagery.",
    updated: "Placeholder — to be finalised",
    sections: [
      {
        heading: "Website content",
        body: [
          "Content on this website is provided for general information only and does not constitute professional advice for any specific project.",
        ],
      },
      {
        heading: "Imagery",
        body: [
          "Some imagery on this website is illustrative or conceptual, including 3D visualisations of unbuilt work. Completed projects are depicted as built at the time of photography.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
