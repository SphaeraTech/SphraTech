import React from "react";
import { useTranslations } from "src/i18n/utils";
import { FlipWords } from "./FlipWords";
import { CardStack } from "./ui/CardStack";
import { Highlight } from "./ui/HeroHighlight";
const words1 = ["Vision", "Dream", "Idea", "Goal"];
const words2 = ["Reality", "Success", "Achievement", "Result"];

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/11/theme-panel.webp" alt="" />
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/11/theme-panel.webp" alt="" />

    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/11/theme-panel.webp" alt="" />

    ),
  },
];

export default function Hero({ lang = "en", services }) {
  const t = useTranslations(null, lang);

  return (
    <div className="h-screen w-full dark-blue-2 dark:bg-white dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-white py-8 w-2/4">
        Transform Your{" "}
        <FlipWords className="text-[#ff2121]/70" words={words1} /> into
        <FlipWords className="text-[#ff2121]/70" words={words2} />
        with us <br />
        <span className="text-[2rem] font-normal text-white">
          Contact us today and discover how we can elevate your business to new
          heights!
        </span>
      </p>
      <CardStack items={CARDS}/>
    </div>
  );
}
