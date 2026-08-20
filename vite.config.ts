import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isLovableSandbox =
  process.env["LOVABLE_SANDBOX"] === "1" ||
  !!process.env["DEV_SERVER__PROJECT_PATH"];

export default defineConfig({
  // GitHub Pages needs static output.
  // Keep Lovable's normal build behavior inside Lovable.
  nitro: isLovableSandbox ? undefined : false,

  // GitHub Pages hosts this project under /un-global-aid/
  vite: isLovableSandbox
    ? {}
    : {
        base: "/un-global-aid/",
      },

  tanstackStart: isLovableSandbox
    ? {
        server: { entry: "server" },
      }
    : {
        // Generate static HTML for GitHub Pages.
        prerender: {
          enabled: true,
          crawlLinks: true,
        },

        // Make sure the home page is generated.
        pages: [{ path: "/" }],
      },
});
