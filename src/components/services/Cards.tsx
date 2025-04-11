import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ArrowWhite from '../../assets/Arrow White.png'
import ArrowBlack from '../../assets/Arrow Black.png'

interface CardsProps{
  id: number;
  titleOne: string;
  titleTwo: string;
  description: string;
  icon: string;
  learnMore: string;
  borderColor: string;
  textColor: string;
}
const Cards: React.FC<CardsProps> = ({titleOne, titleTwo, textColor, description, icon, learnMore, borderColor, id}) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const positionColor = currentColor === 'dark' ? 'text-white' : 'text-black'
  const borderColorButton = currentColor === 'dark' ? 'border-white' : 'border-black'
  
  // Configuración para detectar cuando la tarjeta está en el viewport
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación se ejecuta solo la primera vez que la tarjeta entra en el viewport
    threshold: 0.1, // Cuando el 10% de la tarjeta es visible
    rootMargin: "-50px 0px" // Margen para ajustar cuándo se activa
  });

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  
  // Variantes para las animaciones
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
        delay: id * 0.2 // Retraso basado en el ID para efecto escalonado
      }
    }
  };
  
  return (
    <>
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={cardVariants}
        whileHover={{ 
          y: -10, 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 20 
          }
        }}
        className={`flex flex-col gap-4 items-start p-5 border ${borderColor} rounded-3xl mt-10 h-[20rem] services-text-lg:h-[22.5rem] cursor-pointer`}
        onClick={handleModal}
      >
        <img 
          className="w-20 services-text-lg:w-28 services-img-xlbig:w-32 transition-transform duration-300 hover:scale-110" 
          src={icon} 
          alt="Icono de la tarjeta" 
        />
        <h1 className={`${textColor} text-[1.3rem] services-text-lg:text-2xl`}>
          {titleOne}<span className={positionColor}>{titleTwo}</span>
        </h1>
        <p className="font-quicksand font-extralight text-[1.1rem] services-text-lg:text-[1.2rem] services-text-big:text-[1.3rem] w-[95%] services-text-xbig:text-2xl services-text-xbig:w-[90%]">
          {description}
        </p>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Evitar que el clic en el botón active también el clic en la tarjeta
            handleModal();
          }} 
          className={`flex items-center gap-3 border ${borderColorButton} rounded-full p-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md mt-auto`}
        >
          {learnMore}{" "}
          <motion.span 
            className="mt-[0.2rem]"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 1.5,
              ease: "easeInOut"
            }}
          >
            <img src={currentColor === 'dark' ? ArrowWhite : ArrowBlack} alt="" />{" "}
          </motion.span>
        </button>
      </motion.div>
      {isOpen && <Modal handleModal={handleModal} id={id} />}
    </>
  );
};

export default Cards;
