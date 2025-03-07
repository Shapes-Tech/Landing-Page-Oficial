import React from 'react'
import LogoAnimadoNegro from '../../assets/Logo Animado Negro.gif'
import LogoAnimadoBlanco from '../../assets/Logo Animado Blanco.gif'
import { FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { translations } from '../../translations'
import { RootState } from '../../store'
const Footer: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black' 
  const t = translations[currentLanguage] 
  return (
    <footer className='px-10 pb-16 mt-10 flex items-center gap-10'>
      <img className='w-28' src={currentColor === "dark" ? LogoAnimadoNegro : LogoAnimadoBlanco} alt="Shapes Logo" />
      <div className="flex flex-col gap-7">
        <div className={`${textColor} flex gap-4 text-4xl`}>
          <a href="/"><FaLinkedin /></a>
          <a href="/"><FaInstagram/></a>
        </div>
        <p className='font-quicksand text-slate-400'>{t.footer.copyRight}</p>
      </div>
    </footer>
  )
}

export default Footer
