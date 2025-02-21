import React from 'react'
import logoAnimado from '../../assets/Logo Animado.gif'
import { LanguageSwitch } from './LanguageSwitch'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const NavBar = () => {
    const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
    const t = translations[currentLanguage]
  return (
    <header className='font-montserrat flex justify-between items-center px-10 py-5'>
        <img className='w-32' src={logoAnimado} alt="Shapes Logo" />
        <nav className='flex items-center gap-10'>
            <a className='text-white text-2xl' href="">{t.nav.services}</a>
            <a className='text-white text-2xl' href="">{t.nav.about}</a>
            <a className='text-white text-2xl' href="">{t.nav.contact}</a>
            <LanguageSwitch />
        </nav>
    </header>
  )
}
