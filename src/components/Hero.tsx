import React from "react";
("use client");
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/HeroHighlight";
export default function Hero() {
  return (
    <div className="h-screen w-full bg-black dark:bg-white dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-center">
      <img
        src="/Vector.svg"
        alt=""
        className="w-1/4 left-0 bottom-0 absolute z-10"
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 w-2/4">
        Transform Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e14553] via-[#e14553] to-[#9fecd0]">
          Vision
        </span>{" "}
        into{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e14553] via-[#e14553] to-[#9fecd0]">
          Reality
        </span>{" "}
        with SphæraTech <br />
        <span className="text-[2rem] font-normal">
          Contact us today and discover how we can elevate your business to new
          heights!
        </span>
      </p>
      <img
        src="/Vector 2.svg"
        alt=""
        className="w-1/4 right-0 top-0 absolute z-10"
      />
    </div>
  );
}
