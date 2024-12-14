import React, { useState } from "react";
import { HoverBorderGradient } from "./ui/HoverBorderGradient";
import { useTranslations } from "../../i18n/utils";

export default function NavBar({ lang = "en" }) {
  const t = useTranslations(null, lang);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="flex items-center bg-[#0F0F0F66]/10 justify-between absolute w-full z-50 backdrop-filter 
      backdrop-blur-md px-8 py-4"
    >
      <div className="flex items-center">
        <a href="/" className="flex items-center gap-2">
          <img src="/mainLogo.webp" alt="SphæraTech Logo" width="64px" />
          <span className="text-white text-2xl font-bold">SphæraTech</span>
        </a>
      </div>

      <div className="flex md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <nav
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex flex-col md:flex-row items-center text-white gap-5 font-medium absolute md:static top-full left-0 w-full bg-[#0F0F0F] md:bg-transparent md:w-auto md:mt-0  p-4 md:p-0 z-50`}
      >
        <ul className="flex flex-col md:flex-row gap-4 md:gap-5">
          <li className="hover:text-[#e14553] cursor-pointer">
            <a href={`/${lang}`}>{t("nav.home")}</a>
          </li>
          <li className="hover:text-[#e14553] cursor-pointer">
            <a href={`/${lang}/services`}>{t("nav.services")}</a>
          </li>
          <li className="hover:text-[#e14553] cursor-pointer">
            <a href={`/${lang}/blog`}>{t("nav.blog")}</a>
          </li>
          <li className="hover:text-[#e14553] cursor-pointer">
            <a href={`/${lang}/about`}>{t("nav.about")}</a>
          </li>
          <li>
            <a
              className="border-2 border-white px-5 py-1 rounded-full bg-gray-600/30 "
              href={`/${lang}/contact`}
            >
              {t("nav.contact")}
            </a>
           </li>
        </ul>
      </nav>
    </header>
  );
}
