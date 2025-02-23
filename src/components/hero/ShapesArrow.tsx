import React from "react";
import Square from "../../assets/Square.png";
import Circle from "../../assets/Circle.png";
import Triangle from "../../assets/Triangle.png";
export const ShapesArrow = () => {
  return (
  <div className="flex flex-col gap-2 mx-auto">
    <img className="shapes-arrow animate-show" src={Square} alt="Square" />
    <img className="shapes-arrow animate-show delay-200" src={Circle} alt="Circle" />
    <img className="rotate-180 shapes-arrow animate-show delay-400"  src={Triangle} alt="Triangle" />
  </div>
  )
}
