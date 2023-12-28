"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import LazyLoad from "react-lazy-load";
import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";
import ModalImageCarousel from "@/components/modalImageCarousel";

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

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [skill, setSkill] = useState([]);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");

    const skillsCollectionRef = collection(db, "skills");

    async function fetchData() {
      try {
        const projectsResponse = await getDocs(projectsCollectionRef);
        const projectsData = projectsResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        const skillsResponse = await getDocs(skillsCollectionRef);
        const skillsData = skillsResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        setProjects(projectsData[0].projects);
        setSkill(skillsData[0].skills);
      } catch (error) {
        // Handle the error
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function openModal(project) {
    setIsOpen(true);
    setSelectedProject(project);
    console.log(selectedProject);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedProject(null);
  }

  return (
    <section>
      <div>{projects.length > 5 ? 
        (<div className="flex gap-5 flex-wrap justify-center items-center py-6">
          {projects.map((project, index) => {
          return (
            <div key={index} className="hover:cursor-pointer">
              <div
                onClick={() => openModal(project)}
                key={index}
                className="card w-72 h-96 bg-base-100 shadow-xl bg-zinc-100 hover:bg-zinc-200"
              >
                <figure>
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={450}
                    height={500}
                  />
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
              {selectedProject && (
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => closeModal()}
                  contentLabel="Project Modal"
                  appElement={document.getElementById("root")}
                  style={customStyles}
                >
                  <div>
                    <div className="flex justify-end mb-2 sticky top-0 z-10">
                      <button
                        onClick={() => closeModal()}
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
                        <ModalImageCarousel
                          desktopImage={selectedProject.image}
                          mobileImage={selectedProject.mobileView}
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl mt-10 mb-2 font-bold">
                          {selectedProject.name}
                        </h2>
                        <p>{selectedProject.description}</p>
                        <div>
                          <h3 className="text-xl mt-5 mb-2 font-bold">
                            Tech Stack
                          </h3>
                          <div className="flex gap-6 overflow-x-auto">
                            {selectedProject.techStack.map((stack, index) => {
                              const matchingSkill = skill.find(
                                (skill) => skill.Name === stack
                              );
                              return (
                                <LazyLoad offset={600} key={index}>
                                  <div className="text-center">
                                    {matchingSkill ? (
                                      <div className="flex flex-col justify-center items-center gap-1">
                                        <Image
                                          key={index}
                                          src={matchingSkill?.ImageUrl}
                                          alt={`Tech Stack ${index + 1}`}
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
                              );
                            })}
                          </div>
                        </div>
                        <h4 className="text-xl mt-5 mb-2 font-bold">Live Link</h4>
                        <span>
                          <a
                            href={selectedProject.liveLink}
                            target="blank"
                            className="text-blue-500 hover:underline"
                          >
                            {selectedProject.liveLink}
                          </a>
                        </span>
                        <h5 className="text-xl mt-5 mb-2 font-bold">
                          Github Repo
                        </h5>
                        <span>
                          <a
                            href={selectedProject.githubRepo}
                            target="blank"
                            className="text-blue-500 hover:underline"
                          >
                            {selectedProject.githubRepo}
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                </Modal>
              )}
            </div>
          );
        })}</div>) :
        (<div className="flex justify-center items-align h-screen"><span className="loading loading-spinner loading-lg"></span></div>)
      }
      </div>
    </section>
  );
}

export default Portfolio;
