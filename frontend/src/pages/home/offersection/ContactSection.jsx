import React, { useState } from "react";
import { useContact } from "../../../hooks/contact/useContact";
import { useTranslation } from "react-i18next";
import ContactForm from "../../blog&contact/ContactForm";

const ContactSection = () => {

  const { t } = useTranslation();

  const { mutate, isPending } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },

      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Banner */}

        <div className="relative rounded-2xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-between p-6 sm:p-10 text-white shadow-sm">
          <img
            src="https://res.cloudinary.com/p61kdb2x/image/upload/v1785223388/banner-13.jpg_yxm61k.jpg"
            alt="Spring Deals Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />

          <div className="relative z-10 space-y-4 max-w-md">
            <span className="text-xs uppercase tracking-wider text-gray-300">
              {t("contactSection.tagline")}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none">
              {t("contactSection.title1")}
              <br />
              {t("contactSection.title2")}
              <br />
              {t("contactSection.title3")}
            </h2>
            <p className="text-sm text-gray-200">
              {t("contactSection.description")}
            </p>
          </div>

          <div className="relative z-10">
            <button
              onClick={() => navigate("/shop")}
              className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100"
            >
              {t("contactSection.button")}
            </button>
          </div>
        </div>

        {/* Reusable Form */}

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
