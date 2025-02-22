import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { setColor } from '../../store/colorSlice'
import { TiWeatherSunny } from "react-icons/ti";
import { FaMoon } from "react-icons/fa6";

export const ColorSwitch = () => {
  const dispatch = useDispatch()
  const currentColor = useSelector((state: RootState) => state.color.mode)
  
  const toggleColor = () =>{
    dispatch(setColor(currentColor === 'dark' ? 'light' : 'dark'))
  }
  return (
    <button onClick={toggleColor} className='cursor-pointer'>
      {currentColor === 'dark' ?<TiWeatherSunny className='text-white text-4xl' />   :  <FaMoon className='text-black text-4xl' /> }
    </button>
  )
}
