import "./globals.css";

import type { Metadata } from "next";
import { FloatButton } from "@/components/float-button";
import Header from "@/components/header";
import { AUTHOR, DESCRIPTION, KEYWORDS, SITE_NAME, SITE_URL } from "@/config/seo";
import { JetBrains_Mono, Saira } from "next/font/google";

const saira = Saira({
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  keywords: KEYWORDS,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_PT",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Software Engineer`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Software Engineer`,
    description: DESCRIPTION,
    creator: AUTHOR.handle,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="scroll-smooth">
      <body className={`${saira.className} ${jetbrainsMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <FloatButton />
        <footer className="mb-12 mt-32 text-center text-gray">
          <p>© {new Date().getFullYear()} - All rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
