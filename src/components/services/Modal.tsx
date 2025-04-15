import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { translations } from '../../translations';
import { FaTimes, FaPalette, FaCode } from 'react-icons/fa';
import { BsCheckCircleFill, BsArrowUpRight } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { RiPagesLine } from 'react-icons/ri';

interface ModalProps{
  handleModal: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({handleModal, id}) => {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const t = translations[currentLanguage];
  
  const [modal, setModal] = useState({
    title: "",
    borderColor: "",
    textColor: "",
    icon: null as React.ElementType | null,
    features: [] as string[],
    description: "",
    cta: "",
    bgColor: "",
  });
  
  const dataModal = [
    {
      id: 1,
      title: currentLanguage === 'es' ? 'DISEÑO WEB' : 'WEB DESIGN',
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
      bgColor: "bg-[#FD4441]/10",
      icon: FaPalette,
      features: t.services.designDetail.features,
      description: t.services.designDetail.description,
      cta: t.services.cta,
    },
    {
      id: 2,
      title: currentLanguage === 'es' ? 'LANDING PAGE' : 'LANDING PAGE',
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
      bgColor: "bg-[#6FBB03]/10",
      icon: RiPagesLine,
      features: t.services.landingPage.features,
      description: t.services.landingPage.description,
      cta: t.services.cta,
    },
    {
      id: 3,
      title: currentLanguage === 'es' ? 'DESARROLLO WEB' : 'WEB DEVELOPMENT',
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]",
      bgColor: "bg-[#2782FF]/10",
      icon: FaCode,
      features: t.services.developmentDetail.features,
      description: t.services.developmentDetail.description,
      cta: t.services.cta,
    },
  ];

  useEffect(() => {
    const selectModal = dataModal.find((item) => item.id === Number(id));
    if(selectModal){
      setModal(selectModal);
    }
  },[id, currentLanguage, t]);

  const bgColor = currentColor === 'dark' ? 'bg-[#121212]' : 'bg-white';
  const textColorMode = currentColor === 'dark' ? 'text-white' : 'text-[#333333]';
  const secondaryTextColor = currentColor === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const IconComponent = modal.icon;
  
  // Variantes para las animaciones
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delay: 0.1
      } 
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { 
        duration: 0.2
      } 
    }
  };
  
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.3 + (i * 0.1),
        duration: 0.5
      }
    })
  };
  
  const handleContactUs = () => {
    handleModal();

    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      // Calcular la posición con un offset para la barra de navegación
      const navbarHeight = 100; // Altura aproximada del navbar + margen adicional
      const offsetPosition = contactSection.offsetTop - navbarHeight;
      
      // Hacer scroll con el offset calculado
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <AnimatePresence>
      <motion.div 
        key="modal-overlay"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlayVariants}
        onClick={(e) => e.target === e.currentTarget && handleModal()} 
        className="fixed z-50 top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4"
      >
        <motion.div 
          key="modal-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} 
          className={`${bgColor} border-2 ${modal.borderColor} rounded-3xl w-[95%] services-modal-md:max-w-5xl max-h-[90vh] overflow-y-auto modal-scroll shadow-2xl`}
        >
          
          <div className="relative p-6 md:p-10">
            {/* Botón de cierre */}
            <motion.button 
              className={`absolute top-4 right-4 ${textColorMode} hover:${modal.textColor} transition-colors p-2 rounded-full cursor-pointer z-10`} 
              onClick={handleModal}
              aria-label={t.services.close}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <FaTimes size={20} />
            </motion.button>
            
            {/* Header */}
            <div className="mb-10 relative">
              <motion.h1 
                className={`${modal.textColor} text-3xl md:text-4xl font-bold tracking-tight`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {modal.title}
              </motion.h1>
              <motion.div 
                className={`h-1 w-20 ${modal.bgColor.replace('/10', '')} mt-3 rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: 80 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              ></motion.div>
            </div>
            
            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
              {/* Left column - Icon and Description */}
              <div className="lg:col-span-2 flex flex-col items-center lg:items-stretch gap-8">
                <motion.div 
                  className={`${modal.bgColor} rounded-2xl overflow-hidden flex items-center justify-center p-8 aspect-square`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {IconComponent && (
                    <motion.div
                      initial={{ rotate: -10, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <IconComponent size={100} className={modal.textColor} />
                    </motion.div>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="hidden lg:block"
                >
                  <motion.button 
                    className={`${modal.textColor} ${modal.borderColor} border-2 cursor-pointer hover:${modal.bgColor.replace('/10', '/20')} transition-all duration-300 rounded-full px-8 py-4 font-medium flex items-center gap-3`}
                    onClick={handleContactUs}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {modal.cta}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="transition-transform"
                    >
                      <BsArrowUpRight size={18} />
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>
              
              {/* Right column - Description and features */}
              <div className="lg:col-span-3 flex flex-col gap-8">
                <motion.p 
                  className={`${textColorMode} text-md lg:text-lg leading-relaxed`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {modal.description}
                </motion.p>
                
                <div>
                  <motion.h3 
                    className={`${modal.textColor} font-semibold text-lg lg:text-xl mb-6 flex items-center gap-2`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {t.services.features}
                    <motion.div 
                      className={`h-[2px] w-12 ${modal.bgColor.replace('/10', '')} ml-2`}
                      initial={{ width: 0 }}
                      animate={{ width: 48 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    ></motion.div>
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {modal.features.map((feature, index) => (
                      <motion.div 
                        key={index} 
                        custom={index}
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        className={`flex items-start gap-3 p-3 rounded-lg transition-colors hover:${modal.bgColor}`}
                        whileHover={{ x: 5 }}
                      >
                        <span className={`${modal.textColor} mt-1 flex-shrink-0`}>
                          <BsCheckCircleFill size={16} />
                        </span>
                        <span className={`${secondaryTextColor}`}>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA para móvil */}
            <motion.div 
              className="mt-10 flex justify-center lg:hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.button 
                className={`${modal.textColor} ${modal.borderColor} border-2 cursor-pointer hover:${modal.bgColor.replace('/10', '/20')} transition-all duration-300 rounded-full px-8 py-4 font-medium flex items-center gap-3 w-full max-w-xs justify-center`}
                onClick={() => {
                  handleModal();
                  const contactSection = document.getElementById('contact-us');
                  if (contactSection) {
                    // Calcular la posición con un offset para la barra de navegación
                    const navbarHeight = 100; // Altura aproximada del navbar + margen adicional
                    const offsetPosition = contactSection.offsetTop - navbarHeight;
                    
                    // Hacer scroll con el offset calculado
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {modal.cta}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  className="transition-transform"
                >
                  <BsArrowUpRight size={18} />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
