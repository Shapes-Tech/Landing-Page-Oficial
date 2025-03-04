import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import Modal from "./Modal";

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

  const handleModal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div className={`flex flex-col gap-4 items-start p-5 border ${borderColor} rounded-3xl mt-10`}>
        <img className="w-32" src={icon} alt="Logo de Design" />
        <h1 className={`${textColor} text-2xl`}>
          {titleOne}<span className="text-white">{titleTwo}</span>
        </h1>
        <p className="font-quicksand font-extralight text-2xl w-[90%]">
          {description}
        </p>
        <button onClick={handleModal} className="flex items-center gap-3 border border-white rounded-full p-2 cursor-pointer">
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
