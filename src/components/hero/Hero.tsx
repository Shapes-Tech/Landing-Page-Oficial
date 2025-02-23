import React from 'react'
import { NavBar } from './NavBar'
import shapes from '../../assets/shapes.gif'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { ShapesArrow } from './ShapesArrow'
export const Hero: React.FC = () => {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const t = translations[currentLanguage]
  const titleColor = currentColor === 'dark' ? 'text-white opacity-40' : 'text-black opacity-90' 
  const descriptionColor = currentColor === 'dark' ? 'text-white' : 'text-black' 
  return (
    <section className='flex flex-col'>
      <NavBar />
      <div className="flex items-start gap-14">
        <img src={shapes} />
        <div className="flex flex-col">
          <h1 className={`font-quicksand ${titleColor} text-[10vw] font-extralight`}>{t.hero.title}</h1>
          <p className={`font-quicksand ${descriptionColor} text-3xl w-[90%] font-extralight`}>{t.hero.description}</p>
          <button className='button-hero animate-button font-medium mt-7 cursor-pointer'>{t.hero.button}</button>
        </div>
      </div>
      <ShapesArrow />
    </section>
  )
}
