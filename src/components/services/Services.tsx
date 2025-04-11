import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
  
  // Configuración para detectar cuando la sección está en el viewport
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
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
  
  // Variantes para las animaciones
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.7
      }
    }
  };
  
  return (
    <section 
      ref={ref}
      className={`${textColor} flex flex-col items-start w-[80%] mx-auto mt-24 mb-10 font-quicksand font-extralight`}
    >
      <motion.h1 
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={titleVariants}
        className="text-[2rem] w-[85%] services-text-small:text-[2.5rem] services-text-small:w-[70%] mt-24 change-desktop:mt-0 services-text-lg:w-[60%] services-text-lg:text-[2.8rem] services-text-big:text-5xl services-text-xlbig:text-6xl font-extralight services-text-big:w-[50%] leading-tight tracking-tighter"
      >
        {t.services.title}
      </motion.h1>
      
      <div className="flex flex-col justify-center mx-auto change-desktop:flex change-desktop:flex-row change-desktop:items-center gap-5 w-full">
        {dataCards.map((card) => (
          <Cards
            key={card.id}
            id={card.id}
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
