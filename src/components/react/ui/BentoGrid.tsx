import { cn } from "../../../lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  picture,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  picture?: string 
  icon?: React.ReactNode;
}) => {
  return (
    <div
    className={cn(
      "row-span-1 cursor-pointer rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent flex flex-col ",
      className
    )}
  >
    <img
      src={picture}
      className="w-full h-auto rounded-xl group-hover/bento:translate-x-2 transition duration-200"    />
    <div className="group-hover/bento:translate-x-2 transition duration-200 flex flex-col mt-2 pr-3 pl-3 "> 
      <span className="text-neutral-600 dark:text-neutral-200">{title}</span>
      <span className="text-neutral-600 dark:text-neutral-200 text-xs pb-5">
        {description}
      </span>
    </div>
  </div>
  
  );
};