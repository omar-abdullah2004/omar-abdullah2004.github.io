"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Mail, MessageSquare } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
        <p className="text-gray-400 mb-12 max-w-xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a
            href={`mailto:${portfolioData.email}`}
            className="flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all"
          >
            <Mail size={20} /> Say Hello
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-8 py-4 bg-gray-900 border border-gray-800 hover:border-indigo-600 rounded-xl font-medium transition-all"
          >
            <MessageSquare size={20} /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
  );
};
