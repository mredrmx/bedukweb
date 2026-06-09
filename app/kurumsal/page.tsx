import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ShieldAlert, Cpu, Sparkles, Ruler, FileText, CheckSquare, ShieldCheck, Milestone } from "lucide-react";

export const metadata = {
  title: "Kurumsal | Bedük Group",
  description: "20 yılı aşkın tecrübesiyle Samsun ve Karadeniz bölgesinde PVC ve Cam Balkon sistemleri imalatı yapan Bedük Group'un fabrika tesisleri, vizyon ve misyonu.",
};

const steps = [
  {
    icon: <Ruler className="w-6 h-6 text-brand-blue" />,
    title: "1. Yerinde Ölçü ve Projelendirme",
    desc: "Talepleriniz doğrultusunda teknik ekibimiz yerinde milimetrik ölçü alır. Size özel çözülen ve maliyetlendirilen proje teklif döngüsünden onayınıza sunulur.",
  },
  {
    icon: <FileText className="w-6 h-6 text-brand-accent" />,
    title: "2. Fabrika İmalat Süreci",
    desc: "Teklif onayınız ile fabrikada imalat başlar. Depodan çekilen profiller, hi-tech CNC makinelerde sıfır hata ve milimetre hassasiyetinde kesilerek işlenir.",
  },
  {
    icon: <CheckSquare className="w-6 h-6 text-indigo-400" />,
    title: "3. Profesyonel Montaj",
    desc: "Uzman montaj kadromuz doğrama, cam, sineklik gibi tüm bileşenleri titizlikle hazırlar ve montaj mahallinde yerinde kurulum işlemlerini gerçekleştirir.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-400" />,
    title: "4. 10 Yıl Sistem Garantisi",
    desc: "Bedük Group bünyesindeki tüm sistemler ve imalatlar, kullanım ekonomileri ve malzeme dayanımı açısından 10 yıl boyunca garanti kapsamımız altındadır.",
  },
];

const values = [
  "Müşterileri için yenilikçi çözümler üreten ve katma değer sağlayan,",
  "Topluma, doğaya ve çevreye karşı sorumluluklarının bilincinde saygılı,",
  "Adil; çalışanlarının ve ürünlerinin güvenliği için tavizsiz standartlar uygulayan,",
  "Geleneği unutmadan, çağdaş teknolojileri takip eden yenilikçi yapı,",
  "Eğitime ve geleceğe yatırım yaparak ulusal değer yaratan bir marka olmak.",
];

export default function Kurumsal() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Sub-Hero / Header Section */}
        <section className="relative py-24 bg-slate-900 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/15 to-brand-accent/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              BEDÜK GROUP HAKKINDA
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Kurumsal Profilimiz
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              2000 yılından bu yana kalite ve güven ilkelerimizden ödün vermeden, gelecek nesillere aktaracağımız prestijli değerler inşa ediyoruz.
            </p>
          </div>
        </section>

        {/* Narrative / About Us History */}
        <section className="py-24 relative grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left Column: Text */}
              <div className="space-y-6 text-left">
                <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                  Çeyrek Asırlık Deneyim ve Güven
                </h2>
                <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                  2000 yılında sektöre adım atan Bedük Grup, çeyrek asra yaklaşan deneyimiyle inşaat ve yapı sistemleri alanında Karadeniz Bölgesi&apos;nde öncü bir marka haline gelmiştir. PVC kapı ve pencere sistemleriyle başladığımız yolculuğumuzu, değişen müşteri ihtiyaçlarına yanıt verecek şekilde Cam Balkon ve Alüminyum Cephe Sistemleri gibi yenilikçi çözümlerle genişlettik.
                </p>
                <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                  Üretim süreçlerimizin tamamında uluslararası kalite standartlarına bağlı kalarak; enerji verimliliği, yüksek dayanıklılık ve modern estetiği tek bir çatıda sunuyoruz. Alanında uzman teknik kadromuzla geliştirdiğimiz müşteri odaklı çözümler ve satış sonrası kesintisiz teknik destek süreçlerimizle uzun vadeli, güvene dayalı ortaklıklar kuruyoruz.
                </p>
                <p className="text-sm sm:text-base text-slate-650 dark:text-slate-350 leading-relaxed font-sans">
                  2025 yılında faaliyete geçirdiğimiz, son teknolojiye sahip fabrikamızla üretim kapasitemizi artırarak daha geniş kitlelere ulaşmayı amaçlıyoruz. Geçmişin köklü birikimini geleceğin akıllı teknolojileriyle harmanlayarak fonksiyonel ve sürdürülebilir mimari sistemler sunmaya devam ediyoruz.
                </p>
              </div>

              {/* Right Column: Mission, Vision */}
              <div className="glass-effect rounded-3xl p-8 lg:p-10 space-y-8 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-white flex items-center space-x-2.5 mb-4">
                    <Milestone className="w-5 h-5 text-brand-blue" />
                    <span>Vizyon & Misyonumuz</span>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-sans leading-relaxed mb-6">
                    Sektörde kalite ve güvenilirlik anlayışı ile öne çıkarak, ulusal platformda saygı duyulan öncü değerler yaratmayı hedefliyoruz.
                  </p>
                </div>

                <div className="space-y-4">
                  {values.map((val, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm">
                      <div className="p-1 rounded-full bg-blue-500/10 text-brand-blue flex-shrink-0 mt-0.5">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factory Gallery Section */}
        <section className="py-12 bg-slate-100/40 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative group overflow-hidden rounded-2xl h-64 shadow-md border border-slate-200/50 dark:border-slate-800/50">
                <img
                  src="https://static.wixstatic.com/media/14c4c5_44096d78a8b44cc5a9dc8d3b3df224d7~mv2.jpg"
                  alt="Bedük Group Samsun Fabrikası"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                  <span className="text-white font-display font-bold text-lg">Samsun Fabrikamız</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl h-64 shadow-md border border-slate-200/50 dark:border-slate-800/50">
                <img
                  src="https://static.wixstatic.com/media/14c4c5_567d6fa1aecc41e2a6b03c9da38088af~mv2.jpg"
                  alt="CNC Profil Kesim & İşleme Hattı"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                  <span className="text-white font-display font-bold text-lg">CNC Kesim & İmalat</span>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl h-64 shadow-md border border-slate-200/50 dark:border-slate-800/50">
                <img
                  src="https://static.wixstatic.com/media/14c4c5_ae62c7f746724a6d82d138af03bc35c8~mv2.jpg"
                  alt="Özenli İmalat & Montaj"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                  <span className="text-white font-display font-bold text-lg">Hassas Profil Montajı</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Manufacturing Capacity */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Stats Block */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                  ÜRETİM KAPASİTESİ
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Yüksek Teknolojili Modern Tesisler
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  Samsun ve Trabzon&apos;da kurulu modern fabrikalarımızda, robotik hi-tech CNC üretim hatlarımız ile kusursuz bir üretim standardı sunuyoruz.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-4">
                  <div className="border-l-2 border-brand-blue pl-4">
                    <span className="block font-display text-2xl font-bold">4000 m²</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Samsun Fabrikası</span>
                  </div>
                  <div className="border-l-2 border-brand-accent pl-4">
                    <span className="block font-display text-2xl font-bold">1500 m²</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Trabzon Tesisimiz</span>
                  </div>
                  <div className="border-l-2 border-indigo-400 pl-4 col-span-2">
                    <span className="block font-display text-2xl font-bold">150.000 m²</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Yıllık Üretim Kapasitesi</span>
                  </div>
                </div>
              </div>

              {/* Technical Description */}
              <div className="lg:col-span-7 glass-effect border border-slate-800 rounded-3xl p-8 lg:p-12 space-y-6 bg-slate-950/40">
                <div className="flex items-center space-x-3 mb-2">
                  <Cpu className="w-6 h-6 text-brand-accent" />
                  <h3 className="font-display font-extrabold text-lg text-white">Sıfır Hata & CNC Teknolojisi</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  Proje planlamasından başlayarak her bir profil, fabrikamıza entegre edilmiş yazılımlarımız aracılığıyla milimetrik hassasiyetle hesaplanır. Depomuzdan çekilen hammaddeler, CNC robot kesim istasyonlarında el değmeden kesilerek kanal ve aksesuar delikleri açılır.
                </p>
                <p className="text-sm text-slate-350 leading-relaxed font-sans">
                  Bu süreç, montaj sırasında oluşabilecek insan kaynaklı montaj hatalarının ve yalıtım zafiyetlerinin önüne geçer. İmalatı tamamlanan sistemler, kalite kontrol onayından geçtikten sonra koruyucu ambalajlarla kaplanarak şantiyeye sevk edilir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent">
                PROJE DÖNGÜSÜ
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                İşleyiş ve Hizmet Sürecimiz
              </h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
                Keşif aşamasından garanti sürecine kadar her adımda profesyonel standartlarımızı koruyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="glass-effect border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 inline-block">
                    {step.icon}
                  </div>
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
