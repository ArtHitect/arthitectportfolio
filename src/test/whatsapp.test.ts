import { describe, expect, it } from "vitest";

import { buildWhatsAppEnquiryUrl } from "@/lib/whatsapp";

describe("WhatsApp enquiry URL", () => {
  it("includes the submitted project details in a prefilled message", () => {
    const url = new URL(
      buildWhatsAppEnquiryUrl({
        name: "Alex Example",
        email: "alex@example.com",
        phone: "+27 82 123 4567",
        location: "Cape Town",
        service: "Interior design",
        message: "We are renovating our living room.",
      }),
    );

    expect(url.origin + url.pathname).toBe("https://wa.me/27685221140");
    expect(url.searchParams.get("text")).toBe(
      [
        "Hello ARTHITECT, I'd like to enquire about a project.",
        "",
        "Name: Alex Example",
        "Email: alex@example.com",
        "Phone: +27 82 123 4567",
        "Project location: Cape Town",
        "Service: Interior design",
        "",
        "Project details:",
        "We are renovating our living room.",
      ].join("\n"),
    );
  });

  it("omits optional phone and location fields when they are blank", () => {
    const url = new URL(
      buildWhatsAppEnquiryUrl({
        name: "Alex Example",
        email: "alex@example.com",
        phone: "",
        location: "",
        service: "Not sure yet",
        message: "Please contact me.",
      }),
    );
    const message = url.searchParams.get("text") ?? "";

    expect(message).not.toContain("Phone:");
    expect(message).not.toContain("Project location:");
  });
});
