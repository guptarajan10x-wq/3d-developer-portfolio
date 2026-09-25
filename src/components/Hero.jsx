import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[90px] sm:top-[110px] lg:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-4 sm:gap-5 pointer-events-none z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-3 sm:mt-5'>
          <div className='w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-36 violet-gradient' />
        </div>

        <div className='max-w-xl lg:max-w-2xl pointer-events-auto'>
          <h1 className='font-black text-white text-[36px] sm:text-[50px] lg:text-[62px] leading-tight'>
            Hi, I'm <span className='text-[#915EFF]'>Rajan</span>
          </h1>
          <p className='text-[#dfd9ff] font-semibold text-[15px] sm:text-[18px] lg:text-[21px] mt-2 leading-snug'>
            Junior Motion Designer &bull; Video Editor &bull; AI Visual Specialist
          </p>
          <p className='text-secondary text-[13px] sm:text-[15px] mt-1.5 leading-normal max-w-lg hidden xs:block'>
            Architecting high-conversion commercial films, 3D motion graphics, and generative AI visual experiences.
          </p>

          <div className='mt-5 sm:mt-6 flex flex-wrap gap-3 sm:gap-4 z-10 relative'>
            <a
              href='#showreel'
              className='bg-gradient-to-r from-[#915EFF] to-[#7038e8] hover:from-[#7e47f0] hover:to-[#5d2ac9] text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs sm:text-sm'
            >
              <svg className='w-4 h-4 fill-current' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7z' />
              </svg>
              Watch Showreel
            </a>
            <a
              href='#ai-works'
              className='bg-gradient-to-r from-[#00cea8]/20 to-[#915EFF]/20 hover:from-[#00cea8]/40 hover:to-[#915EFF]/40 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl border border-[#00cea8]/40 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 flex items-center gap-2 text-xs sm:text-sm'
            >
              <span className='w-2 h-2 rounded-full bg-[#00cea8] animate-pulse' />
              Explore AI Works
            </a>
            <a
              href='#contact'
              className='bg-white/10 hover:bg-white/20 text-white font-semibold py-2 sm:py-2.5 px-4 sm:px-6 rounded-xl border border-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm'
            >
              Let's Collaborate
            </a>
          </div>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute bottom-5 xs:bottom-7 w-full flex justify-center items-center z-10'>
        <a href='#showreel'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
