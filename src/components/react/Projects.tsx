import { cn } from "../../lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../react/ui/BentoGrid";

export function BentoGridReact({ projects }) {
  return (
    <BentoGrid className=" min-w-2 mx-auto dark-blue-2">
      {projects.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          picture={item.preview

          }
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = (img) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-500 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
    
  </div>
);
