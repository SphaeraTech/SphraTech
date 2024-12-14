import React from "react";

export default function Hero({ text, page }) {
  let backgroundStyle = null;
  switch (page) {
    case "about":
      backgroundStyle = "sphera-red";
      break;
    case "services":
      backgroundStyle = "dark-blue-2";
      break;
  }
  return (
    <div className={" pageFroground w-full dark:bg-white dark:bg-grid-black/[0.2] bg-grid-white/[0.2] relative flex items-center justify-start "  + backgroundStyle}>
      <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>

      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-white w-2/4 text-left ml-5">
        <br />
        <span className="text-[2rem] font-normal sphera-red-text">
          {text.pageTitle}
        </span>
        <br />
        {text.phrase}

        <br />
      </p>
    </div>
  );
}
