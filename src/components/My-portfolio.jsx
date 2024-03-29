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
    async function fetchData() {
      try {
        const projectsCollectionRef = collection(db, "projects");
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
    <section id="my-portfolio">
      <div className="w-11/12 mx-auto flex flex-col justify-center md:flex-row md:justify-between gap-8 md:gap-4 py-16 text-primary">
        <div className="mx-auto md:m-0">
          <div>
            <motion.h1
              className="text-center md:text-left text-3xl font-extrabold mb-14 md:mb-[105px] sm:text-4xl lg:text-6xl"
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
            {projects.length > 4 ? (
              <ProjectCard key={shuffledProjects[0].name} project={shuffledProjects[0]} />
            ) : (
              <div className="h-40 w-40 flex justify-center items-center bg-zinc-100 rounded-md">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-0 md:pt-28 mx-auto md:m-0">
          {projects.length > 4 ? (
            <ProjectCard key={shuffledProjects[1].name} project={shuffledProjects[1]} />
          ) : (
            <div className="h-40 w-40 flex justify-center items-center bg-zinc-100 rounded-md">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[70px]">
          <div className="flex flex-col mx-auto md:m-0 md:justify-between">
            {projects.length > 4 ? (
              <ProjectCard key={shuffledProjects[2].name} project={shuffledProjects[2]} />
            ) : (
              <div className="h-40 w-40 flex justify-center items-center bg-zinc-100 rounded-md">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
          <div className="text-xl flex justify-center md:justify-end">
            <motion.a
              href="/portfolio"
              className="p-2 bg-neutral-focus portfolio-btn flex justify-center items-center text-white w-40 h-40 rounded-full"
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.2 }}
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
