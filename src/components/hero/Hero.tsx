import React from "react";
import { NavBar } from "./NavBar";
import shapes from "../../assets/shapes.gif";
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
    currentColor === "dark" ? "text-white opacity-40" : "text-black opacity-90";
  const descriptionColor =
    currentColor === "dark" ? "text-white" : "text-black";
  return (
    <section className="flex flex-col">
      <NavBar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-14 mt-10 w-[80%]">
          <img className="mt-10" src={shapes} />
          <div className="flex flex-col">
            <h1
              className={`font-quicksand ${titleColor} text-[15rem] leading-tight tracking-tighter font-extralight`}
            >
              {t.hero.title}
            </h1>
            <p
              className={`font-quicksand ${descriptionColor} leading-tight text-[2.5rem] font-extralight`}
            >
              {t.hero.description}
            </p>
            <button className="button-hero animate-button font-medium mt-16 cursor-pointer text-white">
              {t.hero.button}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
