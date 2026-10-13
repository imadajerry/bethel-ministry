import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://imadajerry.github.io/bethel-ministry/"),
  title: "Bethel Ministry Mizoram - Thy Kingdom Come",
  description:
    "Bethel Ministry is a prominent Christian evangelical organization based in Aizawl, Mizoram, India. A beacon of Healing Ministry, spiritual revival, and youth empowerment.",
  keywords: [
    "Bethel Ministry",
    "Mizoram",
    "Aizawl",
    "Christian Evangelical",
    "Discipleship Training",
    "Gospel Camping",
    "Youth Summer Camp",
    "Mizoram Youth Festival",
  ],
  icons: {
    icon: "/assets/imgs/bethel-merch-main-logo.webp",
    shortcut: "/assets/imgs/bethel-merch-main-logo.webp",
    apple: "/assets/imgs/bethel-merch-main-logo.webp",
  },
  openGraph: {
    title: "Bethel Ministry Mizoram - Thy Kingdom Come",
    description:
      "A prominent Christian evangelical organization based in Aizawl, Mizoram, India, fostering spiritual renewal and youth empowerment.",
    url: "https://imadajerry.github.io/bethel-ministry/",
    siteName: "Bethel Ministry",
    images: [
      {
        url: "/assets/imgs/hero-banner.webp",
        width: 1200,
        height: 630,
        alt: "Bethel Ministry Mizoram",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethel Ministry Mizoram",
    description:
      "A beacon of Healing Ministry, spiritual revival, and youth empowerment across Mizoram and beyond.",
    images: ["/assets/imgs/hero-banner.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className="font-poppins antialiased bg-white text-neutral-900 min-h-screen"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
