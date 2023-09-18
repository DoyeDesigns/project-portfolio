'use client'

import React from "react";

function Experiences({ experience }) { // Receive experience data as a prop
  return (
    <>
      {experience.map(exp => (
        <div className="border-[#7D7D7D] border-l-4 p-4 bg-base-200" key={exp.Name}>
          <h2 className="text-xl">
            {exp.Name}
          </h2>
          <span className="text-xl text-[0.875rem]">
            {exp.Role}
          </span>
          <div>
            <span>{exp.Start}</span> - <span>{exp.End}</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default Experiences;
