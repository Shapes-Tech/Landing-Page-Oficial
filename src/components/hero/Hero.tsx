import React from "react";
import { NavBar } from "./NavBar";
import shapesBlack from "../../assets/shapes.gif";
import shapesWhite from "../../assets/shapes light.gif";
import { translations } from "../../translations";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const Hero: React.FC = () => {
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
    <section className="flex flex-col">
      <NavBar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-14 mt-10 w-[80%]">
          <img className="mt-4 w-[20rem] h-[20rem]   hero-img-lg:w-[23rem] hero-text-lg:h-[23rem] hero-img-big:w-[26rem] hero-img-big:h-[26rem] hero-img-xbig:w-[30rem] hero-img-xbig:h-[30rem] hero-img-xlbig:w-[35rem] hero-img-xlbig:h-[35rem]" src={currentColor === 'dark' ? shapesBlack : shapesWhite} />
          <div className="flex flex-col">
            <h1
              className={`font-quicksand ${titleColor} text-[8.3rem] hero-text-lg:text-[10rem] hero-text-big:text-[12rem] hero-text-xbig:text-[13rem] hero-text-xlbig:text-[15rem] leading-tight tracking-tighter font-extralight`}
            >
              {t.hero.title}
            </h1>
            <p
              className={`font-quicksand ${descriptionColor} leading-tight text-[1.3rem] hero-text-lg:text-[1.5rem] hero-text-big:text-[2rem] hero-text-xlbig:text-[2.5rem] font-extralight`}
            >
              {t.hero.description}
            </p>
            <button className={`${descriptionColor} button-hero animate-button font-medium mt-12 hero-text-lg:mt-16 hero-text-lg:text-[1.5rem] cursor-pointer`}>
              {t.hero.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
