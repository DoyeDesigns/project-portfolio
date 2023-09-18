'use client'

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ContactMe() {
    const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section>
      <div className="w-10/12 mx-auto pt-16 flex pb-16">
        <motion.h1 className="text-3xl font-extrabold mb-[105px] sm:text-4xl lg:text-6xl"
        ref={ref}
        initial={{ x: '-400px', opacity: 0 }} // Start position
        animate={inView ? { x: 0, opacity: 1} : { x: '-200px'}} // Slide in when inView is true
        transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 150, damping: 15}}
        >
          Let's talk
        </motion.h1>
        <form className="w-6/12 mx-auto mr-0 flex flex-col gap-10">
          <input
            type="text"
            placeholder="Type here"
            className="p-3 pl-0 w-full border-[#7D7D7D] border-b-[2.5px]"
          />
          <input
            type="text"
            placeholder="Type here"
            className="p-3 pl-0 w-full border-[#7D7D7D] border-b-[2.5px]"
          />
          <textarea
            className="p-3 pl-0 border-[#7D7D7D] border-b-[2.5px] textarea-ghost "
            placeholder="Bio"
          ></textarea>
          <div className="flex justify-end">
            <motion.button
              className="w-32 p-2 border-[#7D7D7D] border-2"
              whileHover={{ scale: [null, 1.4, 1.2] }}
              transition={{ duration: 0.3 }}
            >
              Send
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactMe;
