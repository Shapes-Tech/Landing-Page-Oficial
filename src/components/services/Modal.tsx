import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { translations } from '../../translations';
import { FaTimes, FaPalette, FaCode, FaRobot } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

interface ModalProps{
  handleModal: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({handleModal, id}) => {
  const currentLanguage = useSelector((state: RootState) => state.language.currentLanguage);
  const currentColor = useSelector((state: RootState) => state.color.mode);
  const t = translations[currentLanguage]

  
  const [modal, setModal] = useState({
    title: "",
    borderColor: "",
    textColor: "",
    icon: null as React.ElementType | null,
    features: [] as string[],
    description: "",
    cta: "",
    bgColor: "",
  });
  
  const dataModal = [
    {
      id: 1,
      title: currentLanguage === 'es' ? 'DISEÑO WEB' : 'WEB DESIGN',
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
      bgColor: "bg-[#FD4441]/10",
      icon: FaPalette,
      features: t.services.designDetail.features,
      description: t.services.designDetail.description,
      cta: t.services.cta,
    },
    {
      id: 2,
      title: currentLanguage === 'es' ? 'DESARROLLO WEB' : 'WEB DEVELOPMENT',
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
      bgColor: "bg-[#6FBB03]/10",
      icon: FaCode,
      features: t.services.developmentDetail.features,
      description: t.services.developmentDetail.description,
      cta: t.services.cta,
    },
    {
      id: 3,
      title: currentLanguage === 'es' ? 'APLICACIONES IA' : 'AI APPLICATIONS',
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]",
      bgColor: "bg-[#2782FF]/10",
      icon: FaRobot,
      features: t.services.aiDetail.features,
      description: t.services.aiDetail.description,
      cta: t.services.cta,
    },
  ];

  useEffect(() => {
    const selectModal = dataModal.find((item) => item.id === Number(id));
    if(selectModal){
      setModal(selectModal);
    }
  },[id, currentLanguage, t]);

  const bgColor = currentColor === 'dark' ? 'bg-[#121212]' : 'bg-white';
  const textColorMode = currentColor === 'dark' ? 'text-white' : 'text-[#333333]';
  const secondaryTextColor = currentColor === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const IconComponent = modal.icon;

  return (
    <div onClick={(e) => e.target === e.currentTarget && handleModal()} className="fixed z-50 top-0 left-0 w-screen h-screen bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4">
      <div onClick={(e) => e.stopPropagation()} className={`${bgColor} border ${modal.borderColor} rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto`}>
        <div className="relative p-6 md:p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className={`${modal.textColor} text-2xl md:text-3xl font-bold`}>{modal.title}</h1>
            <button 
              className={`${textColorMode} hover:opacity-70 transition-opacity p-2`} 
              onClick={handleModal}
              aria-label={t.services.close}
            >
              <FaTimes size={24} />
            </button>
          </div>
          
          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column - Icon */}
            <div className={`${modal.bgColor} rounded-xl overflow-hidden flex items-center justify-center p-8 h-64 md:h-auto`}>
              {IconComponent && <IconComponent size={120} className={modal.textColor} />}
            </div>
            
            {/* Right column - Description and features */}
            <div className="flex flex-col gap-6">
              <p className={`${textColorMode} text-lg leading-relaxed`}>
                {modal.description}
              </p>
              
              <div>
                <h3 className={`${modal.textColor} font-semibold text-xl mb-4`}>
                  {t.services.features}
                </h3>
                <ul className="space-y-3">
                  {modal.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className={`${modal.textColor} mt-1`}>
                        <BsCheckCircleFill />
                      </span>
                      <span className={`${secondaryTextColor}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-8 flex justify-center md:justify-end">
            <button 
              className={`${modal.textColor} ${modal.borderColor} border-2 cursor-pointer hover:bg-opacity-10 hover:bg-current transition-colors rounded-full px-6 py-3 font-medium`}
              onClick={handleModal}
            >
              {modal.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
