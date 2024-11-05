import React from "react";
import { Carousel, Card } from "../react/ui/CardsCarousel";

export function ServicesCarousel({ data, title ,lang}) {
  const cards = data.map((card, index) => (
    <Card key={card.icon} card={card} index={index} lang={lang}/>
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white dark:text-neutral-200 font-sans">
        {title}
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
