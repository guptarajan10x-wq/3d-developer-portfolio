import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  const isEven = index % 2 === 0;

  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      }}
      contentArrowStyle={{ borderRight: "7px solid #1d1836" }}
      iconStyle={{
        background: isEven
          ? "linear-gradient(135deg, #915EFF 0%, #6830d9 100%)"
          : "linear-gradient(135deg, #00cea8 0%, #008f75 100%)",
        boxShadow: isEven
          ? "0 0 25px rgba(145, 94, 255, 0.65), inset 0 0 10px rgba(255, 255, 255, 0.3)"
          : "0 0 25px rgba(0, 206, 168, 0.65), inset 0 0 10px rgba(255, 255, 255, 0.3)",
        border: "2px solid rgba(255, 255, 255, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full text-white'>
          {isEven ? (
            /* Cinematic Production Camera Icon */
            <svg
              className='w-6 h-6 fill-current filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8z' />
            </svg>
          ) : (
            /* 3D Motion Layers Stack Icon */
            <svg
              className='w-6 h-6 fill-none stroke-current stroke-2 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]'
              viewBox='0 0 24 24'
              strokeLinecap='round'
              strokeLinejoin='round'
              aria-hidden='true'
            >
              <polygon points='12 2 2 7 12 12 22 7 12 2' />
              <polyline points='2 17 12 22 22 17' />
              <polyline points='2 12 12 17 22 12' />
            </svg>
          )}
        </div>
      }
    >
      <div>
        {experience.role_badge && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              isEven
                ? "bg-[#915EFF]/20 text-[#dfd9ff] border border-[#915EFF]/40"
                : "bg-[#00cea8]/20 text-[#00cea8] border border-[#00cea8]/40"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isEven ? "bg-[#dfd9ff]" : "bg-[#00cea8]"
              } animate-pulse`}
            />
            {experience.role_badge}
          </span>
        )}

        <h3 className='text-white text-[24px] font-bold'>{experience.title}</h3>
        <p
          className='text-secondary text-[16px] font-semibold'
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, pointIndex) => (
          <li
            key={`experience-point-${pointIndex}`}
            className='text-white-100 text-[14px] pl-1 tracking-wider leading-relaxed'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Career Milestones &amp; Track Record
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Professional Experience.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-col'>
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              index={index}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
