import React, { useState, useRef, useEffect } from "react";
import Tilt from "react-tilt";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { aiProjects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const AICard = ({
  index,
  name,
  category,
  description,
  tags,
  image,
  video,
  onOpenModal,
}) => {
  const cardVideoRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardVideoRef.current) {
      cardVideoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (cardVideoRef.current) {
      cardVideoRef.current.pause();
      cardVideoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.3, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.02,
          speed: 400,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full border border-white/5 hover:border-[#00cea8]/50 transition-all duration-300 shadow-xl flex flex-col justify-between h-full group cursor-pointer'
        onClick={onOpenModal}
      >
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className='relative w-full h-[210px] rounded-xl overflow-hidden bg-black'>
            {video ? (
              <video
                ref={cardVideoRef}
                src={video}
                poster={image}
                muted
                loop
                playsInline
                preload='metadata'
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
            ) : (
              <img
                src={image}
                alt={name}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
            )}

            {/* Gradient Overlay & Category badge */}
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity pointer-events-none' />

            <div className='absolute top-3 left-3 pointer-events-none'>
              <span className='px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/60 backdrop-blur-md text-[#00cea8] border border-[#00cea8]/30 flex items-center gap-1.5'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-pulse' />
                {category || "AI Generation"}
              </span>
            </div>

            {/* AI badge / Play indicator */}
            <div className='absolute bottom-3 right-3 flex items-center gap-1.5 bg-gradient-to-r from-[#00cea8] to-[#915EFF] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg transition-transform group-hover:scale-105 pointer-events-none'>
              {video ? (
                <svg className='w-3.5 h-3.5 fill-current animate-pulse' viewBox='0 0 24 24'>
                  <path d='M8 5v14l11-7z' />
                </svg>
              ) : (
                <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                  <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
                </svg>
              )}
              <span>{video ? "Watch AI Video" : "View Details"}</span>
            </div>
          </div>

          <div className='mt-5'>
            <h3 className='text-white font-bold text-[22px] group-hover:text-[#00cea8] transition-colors'>
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

const AIWorks = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const modalVideoRef = useRef(null);

  // When modal opens with a video, attempt smooth playback
  useEffect(() => {
    if (selectedProject?.video && modalVideoRef.current) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented by browser policy (sound enabled)
          // User can click the prominent play button
          setIsVideoPlaying(false);
        });
    } else {
      setIsVideoPlaying(false);
    }
  }, [selectedProject]);

  const toggleModalVideoPlay = () => {
    const video = modalVideoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch((err) => console.log("Play error:", err));
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  const scrollToContact = () => {
    setSelectedProject(null);
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Neural &amp; Generative Creations</p>
        <h2 className={`${styles.sectionHeadText}`}>AI Works.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Bridging creative direction and artificial intelligence. Explore generative cinema,
          commercial product ads, neural video synthesis, and dynamic AI look development built
          with state-of-the-art diffusion models, custom LoRAs, and next-generation post-production pipelines.
        </motion.p>
      </div>

      <div className='mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
        {aiProjects.map((project, index) => (
          <AICard
            key={`ai-project-${index}`}
            index={index}
            {...project}
            onOpenModal={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Interactive AI Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto'
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className='relative w-full max-w-3xl bg-[#120f2c] border border-[#00cea8]/30 rounded-2xl overflow-hidden shadow-2xl my-8'
            >
              {/* Modal Media Header: Video Player or High-Res Image */}
              <div className='relative w-full aspect-video sm:h-[400px] overflow-hidden bg-black flex items-center justify-center group'>
                {selectedProject.video ? (
                  <div className='relative w-full h-full flex items-center justify-center bg-black'>
                    <video
                      key={selectedProject.name}
                      ref={modalVideoRef}
                      controls
                      playsInline
                      preload='auto'
                      poster={selectedProject.image}
                      onClick={toggleModalVideoPlay}
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      className='w-full h-full object-contain cursor-pointer'
                    >
                      <source src={selectedProject.video} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>

                    {/* Big Center Play Button Overlay when paused */}
                    {!isVideoPlaying && (
                      <div
                        onClick={toggleModalVideoPlay}
                        className='absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity'
                      >
                        <button
                          type='button'
                          onClick={toggleModalVideoPlay}
                          className='w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-[#00cea8] to-[#915EFF] hover:from-[#00b090] hover:to-[#7e47f0] text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/20'
                          aria-label='Play Video'
                        >
                          <svg className='w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1' viewBox='0 0 24 24'>
                            <path d='M8 5v14l11-7z' />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    className='w-full h-full object-cover'
                  />
                )}

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className='absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/10 transition-colors'
                  aria-label='Close modal'
                >
                  ✕
                </button>

                {/* Category Badge */}
                <div className='absolute bottom-4 left-6 z-10 pointer-events-none'>
                  <span className='px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#00cea8] to-[#915EFF] text-white shadow-lg flex items-center gap-1.5'>
                    <span className='w-1.5 h-1.5 rounded-full bg-white animate-pulse' />
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className='p-6 sm:p-8'>
                <h3 className='text-white font-bold text-2xl sm:text-3xl flex items-center gap-3'>
                  {selectedProject.name}
                </h3>

                <p className='mt-3 text-secondary text-sm sm:text-base leading-relaxed'>
                  {selectedProject.description}
                </p>

                {/* Detailed Pipeline Grid */}
                <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/5'>
                  <div>
                    <h4 className='text-[#00cea8] text-xs uppercase font-bold tracking-wider'>
                      AI Workflow &amp; Deliverables
                    </h4>
                    <p className='text-white text-sm mt-1 font-medium'>
                      {selectedProject.deliverables || "Neural Synthesis & Prompt Architecture"}
                    </p>
                  </div>
                  <div>
                    <h4 className='text-[#dfd9ff] text-xs uppercase font-bold tracking-wider'>
                      Models &amp; Software Stack
                    </h4>
                    <p className='text-white text-sm mt-1 font-medium'>
                      {selectedProject.stack || "Runway Gen-3 • Midjourney • Premiere Pro"}
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
                    onClick={scrollToContact}
                    className='bg-gradient-to-r from-[#00cea8] to-[#915EFF] hover:from-[#00b090] hover:to-[#7e47f0] text-white font-bold py-2.5 px-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 flex items-center gap-2 text-sm'
                  >
                    <span>Inquire for AI Collaboration</span>
                    <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                      <path d='M14 5l7 7m0 0l-7 7m7-7H3' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className='bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-6 rounded-xl border border-white/20 transition-colors text-sm'
                  >
                    Close Preview
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

export default SectionWrapper(AIWorks, "ai-works");
