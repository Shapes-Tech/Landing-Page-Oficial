import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AboutUsProps {
  name: string;
  lastName: string;
  position: string;
  img: string;
  description: string;
  linkedin: string;
  github: string;
  borderColor: string;
  textColor: string;
  index?: number; // Para el retraso en la animación
/*   shape: any; */
}

const Cards: React.FC<AboutUsProps> = ({
  name,
  lastName,
  position,
  img,
  description,
  linkedin,
  github,
  borderColor,
  textColor,
  index = 0, // Valor por defecto
/*   shape, */
}) => {
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColorDescription = currentColor === 'dark' ? 'text-white' : 'text-black'
  
  // Configuración para detectar cuando la tarjeta está en el viewport
  const [ref, inView] = useInView({
    triggerOnce: true, // La animación se ejecuta solo la primera vez que la tarjeta entra en el viewport
    threshold: 0.2, // Cuando el 20% de la tarjeta es visible
    rootMargin: "-50px 0px" // Margen para ajustar cuándo se activa
  });
  
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
        duration: 0.7,
        delay: index * 0.3 // Retraso basado en el índice para efecto escalonado
      }
    }
  };
  
  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      filter: "grayscale(100%) blur(5px)"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      filter: "grayscale(100%) blur(0px)",
      transition: {
        delay: index * 0.3 + 0.3,
        duration: 0.8
      }
    },
    hover: {
      scale: 1.05,
      filter: "grayscale(0%)",
      transition: {
        duration: 0.5
      }
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: index * 0.3 + 0.5,
        duration: 0.5
      }
    }
  };
  
  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.3 + 0.7,
        duration: 0.5
      }
    },
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        y: -10,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 20 
        }
      }}
      className={`border ${borderColor} max-w-[37rem] w-full rounded-2xl h-[34rem] aboutUs-text-midLg:h-[32rem] aboutUs-img-lg:h-[42rem] aboutUs-img-xlbig:h-[43rem] flex flex-col p-5 font-quicksand overflow-hidden relative`}
    >
      <div className="relative group">
        <motion.img
          variants={imageVariants}
          whileHover="hover"
          className="relative w-[30rem] h-[15rem] aboutUs-text-lg:h-[25rem] object-cover rounded-2xl mx-auto grayscale transition-all duration-300"
          src={img}
          alt={`Imagen de ${name} ${lastName}`}
        />
        {/* Shape */}
{/*         <div className="absolute top-0 left-0 w-full h-full group-hover:scale-50 transition-all duration-300">
          {shape}
        </div> */}
      </div>

      <motion.p 
        variants={textVariants}
        className={` text-[1.3rem] aboutUs-text-lg:text-2xl font-light ${textColor} mt-5`}
      >
        {name}
        <span className={textColorDescription}>{lastName}</span>
      </motion.p>
      
      <motion.p 
        variants={textVariants}
        className={`${textColorDescription} font-bold text-[0.9rem] aboutUs-text-big:text-big aboutUs-text-xbig:text-xl`}
      >
        {position}
      </motion.p>
      
      <motion.p 
        variants={textVariants}
        className={` ${textColorDescription} w-[80%] font-light text-big aboutUs-text-xbig:text-xl mt-5`}
      >
        {description}
      </motion.p>
      
      <motion.div 
        variants={socialVariants}
        className="flex items-center gap-2 mt-5"
      >
        {linkedin && (
          <motion.a 
            className="text-4xl" 
            href={linkedin}
            whileHover="hover"
            variants={socialVariants}
          >
            <FaLinkedin />
          </motion.a>
        )}
        {github && (
          <motion.a 
            className="text-4xl" 
            href={github}
            whileHover="hover"
            variants={socialVariants}
          >
            <FaGithub />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cards;
