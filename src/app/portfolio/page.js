"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");

    async function fetchData() {
      try {
        const projectsResponse = await getDocs(projectsCollectionRef);
        const projectsData = projectsResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        setProjects(projectsData[0].projects);
        console.log(projects);
      } catch (error) {
        // Handle the error
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <section className="flex gap-5 flex-wrap justify-center items-center">
      {projects.map((project, index) => {
        return (
          <div key={index}>
            <div
              onClick={openModal}
              key={index}
              className="card w-96 h-96 bg-base-100 shadow-xl"
            >
              <figure>
                <Image src={project.image} alt={project.name} width={150} height={150}/>
              </figure>
              <div className="card-body">
                <h2 className="card-title">{project.name}</h2>
                <p>
                  Live link -
                  <a href={project.liveLink} target="blank">
                    Visit website
                  </a>
                </p>
                <div className="card-actions justify-end">
                  {project.techStack.map((tech, techIndex) => (
                    <div key={techIndex} className="badge badge-outline">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              appElement={document.getElementById("root")}
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
                  <div>{/* <ImageCarousel images={images} /> */}</div>
                  <div>
                    <h2 className="text-2xl mt-10 mb-2 font-bold">
                      {project.name}
                    </h2>
                    <p>{project.description}</p>
                    <div>
                      <h3 className="text-xl mt-5 mb-2 font-bold">
                        Tech Stack
                      </h3>
                      <div className="flex">
                        {/* {project.techStack.map((stack, index) => {
                    const matchingSkill = skill.find(
                      (skill) => skill.Name === stack
                    );
                    return (
                      <LazyLoad offset={600} key={index}>
                        <div className="text-center">
                          {matchingSkill ? (
                            <Image
                              key={index}
                              src={matchingSkill?.ImageUrl}
                              alt={`Tech Stack ${index + 1}`}
                              width={300}
                              height={300}
                              className="mx-2 object-contain cursor-pointer w-14 h-14 md:w-auto md:h-auto"
                            />
                          ) : (
                            <p>{stack}</p>
                          )}
                        </div>
                      </LazyLoad>
                    );
                  })} */}
                      </div>
                    </div>
                    <h4 className="text-xl mt-5 mb-2 font-bold">Live Link</h4>
                    <span>
                      <a
                        href={project.liveLink}
                        target="blank"
                        className="text-blue-500 hover:underline"
                      >
                        {project.liveLink}
                      </a>
                    </span>
                    <h5 className="text-xl mt-5 mb-2 font-bold">Github Repo</h5>
                    <span>
                      <a
                        href={project.githubRepo}
                        target="blank"
                        className="text-blue-500 hover:underline"
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
      })}
    </section>
  );
}

export default Portfolio;
