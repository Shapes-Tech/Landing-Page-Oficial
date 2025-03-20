import React, { useState } from "react";
import { useSelector } from "react-redux";
import { translations } from "../../translations";
import { RootState } from "../../store";
import emailJs from "@emailjs/browser";

interface IFormData {
  user_name: string;
  user_email: string;
  message: string;
}

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const templateParams = {
      user_name: formData.user_name,
      user_email: formData.user_email,
      message: formData.message,
    };
    emailJs.send("service_zrtjxkl", "template_8vuxweg", templateParams, "xtVV_gvBzjfdHF6GV")
    setFormData((prev) => ({
      ...prev,
      user_name: "",
      user_email: "",
      message: "",
    }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto gap-6 mt-7 border w-[100%] change-desktop:w-[80%] change-desktop:mx-0 border-slate-400 rounded-3xl p-7 font-quicksand"
    >
      <input
        className={`border ${borderColor} rounded-2xl p-3 ${textColor}`}
        name="user_name"
        value={formData.user_name}
        onChange={handleChange}
        type="text"
        placeholder={t.contactUs.placeholder.name}
      />
      <input
        className={`border ${borderColor} rounded-2xl p-3 ${textColor}`}
        value={formData.user_email}
        onChange={handleChange}
        name="user_email"
        type="text"
        placeholder={t.contactUs.placeholder.email}
      />
      <textarea
        className={`border ${borderColor} rounded-2xl p-3 ${textColor} resize-none`}
        value={formData.message}
        onChange={handleChange}
        name="message"
        id=""
        placeholder={t.contactUs.placeholder.message}
      ></textarea>
      <button
        className={`${textColor} text-[1.3rem] px-16 contactUs-text-lg:text-[1.4rem] contactUs-text-big:text-2xl border border-[#6FBB03] py-2 contactUs-text-big:py-3 contactUs-text-lg:px-20 contactUs-text-big:px-28 rounded-4xl w-fit cursor-pointer`}
        type="submit"
      >
        {t.contactUs.send}
      </button>
    </form>
  );
};

export default ContactForm;
