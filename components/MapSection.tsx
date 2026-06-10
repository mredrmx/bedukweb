"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LocationInfo {
  id: "showroom" | "factory";
  title: string;
  name: string;
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  hours: string;
  mapEmbedUrl: string;
  mapExternalUrl: string;
}

const locations: LocationInfo[] = [
  {
    id: "showroom",
    title: "Showroom",
    name: "Bedük Group Showroom",
    address: "Pazar Mah. 100. Yıl Bulvarı 63/B İlkadım - SAMSUN",
    phone: "+90 532 739 08 59",
    phoneRaw: "+905327390859",
    email: "satis@bedukgroup.com",
    hours: "Pazartesi - Cumartesi: 08:30 - 18:30",
    mapEmbedUrl: "https://maps.google.com/maps?q=41.295564,36.328971&z=16&output=embed",
    mapExternalUrl: "https://maps.app.goo.gl/FgUmqdfYra2Jk9tr8",
  },
  {
    id: "factory",
    title: "Fabrika",
    name: "Bedük Group Fabrika",
    address: "Toybelen Mh. Anadolu Bulvarı NO:168 İlkadım - SAMSUN",
    phone: "+90 532 739 08 59",
    phoneRaw: "+905327390859",
    email: "info@bedukgroup.com",
    hours: "Pazartesi - Cumartesi: 08:30 - 18:30",
    mapEmbedUrl: "https://maps.google.com/maps?q=Toybelen+Mh.+Anadolu+Bulvar%C4%B1+NO:168+İlkad%C4%B1m+SAMSUN&z=15&output=embed",
    mapExternalUrl: "https://www.google.com/maps/search/?api=1&query=Toybelen+Mh.+Anadolu+Bulvar%C4%B1+NO:168+İlkad%C4%B1m+SAMSUN",
  },
];

export default function MapSection() {
  const [activeTab, setActiveTab] = useState<"showroom" | "factory">("showroom");
  const activeLocation = locations.find((loc) => loc.id === activeTab) || locations[0];

  return (
    <section className="w-full py-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue dark:text-brand-accent">
            LOKASYONLARIMIZ
          </span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
            Bizi Ziyaret Edin
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">
            Showroom veya fabrikamızın konumunu harita üzerinde inceleyebilir, yol tarifi alabilirsiniz.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-slate-200/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-250 dark:border-slate-800">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveTab(loc.id)}
                className={`px-6 py-2.5 rounded-xl font-display text-sm font-bold tracking-wide transition-all duration-300 ${
                  activeTab === loc.id
                    ? "bg-white dark:bg-slate-800 text-brand-blue dark:text-brand-accent shadow-md"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {loc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Map & Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Info Card */}
          <div className="lg:col-span-4 flex flex-col justify-between p-8 glass-effect border border-slate-200 dark:border-slate-800/80 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-bl-[100px] pointer-events-none" />
            
            <div className="space-y-6 z-10">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">
                  {activeLocation.name}
                </h3>
                <p className="text-xs text-slate-405 dark:text-slate-500 mt-1 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {activeLocation.hours}
                </p>
              </div>

              <div className="space-y-4 font-sans text-sm">
                <div className="flex items-start space-x-3 text-slate-600 dark:text-slate-350">
                  <MapPin className="w-5 h-5 text-brand-blue dark:text-brand-accent flex-shrink-0 mt-0.5" />
                  <span>{activeLocation.address}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-blue dark:text-brand-accent" />
                  <a
                    href={`tel:${activeLocation.phoneRaw}`}
                    className="text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-accent transition-colors font-medium"
                  >
                    {activeLocation.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-brand-blue dark:text-brand-accent" />
                  <a
                    href={`mailto:${activeLocation.email}`}
                    className="text-slate-700 dark:text-slate-200 hover:text-brand-blue dark:hover:text-brand-accent transition-colors font-medium"
                  >
                    {activeLocation.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 z-10">
              <a
                href={activeLocation.mapExternalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl font-display text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-accent hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/10 transition-all duration-300"
              >
                <Navigation className="w-4 h-4 animate-pulse" />
                <span>YOL TARİFİ AL</span>
              </a>
            </div>
          </div>

          {/* Right: Map Iframe */}
          <div className="lg:col-span-8 h-[400px] lg:h-auto min-h-[350px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg relative bg-slate-100 dark:bg-slate-900">
            <AnimatePresence mode="wait">
              <motion.iframe
                key={activeLocation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={activeLocation.mapEmbedUrl}
                className="w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-[180deg] dark:contrast-[1.2]"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
