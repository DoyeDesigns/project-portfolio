"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Aboutme() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <>
      <section>
        <div className="w-10/12 mx-auto pb-16 lg:py-16">
          <div className="flex flex-col text-center lg:text-left justify-center lg:flex-row gap-9 lg:gap-24">
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
              <p className="pb-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <motion.button
                className="p-2 hover:border-[1px] hover:border-[#7D7D7D] border-2 border-[#7D7D7D] btn rounded"
                whileHover={{ scale: [null, 1.2, 1.1] }}
                transition={{ duration: 0.2 }}
              >
                See my resume
              </motion.button>
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
