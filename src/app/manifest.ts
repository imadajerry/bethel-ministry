import type { MetadataRoute } from "next";
import { getAssetPath } from "@/lib/assets";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bethel Ministry Mizoram",
    short_name: "Bethel Ministry",
    description:
      "Bethel Ministry is an evangelical Christian organization in Aizawl, Mizoram, India — a beacon of Healing Ministry, spiritual revival, and youth empowerment.",
    start_url: getAssetPath("/"),
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: getAssetPath("/assets/imgs/bethel-merch-main-logo.webp"),
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: getAssetPath("/assets/imgs/bethel-merch-main-logo.webp"),
        sizes: "512x512",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
