import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";



interface AboutUsProps{
  name: string;
  lastName: string;
  position: string;
  img: string;
  description:string;
  linkedin:string;
  github:string;
  borderColor: string;
  textColor: string;
}

const Cards: React.FC<AboutUsProps> = ({name, lastName, position, img, description, linkedin, github, borderColor, textColor}) => {
  return (
    <div className={` border ${borderColor} rounded-2xl flex flex-col p-5 font-quicksand`}>
        <img className='w-[30rem] h-[25rem] object-cover rounded-2xl mx-auto grayscale' src={img} alt="Imagen del equipo" />
        <p className={`text-2xl font-light ${textColor} mt-5`}>{name}<span className='text-white'>{lastName}</span></p>
        <p className='text-white font-bold text-xl'>{position}</p>
        <p className='text-white font-light text-xl mt-5'>{description}</p>
        <div className="flex items-center gap-2 mt-5">
          <a className='text-4xl' href={linkedin}>
            <FaLinkedin />
          </a>
          <a className='text-4xl' href={github}>
            <FaGithub />
          </a>
        </div>
    </div>
  )
}

export default Cards
