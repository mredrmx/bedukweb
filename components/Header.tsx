"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Anasayfa", href: "/" },
  { name: "Kurumsal", href: "/kurumsal" },
  { name: "Ürünlerimiz", href: "/urunlerimiz" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-display font-extrabold text-2xl tracking-wider bg-gradient-to-r from-brand-blue via-brand-accent to-indigo-500 bg-clip-text text-transparent">
                  BEDÜK
                </span>
                <span className="font-display font-medium text-xs tracking-widest text-slate-400 dark:text-slate-500 uppercase pt-1.5">
                  Group
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-1 py-2 font-display text-sm font-medium tracking-wide transition-colors duration-200 hover:text-brand-blue ${
                      isActive
                        ? "text-brand-blue dark:text-brand-accent"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBorder"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-blue to-brand-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Call Action Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:+905327390859"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-full font-display text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-accent hover:from-blue-600 hover:to-cyan-500 shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>BİZİ ARAYIN</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-45 md:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-900/95 dark:bg-brand-dark/95 backdrop-blur-lg overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-display text-base font-medium transition-colors ${
                      isActive
                        ? "text-brand-blue bg-blue-50/5 dark:text-brand-accent dark:bg-blue-950/25"
                        : "text-slate-300 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <a
                  href="tel:+905327390859"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl font-display text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-accent shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>BİZİ ARAYIN</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
