"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, Layers, Maximize2, Sun, Building, CheckCircle, ShieldCheck, Info, Sparkles, Wind, Flame, Trash2, ArrowRight, X, ZoomIn } from "lucide-react";
import Link from "next/link";

type TabId = "pvc" | "cam-balkon" | "giyotin" | "pergola" | "aluminyum";

interface Tab {
  id: TabId;
  name: string;
  icon: React.ReactNode;
}

interface ProductDetails {
  name: string;
  desc: string;
  img: string;
  specs?: string[];
  brand?: string;
}

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("pvc");
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    // Support hash navigation e.g. /urunlerimiz#giyotin
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["pvc", "cam-balkon", "giyotin", "pergola", "aluminyum"].includes(hash)) {
        setActiveTab(hash as TabId);
      }
    }
  }, []);

  const tabs: Tab[] = [
    { id: "pvc", name: "PVC Pencere & Kapı", icon: <Grid className="w-4 h-4" /> },
    { id: "cam-balkon", name: "Cam Balkon & Sürme", icon: <Layers className="w-4 h-4" /> },
    { id: "giyotin", name: "Giyotin Cam (GioSafe)", icon: <Maximize2 className="w-4 h-4" /> },
    { id: "pergola", name: "Bioklimatik & Kış Bahçesi", icon: <Sun className="w-4 h-4" /> },
    { id: "aluminyum", name: "Alüminyum & Mimari", icon: <Building className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-16">
      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-5xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (typeof window !== "undefined") {
                    window.history.pushState(null, "", `#${tab.id}`);
                  }
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-display text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-slate-800 dark:text-brand-accent shadow-md"
                    : "text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/40"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents with Animations */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === "pvc" && <PVCTab onSelectProduct={setSelectedProduct} onZoomImage={setLightboxImage} />}
            {activeTab === "cam-balkon" && <CamBalkonTab onSelectProduct={setSelectedProduct} onZoomImage={setLightboxImage} />}
            {activeTab === "giyotin" && <GiyotinTab onSelectProduct={setSelectedProduct} onZoomImage={setLightboxImage} />}
            {activeTab === "pergola" && <PergolaTab onSelectProduct={setSelectedProduct} onZoomImage={setLightboxImage} />}
            {activeTab === "aluminyum" && <AluminyumTab onSelectProduct={setSelectedProduct} onZoomImage={setLightboxImage} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PRODUCT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-350 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image Area */}
              <div className="md:w-1/2 relative min-h-[250px] md:min-h-full bg-slate-50 dark:bg-slate-950 border-r border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center p-6 group cursor-zoom-in"
                   onClick={() => setLightboxImage(selectedProduct.img)}>
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="max-h-[350px] md:max-h-[500px] object-contain rounded-lg shadow-sm group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute bottom-4 right-4 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 text-white font-display text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Resmi Büyüt</span>
                </div>
              </div>

              {/* Product Info Area */}
              <div className="md:w-1/2 p-8 lg:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                <div className="space-y-6">
                  <div>
                    {selectedProduct.brand && (
                      <span className="text-[10px] font-bold tracking-widest text-brand-blue uppercase block mb-1">
                        ÇÖZÜM ORTAĞI: {selectedProduct.brand}
                      </span>
                    )}
                    <h3 className="font-display font-black text-2xl lg:text-3xl text-slate-800 dark:text-white leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {selectedProduct.desc}
                  </p>

                  {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">TEKNİK DETAY VE AVANTAJLAR</span>
                      <ul className="grid grid-cols-1 gap-2.5">
                        {selectedProduct.specs.map((spec, sidx) => (
                          <li key={sidx} className="flex items-start space-x-2 text-xs text-slate-650 dark:text-slate-350">
                            <CheckCircle className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                            <span className="font-sans leading-relaxed">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-slate-100 dark:border-slate-800/60 mt-8">
                  <Link
                    href="/iletisim"
                    onClick={() => setSelectedProduct(null)}
                    className="flex-1 flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl font-display text-xs font-bold tracking-wider text-white bg-slate-900 hover:bg-slate-850 dark:bg-slate-800 dark:hover:bg-slate-750 transition-colors shadow-lg text-center"
                  >
                    <span>FİYAT TEKLİFİ ALIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md cursor-zoom-out"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-900/60 text-white hover:bg-slate-800 transition-colors border border-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage}
              alt="Büyütülmüş Görsel"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// TAB 1: PVC PENCERE & KAPI
// ----------------------------------------------------
interface TabProps {
  onSelectProduct: (details: ProductDetails) => void;
  onZoomImage: (url: string) => void;
}

function PVCTab({ onSelectProduct, onZoomImage }: TabProps) {
  const models = [
    {
      name: "İnova 76",
      desc: "76 mm genişliğindeki özel tasarım profil yapısı ile yüksek ses ve ısı yalıtımı arayan konut projeleri için ideal çözümdür. Geniş yanak odacıklarıyla statik dayanımı üst düzeydedir.",
      img: "https://static.wixstatic.com/media/14c4c5_607933fb1cfd45f2b041129ba5d88d7f~mv2.jpg",
      specs: ["76 mm Geniş Profil Yanakları", "Çok Odacıklı Isı/Ses Yalıtım Odaları", "Estetik Köşe Birleşim Noktaları", "10 Yıl Sistem ve Malzeme Garantisi"]
    },
    {
      name: "İnova 76 Orta Contalı",
      desc: "İç, dış ve orta olmak üzere 3'lü conta bariyeri ile Karadeniz'in şiddetli rüzgar ve yağmurlarına karşı %100 sızdırmazlık sunar.",
      img: "https://static.wixstatic.com/media/14c4c5_895993fb02414881828ae4131d6763f9~mv2.jpeg",
      specs: ["3 Conta Bariyerli Sızdırmazlık", "Yüksek Basınçlı Rüzgar Mukavemeti", "Çift ve Üçlü Isıcam Alternatifleri", "Enerji Tasarruflu Profil Yapısı"]
    },
    {
      name: "İnova Yalıtımlı Sürme",
      desc: "Geniş açılımlı kapılar için tasarlanan, fırça yerine özel contalarla basarak sızdırmazlık değerlerini maksimuma çıkaran sürme seri.",
      img: "https://static.wixstatic.com/media/14c4c5_78b30133006146d19602edfaecc3bed4~mv2.jpg",
      specs: ["Özel Conta Baskı Teknolojisi", "Sürtünmesiz Sessiz Kayar Raylar", "Geniş Görüş Alanlı Cam Açıklığı", "Maksimum Hava ve Su Yalıtımı"]
    },
    {
      name: "Hebe-Schiebe (Kaldırmalı Sürme)",
      desc: "Lüks mimari projelerde, devasa cam panellerin tek parmak hareketiyle kaldırılıp sessizce yana kaydırılmasını sağlayan üst düzey mekanizma.",
      img: "https://static.wixstatic.com/media/14c4c5_d4841e9faa2949ec95c590ed84f163c9~mv2.jpeg",
      specs: ["Kaldırmalı/Sürmeli Güçlü Mekanizma", "400 kg Yük Taşıma Kapasitesi", "Eşik Yüksekliği Olmayan Tasarım", "Lüks Mimari Ayrıcalıklar"]
    },
    {
      name: "Sürme Sistem 74",
      desc: "Ekonomik, pratik ve yalıtım değerlerini koruyan, balkon çıkışları ve yazlık projeler için tasarlanmış sürme doğrama alternatifi.",
      img: "https://static.wixstatic.com/media/14c4c5_322bdf5027304a4a879db4d8c80e44d5~mv2.jpg",
      specs: ["Ekonomik Yatırım Çözümü", "Pratik Kullanım & Çift Ray Seçeneği", "İnce Profil Profil Çerçevesi", "Asaşpen Kalite Standartları"]
    },
  ];

  const advantages = [
    { icon: <Flame className="w-5 h-5 text-red-500" />, title: "Yangın Dayanımı", desc: "PVC yüksek alev alma sıcaklığına sahiptir. Isı kaynağı kaldırıldığında yanma kendiliğinden anında durur." },
    { icon: <Wind className="w-5 h-5 text-blue-500" />, title: "Yüksek Mekanik Dayanım", desc: "Aşınma direnci, hafifliği ve tok yapısı sayesinde bina konstrüksiyonlarında önemli statik avantajlar sağlar." },
    { icon: <Trash2 className="w-5 h-5 text-emerald-500" />, title: "Sürdürülebilir Yapı", desc: "Ömürlerinin sonunda tamamen geri dönüştürülerek yeniden kullanılabilir. Çevre dostudur." },
    { icon: <Info className="w-5 h-5 text-cyan-500" />, title: "Enerji Verimliliği", desc: "Binalardaki ısı kayıplarının %28'i pencerelerden olur. İnova serileri yüksek yalıtım ile bunu önler." },
  ];

  return (
    <div className="space-y-16">
      {/* Intro Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/30 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
        <div className="lg:col-span-8 space-y-4">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">ASAŞPEN & BDKPEN YETKİLİ BAYİSİ</span>
          <h3 className="font-display text-2xl lg:text-3xl font-black tracking-tight text-slate-800 dark:text-white">
            PVC Pencere ve Kapı Sistemleri
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
            PVC kapı ve pencere grubunda kalitesiyle Türkiye&apos;nin öncü markası <strong>Asaşpen</strong> ile iş birliği yapmaktayız. Ayrıca projelerinizin bütçesine göre, kendi tescilli markamız olan <strong>BDKPEN</strong> profilleri ile de alternatif, yüksek kaliteli ve ekonomik çözümler sunuyoruz.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <a href="https://www.bedukgroup.net/_files/ugd/14c4c5_a6277262354a45df9207cbedd2b7b621.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-white bg-slate-900 hover:bg-slate-850 px-5 py-3 rounded-xl transition-colors">
              <span>PVC Ürün Kataloğu (PDF)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="lg:col-span-4 flex justify-center cursor-zoom-in" onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_1e9c926be4d946cd99a07821dd2bd60d~mv2.png")}>
          <img
            src="https://static.wixstatic.com/media/14c4c5_1e9c926be4d946cd99a07821dd2bd60d~mv2.png"
            alt="Neden PVC"
            className="max-h-64 object-contain hover:scale-102 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="space-y-6">
        <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">PVC Model ve Serilerimiz <span className="text-xs font-normal text-slate-550 dark:text-slate-450 tracking-normal">(Bilgileri görmek için kartlara tıklayın)</span></h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProduct({
                name: model.name,
                desc: model.desc,
                img: model.img,
                specs: model.specs,
                brand: "ASAŞPEN"
              })}
              className="group glass-effect rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 border-b border-slate-200/50 dark:border-slate-800/50">
                  <img
                    src={model.img}
                    alt={model.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h5 className="font-display font-bold text-lg text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">{model.name}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">{model.desc}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between">
                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-brand-blue tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>10 Yıl Garantili</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-blue transition-colors">DETAYLARI GÖR</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why PVC Details */}
      <div className="space-y-6">
        <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">Neden PVC Doğrama Tercih Edilmeli?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-900/10 space-y-3">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 inline-block">
                {adv.icon}
              </div>
              <h5 className="font-display font-bold text-base text-slate-800 dark:text-white">{adv.title}</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAB 2: CAM BALKON & SÜRME
// ----------------------------------------------------
function CamBalkonTab({ onSelectProduct, onZoomImage }: TabProps) {
  const models = [
    {
      name: "Alya / Alya Plus Katlanır Cam Balkon",
      desc: "Türkiye'de ilk metal park sistemli faydalı modele sahip, özel damlalıklı su tahliye profili barındıran modern tasarım. Alya Plus serisinde 4+22+2 çift cam ile kış bahçesi konforunda yalıtım sağlanır.",
      img: "https://static.wixstatic.com/media/14c4c5_0b25c429949d472bb385d8cc3473dcfb~mv2.jpg",
      brand: "WINNICE",
      features: ["Özel Su Tahliye Sistemi", "İspanyolet Kilit Donanımı", "Metal Park Sistemli", "Isıcamlı (4+22+2) Çift Cam Desteği"],
    },
    {
      name: "BDK Katlanır Cam Balkon",
      desc: "Fiyat/performans odaklı projeleriniz için tasarlanan BDK serisi, estetik ve sağlamlığı bütçe avantajı ile birlikte sunar. Kolay açılır kanat yapısı ve çift emniyet kilitleri mevcuttur.",
      img: "https://static.wixstatic.com/media/14c4c5_3c2154b2427f41b98960ec2acb985e38~mv2.jpg",
      brand: "BDK SİSTEM",
      features: ["Ekonomik Yatırım Maliyeti", "Temperli Emniyet Camı (8mm)", "Çift Rulmanlı Teker Yapısı", "Estetik Profil Tasarımı"],
    },
    {
      name: "Slide Leon / Slide Leon Plus Sürme Cam",
      desc: "Eşikli veya eşiksiz alüminyum raylar üzerinde yatay hareket eden sürme cam paneller. Balkon alanlarında yer kaybını sıfıra indirir. Slide Leon Plus modelinde çift cam ısı yalıtımı entegredir.",
      img: "https://static.wixstatic.com/media/14c4c5_b96a7cc2151d47a68ad93bc6f59bd6fb~mv2.jpg",
      brand: "WINNICE",
      features: ["Eşikli ve Eşiksiz Alternatifleri", "Minimum Alan Kaybı", "Dahili Toz ve Rüzgar Fırçaları", "Kayar Panel İzolasyon Contaları"],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Intro */}
      <div className="bg-slate-50 dark:bg-slate-900/30 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 space-y-4">
        <span className="text-xs font-bold text-brand-accent uppercase tracking-widest block">WINNICE & BDK ÇÖZÜM ORTAKLIĞI</span>
        <h3 className="font-display text-2xl lg:text-3xl font-black tracking-tight text-slate-800 dark:text-white">
          Cam Balkon ve Sürme Cam Sistemlerimiz
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
          Balkonlarınızı dört mevsim yaşayan konforlu odalara dönüştürüyoruz. Isıcamlı ve tek camlı katlanır veya sürme cam balkon modellerimiz ile Karadeniz ikliminin tüm yağış ve rüzgarlarına karşı maksimum sızdırmazlık sağlıyoruz.
        </p>
        <div className="pt-2 flex flex-wrap gap-4">
          <a href="https://www.bedukgroup.net/_files/ugd/14c4c5_e0a01fa7fdc04d06b836dba54101807e.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-slate-900 bg-white hover:bg-slate-50 border border-slate-350 px-5 py-3 rounded-xl transition-colors">
            <span>Cam Balkon Kataloğu (PDF)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {models.map((model, idx) => (
          <div
            key={idx}
            onClick={() => onSelectProduct({
              name: model.name,
              desc: model.desc,
              img: model.img,
              specs: model.features,
              brand: model.brand
            })}
            className="group glass-effect border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={model.img}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 right-4 px-3 py-1 bg-brand-blue text-white font-display text-[10px] font-bold tracking-wider uppercase rounded-full">
                  {model.brand}
                </span>
                <div className="absolute bottom-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">{model.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">{model.desc}</p>
                
                <div className="space-y-2 pt-2 border-t border-slate-250/30 dark:border-slate-850/30">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Öne Çıkan Özellikler</span>
                  <ul className="grid grid-cols-1 gap-1.5">
                    {model.features.slice(0, 2).map((feat, fidx) => (
                      <li key={fidx} className="flex items-center space-x-2 text-xs text-slate-650 dark:text-slate-350 font-sans">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between">
              <span className="inline-flex items-center space-x-1.5 text-xs text-slate-550 dark:text-slate-450">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>10 Yıl Garantili</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-blue transition-colors">DETAYLARI GÖR</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAB 3: GIYOTIN CAM (GIOSAFE)
// ----------------------------------------------------
function GiyotinTab({ onSelectProduct, onZoomImage }: TabProps) {
  const features = [
    {
      title: "Krom Paslanmaz Zincir ve Dişli",
      desc: "Triger kayışlı sistemlerde yaşanan kopma ve cam panelin düşmesi tehlikelerine karşı, GioSafe'de yalnızca paslanmaz krom zincir ve özel paslanmaz dişliler kullanılır."
    },
    {
      title: "Safety Use Çocuk Kilidi (Patentli)",
      desc: "Cam paneller temizlik amacıyla vasistas konumunda açıkken motora giden akım otomatik kesilir. Kanatlar tamamen zemine inip korkuluk olmadan açılmaz; evcil hayvanlarınız ve çocuklarınız güvendedir."
    },
    {
      title: "Estetik Trabzan Tasarımı",
      desc: "Paneller aşağı indirildiğinde üst hareketli trabzan profili diğer kanatların üzerine binmez, onlarla uyumlu birleşerek son derece modern bir korkuluk görüntüsü oluşturur."
    },
    {
      title: "Kolay ve Güvenli Temizlik",
      desc: "Temizlik modunda vasistas konumuna getirilen cam paneller birbirinin üzerine yaslanıp el sıkışmalarına sebep olmaz. Kanat kendisi için tasarlanan emniyetli bölmeye yaslanır."
    },
    {
      title: "Maksimum Toz ve Hava İzolasyonu",
      desc: "Şiddetli fırtınalarda dahi içeri rüzgar girmesini engellemek amacıyla yanal alanlarda kauçuk contalar ve kıl fitiller ile donatılmıştır."
    },
    {
      title: "Çift Taraflı Kollu İspanyolet",
      desc: "Plastik veya tijli basit kilit mekanizmaları yerine kullanılan çift taraflı kollu ispanyoletler, contaya gerekli basıncı uygulayarak %100 sızdırmazlık sağlar."
    },
    {
      title: "3 mm Kalınlığında Çelik Makaslar",
      desc: "Piyasada standart olan 1.5 mm makaslar yerine GioSafe'de kullanılan 3 mm kalınlığındaki çelik makaslar, sert açıp kapamalarda dahi yükü güvenle taşır."
    },
    {
      title: "Üst Yan Dikme Slot Koruması",
      desc: "Dikey hareket esnasında yan dikme profilindeki kıl fitillerin kayarak yerinden çıkmasını ve motora dolanmasını engelleyen özel patentli kanal slotu."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Intro Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-slate-900 text-white p-8 lg:p-12 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 to-transparent pointer-events-none" />
        <div className="lg:col-span-7 space-y-6 relative z-10">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 text-brand-accent text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WINNICE PATENTLİ GÜVENLİK SİSTEMİ</span>
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            GioSafe Giyotin Cam Balkon
          </h3>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-sans">
            GioSafe; dikey yönde hareket eden, uzaktan kumandalı akıllı cam balkon sistemidir. Piyasadaki mevcut sistemlerin eksikleri ve kronik arızaları ayrıntılı incelenerek; <strong>kullanıcı emniyeti</strong> ve <strong>maksimum yalıtım</strong> kriterleri eklenerek tasarlanmıştır.
          </p>
          <div className="flex items-center space-x-3 text-xs text-brand-accent font-semibold font-display tracking-widest uppercase cursor-pointer" onClick={() => onSelectProduct({
            name: "GioSafe Giyotin Cam Balkon",
            desc: "Winnice patentli en güvenlikli dikey hareketli giyotin cam sistemi.",
            img: "https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg",
            brand: "WINNICE",
            specs: ["Krom Paslanmaz Zincir ve Dişliler", "Safety Use Çocuk Kilidi", "Estetik Korkuluk Trabzan Profili", "3 mm Çelik Makaslar", "Çift Taraflı Kollu İspanyolet"]
          })}>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="hover:text-cyan-400 transition-colors">TÜM EMNİYET VE TEKNİK AYRINTILARINI İNCELE</span>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-72 rounded-2xl overflow-hidden shadow-2xl cursor-zoom-in" onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg")}>
          <img
            src="https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg"
            alt="Giosafe Giyotin Cam"
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
          />
        </div>
      </div>

      {/* GioSafe Features Grid */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">Neden GioSafe Giyotin Cam?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">Sıradan giyotin sistemlerinin aksine GioSafe detaylarda gizlenmiş yüksek mühendislik ve emniyet içerir. (Detayları görmek için kartlara tıklayın)</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProduct({
                name: feat.title,
                desc: feat.desc,
                img: "https://static.wixstatic.com/media/14c4c5_d21fe1aec7174ee1a998c3def23f63d8~mv2.jpg",
                brand: "WINNICE GIO-SAFE",
                specs: ["GioSafe Yalıtım ve Emniyet Kriteri", "10 Yıl Bedük Group Güvencesi"]
              })}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/10 space-y-3 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:border-brand-blue"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center font-display font-bold text-brand-blue text-sm">
                0{idx + 1}
              </div>
              <h5 className="font-display font-bold text-sm text-slate-800 dark:text-white tracking-tight">{feat.title}</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Gallery / Detail Photos */}
      <div className="space-y-6">
        <h4 className="font-display font-extrabold text-lg text-slate-800 dark:text-white">GioSafe Detay Görselleri <span className="text-xs font-normal text-slate-550 dark:text-slate-450 tracking-normal">(Resimleri büyütmek için tıklayın)</span></h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative rounded-2xl overflow-hidden h-96 shadow-md border border-slate-250 dark:border-slate-850 cursor-pointer group"
               onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_56a9876195f34c688698b62b8711d956f000.jpg")}>
            <img
              src="https://static.wixstatic.com/media/14c4c5_56a9876195f34c688698b62b8711d956f000.jpg"
              alt="Giosafe Vasistas Açılımı"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
              <span className="text-white text-xs font-sans leading-tight">Güvenli temizlik için vasistas konumda durabilen kanat yapısı.</span>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-96 shadow-md border border-slate-250 dark:border-slate-850 cursor-pointer group"
               onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_874390457ede46b7b8ac1878c2f11829f000.jpg")}>
            <img
              src="https://static.wixstatic.com/media/14c4c5_874390457ede46b7b8ac1878c2f11829f000.jpg"
              alt="Giosafe Zincir Yatağı"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
              <span className="text-white text-xs font-sans leading-tight">Yalnızca paslanmaz krom zincir kullanılan kaldırma yatakları.</span>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-96 shadow-md border border-slate-250 dark:border-slate-850 cursor-pointer group"
               onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_137d57d211514f95b81366fe12498dcdf000.jpg")}>
            <img
              src="https://static.wixstatic.com/media/14c4c5_137d57d211514f95b81366fe12498dcdf000.jpg"
              alt="Giosafe Emniyet Sensörleri"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
              <span className="text-white text-xs font-sans leading-tight">Üstün çocuk koruma kilidi ve Safety Use patentli sensörleri.</span>
            </div>
            <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAB 4: BIOKLIMATIK & KIŞ BAHÇESİ (MAGIC ROOF)
// ----------------------------------------------------
function PergolaTab({ onSelectProduct, onZoomImage }: TabProps) {
  const advantages = [
    {
      title: "Güneş Koruması",
      desc: "Alüminyum tavan panellerinin yönünü uzaktan kumanda ile 45°, 90° ve 135° açılara ayarlayarak güneş ışınlarını dilediğiniz gibi kontrol edebilirsiniz.",
      img: "https://static.wixstatic.com/media/14c4c5_0cea8c5fe3eb43adb9f31cd439b1d6fd~mv2.jpg",
      specs: ["45°, 90°, 135° Yönlendirme Açıları", "Güneş Işınlarından Tam Koruma", "Motorlu Kumanda Altyapısı"]
    },
    {
      title: "Yağışlardan Korunma",
      desc: "Özel tasarlanmış tırnaklı alüminyum paneller suyu toplayarak yan taşıyıcı kolonlar içindeki gizli gider hatları ile pergolanın dışına sızdırmadan aktarır.",
      img: "https://static.wixstatic.com/media/14c4c5_703f4da83acf4572aeeaf3ebeceee4f9~mv2.jpg",
      specs: ["Gizli Kolon İçi Yağmur Olukları", "Kilitli Su Sızdırmaz Diş Yapısı", "Maksimum Su İzolasyonu"]
    },
    {
      title: "Çevresel LED Işık",
      desc: "Mimarinize entegre edilen çevresel led aydınlatma sistemi sayesinde pergola alanınız hem içeriden hem dışarıdan göz kamaştırıcı ve prestijli bir görüntü kazanır.",
      img: "https://static.wixstatic.com/media/14c4c5_2c8d1c96a0074a4da7badaf115a75c23~mv2.jpg",
      specs: ["Mimari LED Entegrasyon", "İç ve Dış Çevresel Estetik", "Enerji Tasarruflu LED Teknolojisi"]
    },
    {
      title: "Doğal Havalandırma",
      desc: "Panel açıları sayesinde yazın iç mekandaki sıcak havayı tahliye ederek ferah havalandırma sağlar, kışın ise tam kapatılarak iç ortam sıcaklığını muhafaza eder.",
      img: "https://static.wixstatic.com/media/14c4c5_b40ed0bceedc4f1eac1b44925752458c~mv2.jpg",
      specs: ["Isı Korunum Hesaplaması", "Sıcak/Soğuk Denge Ayarı", "İç Ortam Hava Sirkülasyonu"]
    },
    {
      title: "Entegre LED Spotlar",
      desc: "Paneller arasına entegre edilmiş Samsung/Osram led aydınlatmalar ile gözü yormayan, son derece şık ambiyanslar yaratırsınız.",
      img: "https://static.wixstatic.com/media/14c4c5_7b10990e4c5445aa8770e4f100f3333c~mv2.jpg",
      specs: ["Paneller Arası Entegre Spotlar", "Samsung / Osram LED Donanımı", "Dimmer (Işık Seviye) Desteği"]
    },
    {
      title: "Mükemmel İzolasyon",
      desc: "Tavan panellerinin uç kısımlarındaki tırnaklı kilit mekanizmaları sayesinde sistem tam kapatıldığında rüzgar ve kar geçişini sıfırlayan sızdırmazlık elde edilir.",
      img: "https://static.wixstatic.com/media/14c4c5_1db6b937d9f043bc978d2029f6a53a3b~mv2.jpg",
      specs: ["Tırnaklı Geçme Kilit Sistemi", "Kar ve Rüzgar Mukavemeti", "Hava Sızdırmaz Özel Mastik/Conta"]
    }
  ];

  return (
    <div className="space-y-16">
      {/* Intro Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 dark:bg-slate-900/30 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
        <div className="lg:col-span-7 space-y-4 text-left">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">WINPERAX MİMARİ ÇÖZÜMLERİ</span>
          <h3 className="font-display text-2xl lg:text-3xl font-black tracking-tight text-slate-800 dark:text-white">
            Magic Roof Bioklimatik Açılır Tavan & Kış Bahçesi
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
            Magic Roof; yenilikçi açılır tavan ve motorlu cam kapama sistemlerinin mükemmel uyumla bir arada kullanılabildiği, dört mevsim konfor sunan yeni nesil dış mekan yapı sistemidir. Sabit tavan, açılır cam tavan veya alüminyum bioklimatik pergola tavan seçenekleri ile bahçelerinize prestij katıyoruz.
          </p>
          <div className="pt-2 flex flex-wrap gap-3.5">
            <span className="inline-flex items-center space-x-2 text-xs font-bold text-brand-accent uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Bağımsız veya Yapıya Entegre Kurulum</span>
            </span>
          </div>
        </div>
        <div className="lg:col-span-5 relative h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-850 cursor-zoom-in"
             onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_0a36012b65294ed7b7096cc649bde5a6~mv2.jpeg")}>
          <img
            src="https://static.wixstatic.com/media/14c4c5_0a36012b65294ed7b7096cc649bde5a6~mv2.jpeg"
            alt="Magic Roof Bioklimatik Pergola"
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Advantages Grid */}
      <div className="space-y-6">
        <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">Magic Roof Teknolojisi ve Avantajları <span className="text-xs font-normal text-slate-550 dark:text-slate-450 tracking-normal">(Ayrıntıları görmek için kartlara tıklayın)</span></h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              onClick={() => onSelectProduct({
                name: adv.title,
                desc: adv.desc,
                img: adv.img,
                specs: adv.specs,
                brand: "WINPERAX MAGIC ROOF"
              })}
              className="group glass-effect border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={adv.img}
                    alt={adv.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <h5 className="font-display font-bold text-base text-slate-800 dark:text-white group-hover:text-brand-blue transition-colors">
                    {adv.title}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {adv.desc}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-brand-blue transition-colors">
                <span>Magic Roof Teknolojisi</span>
                <span>DETAYI GÖR</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TAB 5: ALÜMİNYUM MİMARİ CEPHE
// ----------------------------------------------------
function AluminyumTab({ onSelectProduct, onZoomImage }: TabProps) {
  const specs = [
    "Kapaklı ve Silikon Giydirme Cephe Sistemleri",
    "Isı yalıtımlı lüks kapı ve pencere doğramaları",
    "Ofis içi minimalist alüminyum ve cam ara bölme modülleri",
    "Geniş cam açıklıklar için yalıtımlı Hebe-Schiebe sürme kapılar",
    "Uluslararası standartlarda fırın boyalı eloksal renk çeşitleri",
    "Deprem dayanımlı ve yüksek rüzgar dirençli statik profil mukavemeti"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div className="lg:col-span-7 space-y-6 text-left">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest block">MİMARİ PROJELENDİRME VE UYGULAMA</span>
        <h3 className="font-display text-3xl font-black tracking-tight text-slate-800 dark:text-white">
          Alüminyum Giydirme Cephe & Doğrama
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
          Bina dış cephelerine modern ve prestijli bir vizyon kazandıran alüminyum silikon cephe, kapaklı cephe ve yalıtımlı alüminyum doğrama sistemlerini projenizin statik gereksinimlerine göre üretiyoruz. Plazalar, iş merkezleri ve modern konut projelerinde yüksek mukavemet ve şıklığı bir arada sunuyoruz.
        </p>

        <div className="space-y-3.5">
          <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Uygulama Alanları</span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specs.map((spec, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-650 dark:text-slate-350">
                <CheckCircle className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onSelectProduct({
              name: "Alüminyum Mimari Cephe Sistemleri",
              desc: "Plaza ve ticari yapılar için yüksek mukavemetli alüminyum silikon ve kapaklı cephe giydirme çözümleri.",
              img: "https://static.wixstatic.com/media/14c4c5_8b3338ede0034857a99f10b49c6a9d6b~mv2.jpg",
              brand: "BEDÜK MİMARİ",
              specs: specs
            })}
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-slate-900 bg-slate-100 hover:bg-slate-200 px-6 py-3.5 rounded-xl transition-colors border border-slate-255"
          >
            <span>TÜM DETAYLARI GÖSTER</span>
            <Info className="w-3.5 h-3.5" />
          </button>
          <Link href="/iletisim" className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-white bg-slate-900 hover:bg-slate-850 px-6 py-3.5 rounded-xl transition-colors shadow-md">
            <span>PROJENİZ İÇİN TEKLİF ALIN</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="lg:col-span-5 relative h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 cursor-zoom-in"
           onClick={() => onZoomImage("https://static.wixstatic.com/media/14c4c5_8b3338ede0034857a99f10b49c6a9d6b~mv2.jpg")}>
        <img
          src="https://static.wixstatic.com/media/14c4c5_8b3338ede0034857a99f10b49c6a9d6b~mv2.jpg"
          alt="Alüminyum Cephe Sistemleri"
          className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-8">
          <div className="text-white space-y-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand-accent">BEDÜK MİMARİ</span>
            <h4 className="font-display font-bold text-lg">Giydirme Cephe Çözümleri</h4>
          </div>
        </div>
        <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-80 hover:opacity-100 transition-opacity">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
