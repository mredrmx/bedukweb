import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bedük Group | Yapı ve Cam Balkon Sistemleri",
  description: "Bedük Group, Samsun ve Karadeniz bölgesinde Asaşpen PVC kapı ve pencere sistemleri, Winnice katlanır/sürme cam balkon, giyotin cam ve bioklimatik pergola sistemleri sunmaktadır.",
  keywords: "Bedük Group, Asaşpen, Cam Balkon, Giyotin Cam, Pvc Pencere, Kış Bahçesi, Bioklimatik Pergola, Samsun Pvc, Karadeniz Cam Balkon",
  authors: [{ name: "Bedük Group" }],
  openGraph: {
    title: "Bedük Group | Yapı ve Cam Balkon Sistemleri",
    description: "20 yılı aşkın tecrübesiyle inşaat ve yapı sistemlerinde öncü çözümler. PVC pencere, cam balkon, giyotin cam ve pergola sistemleri.",
    url: "https://www.bedukgroup.net",
    siteName: "Bedük Group",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-brand-dark dark:text-slate-100 selection:bg-brand-blue selection:text-white">
        {children}
      </body>
    </html>
  );
}
