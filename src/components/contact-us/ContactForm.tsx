import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { translations } from "../../translations";
import { RootState } from "../../store";
import emailJs from "@emailjs/browser";

interface IFormData {
  user_name: string;
  user_email: string;
  message: string;
}

type FormStatus = "idle" | "sending" | "success" | "error";

const ContactForm: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const currentColor = useSelector((state: RootState) => state.color.mode)
  const textColor = currentColor === 'dark' ? 'text-white' : 'text-black'
  const borderColor = currentColor === 'dark' ? 'border-white' : 'border-black'
  const t = translations[currentLanguage];
  const [formData, setFormData] = useState<IFormData>({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.user_name || !formData.user_email || !formData.message) {
      return;
    }
    
    setFormStatus("sending");
    
    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      message: formData.message,
    };
    
    try {
      await emailJs.send(
        "service_zrtjxkl", 
        "template_8vuxweg", 
        templateParams, 
        "xtVV_gvBzjfdHF6GV"
      );
      
      setFormStatus("success");
      
      // Limpiar el formulario
      setFormData({
        user_name: "",
        user_email: "",
        message: "",
      });
      
      // Después de 5 segundos, volver al estado inicial
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Error al enviar el email:", error);
      setFormStatus("error");
      
      // Después de 5 segundos, volver al estado inicial
      setTimeout(() => {
        setFormStatus("idle");
      }, 5000);
    }
  };
  
  // Variantes para las animaciones
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1.2,
        ease: "easeInOut"
      }
    }
  };
  
  // Variantes para los mensajes
  const messageVariants = {
    initial: { 
      opacity: 0, 
      y: -20,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Colores y estilos para los mensajes de estado
  const getStatusStyles = () => {
    if (formStatus === "success") {
      return {
        bg: currentColor === 'dark' ? 'bg-green-900/20' : 'bg-green-100',
        border: 'border-green-500',
        text: 'text-green-500',
        icon: '✓'
      };
    }
    if (formStatus === "error") {
      return {
        bg: currentColor === 'dark' ? 'bg-red-900/20' : 'bg-red-100',
        border: 'border-red-500',
        text: 'text-red-500',
        icon: '✗'
      };
    }
    return {
      bg: currentColor === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
      border: 'border-[#6FBB03]',
      text: textColor,
      icon: ''
    };
  };
  
  // Determinar el mensaje de estado
  const getStatusMessage = () => {
    if (formStatus === "sending") return t.contactUs.status.sending;
    if (formStatus === "success") return t.contactUs.status.success;
    if (formStatus === "error") return t.contactUs.status.error;
    return "";
  };
  
  const statusStyles = getStatusStyles();
  
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto gap-6 mt-7 border w-[100%] change-desktop:w-[80%] change-desktop:mx-0 border-slate-400 rounded-3xl p-7 font-quicksand relative"
    >
      {/* Campos del formulario con efecto de desvanecimiento cuando está enviando */}
      <motion.div
        animate={{ 
          opacity: formStatus === "sending" ? 0.7 : 1,
          filter: formStatus === "sending" ? "blur(1px)" : "blur(0px)"
        }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-6"
      >
        <input
          className={`border ${borderColor} rounded-2xl p-3 ${textColor} focus:border-[#6FBB03] focus:ring-1 focus:ring-[#6FBB03] focus:outline-none transition-all duration-300`}
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          type="text"
          placeholder={t.contactUs.placeholder.name}
          disabled={formStatus === "sending"}
          required
        />
        <input
          className={`border ${borderColor} rounded-2xl p-3 ${textColor} focus:border-[#6FBB03] focus:ring-1 focus:ring-[#6FBB03] focus:outline-none transition-all duration-300`}
          value={formData.user_email}
          onChange={handleChange}
          name="user_email"
          type="email"
          placeholder={t.contactUs.placeholder.email}
          disabled={formStatus === "sending"}
          required
        />
        <textarea
          className={`border ${borderColor} rounded-2xl p-3 ${textColor} resize-none min-h-[120px] focus:border-[#6FBB03] focus:ring-1 focus:ring-[#6FBB03] focus:outline-none transition-all duration-300`}
          value={formData.message}
          onChange={handleChange}
          name="message"
          placeholder={t.contactUs.placeholder.message}
          disabled={formStatus === "sending"}
          required
        ></textarea>
      </motion.div>
      
      {/* Contenedor para mensajes de estado */}
      <AnimatePresence>
        {formStatus !== "idle" && (
          <motion.div
            key={formStatus}
            variants={messageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${statusStyles.bg} ${statusStyles.border} border ${statusStyles.text} p-4 rounded-xl flex items-center gap-3 shadow-sm`}
          >
            {formStatus === "sending" ? (
              <div className="flex items-center gap-3">
                <motion.div
                  variants={spinnerVariants}
                  animate="animate"
                  className="w-5 h-5 border-2 border-t-transparent border-[#6FBB03] rounded-full flex-shrink-0"
                />
                <span>{getStatusMessage()}</span>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 font-bold">{statusStyles.icon}</span>
                <span>{getStatusMessage()}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Botón de envío con efectos de hover y estados */}
      <motion.button
        className={`${textColor} text-[1.3rem] px-16 contactUs-text-lg:text-[1.4rem] contactUs-text-big:text-2xl border border-[#6FBB03] py-2 contactUs-text-big:py-3 contactUs-text-lg:px-20 contactUs-text-big:px-28 rounded-4xl w-fit cursor-pointer flex items-center justify-center gap-2 relative overflow-hidden group`}
        type="submit"
        disabled={formStatus === "sending"}
        whileHover={{ 
          scale: formStatus === "sending" ? 1 : 1.03,
          boxShadow: formStatus === "sending" ? "none" : "0 4px 12px rgba(111, 187, 3, 0.2)"
        }}
        whileTap={{ scale: formStatus === "sending" ? 1 : 0.98 }}
      >
        {formStatus === "sending" ? (
          <div className="flex items-center justify-center gap-3">
            <motion.div
              variants={spinnerVariants}
              animate="animate"
              className="relative w-6 h-6"
            >
              <div className="absolute inset-0 rounded-full border-2 border-t-2 border-[#6FBB03] border-t-transparent"></div>
              <div className="absolute inset-0.5 rounded-full border-2 border-t-2 border-[#6FBB03]/50 border-t-transparent" style={{ animationDelay: "0.1s" }}></div>
            </motion.div>
            <span>{t.contactUs.status.sending}</span>
          </div>
        ) : (
          <>
            <span>{t.contactUs.send}</span>
            <motion.span 
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="absolute right-0 w-0 h-full bg-[#6FBB03]/10 group-hover:w-full transition-all duration-300 z-0"
            />
          </>
        )}
      </motion.button>
      
      {/* Mensaje de marketing digital con mejor diseño */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`${textColor} text-sm italic mt-2 flex items-center gap-2 before:content-[''] before:w-1 before:h-1 before:bg-[#6FBB03] before:rounded-full`}
      >
        {currentLanguage === "es" 
          ? "Únete a nuestra comunidad y mantente al día con las últimas tendencias digitales."
          : "Join our community and stay updated with the latest digital trends."}
      </motion.p>
    </form>
  );
};

export default ContactForm;
