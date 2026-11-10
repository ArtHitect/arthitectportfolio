import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { legalDocs } from "@/data/legal";
import { availableProjects, getProject } from "@/data/projects";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it.each([
    "/",
    "/about",
    "/philosophy",
    "/portfolio",
    "/services",
    "/process",
    "/contact",
    "/legal",
    "/portfolio/karoo-house",
    "/legal/privacy-policy",
  ])("matches %s instead of falling back to not found", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(legalDocs.map((doc) => [doc.title, doc.slug]))(
    "builds a valid URL for the %s document",
    (_title, slug) => {
      const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

      const location = router.buildLocation({
        to: "/legal/$slug",
        params: { slug },
      });

      expect(location.href).toBe(`/legal/${slug}`);
      expect(location.href).not.toContain("undefined");
    },
  );

  it("matches the legal document child route with its slug parameter", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const matches = router.matchRoutes("/legal/terms-of-use");

    expect(matches.at(-1)?.routeId).toBe("/legal/$slug_");
    expect(matches.at(-1)?.params.slug).toBe("terms-of-use");
  });

  it("keeps architecture projects out of the active portfolio while marked coming soon", () => {
    expect(availableProjects.every((project) => project.category !== "architecture")).toBe(true);
    expect(getProject("karoo-house")).toBeUndefined();
  });
});
