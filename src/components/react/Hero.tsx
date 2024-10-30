import React from "react";
import { useTranslations } from "src/i18n/utils";

export default function Hero({ lang = "en", services }) {
  const t = useTranslations(null, lang);

  return (
    <div className="h-screen w-full dark-blue-2 dark:bg-white dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-white py-8 w-2/4">
        Transform Your <span className="text-[#ff2121]/70">Vision</span> into{" "}
        <span className="text-[#ff2121]/70">Reality</span> with us <br />
        <span className="text-[2rem] font-normal text-white">
          Contact us today and discover how we can elevate your business to new
          heights!
        </span>
      </p>
    </div>
  );
}