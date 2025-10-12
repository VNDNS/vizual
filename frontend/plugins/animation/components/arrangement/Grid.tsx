import { useAnimation } from "@context/context";
import type { CSSProperties } from "react";


export const Grid = () => {

  const { origin, zoom } = useAnimation();

  return (
    <div className="grid" style={{ "--grid-zoom": zoom, transform: `translate(${origin.dx}px, ${origin.dy}px) scale(${zoom})` } as CSSProperties}></div>
  );
};
