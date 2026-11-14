"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 border-b border-indigo-900 pb-2 inline-block">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-obsidian border border-gray-800 p-6 rounded-xl hover:border-indigo-600 transition-all"
          >
            <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-4 h-20 line-clamp-3">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-gray-900 rounded-md text-indigo-300">
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
            >
              Learn More <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
