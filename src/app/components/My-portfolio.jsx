'use client'

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

function MyPortfolio() {
    const [ref, inView] = useInView({ triggerOnce: true });
    const [projects, setProjects] = useState([]);

    async function fetchProjects() {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyXMSkXYqDLk2dxvuAaeaP5ubguztSRrvsuBgsCTC8qUnD_hDS7qJOxTmd7damwqmNp/exec"
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const projectsData = await response.json();
        setProjects(projectsData);
        console.log(projectsData)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    useEffect(() => {
      fetchProjects();
    }, []);

    function shuffleArray(array) {
      const shuffledArray = array.slice();
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    const shuffledProjects = shuffleArray(projects);
     
  return (
    <section>
      <div className="w-10/12 mx-auto flex justify-between gap-4 py-16">
        <div>
          <div>
            <motion.h1 className="text-3xl font-extrabold mb-[105px] sm:text-4xl lg:text-6xl"
            ref={ref}
            initial={{ x: '-400px', opacity: 0 }} // Start position
            animate={inView ? { x: 0, opacity: 1} : { x: '-200px'}} // Slide in when inView is true
            transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 150, damping: 15}}
            >
              My
              <br /> Portfolio
            </motion.h1>
            {projects.length > 4 && <ProjectCard project={shuffledProjects[0]} />}
          </div>
        </div>

        <div className="pt-28">
        {projects.length > 4 && <ProjectCard project={shuffledProjects[1]} />}
        </div>

        <div className="flex flex-col gap-[70px]">
          <div className="flex flex-col justify-between">
          {projects.length > 4 && <ProjectCard project={shuffledProjects[2]} />}
          </div>
          <div className="flex justify-end">
            <motion.button
              className="p-2 bg-neutral-focus text-white w-40 h-40 rounded-full"
              whileHover={{ scale: [null, 1.4, 1.2] }}
              transition={{ duration: 0.3 }}
            >
              See More
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPortfolio;
