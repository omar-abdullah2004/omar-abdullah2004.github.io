"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8 border-b border-indigo-900 pb-2 inline-block">
          About Me
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          {portfolioData.bio}
        </p>
      </motion.div>
    </section>
  );
};
