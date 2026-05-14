"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";

export default function Project({
  index,
  project,
  selectedProject,
  onMouseEnter,
  onMouseLeave,
}) {
  const svgRef = useRef(null);
  const { contextSafe } = useGSAP();

  const handleMouseEnter = contextSafe(() => {
    onMouseEnter(project.slug);
    if (svgRef.current) {
      gsap.fromTo(
        svgRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
      );
    }
  });

  return (
    <Link
      href={`/projects/${project.slug}`}
      // Increased vertical padding (py-12 md:py-16) for a more breathable layout
      className="group relative flex border-b border-white/10 py-12 md:py-16 px-4 transition-all duration-500 hover:bg-white/[0.02]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Increased the gap between the number and the title (md:gap-16) */}
      <div className="flex w-full items-start gap-8 md:gap-16">
        
        {/* Left Side: Number with underscore */}
        <span className="mt-2 text-sm md:text-base font-medium tracking-widest text-white/40 group-hover:text-white/80 transition-colors duration-300">
          { (index + 1).toString().padStart(2, "0") }
        </span>

        {/* Right Side: Title and Tech Stack */}
        <div className="flex flex-col">
          <h4 className="flex items-center gap-6 text-4xl md:text-6xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
            {project.name}
            
            {/* Smooth animated arrow */}
            <svg
              ref={svgRef}
              className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-white"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </h4>

          {/* Tech Stack: Clean text format without background pills */}
          <div className="mt-4 flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm font-medium tracking-wide text-white/40">
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} className="group-hover:text-white/60 transition-colors duration-300">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Image (Only visible on larger screens) */}
      {selectedProject === project.slug && (
        <div className="pointer-events-none absolute right-12 top-1/2 hidden -translate-y-1/2 z-10 md:block">
          <img
            src={project.thumbnail}
            alt={project.name}
            // Made the image slightly larger for a bolder hover impact
            className="h-64 w-96 rounded-lg object-cover shadow-2xl opacity-0 animate-in fade-in slide-in-from-bottom-8 duration-500"
          />
        </div>
      )}
    </Link>
  );
}