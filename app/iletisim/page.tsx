import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import MapSection from "@/components/MapSection";
import { Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink } from "lucide-react";

export const metadata = {
  title: "İletişim | Bedük Group",
  description: "Bedük Group Samsun Showroom ve Fabrika adres bilgileri, telefon numaraları, e-posta adresleri ve teklif başvuru formu.",
};

export default function Iletisim() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Sub-Hero Section */}
        <section className="relative py-24 bg-slate-900 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/15 to-brand-accent/5 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
              BİZE ULAŞIN
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight">
              Bizi Arayın, Yaşamınıza Değer Katalım
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
              Showroom veya fabrika tesislerimizi ziyaret edebilir, telefon veya form aracılığıyla hızlıca fiyat teklifi alabilirsiniz.
            </p>
          </div>
        </section>

        {/* Contact Info & Form Grid */}
        <section className="py-24 relative grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Left Column: Contact Details */}
              <div className="lg:col-span-5 space-y-10 text-left">
                <div className="space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent">
                    İLETİŞİM KANALLARI
                  </span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
                    Samsun Merkezli Bölgesel Hizmet
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base font-sans leading-relaxed">
                    Bedük Group olarak, Karadeniz Bölgesi genelinde geniş bir bayi ve montaj servis altyapısı ile hizmet sunuyoruz. Taleplerinizi doğrudan teknik ofisimizle görüşebilirsiniz.
                  </p>
                </div>

                {/* Location Cards */}
                <div className="space-y-6">
                  {/* Showroom Card */}
                  <div className="glass-effect border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-[80px]" />
                    
                    <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-brand-blue rounded-full" />
                      <span>Bedük Group Showroom</span>
                    </h3>
                    <ul className="space-y-3.5 text-xs sm:text-sm font-sans">
                      <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-350">
                        <MapPin className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                        <a
                          href="https://maps.app.goo.gl/FgUmqdfYra2Jk9tr8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-blue transition-colors hover:underline"
                        >
                          Pazar Mah. 100. Yıl Bulvarı 63/B İlkadım - SAMSUN
                        </a>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-brand-blue" />
                        <a href="tel:+905327390859" className="text-slate-700 dark:text-slate-200 hover:text-brand-blue transition-colors font-medium">
                          +90 532 739 08 59
                        </a>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-brand-blue" />
                        <a href="mailto:satis@bedukgroup.com" className="text-slate-700 dark:text-slate-200 hover:text-brand-blue transition-colors font-medium">
                          satis@bedukgroup.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Factory Card */}
                  <div className="glass-effect border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-accent/5 to-transparent rounded-bl-[80px]" />
                    
                    <h3 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
                      <span className="w-1.5 h-6 bg-brand-accent rounded-full" />
                      <span>Bedük Group Fabrika</span>
                    </h3>
                    <ul className="space-y-3.5 text-xs sm:text-sm font-sans">
                      <li className="flex items-start space-x-3 text-slate-600 dark:text-slate-350">
                        <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-0.5" />
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=Toybelen+Mh.+Anadolu+Bulvar%C4%B1+NO:168+İlkad%C4%B1m+SAMSUN"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-accent transition-colors hover:underline"
                        >
                          Toybelen Mh. Anadolu Bulvarı NO:168 İlkadım - SAMSUN
                        </a>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-brand-accent" />
                        <a href="tel:+905327390859" className="text-slate-700 dark:text-slate-200 hover:text-brand-accent transition-colors font-medium">
                          +90 532 739 08 59
                        </a>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-brand-accent" />
                        <a href="mailto:info@bedukgroup.com" className="text-slate-700 dark:text-slate-200 hover:text-brand-accent transition-colors font-medium">
                          info@bedukgroup.com
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Hours info */}
                  <div className="flex items-center space-x-3 px-4 text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>Çalışma Saatlerimiz: Pazartesi - Cumartesi: 08:30 - 18:30</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Form Component */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <MapSection />
      </main>

      <Footer />
    </div>
  );
}
