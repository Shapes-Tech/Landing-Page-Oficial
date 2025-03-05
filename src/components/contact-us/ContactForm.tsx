import React, { useState } from "react";
import { useSelector } from "react-redux";
import { translations } from "../../translations";
import { RootState } from "../../store";

interface IFormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );
  const t = translations[currentLanguage];
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    email: "",
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
    console.log(formData);
    setFormData((prev) => ({
      ...prev,
      name: "",
      email: "",
      message: "",
    }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 mt-7 border w-[80%] border-slate-400 rounded-3xl p-7 font-quicksand"
    >
      <input
        className="border border-white rounded-2xl p-3 text-white"
        name="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        placeholder={t.contactUs.placeholder.name}
      />
      <input
        className="border border-white rounded-2xl p-3 text-white"
        value={formData.email}
        onChange={handleChange}
        name="email"
        type="text"
        placeholder={t.contactUs.placeholder.email}
      />
      <textarea
        className="border border-white rounded-2xl p-3 text-white resize-none"
        value={formData.message}
        onChange={handleChange}
        name="message"
        id=""
        placeholder={t.contactUs.placeholder.message}
      ></textarea>
      <button
        className="text-white text-2xl border border-[#6FBB03] py-3 px-28 rounded-4xl w-fit cursor-pointer "
        type="submit"
      >
        {t.contactUs.send}
      </button>
    </form>
  );
};

export default ContactForm;
