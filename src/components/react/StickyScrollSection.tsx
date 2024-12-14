import React from "react";
import { StickyScroll } from "../react/ui/StickyScrollReveal";

export function StickyScrollSection({ content,isLeft }) {
  return (
    <StickyScroll content={content} isLeft={isLeft} />
  );
}
