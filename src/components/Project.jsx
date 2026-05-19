"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Project({
  index,
  project,
  selectedProject,
  onMouseEnter,
  onMouseLeave,
}) {
  const cardRef = useRef(null);
  const { contextSafe } = useGSAP();

  const handleMouseEnter = contextSafe(() => {
    if (onMouseEnter) onMouseEnter(project.slug);
    if (cardRef.current) {
      gsap.to(cardRef.current.querySelector(".project-arrow"), {
        x: 4,
        y: -4,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (onMouseLeave) onMouseLeave();
    if (cardRef.current) {
      gsap.to(cardRef.current.querySelector(".project-arrow"), {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  });

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={cardRef}
      className="group relative flex flex-col justify-between h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-white/[0.04] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none rounded-3xl" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />

      <div>
        <div className="flex justify-between items-start mb-8">
          <span className="text-5xl font-extrabold text-white/10 group-hover:text-primary/20 transition-colors duration-500">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <div className="h-12 w-12 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
            <ArrowUpRight
              className="project-arrow text-white opacity-0 transition-opacity"
              size={24}
            />
          </div>
        </div>

        <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white/90 group-hover:text-white mb-4 transition-colors duration-300">
          {project.name}
        </h4>

        <p className="text-sm md:text-base text-white/50 group-hover:text-white/70 transition-colors duration-300 line-clamp-3 mb-8 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[10px] md:text-xs font-semibold tracking-wide text-white/40 border border-white/10 rounded-full px-3 py-1.5 group-hover:text-white/80 group-hover:border-white/30 group-hover:bg-white/[0.02] transition-all duration-300"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="text-[10px] md:text-xs font-semibold tracking-wide text-primary border border-primary/20 rounded-full px-3 py-1.5 bg-primary/10">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
    </Link>
  );
}
