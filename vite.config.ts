import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isLovableSandbox =
  process.env["LOVABLE_SANDBOX"] === "1" ||
  !!process.env["DEV_SERVER__PROJECT_PATH"];

// Inside Lovable: keep the normal build. Elsewhere (GitHub Pages): static output
// under /un-global-aid/ with prerendered HTML.
export default isLovableSandbox
  ? defineConfig({
      tanstackStart: {
        server: { entry: "server" },
      },
    })
  : defineConfig({
      nitro: false,
      vite: { base: "/un-global-aid/" },
      tanstackStart: {
        prerender: { enabled: true, crawlLinks: true },
        pages: [{ path: "/" }],
      },
    });
