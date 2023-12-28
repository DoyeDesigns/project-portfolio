"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function FeaturedProjects() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [projects, setProjects] = useState([]);
  // const [featuredProjects, setFeaturedProjects] = useState([]);

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

  // getting featured projects
  const featuredProjects = projects.filter((obj) =>
    obj.hasOwnProperty("featuredProject")
  );

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

  return (
    <section id="featured-section">
      <div className="w-11/12 mx-auto py-16">
        <motion.h1
          className="text-center lg:text-left text-3xl font-extrabold mb-14 sm:text-4xl lg:text-6xl"
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
          Featured
          <br /> Projects
        </motion.h1>
        <div className="flex flex-col justify-center md:flex-row md:justify-between gap-8">
          {shuffleArray(featuredProjects)
            .slice(0, 3)
            .map((project) => (
              <div key={project.id} className="flex justify-center items-start">
                <ProjectCard key={project.id} project={project} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
