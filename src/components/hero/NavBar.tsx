import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import logoAnimadoNegro from '../../assets/Logo Animado Negro.gif'
import logoAnimadoBlanco from '../../assets/Logo Animado Blanco.gif'
import { LanguageSwitch } from './LanguageSwitch'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ColorSwitch } from './ColorSwitch'
import { CiMenuFries } from "react-icons/ci";

export const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'; 
  const bgColor = currentColor === 'dark' ? 'bg-black' : 'bg-white'; 
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

  return (
    <header 
      className={`font-quicksand fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? `${bgColor} shadow-md py-3` : 'py-5'
      }`}
    >
      <div className="flex justify-between items-center px-10 w-full max-w-[1900px] mx-auto">
        {/* Logo con funcionalidad de scroll al inicio */}
        <a 
          href="#" 
          onClick={scrollToTop}
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
        >
          <img className='w-28' src={currentColor === "dark" ? logoAnimadoNegro : logoAnimadoBlanco} alt="Shapes Logo" />
        </a>
        
        {/* Icono del menú hamburguesa */}
        {isMobile && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <CiMenuFries 
              className={`${textColor} text-3xl cursor-pointer z-10
              ${isMobile && !menuOpen ? 'block' : 'hidden'}
              `}
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </motion.div>
        )}

        {/* Menú de navegación */}
        <div ref={menuRef} className={isMobile && !menuOpen ? 'hidden' : 'block'}>
          <nav
            className={`
              ${isMobile ? `absolute top-full right-0 p-5 w-[12rem] rounded-b-md shadow-lg z-20 transition-all duration-300 ease-in-out ${bgColor}` : 'static'}
              ${isMobile && menuOpen ? `opacity-100 translate-x-0 block` : ''}
              ${isMobile && !menuOpen ? `opacity-0 translate-x-full hidden` : ''}
              ${!isMobile ? 'flex flex-row items-center gap-10' : 'flex flex-col items-start gap-8'}
            `}
          >
            {/* Enlaces de navegación con efectos hover */}
            <motion.div 
              className="relative"
              initial="initial"
              whileHover="hover"
            >
              <a 
                className={`text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "services" ? "font-medium" : ""}`} 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
              >
                {t.nav.services}
                {activeSection === "services" && (
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6FBB03]"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                )}
              </a>
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-[#6FBB03]"
                style={{ backgroundColor: accentColor }}
                variants={hoverVariants}
              ></motion.span>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="initial"
              whileHover="hover"
            >
              <a 
                className={`text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "about-us" ? "font-medium" : ""}`} 
                href="#about-us"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about-us");
                }}
              >
                {t.nav.about}
                {activeSection === "about-us" && (
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6FBB03]"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                )}
              </a>
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-[#6FBB03]"
                style={{ backgroundColor: accentColor }}
                variants={hoverVariants}
              ></motion.span>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial="initial"
              whileHover="hover"
            >
              <a 
                className={`text-xl ${textColor} font-light relative inline-block transition-all duration-300 ${activeSection === "contact-us" ? "font-medium" : ""}`} 
                href="#contact-us"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact-us");
                }}
              >
                {t.nav.contact}
                {activeSection === "contact-us" && (
                  <span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6FBB03]"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                )}
              </a>
              <motion.span 
                className="absolute bottom-0 left-0 h-0.5 bg-[#6FBB03]"
                style={{ backgroundColor: accentColor }}
                variants={hoverVariants}
              ></motion.span>
            </motion.div>
            
            <LanguageSwitch />
            <ColorSwitch />
          </nav>
        </div>
      </div>
    </header>
  );
}