"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function MyPortfolio() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");

    async function fetchData() {
      try {
        const projectsResponse = await getDocs(projectsCollectionRef);
        const projectsData = projectsResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        setProjects(projectsData[0].projects);
      } catch (error) {
        // Handle the error
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const shuffledProjects = shuffleArray(projects);

  return (
    <section>
      <div className="w-10/12 mx-auto flex justify-between gap-4 py-16">
        <div>
          <div>
            <motion.h1
              className="text-3xl font-extrabold mb-[105px] sm:text-4xl lg:text-6xl"
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
              My
              <br /> Portfolio
            </motion.h1>
            {projects.length > 4 && (
              <ProjectCard project={shuffledProjects[0]} />
            )}
          </div>
        </div>

        <div className="pt-28">
          {projects.length > 4 && <ProjectCard project={shuffledProjects[1]} />}
        </div>

        <div className="flex flex-col gap-[70px]">
          <div className="flex flex-col justify-between">
            {projects.length > 4 && (
              <ProjectCard project={shuffledProjects[2]} />
            )}
          </div>
          <div className="flex justify-end">
            <motion.a
              href="/portfolio"
              className="p-2 bg-neutral-focus flex justify-center items-center text-white w-40 h-40 rounded-full"
              whileHover={{ scale: [null, 1.4, 1.2] }}
              transition={{ duration: 0.3 }}
            >
              See More
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyPortfolio;
