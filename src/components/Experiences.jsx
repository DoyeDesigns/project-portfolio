"use client";

import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Experiences() {
  // Receive experience data as a prop
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const skillsCollectionRef = collection(db, "experiences");

    async function fetchData() {
      try {
        const experienceResponse = await getDocs(skillsCollectionRef);
        const experienceData = experienceResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        setExperiences(experienceData[0].experiences);
        console.log(experienceData[0].experiences);
      } catch (error) {
        // Handle the error
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {experiences.map((exp, index) => (
        <div
          className="border-[#7D7D7D] border-l-4 p-4 bg-base-200"
          key={index}
        >
          <h2 className="text-xl">{exp.companyName}</h2>
          <span className="text-xl text-[0.875rem]">{exp.role}</span>
          <div>
            <span>{exp.start}</span> - <span>{exp.end}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Experiences;
