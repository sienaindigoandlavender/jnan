import type { Metadata, Viewport } from "next";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/500-italic.css";
import "@fontsource-variable/dm-sans/index.css";
import "@fontsource/noto-sans-tifinagh/400.css";
import { t } from "@/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: t("app.name"),
  description: t("app.tagline"),
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="mx-auto flex min-h-dvh max-w-xl flex-col">{children}</div>
      </body>
    </html>
  );
}
