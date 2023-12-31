"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function ContactMe() {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/send-emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      alert("Email succesfully sent");

      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="contact-me">
      <div className="w-11/12 mx-auto pt-16 flex flex-col lg:flex-row pb-16 text-primary">
        <motion.h1
          className="text-center text-left text-3xl font-extrabold mb-14 lg:mb-[105px] sm:text-4xl lg:text-6xl"
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
          Let&apos;s talk
        </motion.h1>
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-4/5 lg:w-6/12 mx-auto lg:mr-0 flex flex-col gap-10"
        >
          <div>
            <label htmlFor="name" className="text-left">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder=""
              className="p-3 pl-1 w-full border-[#7D7D7D] border-b-[2.5px] bg-gray-50"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          <div>
            <label htmlFor="email" className="text-left">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="example@email.com"
              className="p-3 pl-1 w-full border-[#7D7D7D] border-b-[2.5px] bg-gray-50"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="message" className="text-left">
              Message
            </label>
            <textarea
              id="message"
              className="p-3 pl-1 border-[#7D7D7D] border-b-[2.5px] textarea-ghost bg-gray-50"
              placeholder="Type in your message"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
          </div>

          <div className="flex justify-center lg:justify-end">
            <motion.button
              className="w-32 p-2 hover:border-[1px] active:bg-zinc-200 hover:border-[#7D7D7D] border-[#7D7D7D] border-2 btn btn-[rgb(249 250 251)] rounded"
              whileHover={{ scale: [null, 1.2, 1.1] }}
              transition={{ duration: 0.2 }}
              type="submit"
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
