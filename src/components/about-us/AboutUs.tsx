import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import andyImage from '../../assets/AndyCambra.jpg'
import nachoImage from '../../assets/NachoFernandez.jpg'
import leoImage from '../../assets/LeoBaranelli.jpeg'
import Cards from './Cards'

export const AboutUs: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'
  const t = translations[currentLanguage]
  
  // Configuración para detectar cuando la sección está en el viewport
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-100px 0px"
  });
  
  const aboutUsData = [
    {
      name: 'andrea',
      lastName: 'cambra',
      position: 'UX/UI - Frontend Developer',
      img: andyImage,
      description: t.aboutUs.andyDescription,
      linkedin: 'a',
      github: 'a',
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
/*       shape: (
        <div className="w-40 h-40 bg-[#FD4441] rounded-full opacity-25 group-hover:w-full group-hover:h-full group-hover:scale-100 transition-all duration-300"></div> // Círculo
      ), */
    },
    {
      name: 'nacho',
      lastName: 'fernández',
      position: 'Full Stack Developer',
      img: nachoImage,
      description: t.aboutUs.nachoDescription,
      linkedin: 'a',
      github: 'a',
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
/*       shape: (
        <div className="w-40 h-40 bg-[#6FBB03] opacity-25 group-hover:scale-100 group-hover:w-full group-hover:h-full transition-all duration-300"></div> // Cuadrado
      ), */
    },
    
/*       name: 'leonardo',
      lastName: 'baranelli',
      position: 'Backend Developer - AI Developer',
      img: leoImage,
      description: t.aboutUs.leoDescription,
      linkedin: '',
      github: '',
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]", */
/*       shape: (
        <div className="w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-transparent border-b-[#2782FF] opacity-25 group-hover:scale-100 group-hover:w-full group-hover:h-full transition-all duration-300"></div> // Triángulo
      ), */
    
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
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.7,
        delay: 0.2
      }
    }
  };
  
  return (
    <section 
      ref={ref}
      className={`${textColor} flex flex-col items-start w-[80%] mx-auto font-quicksand pb-6 mt-16`}
    >
      <motion.h1 
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={titleVariants}
        className='text-[2rem] w-[85%] aboutUs-text-small:text-5xl font-extralight'
      >
        {t.aboutUs.title}
      </motion.h1>
      
      <motion.h2 
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={subtitleVariants}
        className='text-[1.2rem] aboutUs-text-small:text-[1.4rem] aboutUs-text-big:text-[1.6rem] aboutUs-text-xbig:text-3xl aboutUs-text-xlbig:text-4xl font-light mt-3'
      >
        {t.aboutUs.subtitle}
      </motion.h2>
      
      <div className="flex flex-col justify-center mx-auto gap-5 mt-10 change-desktop:flex-row change-desktop:items-center change-desktop:justify-between">
        {aboutUsData.map((data, index) => (
          <Cards 
            key={index}
            name={data.name}
            lastName={data.lastName}
            position={data.position}
            img={data.img}
            borderColor={data.borderColor}
            textColor={data.textColor}
            description={data.description}
            linkedin={data.linkedin}
            github={data.github}
            index={index} // Pasamos el índice para el efecto escalonado
/*           shape={data.shape} */
          />
        ))}
      </div>
    </section>
  )
}
