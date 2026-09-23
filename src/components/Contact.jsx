import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Motion Graphics",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    // Graceful fallback for local development without configured EmailJS keys
    if (
      !serviceId ||
      serviceId === "service_portfolio" ||
      !publicKey ||
      publicKey === "user_portfolio_key"
    ) {
      setTimeout(() => {
        setLoading(false);
        alert(
          `Thank you ${form.name || "there"}! Your inquiry for ${form.projectType} has been received. (Running on localhost preview - configure live keys in .env to send actual emails).`
        );
        setForm({
          name: "",
          email: "",
          projectType: "Motion Graphics",
          message: "",
        });
      }, 600);
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Rajan",
          from_email: form.email,
          to_email: "portfolio@creative.pro",
          project_type: form.projectType,
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you! I will review your project brief and get back to you shortly.");

          setForm({
            name: "",
            email: "",
            projectType: "Motion Graphics",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please check your network or try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl border border-white/5 shadow-xl'
      >
        <p className={styles.sectionSubText}>Direct Inquiries &amp; Commissions</p>
        <h3 className={styles.sectionHeadText}>Initiate Collaboration.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col gap-6'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Your Name / Organization</span>
            <input
              type='text'
              name='name'
              required
              value={form.name}
              onChange={handleChange}
              placeholder='e.g. Alex Morgan / Horizon Media'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#915EFF] font-medium transition-colors'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Business Email</span>
            <input
              type='email'
              name='email'
              required
              value={form.email}
              onChange={handleChange}
              placeholder='name@company.com'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#915EFF] font-medium transition-colors'
            />
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Project Scope</span>
            <select
              name='projectType'
              value={form.projectType}
              onChange={handleChange}
              className='bg-tertiary py-4 px-6 text-white rounded-lg outline-none border border-white/5 focus:border-[#915EFF] font-medium transition-colors cursor-pointer'
            >
              <option value='3D Motion Graphics'>3D Motion Graphics &amp; Animation</option>
              <option value='Commercial Video Editing'>Commercial Video Editing &amp; Pacing</option>
              <option value='Generative AI Production'>Generative AI Video &amp; Neural Visuals</option>
              <option value='VFX & Color Grading'>VFX Compositing &amp; DaVinci Color Grading</option>
              <option value='Full Creative Direction'>Creative Direction &amp; Retainer</option>
            </select>
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-2'>Project Brief &amp; Objectives</span>
            <textarea
              rows={5}
              name='message'
              required
              value={form.message}
              onChange={handleChange}
              placeholder='Describe project goals, deliverables, timeline, target audience, and references...'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-white/5 focus:border-[#915EFF] font-medium transition-colors'
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='bg-gradient-to-r from-[#915EFF] to-[#7038e8] hover:from-[#7e47f0] hover:to-[#5d2ac9] py-3.5 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50'
          >
            {loading ? "Transmitting..." : "Submit Project Inquiry"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
