"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Factory } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden grid-bg py-20">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-brand-accent/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-effect text-xs font-semibold tracking-wider text-brand-blue dark:text-brand-accent uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>YENİLİKÇİ YAPI TEKNOLOJİLERİ</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-glow leading-[1.1]"
            >
              Geleceğin Mimarisini{" "}
              <span className="bg-gradient-to-r from-brand-blue via-brand-accent to-indigo-400 bg-clip-text text-transparent">
                Güvenle
              </span>{" "}
              Şekillendiriyoruz
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-350 max-w-xl leading-relaxed font-sans"
            >
              23 yılı aşkın deneyimimiz, modern üretim tesislerimiz ve Türkiye’nin lider markaları (Asaşpen, Winnice) ile gerçekleştirdiğimiz güçlü iş birlikleriyle yaşam alanlarınıza değer katıyoruz.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/urunlerimiz"
                className="group flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-display text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-brand-blue via-blue-600 to-brand-accent hover:from-blue-600 hover:to-cyan-500 shadow-xl shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>ÜRÜNLERİMİZİ İNCELEYİN</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/iletisim"
                className="flex items-center justify-center px-8 py-4 rounded-xl font-display text-sm font-semibold tracking-wider text-slate-700 dark:text-slate-200 glass-effect hover:bg-slate-100 dark:hover:bg-slate-800/40 border border-slate-200 dark:border-slate-800 transition-all duration-350"
              >
                <span>Teklif Alın</span>
              </Link>
            </motion.div>
          </div>

          {/* Graphical Representation / Featured Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient behind elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-brand-accent/5 rounded-3xl blur-2xl pointer-events-none" />

            <div className="w-full max-w-md space-y-6 relative z-10">
              {/* Feature Box 1 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-effect rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300 flex items-start space-x-4"
              >
                <div className="p-3.5 rounded-xl bg-blue-500/10 text-brand-blue flex-shrink-0">
                  <Factory className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Modern Üretim Gücü</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Samsun ve Trabzon tesislerimizde Hi-Tech CNC parkuru ile yıllık 150.000 m² kapasite.
                  </p>
                </div>
              </motion.div>

              {/* Feature Box 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="glass-effect rounded-2xl p-6 shadow-xl hover:-translate-y-1 transition-transform duration-300 flex items-start space-x-4"
              >
                <div className="p-3.5 rounded-xl bg-cyan-500/10 text-brand-accent flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-800 dark:text-white text-base">Güçlü Çözüm Ortakları</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Asaşpen kalitesiyle PVC, Winnice ortaklığıyla birinci sınıf cam balkon ve pergola çözümleri.
                  </p>
                </div>
              </motion.div>

              {/* Stat Pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center justify-around py-4 px-6 rounded-2xl glass-effect border border-brand-blue/20 shadow-lg"
              >
                <div className="text-center">
                  <span className="block font-display text-2xl font-black text-brand-blue dark:text-brand-accent">23+</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">YILLIK DENEYİM</span>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                <div className="text-center">
                  <span className="block font-display text-2xl font-black text-brand-blue dark:text-brand-accent">4000m²</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">SAMSUN FABRİKA</span>
                </div>
                <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
                <div className="text-center">
                  <span className="block font-display text-2xl font-black text-brand-blue dark:text-brand-accent">10 Yıl</span>
                  <span className="text-xs text-slate-500 uppercase tracking-widest">GARANTİ</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
