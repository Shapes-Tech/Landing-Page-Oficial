import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logoAnimadoNegro from '../../assets/Logo Animado Negro.gif'
import logoAnimadoBlanco from '../../assets/Logo Animado Blanco.gif'
import { LanguageSwitch } from './LanguageSwitch'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ColorSwitch } from './ColorSwitch'
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

export const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'; 
  const bgColor = currentColor === 'dark' ? 'bg-black-bg' : 'bg-white-bg'; 
  const accentColor = currentColor === 'dark' ? '#6FBB03' : '#6FBB03';
  const t = translations[currentLanguage];
  const menuRef = useRef<HTMLDivElement>(null)
  const navbarHeight = 80; // Altura aproximada del navbar en píxeles

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMenuOpen(false); // Cierra el menú en pantallas grandes
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    // Detectar la sección activa al hacer scroll
    const handleScroll = () => {
      // Cambiar el estado del navbar cuando se hace scroll
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      const scrollPosition = window.scrollY + navbarHeight + 50; // Offset para mejor detección, considerando la altura del navbar
      
      // Obtener todas las secciones
      const sections = [
        { id: "services", element: document.getElementById("services") },
        { id: "about-us", element: document.getElementById("about-us") },
        { id: "contact-us", element: document.getElementById("contact-us") }
      ];
      
      // Encontrar la sección activa
      let currentSection = "";
      for (const section of sections) {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionHeight = section.element.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.id;
            break;
          }
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    
    // Llamar a handleScroll inicialmente para establecer la sección activa
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection]);

  // Función para manejar el scroll suave a las secciones
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Cerrar el menú móvil si está abierto
      setMenuOpen(false);
      
      // Actualizar la sección activa
      setActiveSection(sectionId);
      
      // Calcular la posición de desplazamiento considerando la altura del navbar
      const offsetTop = section.offsetTop - navbarHeight - 20; // 20px de margen adicional
      
      // Scroll suave a la sección ajustada
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };
  
  // Función para desplazarse al inicio de la página
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Cerrar el menú móvil si está abierto
    setMenuOpen(false);
    
    // Resetear la sección activa
    setActiveSection("");
    
    // Scroll suave al inicio de la página
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Variantes para la animación del indicador de hover
  const hoverVariants = {
    initial: { 
      width: 0,
      opacity: 0
    },
    hover: { 
      width: "100%",
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    }
  };

  // Variantes para la animación del menú móvil
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Variantes para los elementos del menú
  const menuItemVariants = {
    closed: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.2
      }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  // Variantes para el botón de menú
  const menuButtonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 }
  };

  return (
    <header 
      className={`font-quicksand fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? `${bgColor} shadow-md py-3` : 'py-5'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 w-full max-w-[1900px] mx-auto">
        {/* Logo con funcionalidad de scroll al inicio */}
        <a 
          href="#" 
          onClick={scrollToTop}
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img className=' w-20 hero-img-small:w-28' src={currentColor === "dark" ? logoAnimadoNegro : logoAnimadoBlanco} alt="Shapes Logo" />
        </a>
        
        {/* Botón del menú móvil con animación */}
        {isMobile && (
          <motion.button
            className={`${textColor} z-50 p-2 cursor-pointer rounded-full focus:outline-none`}
            onClick={() => setMenuOpen(!menuOpen)}
            variants={menuButtonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {menuOpen ? (
              <motion.div
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IoClose size={28} />
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CiMenuFries size={28} />
              </motion.div>
            )}
          </motion.button>
        )}

        {/* Menú de navegación */}
        <AnimatePresence>
          {(!isMobile || menuOpen) && (
            <motion.nav
              ref={menuRef}
              className={`
                ${isMobile ? `fixed top-0 right-0 h-screen w-[75%] max-w-[300px] ${bgColor} shadow-xl z-40 pt-20 pb-10 px-8` : 'static'}
                ${!isMobile ? 'flex flex-row items-center gap-10' : 'flex flex-col items-start gap-6'}
              `}
              variants={isMobile ? mobileMenuVariants : {}}
              initial={isMobile ? "closed" : false}
              animate={isMobile ? "open" : false}
              exit={isMobile ? "closed" : false}
            >
              {/* Enlaces de navegación con efectos hover y animaciones */}
              <motion.div 
                className={`relative ${isMobile ? 'w-full' : ''}`}
                initial="initial"
                whileHover="hover"
                variants={isMobile ? menuItemVariants : {}}
              >
                <a 
                  className={`${isMobile ? 'flex items-center w-full py-3 pl-2' : ''} text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "services" ? "font-medium" : ""}`} 
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("services");
                  }}
                >
                  {t.nav.services}
                  {activeSection === "services" && (
                    <span 
                      className={`absolute ${isMobile ? 'bottom-0 left-0 w-full h-[1px]' : 'bottom-0 left-0 w-full h-0.5'} bg-[#6FBB03]`}
                      style={{ backgroundColor: accentColor }}
                    ></span>
                  )}
                </a>
                <motion.span 
                  className={`absolute ${isMobile ? 'bottom-0 left-0 w-0 h-[1px]' : 'bottom-0 left-0 h-0.5'} bg-[#6FBB03]`}
                  style={{ backgroundColor: accentColor }}
                  variants={hoverVariants}
                ></motion.span>
              </motion.div>
              
              <motion.div 
                className={`relative ${isMobile ? 'w-full' : ''}`}
                initial="initial"
                whileHover="hover"
                variants={isMobile ? menuItemVariants : {}}
              >
                <a 
                  className={`${isMobile ? 'flex items-center w-full py-3 pl-2' : ''} text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "about-us" ? "font-medium" : ""}`} 
                  href="#about-us"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about-us");
                  }}
                >
                  {t.nav.about}
                  {activeSection === "about-us" && (
                    <span 
                      className={`absolute ${isMobile ? 'bottom-0 left-0 w-full h-[1px]' : 'bottom-0 left-0 w-full h-0.5'} bg-[#6FBB03]`}
                      style={{ backgroundColor: accentColor }}
                    ></span>
                  )}
                </a>
                <motion.span 
                  className={`absolute ${isMobile ? 'bottom-0 left-0 w-0 h-[1px]' : 'bottom-0 left-0 h-0.5'} bg-[#6FBB03]`}
                  style={{ backgroundColor: accentColor }}
                  variants={hoverVariants}
                ></motion.span>
              </motion.div>
              
              <motion.div 
                className={`relative ${isMobile ? 'w-full' : ''}`}
                initial="initial"
                whileHover="hover"
                variants={isMobile ? menuItemVariants : {}}
              >
                <a 
                  className={`${isMobile ? 'flex items-center w-full py-3 pl-2' : ''} text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "contact-us" ? "font-medium" : ""}`} 
                  href="#contact-us"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact-us");
                  }}
                >
                  {t.nav.contact}
                  {activeSection === "contact-us" && (
                    <span 
                      className={`absolute ${isMobile ? 'bottom-0 left-0 w-full h-[1px]' : 'bottom-0 left-0 w-full h-0.5'} bg-[#6FBB03]`}
                      style={{ backgroundColor: accentColor }}
                    ></span>
                  )}
                </a>
                <motion.span 
                  className={`absolute ${isMobile ? 'bottom-0 left-0 w-0 h-[1px]' : 'bottom-0 left-0 h-0.5'} bg-[#6FBB03]`}
                  style={{ backgroundColor: accentColor }}
                  variants={hoverVariants}
                ></motion.span>
              </motion.div>
              
              {/* Switches de idioma y tema */}
              {isMobile ? (
                <div className="flex items-center justify-between mt-4 w-full">
                  <motion.div variants={isMobile ? menuItemVariants : {}}>
                    <LanguageSwitch />
                  </motion.div>
                  <motion.div variants={isMobile ? menuItemVariants : {}}>
                    <ColorSwitch />
                  </motion.div>
                </div>
              ) : (
                <>
                  <LanguageSwitch />
                  <ColorSwitch />
                </>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}