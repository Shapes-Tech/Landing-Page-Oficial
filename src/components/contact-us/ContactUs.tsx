import React from 'react'
import { useSelector } from 'react-redux'
import { translations } from '../../translations'
import { RootState } from '../../store'
import ContactForm from './ContactForm'
export const ContactUs: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const t = translations[currentLanguage]
  return (
    <section className='w-[80%] mx-auto mt-16 pb-8'>
      <h1 className='text-5xl font-quicksand text-white font-light'>{t.contactUs.title}</h1>
      <h3 className='font-quicksand text-3xl text-white font-light mt-6'>{t.contactUs.subtitle}</h3>
      <ContactForm />
    </section>
  )
}
