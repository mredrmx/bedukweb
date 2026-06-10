import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-2xl tracking-wider bg-gradient-to-r from-brand-blue to-brand-accent bg-clip-text text-transparent">
                BEDÜK
              </span>
              <span className="font-display font-medium text-xs tracking-widest text-slate-500 uppercase pt-1.5">
                Group
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              2000 yılında sektöre adım atan Bedük Grup, çeyrek asırlık deneyimi ve son teknoloji üretim tesisleri ile inşaat ve yapı sistemlerinde kaliteyi şekillendiriyor.
            </p>
            <div className="flex items-center space-x-2.5 text-xs text-brand-accent font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
              <span>10 YIL SİSTEM GARANTİSİ</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="font-display text-white font-semibold text-sm tracking-wider uppercase">
              KURUMSAL
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <span>Anasayfa</span>
                </Link>
              </li>
              <li>
                <Link href="/kurumsal" className="hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <span>Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <span>Ürünlerimiz</span>
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="hover:text-white transition-colors duration-200 flex items-center space-x-1">
                  <span>İletişim</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="space-y-6">
            <h3 className="font-display text-white font-semibold text-sm tracking-wider uppercase">
              ÜRÜNLERİMİZ
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200">
                  PVC Kapı & Pencere (Asaşpen)
                </Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200">
                  Katlanır Cam Balkon Sistemleri
                </Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200">
                  Isıcamlı Sürme Cam Balkon
                </Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200">
                  Giyotin & Isıcamlı Sürme Cam
                </Link>
              </li>
              <li>
                <Link href="/urunlerimiz" className="hover:text-white transition-colors duration-200">
                  Bioklimatik Pergola & Kış Bahçesi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <h3 className="font-display text-white font-semibold text-sm tracking-wider uppercase">
              İLETİŞİM BİLGİLERİ
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-xs tracking-wider uppercase mb-0.5">Showroom</span>
                  <a
                    href="https://maps.app.goo.gl/FgUmqdfYra2Jk9tr8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors hover:underline"
                  >
                    Pazar Mah. 100. Yıl Bulvarı 63/B İlkadım / Samsun
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-xs tracking-wider uppercase mb-0.5">Fabrika</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Toybelen+Mh.+Anadolu+Bulvar%C4%B1+NO:168+İlkad%C4%B1m+SAMSUN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors hover:underline"
                  >
                    Toybelen Mh. Anadolu Bulvarı No:168 İlkadım / Samsun
                  </a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-blue" />
                <a href="tel:+905327390859" className="hover:text-white transition-colors">
                  +90 532 739 08 59
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-accent" />
                <a href="mailto:satis@bedukgroup.com" className="hover:text-white transition-colors">
                  satis@bedukgroup.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} Bedük Group. Tüm hakları saklıdır.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/kurumsal" className="hover:text-slate-400 transition-colors">
              Vizyon & Misyon
            </Link>
            <Link href="/urunlerimiz" className="hover:text-slate-400 transition-colors">
              Çözüm Ortakları
            </Link>
            <Link href="/iletisim" className="hover:text-slate-400 transition-colors">
              Destek
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
