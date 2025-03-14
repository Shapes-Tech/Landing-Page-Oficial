import React from 'react'
import Circle from '../../assets/Circle.gif'
import Square from '../../assets/Square.gif'
import Triangle from '../../assets/Triangle.gif'
const Shapes: React.FC = () => {
  return (
    <section className='flex justify-center gap-4 shapes-img-md:gap-10 items-center w-[80%] mx-auto mt-10'>
      <img className=' w-20 h-20 shapes-img-md:w-32 shapes-img-md:h-32 shapes-img-lg:w-48 shapes-img-lg:h-48' src={Square} alt="" />
      <img className=' w-20 h-20 shapes-img-md:w-32 shapes-img-md:h-32 shapes-img-lg:w-48 shapes-img-lg:h-48' src={Circle} alt="" />
      <img className=' w-20 h-20 shapes-img-md:w-32 shapes-img-md:h-32 shapes-img-lg:w-48 shapes-img-lg:h-48' src={Triangle} alt="" />
    </section>
  )
}

export default Shapes
