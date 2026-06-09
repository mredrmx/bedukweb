import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Grid, Layers, Maximize2, Sun, Sparkles, Building, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Ürünlerimiz | Yapı ve Cam Sistemleri",
  description: "Asaşpen PVC Kapı ve Pencere, Winnice Cam Balkon, Giyotin Cam, Kış Bahçesi ve Pergola ürün gruplarımız hakkında detaylı teknik bilgiler ve ürün yelpazemiz.",
};

const productGroups = [
  {
    id: "pvc",
    icon: <Grid className="w-8 h-8 text-brand-blue" />,
    title: "PVC Kapı ve Pencere Sistemleri",
    intro: "PVC grubunda en yüksek dayanım ve enerji tasarrufunu getiren çözümleri lider markalarla sunuyoruz.",
    brand: "ASAŞPEN & BDKPEN",
    desc: "Yetkili üretici bayisi olduğumuz ASAŞPEN serileri ile ses ve ısı yalıtımında dünya standartlarında performans elde ediyoruz. Projenizin bütçesine göre, kendi tescilli markamız olan BDKPEN profilleri ile de alternatif, yüksek kaliteli ve ekonomik çözümler imal etmekteyiz.",
    specs: [
      "Yüksek Odacıklı Isı ve Ses Yalıtım Profilleri",
      "Çift ve Üçlü Isıcam Seçenekleri",
      "Rüzgar Yüküne ve Zorlu Hava Koşullarına Karşı Maksimum Mukavemet",
      "Geniş Renk Kartelası ve Ahşap Desenli PVC Kaplama Seçenekleri",
      "Emniyetli Kilit ve Donanım Sistemleri Entegrasyonu",
    ],
  },
  {
    id: "cam-balkon",
    icon: <Layers className="w-8 h-8 text-brand-accent" />,
    title: "Cam Balkon & Sürme Cam Sistemleri",
    intro: "Dış mekanlarınızı estetik ve işlevsel bir şekilde kapatarak evinizin kullanım alanını genişletiyoruz.",
    brand: "WINNICE",
    desc: "Isıcamlı sürme, tek camlı sürme veya katlanır cam balkon modellerimiz ile Karadeniz ikliminin tüm zorluklarına karşı tam koruma sağlıyoruz. Winnice kalitesiyle ürettiğimiz temperli cam paneller, kolay temizlenme ve sessiz ray hareket sistemleri sunar.",
    specs: [
      "8 mm ve 10 mm Temperli Güvenlik Camı Seçenekleri",
      "Isıcamlı (Çift Cam) Sürme Sistemler ile Yüksek Isı Yalıtımı",
      "Özel Su Tahliye Kanallı ve Rüzgar Contalı Alüminyum Profiller",
      "Gizli Kilit ve Çocuk Güvenlik Kilit Mekanizmaları",
      "Sağa, Sola ve Her İki Yöne Katlanabilir Esnek Panel Yapıları",
    ],
  },
  {
    id: "giyotin",
    icon: <Maximize2 className="w-8 h-8 text-indigo-400" />,
    title: "Giyotin Cam Sistemleri (Motorlu Küpeşte)",
    intro: "Uzaktan kumanda ile kontrol edilebilen, dikey yönde hareket eden akıllı cam sistemleri.",
    brand: "WINPERAX & BDK",
    desc: "Özellikle kafe, restoran, otel ve lüks konut projelerinde tercih edilen giyotin cam paneller, kapandığında şık bir cam korkuluk (küpeşte) vazifesi görür. Güçlü Somfy veya Becker motor seçenekleri ile entegre edilen sistemler, sessizce dikey açılım sağlar.",
    specs: [
      "Somfy / Becker Motorlu ve Akıllı Kumanda Kontrolü",
      "2 panelli veya 3 panelli dikey hareket seçenekleri",
      "Isıcamlı Giyotin Seçeneği ile Dış Ortam Sıcaklığını Koruma",
      "Zincirli veya Çelik Halatlı Güvenli Kaldırma Mekanizmaları",
      "Rüzgar ve Yağmur Sensörü Entegrasyon Desteği",
    ],
  },
  {
    id: "pergola",
    icon: <Sun className="w-8 h-8 text-cyan-450" />,
    title: "Bioklimatik Pergola & Kış Bahçesi",
    intro: "Dört mevsim konfor sunan, açılır tavan ve yan kapama entegrasyonlu modern kış bahçesi konseptleri.",
    brand: "WINPERAX",
    desc: "Kendi ekseni etrafında dönen ve geriye doğru katlanan alüminyum paneller (Bioclimatic) veya sabit/açılır cam tavan sistemleri ile bahçelerinize şıklık katıyoruz. Entegre LED aydınlatmaları ve su tahliye olukları sayesinde açık havanın tadını her koşulda çıkarabilirsiniz.",
    specs: [
      "Motorlu Döndürülebilir Alüminyum Paneller (Isı ve Işık Kontrolü)",
      "Gizli Su Tahliye Kanalları ile Entegre Yağmur Gider Sistemi",
      "Samsung veya Osram Entegre LED Dimmerli Aydınlatmalar",
      "Yüksek Kar Yükü ve Sert Rüzgar Mukavemet Hesaplamaları",
      "Etrafına Sürme Cam veya Giyotin Cam Entegrasyonu ile Tam Kış Bahçesi",
    ],
  },
  {
    id: "aluminyum",
    icon: <Building className="w-8 h-8 text-indigo-400" />,
    title: "Alüminyum Cephe & Mimari Sistemler",
    intro: "Modern plazalar ve ticari binalar için alüminyum giydirme cephe ve doğrama sistemleri.",
    brand: "BEDÜK MIMARI",
    desc: "Yapıların dış görünümlerine modern bir çehre kazandıran alüminyum silikon cephe, kapaklı cephe, ofis ara bölme sistemleri ve yalıtımlı alüminyum kapı-pencere doğramalarını, projenin mimari detaylarına göre üretiyor ve montajını gerçekleştiriyoruz.",
    specs: [
      "Silikon Giydirme ve Kapaklı Alüminyum Cephe Çözümleri",
      "Yalıtımlı ve Yalıtımsız Alüminyum Kapı-Pencere Serileri",
      "Isı Yalıtım Köprülü Özel İthal Profiller",
      "Minimalist Çerçeveli Geniş Cam Sürme Kapılar (Hebe-Schiebe)",
      "Özel Tasarım Ofis Ara Bölme ve Cam Bölme Modülleri",
    ],
  },
];

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
              ÜRÜN GALEİRİMİZ VE HİZMETLERİMİZ
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Yapı Teknolojisi Ürünlerimiz
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              Asaşpen, Winnice ve Winperax marka kalitesi ve Bedük Group güvencesiyle sunduğumuz yenilikçi çözümlerimizi inceleyin.
            </p>
          </div>
        </section>

        {/* Dynamic Detailed Products List */}
        <section className="py-24 relative grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
            {productGroups.map((group, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={group.id}
                  id={group.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-12 border-b border-slate-200/50 dark:border-slate-800/50 last:border-b-0`}
                >
                  {/* Text Container */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-blue-500/5 text-brand-blue dark:text-brand-accent shadow-sm">
                        {group.icon}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-brand-blue dark:text-brand-accent uppercase block">
                          ÇÖZÜM ORTAĞI: {group.brand}
                        </span>
                        <h2 className="font-display text-2xl lg:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                          {group.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-650 dark:text-slate-200 font-sans">
                      {group.intro}
                    </p>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {group.desc}
                    </p>

                    <div className="pt-2">
                      <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3.5">
                        Öne Çıkan Özellikler ve Donanım
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {group.specs.map((spec, specIdx) => (
                          <li key={specIdx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-350">
                            <CheckCircle className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                            <span className="font-sans leading-tight">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Aesthetic Graphics Container / Decorative Panel */}
                  <div className={`lg:col-span-5 ${isEven ? "lg:order-2" : "lg:order-1"} flex justify-center`}>
                    <div className="w-full max-w-sm glass-effect border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-80 bg-slate-50/50 dark:bg-slate-900/30">
                      <div className="absolute -top-10 -left-10 w-36 h-36 bg-gradient-to-tr from-brand-blue/10 to-brand-accent/10 rounded-full blur-xl pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center space-x-2 text-xs font-bold text-brand-blue dark:text-brand-accent tracking-wider uppercase">
                          <ShieldCheck className="w-4 h-4" />
                          <span>10 Yıl Sistem Garantili</span>
                        </div>
                        <h3 className="font-display font-black text-xl text-slate-800 dark:text-white leading-tight">
                          Projenize Özel Fiyatlandırma
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
                          Teknik ekiplerimiz yerinde keşif yaparak binanıza en uygun rüzgar yükü ve ısı verimlilik hesaplarını çıkarır.
                        </p>
                      </div>

                      <div className="pt-6 relative z-10">
                        <Link
                          href="/iletisim"
                          className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl font-display text-xs font-bold tracking-wider text-white bg-slate-900 hover:bg-slate-850 dark:bg-slate-850 dark:hover:bg-slate-800 transition-colors shadow-lg"
                        >
                          <span>HIZLI TEKLİF ALIN</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
