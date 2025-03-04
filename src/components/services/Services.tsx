import React from "react";
import { translations } from "../../translations";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import IconDesign from "../../assets/IconDesign.png";
import IconDevelopment from "../../assets/IconDevelopment.png";
import IconAI from "../../assets/IconAI.png";
import Cards from "./Cards";
export const Services: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const t = translations[currentLanguage];
  const dataCards = [
    {
      titleOne: "web",
      titleTwo: "design",
      description: t.services.design,
      icon: IconDesign,
      learnMore: t.services.learnMore,
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
    },
    {
      titleOne: "web",
      titleTwo: "development",
      description: t.services.development,
      icon: IconDevelopment,
      learnMore: t.services.learnMore,
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
    },
    {
      titleOne: "ai",
      titleTwo: "applications",
      description: t.services.ai,
      icon: IconAI,
      learnMore: t.services.learnMore,
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]",
    },
  ];
  return (
    <section className="flex flex-col items-start text-white w-[80%] mx-auto mt-24 mb-10 font-quicksand font-extralight">
      <h1 className=" text-6xl font-extralight w-[50%] leading-tight tracking-tighter">
        {t.services.title}
      </h1>
      <div className="flex items-center gap-5">
        {dataCards.map((card) => (
          <Cards
            titleOne={card.titleOne}
            titleTwo={card.titleTwo}
            textColor={card.textColor}
            description={card.description}
            borderColor={card.borderColor}
            icon={card.icon}
            learnMore={card.learnMore}
          />
        ))}
      </div>
    </section>
  );
};
