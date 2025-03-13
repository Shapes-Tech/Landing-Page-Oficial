import React, { useEffect, useState } from 'react';

interface ModalProps{
  handleModal: () => void;
  id: number;
}

const Modal: React.FC<ModalProps> = ({handleModal, id}) => {
  const [modal, setModal] = useState({
    title:"",
    borderColor: "",
    textColor: "",
  })
  
  const dataModal =[
    {
      id: 1,
      title:'WEB DESIGN',
      borderColor: "border-[#FD4441]",
      textColor: "text-[#FD4441]",
    },
    {
      id: 2,
      title:'WEB DEVELOPMENT',
      borderColor: "border-[#6FBB03]",
      textColor: "text-[#6FBB03]",
    },
    {
      id: 3,
      title:'AI APPLICATIONS',
      borderColor: "border-[#2782FF]",
      textColor: "text-[#2782FF]",
    },
  ]

  useEffect(() => {
    const selectModal = dataModal.find((item) => item.id === Number(id));
    if(selectModal){
      setModal(selectModal)
    }
  },[id])

  return (
    <div onClick={handleModal} className="fixed top-0 left-0 w-screen h-screen bg-black/50 backdrop-blur-lg flex items-center justify-center">
      <div className={`border ${modal.borderColor} rounded-2xl w-[80%] h-[80%] p-5`}>
        <button className='absolute right-56 text-2xl cursor-pointer' onClick={handleModal}>X</button>
        <h1 className={modal.textColor}>{modal.title}</h1>
      </div>
    </div>
  );
};

export default Modal;
