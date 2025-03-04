import React from 'react'
import { translations } from '../../translations'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import andyImage from '../../assets/AndyCambra.jpg'
import nachoImage from '../../assets/NachoFernandez.jpg'
import leoImage from '../../assets/LeoBaranelli.jpeg'
import Cards from './Cards'

export const AboutUs: React.FC = () => {
  const currentLanguage = useSelector((state:RootState) => state.language.currentLanguage)
  const t = translations[currentLanguage]
  const aboutUsData =[
    {
      name:'andrea',
      lastName:'cambra',
      position:'UX/UI - Frontend Developer',
      img: andyImage,
      description: t.aboutUs.andyDescription,
      linkedin:'',
      github:'',
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
    },
    {
      name:'nacho',
      lastName:'fernández',
      position:'Frontend Developer',
      img: nachoImage, 
      description: t.aboutUs.nachoDescription,
      linkedin:'',
      github:'',
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
    },
    {
      name:'leonardo',
      lastName:'baranelli',
      position:'Backend Developer - AI Developer',
      img: leoImage,
      description: t.aboutUs.leoDescription,
      linkedin:'',
      github:'',
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]",
    }
  ]
  return (
    <section className='text-white w-[80%] mx-auto font-quicksand pb-6 mt-16'>
      <h1 className='text-white text-5xl font-extralight'>{t.aboutUs.title}</h1>
      <h2 className='text-white text-4xl font-light mt-3'>{t.aboutUs.subtitle}</h2>
      <div className="flex items-center justify-between gap-5 mt-10">
        {aboutUsData.map((data,index) =>(
          <Cards 
          key={index}
          name={data.name}
          lastName={data.lastName}
          position={data.position}
          img={data.img}
          borderColor={data.borderColor}
          textColor={data.textColor}
          description={data.description}
          linkedin={data.linkedin}
          github={data.github}
          />
        ))}
      </div>
    </section>
  )
}
