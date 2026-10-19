import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { getAssetPath } from "@/lib/assets";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bethelministrymizoram.com/"),
  title: {
    default: "Bethel Ministry Mizoram | Thy Kingdom Come - Official Website",
    template: "%s | Bethel Ministry Mizoram",
  },
  description:
    "Bethel Ministry is a prominent Christian evangelical organization based in Aizawl, Mizoram, India. A beacon of Healing Ministry, spiritual revival, youth conferences, and discipleship training.",
  applicationName: "Bethel Ministry Mizoram",
  authors: [
    {
      name: "Bethel Ministry Mizoram",
      url: "https://www.bethelministrymizoram.com/",
    },
  ],
  creator: "Bethel Ministry Mizoram",
  publisher: "Bethel Ministry Mizoram",
  category: "Religion & Spirituality",
  classification: "Christian Evangelical Ministry",
  keywords: [
    "Bethel Ministry",
    "Bethel Ministry Mizoram",
    "Bethel Ministry Aizawl",
    "Thy Kingdom Come",
    "Mizoram Church",
    "Christian Evangelical Mizoram",
    "Healing Ministry Mizoram",
    "Discipleship Training",
    "Gospel Camping Mizoram",
    "Youth Summer Camp Aizawl",
    "Mizoram Youth Festival",
    "Gospel Crusade Mizoram",
    "Mizo Christian Ministry",
    "Frederick Lalrindika",
    "Lalremmawia",
    "Lalruatpuia Chhakchhuak",
    "Revival Mizoram",
    "Christian Youth Empowerment India",
  ],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Bethel Ministry Mizoram | Thy Kingdom Come",
    description:
      "A prominent Christian evangelical organization based in Aizawl, Mizoram, India, fostering spiritual renewal, Healing Ministry, and youth empowerment.",
    url: "https://www.bethelministrymizoram.com/",
    siteName: "Bethel Ministry Mizoram",
    images: [
      {
        url: "assets/imgs/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Bethel Ministry Mizoram - Live Worship & Youth Gathering",
        type: "image/webp",
      },
      {
        url: "assets/imgs/bethel-merch-banner-logo.webp",
        width: 800,
        height: 800,
        alt: "Bethel Ministry Emblem - Thy Kingdom Come ESTD 2014",
        type: "image/webp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethel Ministry Mizoram | Thy Kingdom Come",
    description:
      "A beacon of Healing Ministry, spiritual revival, and youth empowerment across Mizoram and beyond.",
    images: ["assets/imgs/hero-banner.webp"],
    creator: "@bethel_ministry",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: getAssetPath("/favicon.ico"), sizes: "any" },
      { url: getAssetPath("/icon-48.png"), sizes: "48x48", type: "image/png" },
      { url: getAssetPath("/icon-96.png"), sizes: "96x96", type: "image/png" },
      { url: getAssetPath("/icon-192.png"), sizes: "192x192", type: "image/png" },
    ],
    shortcut: getAssetPath("/favicon.ico"),
    apple: [
      {
        url: getAssetPath("/apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body
        className="font-poppins antialiased bg-white text-neutral-900 min-h-screen"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
