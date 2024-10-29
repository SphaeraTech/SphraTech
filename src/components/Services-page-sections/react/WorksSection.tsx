import React from "react";
import { BentoGrid, BentoGridItem } from "../../react/ui/bento-grid";

function WorksSection({ projects }) {
  
  return (
    <section className="max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-2xl font-bold text-black mb-4">Branding Works</h2>
    <BentoGrid >
      {projects.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
         header={<div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl  bg-[url('/${item.preview}')] bg-cover no-repeat`}></div>}
       
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>

    </section>
  )
}

export default WorksSection