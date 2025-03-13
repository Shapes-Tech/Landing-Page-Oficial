import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AboutUsProps {
  name: string;
  lastName: string;
  position: string;
  img: string;
  description: string;
  linkedin: string;
  github: string;
  borderColor: string;
  textColor: string;
/*   shape: any; */
}

const Cards: React.FC<AboutUsProps> = ({
  name,
  lastName,
  position,
  img,
  description,
  linkedin,
  github,
  borderColor,
  textColor,
/*   shape, */
}) => {
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColorDescription = currentColor === 'dark' ? 'text-white' : 'text-black'
  return (
    <div
      className={`border ${borderColor} rounded-2xl h-[34rem] aboutUs-text-midLg:h-[32rem] aboutUs-img-lg:h-[42rem] aboutUs-img-xlbig:h-[41rem] flex flex-col p-5 font-quicksand overflow-hidden relative`}
    >
      <div className="relative group">
        <img
          className="relative w-[30rem] h-[15rem] aboutUs-text-lg:h-[25rem] object-cover rounded-2xl mx-auto grayscale transition-all duration-300"
          src={img}
          alt="Imagen del equipo"
        />
        {/* Shape */}
{/*         <div className="absolute top-0 left-0 w-full h-full group-hover:scale-50 transition-all duration-300">
          {shape}
        </div> */}
      </div>

      <p className={` text-[1.3rem] aboutUs-text-lg:text-2xl font-light ${textColor} mt-5`}>
        {name}
        <span className={textColorDescription}>{lastName}</span>
      </p>
      <p className={`${textColorDescription} font-bold text-[0.9rem] aboutUs-text-big:text-big aboutUs-text-xbig:text-xl`}>{position}</p>
      <p className={` ${textColorDescription} font-light text-big aboutUs-text-xbig:text-xl mt-5`}>{description}</p>
      <div className="flex items-center gap-2 mt-5">
        <a className="text-4xl" href={linkedin}>
          <FaLinkedin />
        </a>
        <a className="text-4xl" href={github}>
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default Cards;
