import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductShowcase from "@/components/ProductShowcase";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ürünlerimiz | Yapı ve Cam Sistemleri I Bedük Group",
  description: "Asaşpen PVC Kapı ve Pencere, Winnice Cam Balkon, Giyotin Cam, Kış Bahçesi ve Pergola ürün gruplarımız hakkında detaylı teknik bilgiler ve ürün yelpazemiz.",
};

export default function Urunlerimiz() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Header Section */}
        <section className="relative py-24 bg-slate-900 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/15 to-brand-accent/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              ÜRÜN GALERİMİZ VE HİZMETLERİMİZ
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Yapı Teknolojisi Ürünlerimiz
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              Asaşpen, Winnice ve Winperax marka kalitesi ve Bedük Group güvencesiyle sunduğumuz yenilikçi çözümlerimizi inceleyin.
            </p>
          </div>
        </section>

        {/* Interactive Showcase Section */}
        <section className="py-24 relative grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductShowcase />
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden border-t border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-navy/60 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Aklınızdaki Proje İçin Çözüm Ortağı Arayışında mısınız?
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Katlanır cam, motorlu giyotin sistemler ya da Asaşpen PVC doğramalarımız için detaylı teknik destek ve teklif almak için bizimle iletişime geçin.
            </p>
            <div className="pt-4">
              <Link
                href="/iletisim"
                className="px-8 py-3.5 rounded-xl font-display text-xs font-bold tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-colors inline-flex items-center space-x-2 uppercase shadow-lg"
              >
                <span>İletişime Geçin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
