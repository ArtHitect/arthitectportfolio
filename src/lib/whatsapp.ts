import { contactDetails } from "@/data/contact";

export interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message: string;
}

export function buildWhatsAppEnquiryUrl(enquiry: EnquiryDetails) {
  const lines = [
    "Hello ARTHITECT, I'd like to enquire about a project.",
    "",
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : undefined,
    enquiry.location ? `Project location: ${enquiry.location}` : undefined,
    `Service: ${enquiry.service}`,
    "",
    "Project details:",
    enquiry.message,
  ].filter((line): line is string => line !== undefined);

  const url = new URL(contactDetails.whatsappHref);
  url.searchParams.set("text", lines.join("\n"));
  return url.toString();
}
