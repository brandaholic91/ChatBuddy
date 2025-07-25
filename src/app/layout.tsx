import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ttfirsneue = localFont({
  src: [
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial DemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Black.ttf", weight: "900", style: "normal" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Thin Italic.ttf", weight: "100", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial ExtraLight Italic.ttf", weight: "200", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Light Italic.ttf", weight: "300", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Italic.ttf", weight: "400", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Medium Italic.ttf", weight: "500", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial DemiBold Italic.ttf", weight: "600", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Bold Italic.ttf", weight: "700", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial ExtraBold Italic.ttf", weight: "800", style: "italic" },
    { path: "../../public/fonts/tt-firs-neue/TT Firs Neue Trial Black Italic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-ttfirsneue",
});

export const metadata: Metadata = {
  title: "ChatBuddy",
  description: "ChatBuddy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={ttfirsneue.variable}>
      <body>{children}</body>
    </html>
  );
}
