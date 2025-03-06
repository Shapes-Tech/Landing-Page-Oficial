import React from 'react'
import Logo from '../../assets/Logo Animado.gif'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { translations } from '../../translations'
import { RootState } from '../../store'
const Footer: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const t = translations[currentLanguage] 
  return (
    <footer className='px-10 pb-16 mt-10 flex items-center gap-10'>
      <img className='w-28' src={Logo} alt="Logo de Shapes" />
      <div className="flex flex-col gap-7">
        <div className="text-white flex gap-4 text-4xl">
          <a href="/"><FaLinkedin /></a>
          <a href="/"><FaInstagram/></a>
        </div>
        <p className='font-quicksand text-slate-400'>{t.footer.copyRight}</p>
      </div>
    </footer>
  )
}

export default Footer
