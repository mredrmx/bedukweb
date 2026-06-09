"use client";

import { motion } from "framer-motion";
import { MessageSquareCode } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "905398315399";
  const message = "Merhaba, web siteniz üzerinden ulaşıyorum. Ürünleriniz hakkında bilgi alabilir miyim?";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba59] transition-all duration-300 hover:scale-108 focus:outline-none"
        aria-label="WhatsApp ile İletişime Geçin"
      >
        {/* Pulsing ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none pointer-events-none" />

        {/* WhatsApp SVG Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.388 1.981 13.93 1.021 11.3 1.02 5.866 1.02 1.441 5.391 1.437 10.82c-.001 1.564.417 3.094 1.212 4.485l-1.005 3.67 3.771-.979.232.138z" />
          <path d="M17.472 14.382c-.3-.149-1.778-.878-2.046-.976-.267-.099-.463-.149-.658.149-.195.297-.754.939-.925 1.135-.17.197-.34.22-.64.072-.3-.149-1.272-.469-2.428-1.5-.899-.802-1.505-1.792-1.682-2.091-.177-.3-.02-.462.13-.61.135-.133.3-.35.45-.525.15-.175.2-.299.3-.5.1-.2.05-.375-.025-.526-.075-.15-.658-1.586-.902-2.175-.243-.582-.488-.504-.658-.513-.17-.008-.364-.01-.559-.01-.195 0-.514.072-.782.366-.268.297-1.024 1.001-1.024 2.44 0 1.439 1.047 2.827 1.193 3.024.145.197 2.057 3.141 4.985 4.41 1.687.731 2.37.893 3.207.82.936-.067 1.778-.457 2.026-.88.247-.423.247-.786.173-.88-.074-.094-.27-.149-.57-.298z" />
        </svg>

        {/* Hover Tooltip */}
        <div className="absolute right-16 px-3 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-white text-xs font-semibold tracking-wide whitespace-nowrap shadow-xl scale-0 group-hover:scale-100 origin-right transition-transform duration-250 border border-slate-700/30">
          WhatsApp ile Yazın
        </div>
      </a>
    </motion.div>
  );
}
