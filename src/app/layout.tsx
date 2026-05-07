import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/smooth-scroll";
import { brand } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} — детские праздники, утренники, выпускные · ${brand.city}`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  keywords: [
    "детский день рождения",
    "утренники",
    "выпускной",
    "аниматоры",
    "шоу-программы",
    "тематические квесты",
    brand.city,
  ],
  authors: [{ name: brand.name }],
  openGraph: {
    title: brand.name,
    description: brand.description,
    type: "website",
    locale: "ru_RU",
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.name,
    description: brand.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fff6e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Unbounded:wght@500;700;800;900&family=Caveat:wght@500;700&display=swap"
        />
      </head>
      <body className="min-h-full bg-paper text-ink overflow-x-hidden">
        {process.env.NEXT_PUBLIC_DISABLE_SMOOTH !== "1" && <SmoothScroll />}
        {children}
        <Toaster
          position="bottom-right"
          richColors
          theme="light"
          toastOptions={{
            style: {
              fontFamily: "var(--font-sans)",
              borderRadius: "16px",
            },
          }}
        />
      </body>
    </html>
  );
}
