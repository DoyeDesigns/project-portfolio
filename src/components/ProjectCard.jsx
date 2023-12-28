"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import LazyLoad from "react-lazy-load";
import ImageCarousel from "./ImageCarousel";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

// modal custom style
const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 999,
    height: "550px",
  },
};

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

    fetchData();
  }, []);

  // modal functionality
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // functinality to handle see more or less
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  // see more functionality
  const renderText = () => {
    if (isExpanded || project.description.length <= 10) {
      return project.description;
    } else if (
      project.description.split(" ").slice(0, 10).join(" ") ===
      project.description
    ) {
      return project.description;
    } else {
      const shortenedText = project.description
        .split(" ")
        .slice(0, 10)
        .join(" ");
      return (
        <>
          {shortenedText}...
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={handleToggle}
          >
            see more
          </span>
        </>
      );
    }
  };

  // see less functionality
  const renderSeeLess = () => {
    if (isExpanded) {
      return (
        <>
          <span
            className="text-blue-500 ml-2 cursor-pointer hover:underline"
            onClick={handleToggle}
          >
            see less
          </span>
        </>
      );
    }
    return null;
  };

  // carousel images
  const images = [
    {
      url: project.image,
      width: "500",
      height: "500",
    },
    {
      url: project.mobileView,
      width: "200",
      height: "200",
    },
  ];

  return (
    <div className="project-container max-w-xs bg-zinc-100 hover:bg-zinc-200 px-3 pb-5 rounded-md cursor-pointer">
      <div>
        <div
          onClick={openModal}
          className="flex justify-between items-center pt-8 mb-2 border-t-2 border-[#7D7D7D]"
        >
          <h2 className="text-xl sm:text-2xl font-bold">{project.name}</h2>
          <div>
            <Image
              src="/icons8-arrow.svg"
              width={20}
              height={20}
              alt="click-me-arrow"
              className="rounded-full"
            />
          </div>
        </div>
        <p className="mb-5 max max-h-72 overflow-y-auto">
          {renderText()}
          {renderSeeLess()}
        </p>
        <div className="text-center">
          <LazyLoad offset={300}>
            <Image
              src={project.image}
              width={300}
              height={300}
              alt={project.name}
              className="mx-auto object-contain cursor-pointer"
              onClick={openModal}
            />
          </LazyLoad>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        appElement={document.getElementById("root")}
        style={customStyles}
        contentLabel="Poeject Modal"
      >
        <div>
          <div className="flex justify-end mb-2 sticky top-0 z-10">
            <button
              onClick={closeModal}
              className="text-xl rounded-full p-2 bg-zinc-100 hover:bg-zinc-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </div>
          <div>
            <div>
              <ImageCarousel images={images} />
            </div>
            <div>
              <h2 className="text-2xl mt-10 mb-2 font-bold">{project.name}</h2>
              <p>{project.description}</p>
              <div>
                <h3 className="text-xl mt-5 mb-2 font-bold">Tech Stack</h3>
                <div className="flex gap-6 overflow-x-auto">
                  {project.techStack.map((stack, index) => {
                    const matchingSkill = skill.find(
                      (skill) => skill.Name === stack
                    );
                    return (
                      <div key={index}>
                        <LazyLoad offset={300}>
                          <div className="text-center">
                            {matchingSkill ? (
                              <div className="flex flex-col justify-center items-center gap-1">
                                <Image
                                  key={index}
                                  src={matchingSkill?.ImageUrl}
                                  alt={`Tech Stack {index + 1}`}
                                  width={150}
                                  height={150}
                                  className="mx-2 object-contain cursor-pointer w-14 h-14 md:w-auto md:h-auto"
                                />
                                <p>{matchingSkill?.Name}</p>
                              </div>
                            ) : (
                              <p>{stack}</p>
                            )}
                          </div>
                        </LazyLoad>
                      </div>
                    );
                  })}
                </div>
              </div>
              <h4 className="text-xl mt-5 mb-2 font-bold">Live Link</h4>
              <span>
                <a
                  href={project.liveLink}
                  target="blank"
                  className="text-blue-500 hover:underline text-wrap"
                >
                  {project.liveLink}
                </a>
              </span>
              <h5 className="text-xl mt-5 mb-2 font-bold">Github Repo</h5>
              <span>
                <a
                  href={project.githubRepo}
                  target="blank"
                  className="text-blue-500 hover:underline text-wrap"
                >
                  {project.githubRepo}
                </a>
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProjectCard;
