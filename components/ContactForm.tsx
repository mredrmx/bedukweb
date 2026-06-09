"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FormState {
  name: string;
  phone: string;
  email: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const categories = [
  { value: "pvc", label: "PVC Kapı ve Pencere Sistemleri" },
  { value: "cam-balkon", label: "Cam Balkon Sistemleri" },
  { value: "giyotin", label: "Giyotin Cam Sistemleri" },
  { value: "pergola", label: "Kış Bahçesi & Bioklimatik Pergola" },
  { value: "diger", label: "Diğer / Genel Soru" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    category: "pvc",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      tempErrors.name = "Adınız ve soyadınız gereklidir.";
    } else if (formData.name.trim().length < 3) {
      tempErrors.name = "Lütfen geçerli bir ad girin (en az 3 karakter).";
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Telefon numaranız gereklidir.";
    } else {
      const phoneRegex = /^[0-9+()-\s]{10,15}$/;
      if (!phoneRegex.test(formData.phone)) {
        tempErrors.phone = "Lütfen geçerli bir telefon numarası girin.";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        tempErrors.email = "Lütfen geçerli bir e-posta adresi girin.";
      }
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Lütfen mesajınızı yazın.";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Mesajınız en az 10 karakter olmalıdır.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific error as user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Talep gönderilemedi.");
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        category: "pvc",
        message: "",
      });
    } catch (error) {
      alert("Talebiniz gönderilirken bir hata oluştu. Lütfen doğrudan bizimle iletişime geçin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full glass-effect rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue to-brand-accent" />

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            noValidate
          >
            <div className="text-left space-y-2 mb-4">
              <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">Hızlı Teklif Formu</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Aşağıdaki alanları doldurarak bizimle iletişime geçebilirsiniz. Uzman ekibimiz en kısa sürede size dönüş sağlayacaktır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ahmet Yılmaz"
                  className={`w-full px-4 py-3.5 rounded-xl text-sm bg-slate-100/50 dark:bg-slate-900/50 border ${
                    errors.name ? "border-red-500/80 focus:border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-brand-blue"
                  } outline-none transition-colors`}
                />
                {errors.name && (
                  <span className="flex items-center space-x-1 text-xs text-red-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </span>
                )}
              </div>

              {/* Phone Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Telefon Numarası *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0532 739 08 59"
                  className={`w-full px-4 py-3.5 rounded-xl text-sm bg-slate-100/50 dark:bg-slate-900/50 border ${
                    errors.phone ? "border-red-500/80 focus:border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-brand-blue"
                  } outline-none transition-colors`}
                />
                {errors.phone && (
                  <span className="flex items-center space-x-1 text-xs text-red-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Input */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ahmet@example.com"
                  className={`w-full px-4 py-3.5 rounded-xl text-sm bg-slate-100/50 dark:bg-slate-900/50 border ${
                    errors.email ? "border-red-500/80 focus:border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-brand-blue"
                  } outline-none transition-colors`}
                />
                {errors.email && (
                  <span className="flex items-center space-x-1 text-xs text-red-500 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </span>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  İlgilendiğiniz Ürün Grubu
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl text-sm bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-brand-blue outline-none transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value} className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Mesajınız *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Ölçülerinizi ya da aklınızdaki projeyi buraya yazarak hızlı teklif alabilirsiniz..."
                className={`w-full px-4 py-3.5 rounded-xl text-sm bg-slate-100/50 dark:bg-slate-900/50 border ${
                  errors.message ? "border-red-500/80 focus:border-red-500" : "border-slate-200 dark:border-slate-800 focus:border-brand-blue"
                } outline-none transition-colors resize-none`}
              />
              {errors.message && (
                <span className="flex items-center space-x-1 text-xs text-red-500 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.message}</span>
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center space-x-2 py-4 rounded-xl font-display text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-brand-blue to-brand-accent hover:from-blue-600 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/10 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>GÖNDERİLİYOR...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TEKLİF TALEBİ GÖNDER</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center py-16 space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shadow-lg shadow-green-500/5">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-extrabold text-2xl text-slate-800 dark:text-white">Talebiniz Başarıyla Alındı!</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                Teklif talebiniz ekibimize ulaştı. Projeniz doğrultusunda en geç 24 saat içinde sizinle iletişime geçeceğiz.
              </p>
            </div>
            <button
              onClick={() => setIsSuccess(false)}
              className="px-6 py-2.5 rounded-xl font-display text-xs font-bold tracking-wider text-brand-blue dark:text-brand-accent border border-brand-blue/20 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors uppercase"
            >
              YENİ FORM DOLDUR
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
