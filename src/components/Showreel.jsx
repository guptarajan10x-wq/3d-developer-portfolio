import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { portfolioVideo } from "../assets";

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds)) return "00:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Showreel = () => {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay in infinite loop (muted ensures browser autoplay compliance)
    video.muted = true;
    video.loop = true;
    video
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => {
        console.log("Autoplay notice:", err);
        setIsPlaying(false);
      });

    const onLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => setIsPlaying(true)).catch((err) => console.log(err));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const bar = progressBarRef.current;
    if (!video || !bar) return;

    const rect = bar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const clampedPos = Math.max(0, Math.min(1, pos));
    video.currentTime = clampedPos * duration;
    setCurrentTime(video.currentTime);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = val;
    setVolume(val);
    if (val === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (isMuted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const reelHighlights = [
    {
      title: "Motion Graphics & 3D CGI",
      desc: "Kinetic typography, procedural Octane shaders, 3D camera choreography, and branded motion systems.",
      tag: "After Effects & C4D",
      gradient: "from-[#915EFF] to-[#492bff]",
    },
    {
      title: "Commercial Video Direction",
      desc: "High-tempo commercial assembly, retention engineering, rhythmic cuts, and narrative architecture.",
      tag: "Premiere Pro & DaVinci",
      gradient: "from-[#00cea8] to-[#008f75]",
    },
    {
      title: "Color Science & Look Dev",
      desc: "Film emulation, high dynamic range LUT mastering, ACES color pipelines, and stylized mood grading.",
      tag: "DaVinci Resolve",
      gradient: "from-[#ff007f] to-[#aa0055]",
    },
    {
      title: "Audio Architecture & SFX",
      desc: "Multi-layered soundscapes, impact transients, spatial Foley sweetening, and psychoacoustic audio mastering.",
      tag: "Sound Design & Mastering",
      gradient: "from-[#ffaa00] to-[#e65c00]",
    },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Cinematic Showcase</p>
        <h2 className={`${styles.sectionHeadText}`}>Master Showreel.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Experience Rajan's definitive master showreel featuring commercial post-production,
          3D CGI motion design, and high-retention cinematic storytelling crafted for visionary
          brands and international campaigns.
        </motion.p>
      </div>

      {/* Showreel Video Container with Ambient Glow */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.75)}
        className='mt-12 relative w-full'
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Ambient background glow */}
        <div className='absolute -inset-1.5 bg-gradient-to-r from-[#915EFF] via-[#00cea8] to-[#ff007f] rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition duration-1000' />

        <div className='relative bg-[#100d25] border border-white/10 rounded-2xl overflow-hidden shadow-2xl'>
          {/* Top Window Bar */}
          <div className='flex justify-between items-center px-4 py-3 bg-[#151030] border-b border-white/10'>
            <div className='flex items-center gap-2'>
              <div className='w-3 h-3 rounded-full bg-[#ff5f56]' />
              <div className='w-3 h-3 rounded-full bg-[#ffbd2e]' />
              <div className='w-3 h-3 rounded-full bg-[#27c93f]' />
              <span className='ml-2 text-xs font-mono text-secondary hidden sm:inline-block'>
                R.MP4
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#915EFF]/20 text-[#dfd9ff] border border-[#915EFF]/40'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse' />
                4K Master Reel
              </span>
              <span className='hidden md:inline-flex px-2 py-0.5 rounded text-xs font-mono bg-white/5 text-secondary'>
                60 FPS
              </span>
            </div>
          </div>

          {/* Video Player */}
          <div className='relative w-full aspect-video bg-black flex items-center justify-center group overflow-hidden'>
            <video
              ref={videoRef}
              src={portfolioVideo}
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
              className='w-full h-full object-contain cursor-pointer'
              onClick={togglePlay}
            />

            {/* Quick Unmute Floating Button */}
            {isMuted && isPlaying && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className='absolute top-4 left-4 z-20 bg-black/75 hover:bg-black/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-lg transition-transform hover:scale-105'
                title='Click to unmute'
              >
                <svg className='w-4 h-4 fill-current text-[#00cea8]' viewBox='0 0 24 24'>
                  <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
                </svg>
                <span>Click to Unmute Audio</span>
              </button>
            )}

            {/* Big Center Play/Pause Button Overlay (Shown when paused or initial) */}
            {(!isPlaying || showControls) && (
              <div
                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                  isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                }`}
              >
                <button
                  onClick={togglePlay}
                  className='pointer-events-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#915EFF]/80 hover:bg-[#915EFF] text-white flex items-center justify-center shadow-2xl backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-white/20'
                  aria-label={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? (
                    <svg className='w-8 h-8 sm:w-10 sm:h-10 fill-current' viewBox='0 0 24 24'>
                      <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                    </svg>
                  ) : (
                    <svg className='w-8 h-8 sm:w-10 sm:h-10 fill-current ml-1' viewBox='0 0 24 24'>
                      <path d='M8 5v14l11-7z' />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {/* Custom Control Bar */}
            <div
              className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 transition-opacity duration-300 ${
                showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Scrubber Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleSeek}
                className='relative w-full h-2.5 bg-white/20 hover:h-3.5 rounded-full cursor-pointer transition-all duration-200 group/bar mb-3 flex items-center'
              >
                <div
                  className='h-full bg-gradient-to-r from-[#915EFF] via-[#00cea8] to-[#ff007f] rounded-full relative'
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className='absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md scale-0 group-hover/bar:scale-100 transition-transform' />
                </div>
              </div>

              {/* Controls Row */}
              <div className='flex items-center justify-between text-white text-xs sm:text-sm font-medium'>
                {/* Left: Play/Pause & Time */}
                <div className='flex items-center gap-3 sm:gap-4'>
                  <button
                    onClick={togglePlay}
                    className='hover:text-[#915EFF] transition-colors p-1'
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                        <path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
                      </svg>
                    ) : (
                      <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                        <path d='M8 5v14l11-7z' />
                      </svg>
                    )}
                  </button>

                  <div className='font-mono text-secondary text-[11px] sm:text-xs'>
                    <span className='text-white'>{formatTime(currentTime)}</span> / {formatTime(duration)}
                  </div>
                </div>

                {/* Right: Volume & Fullscreen */}
                <div className='flex items-center gap-3 sm:gap-4'>
                  {/* Volume Control */}
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={toggleMute}
                      className='hover:text-[#915EFF] transition-colors p-1'
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted || volume === 0 ? (
                        <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                          <path d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' />
                        </svg>
                      ) : (
                        <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                          <path d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' />
                        </svg>
                      )}
                    </button>
                    <input
                      type='range'
                      min='0'
                      max='1'
                      step='0.05'
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className='w-14 sm:w-20 h-1 bg-white/20 accent-[#915EFF] cursor-pointer'
                      title='Volume'
                    />
                  </div>

                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className='hover:text-[#915EFF] transition-colors p-1'
                    title='Toggle Fullscreen'
                  >
                    <svg className='w-5 h-5 fill-current' viewBox='0 0 24 24'>
                      <path d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Showreel Key Highlights Cards */}
      <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {reelHighlights.map((item, idx) => (
          <motion.div
            key={item.title}
            variants={fadeIn("up", "spring", idx * 0.2 + 0.3, 0.75)}
            className='bg-tertiary/70 border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-[#915EFF]/50 transition-colors'
          >
            <div>
              <span className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-gradient-to-r ${item.gradient} mb-3`}>
                {item.tag}
              </span>
              <h3 className='text-white font-bold text-[18px] mb-2'>{item.title}</h3>
              <p className='text-secondary text-[13px] leading-relaxed'>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Showreel Call to Action banner */}
      <motion.div
        variants={fadeIn("up", "tween", 0.5, 0.75)}
        className='mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#1d1836] to-[#151030] border border-[#915EFF]/30 flex flex-col sm:flex-row items-center justify-between gap-4'
      >
        <div>
          <h4 className='text-white font-bold text-[18px]'>Seeking High-Impact Creative Direction or Post-Production?</h4>
          <p className='text-secondary text-[14px] mt-1'>
            Available for commercial campaigns, remote post-production contracts, and brand partnerships.
          </p>
        </div>
        <a
          href='#contact'
          className='whitespace-nowrap bg-gradient-to-r from-[#915EFF] to-[#7038e8] hover:from-[#7e47f0] hover:to-[#5d2ac9] text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-transform transform hover:-translate-y-0.5'
        >
          Initiate Project Inquiry
        </a>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Showreel, "showreel");
