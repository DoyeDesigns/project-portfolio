"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LazyLoad from "react-lazy-load";
import { useInView } from "react-intersection-observer";
import Experiences from "./Experiences";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const skillsCollectionRef = collection(db, "skills");

    async function fetchData() {
      try {
        const skillsResponse = await getDocs(skillsCollectionRef);
        const skillsData = skillsResponse.docs.map((doc) => ({
          ...doc.data(),
        }));
  
        setSkill(skillsData[0].skills);
      } catch (error) {
        // Handle the error
        console.error("Error fetching data:", error);
      }
    }

    fetchData()
  }, []);

  return (
    <section>
      <div className="w-10/12 mx-auto py-16">
        <motion.h1
          className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-14"
          ref={ref}
          initial={{ x: "-400px", opacity: 0 }} // Start position
          animate={inView ? { x: 0, opacity: 1 } : { x: "-200px" }} // Slide in when inView is true
          transition={{
            duration: 0.4,
            delay: 0.2,
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
        >
            Skills &<br /> Experience
        </motion.h1>
        <div className="flex gap-4 h-80">
          <div className="skills flex flex-wrap justify-between gap-4 w-3/6 scroll-smooth overflow-y-auto">
            {skill.map((skill, index) => (
              <div key={index} className="w-40 text-center">
                <LazyLoad offset={600}>
                  <Image
                    src={skill.ImageUrl}
                    alt={skill.Name}
                    width={300}
                    height={300}
                    className="mx-auto object-contain cursor-pointer w-14 h-14 md:w-auto md:h-auto"
                  />
                </LazyLoad>
                <span>{skill.Name}</span>
              </div>
            ))}
          </div>
          <div className="exp w-3/6 flex flex-col gap-2 overflow-y-auto overscroll-contain order-first">
            <Experiences />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
