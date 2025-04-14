import React from 'react'
import logoAnimadoNegro from '../../assets/Logo Animado Negro.gif'
import logoAnimadoBlanco from '../../assets/Logo Animado Blanco.gif'
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Loading: React.FC = () => {
    const currentColor = useSelector((state:RootState) => state.color.mode)
    const descriptionColor =
    currentColor === "dark" ? "text-white" : "text-black";
  return (
    <div className='flex flex-col justify-center mx-auto h-screen w-fit'>
       <img src={currentColor === "dark" ? logoAnimadoNegro : logoAnimadoBlanco} alt="Logo de Shapes-Tech" />
       <div className="self-end">
        <p className={`${descriptionColor} text-[1.5rem] font-quicksand text-animation text-animation-design `}><span className='text-red font-quicksand'>web</span>design</p>
        <p className={`${descriptionColor} text-[1.5rem] font-quicksand text-animation text-animation-development `}><span className='text-green font-quicksand'>landing</span>pages</p>
        <p className={`${descriptionColor} text-[1.5rem] font-quicksand text-animation text-animation-ai `}><span className='text-blue font-quicksand'>web</span>applications</p>
       </div>
    </div>
  )
}

export default Loading
