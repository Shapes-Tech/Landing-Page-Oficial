import React from 'react'
import { useSelector } from 'react-redux'
import { translations } from '../../translations'
import { RootState } from '../../store'
import ContactForm from './ContactForm'
export const ContactUs: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'
  const t = translations[currentLanguage]
  return (
    <section id="contact-us" className={`${textColor} w-[80%] mx-auto mt-16 pb-8 pt-20`}>
      <h1 className=' text-[2rem] contactUs-text-small:text-5xl font-quicksand font-light'>{t.contactUs.title}</h1>
      <h3 className='font-quicksand text-[1.2rem] contactUs-text-small:text-[1.4rem] contactUs-text-lg:text-2xl contactUs-text-big:text-3xl font-light mt-6'>{t.contactUs.subtitle}</h3>
      <ContactForm />
    </section>
  )
}
