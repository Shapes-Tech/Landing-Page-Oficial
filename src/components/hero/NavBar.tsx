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
          className='text-white text-3xl cursor-pointer z-10' 
          onClick={() => setMenuOpen(!menuOpen)}
        />
      )}

      {/* Menú de navegación */}
      <nav
      ref={menuRef}
        className={`absolute top-6 right-3 p-3  text-white rounded-md z-20 transition-all duration-300 ease-in-out 
        ${menuOpen ? 'opacity-100 translate-y-0 bg-black flex flex-col items-start gap-8' : 'opacity-0 -translate-y-5 pointer-events-none flex flex-col items-start gap-8'} 
        header-desktop:opacity-100 header-desktop:static header-desktop:flex header-desktop:flex-row header-desktop:items-center gap-10`}
      >
        <a className={`text-xl ${textColor} font-light`} href="">{t.nav.services}</a>
        <a className={`text-xl ${textColor} font-light`} href="">{t.nav.about}</a>
        <a className={`text-xl ${textColor} font-light`} href="">{t.nav.contact}</a>
        <LanguageSwitch />
        <ColorSwitch />
      </nav>
    </header>
  );
}
