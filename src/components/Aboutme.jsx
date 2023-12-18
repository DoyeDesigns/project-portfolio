'use client'

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Aboutme() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <>
      <section>
        <div className="w-10/12 mx-auto py-16">
          <div className="flex flex-col lg:flex-row gap-24">
            <div>
              <motion.h1
                className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-14"
                ref={ref}
                initial={{ x: '-400px', opacity: 0 }} // Start position
                animate={inView ? { x: 0, opacity: 1} : { x: '-200px'}} // Slide in when inView is true
                transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 150, damping: 15}}
              >
                About me
              </motion.h1>
              <p className="pb-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <motion.button
                className="p-2 border-2 border-[#7D7D7D]"
                whileHover={{ scale: [null, 1.4, 1.2] }}
                transition={{ duration: 0.3 }}
              >
                See my resume
              </motion.button>
            </div>
            <Image
              src="/photo_5931572259703601816_y.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
              className="max-w-sm rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Aboutme;
