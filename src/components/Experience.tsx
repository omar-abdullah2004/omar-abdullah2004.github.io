"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 border-b border-indigo-900 pb-2 inline-block">
        Experience
      </h2>
      <div className="space-y-12">
        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 border-l-2 border-indigo-600"
          >
            <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-1" />
            <div className="mb-1 text-sm text-indigo-400 font-medium">{exp.period}</div>
            <h3 className="text-xl font-bold">{exp.role}</h3>
            <div className="text-lg text-gray-400 mb-2">{exp.company}</div>
            <p className="text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
