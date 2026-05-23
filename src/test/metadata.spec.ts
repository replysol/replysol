import { describe, expect, it } from "@jest/globals";
import manifest from "../../app/manifest";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import { appRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { createPageMetadata, getAbsoluteUrl } from "@/lib/metadata";

describe("metadata helpers", () => {
  it("builds absolute urls from the configured site url", () => {
    expect(getAbsoluteUrl(appRoutes.aiCodeReviewerSecurity)).toBe("https://replysolutions.com/ia-code-reviewer-security");
  });

  it("creates page metadata with canonical url and noindex support", () => {
    const metadata = createPageMetadata({
      title: "Teste",
      description: "Descricao",
      path: "/teste",
      noIndex: true,
    });

    expect(metadata.alternates?.canonical).toBe("https://replysolutions.com/teste");
    expect(metadata.robots).toEqual(
      expect.objectContaining({
        index: false,
        follow: false,
      }),
    );
  });

  it("generates robots, sitemap and manifest using the site config", () => {
    expect(robots().sitemap).toBe("https://replysolutions.com/sitemap.xml");
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://replysolutions.com/",
          priority: 1,
        }),
      ]),
    );
    expect(manifest()).toEqual(
      expect.objectContaining({
        short_name: siteConfig.shortName,
        start_url: "/",
      }),
    );
  });
});
