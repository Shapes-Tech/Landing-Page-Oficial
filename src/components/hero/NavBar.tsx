import React from 'react'
import logoAnimado from '../../assets/Logo Animado.gif'
import { LanguageSwitch } from './LanguageSwitch'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ColorSwitch } from './ColorSwitch'

export const NavBar = () => {
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
    const currentColor = useSelector((state: RootState) => state.color.mode)
    const textColor = currentColor === 'dark' ? 'text-white' : 'text-black' 
    const t = translations[currentLanguage]
  return (
    <header className='font-quicksand flex justify-between items-center px-10 py-5'>
        <img className='w-28' src={logoAnimado} alt="Shapes Logo" />
        <nav className='flex items-center gap-10'>
            <a className={`text-xl ${textColor} font-light`} href="">{t.nav.services}</a>
            <a className={`text-xl ${textColor} font-light`} href="">{t.nav.about}</a>
            <a className={`text-xl ${textColor} font-light`} href="">{t.nav.contact}</a>
            <LanguageSwitch />
            <ColorSwitch />
        </nav>
    </header>
  )
}
