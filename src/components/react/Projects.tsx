import { cn } from "../../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../react/ui/BentoGrid";

export function BentoGridReact({ projects }) {
  return (
    <BentoGrid className=" min-w-2 mx-auto">
      {projects.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={
            <img
              src={item.preview}
              className="rounded-xl group-hover/bento:translate-x-2 transition duration-200 "
            />
          }
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = (img) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-500 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    
  </div>
);
