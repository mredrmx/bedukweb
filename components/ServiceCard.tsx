import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import React from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  icon: React.ReactNode;
  image?: string;
}
 
export default function ServiceCard({
  title,
  description,
  features,
  href,
  icon,
  image,
}: ServiceCardProps) {
  return (
    <div className="group relative glass-effect rounded-2xl p-8 hover:-translate-y-1.5 transition-all duration-350 flex flex-col justify-between overflow-hidden shadow-md hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-blue/10 to-brand-accent/5 rounded-bl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-350" />
      
      <div>
        {image && (
          <div className="relative h-48 w-full overflow-hidden rounded-xl mb-6 border border-slate-200/50 dark:border-slate-800/50">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Icon Container */}
        <div className="inline-flex items-center justify-center p-3.5 rounded-xl bg-blue-500/5 text-brand-blue dark:text-brand-accent group-hover:bg-brand-blue group-hover:text-white transition-all duration-350 mb-6 shadow-sm">
          {icon}
        </div>

        {/* Title */}
        <h3 className="font-display font-extrabold text-xl lg:text-2xl text-slate-800 dark:text-white mb-3 tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 font-sans">
          {description}
        </p>

        {/* Features List */}
        <ul className="space-y-2.5 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-350 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
        <Link
          href={href}
          className="font-display text-xs font-semibold tracking-wider text-slate-500 hover:text-brand-blue dark:text-slate-400 dark:hover:text-white uppercase transition-colors flex items-center space-x-1"
        >
          <span>Detayları İncele</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-250" />
        </Link>
      </div>
    </div>
  );
}
