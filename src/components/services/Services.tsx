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
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-dark'
  const t = translations[currentLanguage];
  const dataCards = [
    {
      id:1,
      titleOne: "web",
      titleTwo: "design",
      description: t.services.design,
      icon: IconDesign,
      learnMore: t.services.learnMore,
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
    },
    {
      id:2,
      titleOne: "web",
      titleTwo: "development",
      description: t.services.development,
      icon: IconDevelopment,
      learnMore: t.services.learnMore,
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
    },
    {
      id:3,
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
    <section className={`${textColor} flex flex-col items-start w-[80%] mx-auto mt-24 mb-10 font-quicksand font-extralight`}>
      <h1 className=" text-[2.5rem] w-[70%] services-text-lg:w-[60%] services-text-lg:text-[2.8rem] services-text-big:text-5xl services-text-xlbig:text-6xl font-extralight services-text-big:w-[50%] leading-tight tracking-tighter">
        {t.services.title}
      </h1>
      <div className="flex items-center gap-5">
        {dataCards.map((card) => (
          <Cards
            key={card.id}
            id= {card.id}
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
