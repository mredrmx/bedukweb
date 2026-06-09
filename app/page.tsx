import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
import { Grid, Layers, Maximize2, Sun, ArrowRight, Shield, Award, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const services = [
    {
      title: "PVC Kapı ve Pencere Sistemleri",
      description: "PVC kapı ve pencere grubunda sektöre kaliteyi getiren Asaşpen ile çalışıyoruz. Ayrıca ekonomik alternatif çözümler için kendi tescilli markamız BDKPEN ile hizmet sunuyoruz.",
      features: [
        "Asaşpen Yetkili Çözüm Ortaklığı",
        "Ekonomik Alternatif BDKPEN Serisi",
        "Yüksek Isı ve Ses Yalıtımı",
        "Milimetrik CNC Hassasiyetinde Kesim",
      ],
      href: "/urunlerimiz#pvc",
      icon: <Grid className="w-6 h-6" />,
      image: "https://static.wixstatic.com/media/14c4c5_78b30133006146d19602edfaecc3bed4~mv2.jpg",
    },
    {
      title: "Cam Balkon Sistemleri",
      description: "Isıcamlı ve tek camlı katlanır veya sürme cam balkon sistemlerimiz ile balkonlarınızı dört mevsim yaşayan konforlu yaşam alanlarına dönüştürüyoruz.",
      features: [
        "Isıcamlı Konforlu Sürme Cam",
        "Tek Camlı Katlanır Sistemler",
        "Winnice Marka Çözüm Ortaklığı",
        "Estetik ve Geniş Görüş Açısı",
      ],
      href: "/urunlerimiz#cam-balkon",
      icon: <Layers className="w-6 h-6" />,
      image: "https://static.wixstatic.com/media/14c4c5_f3119325a28448f4bc7c80740fa55a1d~mv2.jpeg",
    },
    {
      title: "Giyotin Cam Sistemleri",
      description: "Uzaktan kumandalı, dikey hareket eden motorlu giyotin cam sistemlerimiz, kafe, restoran ve konut projeleriniz için modern ve rüzgar korumalı kapatmalar sunar.",
      features: [
        "Motorlu ve Uzaktan Kumandalı",
        "Dikey Hareketli Akıllı Camlar",
        "Isıcam Uyumlu Profil Yapısı",
        "Sessiz ve Akıcı Çalışma Mekanizması",
      ],
      href: "/urunlerimiz#giyotin",
      icon: <Maximize2 className="w-6 h-6" />,
      image: "https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg",
    },
    {
      title: "Bioklimatik Pergola & Kış Bahçesi",
      description: "Açılır-kapanır bioklimatik alüminyum paneller, açılır cam tavan veya sabit cam tavan sistemleri ile dış mekanlarınızı modern kış bahçelerine dönüştürüyoruz.",
      features: [
        "Bioclimatic Akıllı Alüminyum Tavan",
        "Açılır ve Sabit Cam Tavan Seçenekleri",
        "Entegre LED Aydınlatma Altyapısı",
        "Kar ve Rüzgar Yüküne Yüksek Dayanım",
      ],
      href: "/urunlerimiz#pergola",
      icon: <Sun className="w-6 h-6" />,
      image: "https://static.wixstatic.com/media/14c4c5_fcc21813066d4f43b4f7522cf8290af5~mv2.jpg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Brand Value Section */}
        <section className="py-24 bg-slate-100/40 dark:bg-brand-navy/30 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Image / Stats Grid */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-brand-blue/20 to-brand-accent/10 border border-slate-200 dark:border-slate-800 flex flex-col justify-end p-6 glass-effect">
                    <Building2 className="w-8 h-8 text-brand-blue mb-4" />
                    <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">4000 m²</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Samsun Tesisimiz</span>
                  </div>
                  <div className="h-64 rounded-2xl bg-gradient-to-br from-brand-accent/20 to-brand-blue/10 border border-slate-200 dark:border-slate-800 flex flex-col justify-end p-6 glass-effect">
                    <Shield className="w-8 h-8 text-brand-accent mb-4" />
                    <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">10 Yıl</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Kusursuz Garanti</span>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-64 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-brand-blue/15 border border-slate-200 dark:border-slate-800 flex flex-col justify-end p-6 glass-effect">
                    <Award className="w-8 h-8 text-indigo-400 mb-4" />
                    <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">23+ Yıl</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Sektör Deneyimi</span>
                  </div>
                  <div className="h-48 rounded-2xl bg-gradient-to-br from-brand-blue/10 to-brand-accent/20 border border-slate-200 dark:border-slate-800 flex flex-col justify-end p-6 glass-effect">
                    <Sparkles className="w-8 h-8 text-cyan-400 mb-4" />
                    <span className="text-2xl font-display font-extrabold text-slate-800 dark:text-white">Hi-Tech</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">CNC Makine Parkı</span>
                  </div>
                </div>
              </div>

              {/* Text Block */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent">
                  KURUMSAL BAKIŞ
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                  Çeyrek Asra Yaklaşan Yapı Deneyimi
                </h2>
                <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                  2000 yılında sektöre adım atan Bedük Grup, 23 yılı aşkın tecrübesiyle Samsun, Trabzon ve tüm Karadeniz bölgesinde öncü projelere imza atmıştır. PVC pencere ve kapı sistemlerinde Türkiye&apos;nin en büyük markası <strong>Asaşpen</strong> yetkili üretici bayisi olarak hizmet kalitemizi en yüksek normlara taşıdık.
                </p>
                <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                  Bunun yanında cam balkon, sürme cam ve kış bahçesi tasarımlarında tescilli <strong>Winnice</strong> ve <strong>Winperax</strong> markalarıyla ortak projeler yürütüyoruz. Üretimimizi, milimetre hassasiyetindeki CNC robot makine parkurlarımızda sıfır hata prensibiyle gerçekleştiriyoruz.
                </p>
                <div className="pt-4">
                  <Link
                    href="/kurumsal"
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-blue dark:text-brand-accent hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    <span>Vizyonumuz & Üretim Tesislerimiz hakkında daha fazlası</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent">
                ÜRÜNLERİMİZ
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                Öne Çıkan Yapı Sistemleri
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                Güçlü markalarımız ve uzman mühendislik ekibimizle yaşam ve iş alanlarınıza estetik, enerji verimliliği ve konfor katıyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  description={service.description}
                  features={service.features}
                  href={service.href}
                  icon={service.icon}
                  image={service.image}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Partnership / Client Logos Banner */}
        <section className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase block mb-8">
              GÜÇLÜ İŞ ORTAKLARIMIZ VE ÇÖZÜM MARKALARI
            </span>
            <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-20 opacity-70 dark:opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <img
                src="https://static.wixstatic.com/media/14c4c5_2d0caa440229407b896bc81accd5fae8~mv2.png"
                alt="Asaşpen"
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <img
                src="https://static.wixstatic.com/media/14c4c5_8c6e19c5d6c44629806697a5831ab45e~mv2.png"
                alt="Winnice"
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <img
                src="https://static.wixstatic.com/media/14c4c5_eafb586f8dd84d2f87b7f26b41c3a289~mv2.png"
                alt="BDKPEN"
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <img
                src="https://static.wixstatic.com/media/14c4c5_8edb8f521cb044ff82d282a7702357c2~mv2.png"
                alt="Winperax"
                className="h-10 w-auto object-contain dark:brightness-0 dark:invert"
              />
            </div>
          </div>
        </section>

        {/* Bayilik & Contact CTA Section */}
        <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
          {/* Neon Glow behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/20 blur-[100px] pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bayimiz Olun, Birlikte Büyüyelim
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed font-sans">
              Karadeniz Bölgesi genelinde geniş bayi ağımıza katılmak, Asaşpen ve Winnice kalitesini projelerinize taşımak için bayilik formumuzu doldurabilir veya bizimle hemen iletişime geçebilirsiniz.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/iletisim"
                className="px-8 py-4 rounded-xl font-display text-sm font-semibold tracking-wider text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-lg"
              >
                Bayilik Başvurusu Yap
              </Link>
              <a
                href="tel:+905327390859"
                className="px-8 py-4 rounded-xl font-display text-sm font-semibold tracking-wider text-white border border-slate-700 hover:border-slate-500 transition-colors"
              >
                Müşteri Hizmetleri
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
