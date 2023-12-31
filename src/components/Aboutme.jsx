"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Aboutme() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <>
      <section id="about-me">
        <div className="w-11/12 mx-auto pb-16 lg:py-16 text-primary">
          <div className="flex flex-col text-center lg:text-left justify-center lg:flex-row lg:justify-between gap-9">
            <div>
              <motion.h1
                className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-14"
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
                About me
              </motion.h1>
              <p className="pb-3">
                I am a self-taught frontend developer passionate about creating
                engaging, intuitive, and responsive user interfaces that deliver
                exceptional user experiences. I enjoy collaborating with agile
                teams and believe that remarkable products are built through
                teamwork. I am a graduate of the Zuri Training Program.
              </p>

              <p className="pb-6">
                When I want to clear my head I play video games, listen to
                music, watch a movie/anime or play football.
              </p>

              <motion.a
                href="https://docs.google.com/document/d/1JZkSO3FcrCZ_6ClAL8r6Df5n7TgCGCj1Sy-BYXxXerY/edit?usp=sharing"
                className="p-2 hover:border-[1px] hover:border-[#7D7D7D] active:bg-zinc-200 border-2 border-[#7D7D7D] btn rounded"
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.2 }}
                target="_blank"
              >
                See my resume
              </motion.a>
            </div>
            <Image
              src="/photo_5931572259703601816_y.jpg"
              width={250}
              height={250}
              alt="Picture of the author"
              className="max-w-sm rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutme;
