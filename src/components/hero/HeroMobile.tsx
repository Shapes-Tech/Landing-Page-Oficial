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
    <section className="w-[80%] ">
      <div className="flex justify-center items-center">
      <h1
        className={`font-quicksand ${titleColor} text-[7.5rem] 
  hero-text-md:text-[8.5rem] hero-text-lg:text-[10rem] 
  hero-text-big:text-[12rem] hero-text-xbig:text-[13rem] 
  hero-text-xlbig:text-[15rem] leading-tight tracking-tighter 
  font-extralight transform rotate-[-90deg] 
  whitespace-nowrap  mt-[15rem]`}
      >
        {t.hero.title}
      </h1>
      <div className="flex flex-col">
      <img
          className="mt-4 w-[25rem] h-[15rem]  hero-img-lg:w-[23rem] hero-text-lg:h-[23rem] hero-img-big:w-[26rem] hero-img-big:h-[26rem] hero-img-xbig:w-[30rem] hero-img-xbig:h-[30rem] hero-img-xlbig:w-[35rem] hero-img-xlbig:h-[35rem]"
          src={currentColor === "dark" ? shapesBlack : shapesWhite}
        />
         <p
            className={`font-quicksand ${descriptionColor} leading-tight text-[1.1rem] hero-text-md:text-[1.3rem] hero-text-lg:text-[1.5rem] hero-text-big:text-[2rem] hero-text-xlbig:text-[2.5rem] font-extralight`}
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
