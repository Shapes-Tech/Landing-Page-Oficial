import React, { useEffect, useState, useRef } from 'react'
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
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'; 
  const bgColor = currentColor === 'dark' ? 'bg-black-bg' : 'bg-white-bg'; 
  const t = translations[currentLanguage];
  const menuRef = useRef<HTMLDivElement>(null)

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

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className='font-quicksand flex justify-between items-center px-10 py-5 relative'>
      {/* Logo */}
      <img className='w-28' src={currentColor === "dark" ? logoAnimadoNegro : logoAnimadoBlanco} alt="Shapes Logo" />
      
      {/* Icono del menú hamburguesa */}
      {isMobile && (
        <CiMenuFries 
          className={`${textColor} text-3xl cursor-pointer z-10
          ${isMobile && !menuOpen ? 'block' : 'hidden'}
          `}

          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}

      {/* Menú de navegación */}
      <div ref={menuRef} className={isMobile && !menuOpen ? 'hidden' : 'block'}>
        <nav
          className={`
            ${isMobile ? 'absolute top-6 right-0 p-5 w-[12rem] rounded-md shadow-lg z-20 transition-all duration-300 ease-in-out' : 'static'}
            ${isMobile && menuOpen ? `opacity-100 translate-x-0 block bg-black ${bgColor} ` : ''}
            ${isMobile && !menuOpen ? `opacity-0 translate-x-full hidden ${bgColor}` : ''}
            ${!isMobile ? 'flex flex-row items-center gap-10' : 'flex flex-col items-start gap-8'}
          `}
        >
          <a className={`text-xl ${textColor} font-light`} href="">{t.nav.services}</a>
          <a className={`text-xl ${textColor} font-light`} href="">{t.nav.about}</a>
          <a className={`text-xl ${textColor} font-light`} href="">{t.nav.contact}</a>
          <LanguageSwitch />
          <ColorSwitch />
        </nav>
      </div>
    </header>
  );
}