import React from "react";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { useTranslations } from "../../i18n/utils";

export default function NavBar({ lang = "en" }) {
  const t = useTranslations(null, lang);

  return (
    <header
      className="flex items-center bg-[#0F0F0F66]/10 justify-between absolute w-full z-20 backdrop-filter 
backdrop-blur-md px-8 py-4
"
    >
      <div>
        <a href="/" className="flex items-center gap-2">
          <img src="/mainLogo.webp" alt="" width="64px"/>
          <span className="text-white text-2xl font-bold">SphæraTech</span>
        </a>
      </div>
      <nav>
        <ul className="flex flex-row text-white items-center gap-5 justify-between font-medium">
          <li className="hover:text-[#e14553] cursor-pointer"><a href={`${lang}/home`}>{t("nav.home")}</a></li>
          <li className="hover:text-[#e14553] cursor-pointer"><a href={`${lang}/services`}>{t("nav.services")}</a></li>
          <li className="hover:text-[#e14553] cursor-pointer"><a href={`${lang}/blog`}>{t("nav.blog")}</a></li>
          <li className="hover:text-[#e14553] cursor-pointer"><a href={`${lang}/about`}>{t("nav.about")}</a></li>
          <li>
            <a
              href="#"
              className="border-2 border-white px-5 py-1 rounded-full bg-gray-600/30 "
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
