import React, { useState } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  category,
  description,
  tags,
  image,
  source_code_link,
  onOpenModal,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 400,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 hover:border-[#915EFF]/50 transition-all duration-300 shadow-xl flex flex-col justify-between h-full group cursor-pointer'
        onClick={onOpenModal}
      >
        <div>
          <div className='relative w-full h-[210px] rounded-xl overflow-hidden'>
            <img
              src={image}
              alt={name}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />

            {/* Gradient Overlay & Category badge */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity' />

            <div className='absolute top-3 left-3'>
              <span className='px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-[#dfd9ff] border border-white/10'>
                {category || "Motion Graphics"}
              </span>
            </div>

            {/* Play/View Button */}
            <div className='absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#915EFF] hover:bg-[#7e47f0] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg transition-transform group-hover:scale-105'>
              <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
              <span>View Details</span>
            </div>
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[22px] group-hover:text-[#dfd9ff] transition-colors'>
              {name}
            </h3>
            <p className='mt-2 text-secondary text-[14px] line-clamp-3 leading-relaxed'>
              {description}
            </p>
          </div>
        </div>

        <div className='mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <span
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-mono ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollToSection = (id) => {
    setSelectedProject(null);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Featured Portfolio</p>
        <h2 className={`${styles.sectionHeadText}`}>Selected Works.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          A curated portfolio of high-impact commercial video productions, 3D CGI motion
          designs, and visual effects case studies. Each project exemplifies rigorous art
          direction, rhythm-driven editing, and retention architecture engineered for international clients.
        </motion.p>
      </div>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            {...project}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Interactive Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto'
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className='relative w-full max-w-3xl bg-[#151030] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8'
            >
              {/* Modal Image Header */}
              <div className='relative w-full aspect-video sm:h-[360px] overflow-hidden bg-black'>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className='w-full h-full object-cover'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[#151030] via-transparent to-transparent' />

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className='absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 transition-colors'
                  aria-label='Close modal'
                >
                  ✕
                </button>

                {/* Category Badge */}
                <div className='absolute bottom-4 left-6'>
                  <span className='px-3 py-1 rounded-full text-xs font-semibold bg-[#915EFF] text-white shadow-lg'>
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className='p-6 sm:p-8'>
                <h3 className='text-white font-bold text-2xl sm:text-3xl'>
                  {selectedProject.name}
                </h3>

                <p className='mt-3 text-secondary text-sm sm:text-base leading-relaxed'>
                  {selectedProject.description}
                </p>

                {/* Detailed Spec Grid */}
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/30 border border-white/5'>
                  <div>
                    <h4 className='text-[#dfd9ff] text-xs uppercase font-bold tracking-wider'>
                      Deliverables
                    </h4>
                    <p className='text-white text-sm mt-1 font-medium'>
                      {selectedProject.deliverables || "Motion Graphics, Video Edit, Color Grade"}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-[#dfd9ff] text-xs uppercase font-bold tracking-wider'>
                      Software Stack
                    </h4>
                    <p className='text-white text-sm mt-1 font-medium'>
                      {selectedProject.stack || "After Effects • Premiere Pro"}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className='mt-5 flex flex-wrap gap-2'>
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`text-xs px-2.5 py-1 rounded-md bg-white/5 ${tag.color}`}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

                {/* Modal Action Buttons */}
                <div className='mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 justify-end'>
                  <button
                    onClick={() => scrollToSection("#showreel")}
                    className='bg-gradient-to-r from-[#915EFF] to-[#7038e8] hover:from-[#7e47f0] hover:to-[#5d2ac9] text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 text-sm'
                  >
                    <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                    Watch in Showreel
                  </button>
                  <button
                    onClick={() => scrollToSection("#contact")}
                    className='bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-6 rounded-xl border border-white/20 transition-colors text-sm'
                  >
                    Initiate Collaboration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(Works, "projects");
