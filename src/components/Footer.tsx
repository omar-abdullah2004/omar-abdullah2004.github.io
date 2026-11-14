import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-gray-900 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {portfolioData.name}. Built with Next.js & Tailwind CSS 4.
        </p>
      </div>
    </footer>
  );
};
