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
          <img src="/simple-sphere.svg" alt="" />
          <span className="text-white text-2xl font-bold">SphæraTech</span>
        </a>
      </div>
      <nav>
        <ul className="flex flex-row text-white items-center gap-5 justify-between text-neutral-200 font-medium">
          <li className="hover:text-[#e14553]">{t("nav.home")}</li>
          <li className="hover:text-[#e14553]">{t("nav.services")}</li>
          <li className="hover:text-[#e14553]">{t("nav.blog")}</li>
          <li className="hover:text-[#e14553]">{t("nav.about")}</li>

          <li>
            <a
              href="#"
              className="border-2 border-white px-5 py-1 rounded-full bg-gray-600/30 "
            >
              {" "}
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
