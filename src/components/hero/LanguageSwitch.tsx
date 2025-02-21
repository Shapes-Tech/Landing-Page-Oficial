import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLanguage } from "../../store/languageSlice";
import Spain from '../../assets/spain.svg'
import USA from '../../assets/united-states-of-america.svg'
export const LanguageSwitch = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);

	const toggleLanguage = () =>{
		dispatch(setLanguage(currentLanguage === 'es' ? 'en' : 'es'))
	}

  return (
	<button onClick={toggleLanguage} >
    <img className="w-10 cursor-pointer" src={currentLanguage === 'es' ? Spain : USA} />
	</button>
)};
