"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          {portfolioData.name}
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl">
          {portfolioData.role}
        </p>
        
        <div className="flex gap-6 mb-12">
          <a href={portfolioData.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            <Github size={28} />
          </a>
          <a href={portfolioData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            <Linkedin size={28} />
          </a>
          <a href={portfolioData.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
            <Instagram size={28} />
          </a>
          <a href={`mailto:${portfolioData.email}`} className="hover:text-indigo-400 transition-colors">
            <Mail size={28} />
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <a 
            href="#projects" 
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-all"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
