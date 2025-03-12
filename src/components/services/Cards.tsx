import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface CardsProps{
  id: number;
  titleOne: string;
  titleTwo: string;
  description: string;
  icon: string;
  learnMore: string;
  borderColor: string;
  textColor: string;
}
const Cards: React.FC<CardsProps> = ({titleOne, titleTwo, textColor, description, icon, learnMore, borderColor, id}) => {
  const [isOpen, setIsOpen] = useState(false)
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const positionColor = currentColor === 'dark' ? 'text-white' : 'text-black'
  const borderColorButton = currentColor === 'dark' ? 'border-white' : 'border-black'

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className={`flex flex-col gap-4 items-start p-5 border ${borderColor} rounded-3xl mt-10 h-[22.5rem]`}>
        <img className=" w-28 services-img-xbig:w-32" src={icon} alt="Icono de la tarjeta" />
        <h1 className={`${textColor} text-2xl`}>
          {titleOne}<span className={positionColor}>{titleTwo}</span>
        </h1>
        <p className="font-quicksand font-extralight text-[1.2rem] services-text-lg:text-[1.3rem] w-[95%] services-text-big:text-2xl services-text-big:w-[90%]">
          {description}
        </p>
        <button onClick={handleModal} className={`flex items-center gap-3 border ${borderColorButton} rounded-full p-2 cursor-pointer`}>
          {learnMore}{" "}
          <span className="mt-[0.3rem]">
            <FaLongArrowAltRight />{" "}
          </span>
        </button>
      </div>
      {isOpen && <Modal handleModal={handleModal} id={id} />}
      </>
  );
};

export default Cards;
