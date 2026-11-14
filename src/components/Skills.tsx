"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export const Skills = () => {
  const categories = ["ML", "Backend", "Web"];

  return (
    <section id="skills" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-12 border-b border-indigo-900 pb-2 inline-block">
        Skills
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat} className="space-y-4">
            <h3 className="text-xl font-semibold text-indigo-400">{cat}</h3>
            <div className="flex flex-wrap gap-2">
              {portfolioData.skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <motion.span
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-obsidian border border-gray-800 rounded-md text-sm text-gray-300"
                  >
                    {skill.name}
                  </motion.span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
