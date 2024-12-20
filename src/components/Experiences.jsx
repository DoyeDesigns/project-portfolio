"use client";

import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

function Experiences() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const skillsCollectionRef = collection(db, "experiences");

    async function fetchData() {
      try {
        const experienceResponse = await getDocs(skillsCollectionRef);
        const experienceData = experienceResponse.docs.map((doc) => ({
          ...doc.data(),
        }));

        setExperiences(experienceData[0].experiences.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {experiences.map((exp, index) => (
        <div
          className="border-[#7D7D7D] border-l-4 p-4 bg-base-200 text-wrap"
          key={index}
        >
          <h2 className="text-xl font-semibold">{exp.companyName}</h2>
          <span className="text-xl text-[0.875rem] font-medium">{exp.role}</span>
          <div>
            <span>{exp.start}</span> - <span>{exp.end}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Experiences;