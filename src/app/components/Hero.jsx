'use client'

import { motion } from "framer-motion";
import Image from "next/image";

function HeroSection() {
    return (
        <section className="hero min-h-screen">
  <div className="hero-content text-center flex flex-col">
    <div className="avatar">
        <div className="w-32 rounded-full ring ring-[#a992f7] ring-offset-base-100 ring-offset-2">
            <Image width={500} height={500} alt='profile pic of author' src="/photo_5931572259703601817_x.jpg" />
        </div>
    </div>

    <div>
        <h1 className="text-3xl font-extrabold pb-3">Edoye Ogoba</h1>
        <h2 className="text-5xl">Front-end Developer</h2>
        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat.</p>
        <div className="w-31/2 flex justify-center gap-4 mb-8">
            <span className="social-link">
                <a href='' className="hover:cursor-pointer"><Image width={100} height={100} alt='social-link' src="/icons8-twitterx.svg" className="w-7"/></a>
            </span>
            <span className="social-link">
                <a href='' className="hover:cursor-pointer"><Image width={100} height={100} alt='social-link' src="/icons8-github (3).svg" className="w-7"/></a>
            </span>
            <span className="social-link">
                <a href='' className="hover:cursor-pointer"><Image width={100} height={100} alt='social-link' src="/icons8-whatsapp.svg" className="w-7"/></a>
            </span>
            <span className="social-link">
                <a href='' className="hover:cursor-pointer"><Image width={100} height={100} alt='social-link' src="/icons8-linkedin (1).svg" className="w-7"/></a>
            </span>
        </div>
        <div className="flex justify-center gap-8">
            <motion.button className="p-2 border-2 border-[#7D7D7D]"  whileHover={{ scale: [null, 1.4, 1.2]}} transition={{ duration: 0.3 }}>About Me</motion.button>
            <motion.button className="p-2 border-2 border-[#7D7D7D]"  whileHover={{ scale: [null, 1.4, 1.2]}} transition={{ duration: 0.3 }}>My Portfolio</motion.button>
            <motion.button className="p-2 border-2 border-[#7D7D7D]"  whileHover={{ scale: [null, 1.4, 1.2]}} transition={{ duration: 0.3 }}>Say Hi!</motion.button>
        </div>
        </div>
    </div>
</section>
    )
}

export default HeroSection;

{/* <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    /> */}