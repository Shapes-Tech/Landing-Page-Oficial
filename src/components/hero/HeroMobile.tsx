import React from "react";
import shapesBlack from "../../assets/shapes.gif";
import shapesWhite from "../../assets/shapes light.gif";
import { translations } from "../../translations";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const HeroMobile: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const t = translations[currentLanguage];
  const titleColor =
    currentColor === "dark" ? "text-white opacity-40" : "text-[#959595] ";
  const descriptionColor =
    currentColor === "dark" ? "text-white" : "text-black";

  return (
    <section className="flex justify-center w-[80%] mx-auto mt-10">
      {/* Contenedor principal con flex */}
      <div className="flex justify-around items-center gap-7">
        {/* Título rotado */}
        <div className="flex items-center justify-center h-[300px] w-[80px]">
          <h1
            className={`font-quicksand ${titleColor} text-[7.5rem] 
    leading-tight tracking-tighter whitespace-nowrap
    font-extralight transform -rotate-90 origin-center`}
            style={{ width: "max-content" }}
          >
            {t.hero.title}
          </h1>
        </div>

        {/* Contenido central */}
        <div className="flex flex-col items-start w-[50%]">
          <img
            className="w-[20rem] object-contain"
            src={currentColor === "dark" ? shapesBlack : shapesWhite}
            alt="Shapes"
          />

          <p
            className={`font-quicksand ${descriptionColor} w-[80%] leading-tight text-[1.1rem]  font-extralight mt-6`}
          >
            {t.hero.description}
          </p>

          <button
            className={`${descriptionColor} button-hero animate-button font-medium mt-12 hero-text-lg:mt-16 hero-text-lg:text-[1.5rem] cursor-pointer`}
          >
            {t.hero.button}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroMobile;
