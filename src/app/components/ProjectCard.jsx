'use client'

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import LazyLoad from "react-lazy-load";
import ImageCarousel from "./ImageCarousel";

// fetching skills data from skills api
async function fetchTechStackImages(techStack, secondApiUrl) {
  try {
    const response = await fetch(secondApiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const secondApiData = await response.json();

    // Create a mapping of words to images from the second API data
    const wordToImageMap = {};
    secondApiData.forEach((item) => {
      wordToImageMap[item.Name] = item.Image;
    });

    // Map the words from techStack to their corresponding images
    const techStackWords = techStack.split(",").map((word) => word.trim());
    const techStackImages = techStackWords.map((word) => ({
      url: wordToImageMap[word],
      name: word, 
    }));

    return techStackImages;
  } catch (error) {
    console.error("Error fetching data from the second API: ", error);
    throw error;
  }
}

function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [techStackImages, setTechStackImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace 'URL_OF_SECOND_API' with the actual URL of your second API
    const secondApiUrl =
      "https://script.google.com/macros/s/AKfycbxL_LuQfIpdix6NX4gOVihw0HvQB3mGMX3KAvATCQV-kj03e7i0UrjIJzoH62WrBzzCew/exec";

    // Use async function to fetch tech stack images
    async function fetchTechStackData() {
      try {
        const images = await fetchTechStackImages(
          project.TechStack,
          secondApiUrl
        );
        setTechStackImages(images);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchTechStackData();
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
    if (isExpanded || project.Description.length <= 10) {
      return project.Description;
    } else if (
      project.Description.split(" ").slice(0, 10).join(" ") ===
      project.Description
    ) {
      return project.Description;
    } else {
      const shortenedText = project.Description.split(" ")
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
      url: project.Image,
      width: 'auto',
    },
    {
      url: project.MobileView,
      width: '250px',
    },
  ];

  return (
    <div className="project-container max-w-xs">
      <div>
        <div
          onClick={openModal}
          className="flex justify-between items-center pt-8 mb-2 border-t-2 border-[#7D7D7D] cursor-pointer"
        >
          <h2 className="text-xl sm:text-2xl font-bold">{project.Name}</h2>
          <div>
            <Image src="/icons8-arrow.svg" width={20} height={20} alt='click-me-arrow' className="rounded-full" />
          </div>
        </div>
        <p className="mb-5 max max-h-72 overflow-y-auto">
          {renderText()}
          {renderSeeLess()}
        </p>
        <div className="text-center">
          <LazyLoad offset={600}>
            <Image
              src={project.Image}
              width={300} 
              height={300}
              alt={project.Name}
              className="mx-auto object-contain cursor-pointer"
              onClick={openModal}
            />
          </LazyLoad>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-end mb-2">
            <button
              onClick={closeModal}
              className="text-xl rounded-full p-2 hover:bg-slate-50"
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
              <h2 className="text-2xl mt-10 mb-2 font-bold">{project.Name}</h2>
              <p>{project.Description}</p>
              <div>
                <h3 className="text-xl mt-5 mb-2 font-bold">Tech Stack</h3>
                <div className="flex">
                  {loading ? (
                    <p>Loading tech stack images...</p>
                  ) : (
                    techStackImages.map((image, index) => (
                      <LazyLoad key={index} offset={600}>
                        <div className="text-center">
                          <Image
                            src={image.url}
                            alt={`Tech Stack ${index + 1}`}
                            width={300} 
                            height={300}
                            className="mx-2 object-contain cursor-pointer w-14 h-14 md:w-auto md:h-auto"
                          />
                          <span className="mt-2">{image.name}</span>
                        </div>
                      </LazyLoad>
                    ))
                  )}
                </div>
              </div>
              <h4 className="text-xl mt-5 mb-2 font-bold">Live Link</h4>
              <span>
                <a
                  href={project.LiveLink}
                  target="blank"
                  className="text-blue-500 hover:underline"
                >
                  {project.LiveLink}
                </a>
              </span>
              <h5 className="text-xl mt-5 mb-2 font-bold">Github Repo</h5>
              <span>
                <a
                  href={project.GithubRepo}
                  target="blank"
                  className="text-blue-500 hover:underline"
                >
                  {project.GithubRepo}
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
