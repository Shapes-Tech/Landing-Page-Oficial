import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLanguage } from "../../store/languageSlice";

export const LanguageSwitch: React.FC = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  	const currentColor = useSelector((state: RootState) => state.color.mode)
  
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black' 

	const toggleLanguage = () =>{
		dispatch(setLanguage(currentLanguage === 'es' ? 'en' : 'es'))
	}

  return (
	<button onClick={toggleLanguage} >
		<span className={` cursor-pointer text-xl ${textColor}`}>{currentLanguage === 'es' ? 'es' : 'en'}</span>
	</button>
)};
