"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export default function Project({
  index,
  project,
  selectedProject,
  onMouseEnter,
  onMouseLeave,
}) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { contextSafe } = useGSAP();

  // 3D Tilt effect on mouse move
  const handleMouseMove = useCallback(
    (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -8;
      const tiltY = (x - 0.5) * 8;
      setTilt({ x: tiltX, y: tiltY });

      // Move glow to cursor position
      if (glowRef.current) {
        glowRef.current.style.left = `${x * 100}%`;
        glowRef.current.style.top = `${y * 100}%`;
      }
    },
    []
  );

  const handleMouseEnter = contextSafe(() => {
    if (onMouseEnter) onMouseEnter(project.slug);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(cardRef.current.querySelector(".project-arrow"), {
        x: 4,
        y: -4,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(cardRef.current.querySelector(".card-shine"), {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        cardRef.current.querySelector(".card-border-glow"),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (onMouseLeave) onMouseLeave();
    setTilt({ x: 0, y: 0 });
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(cardRef.current.querySelector(".project-arrow"), {
        x: 0,
        y: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(cardRef.current.querySelector(".card-shine"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
      gsap.to(cardRef.current.querySelector(".card-border-glow"), {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  });

  const numberColors = [
    "from-primary/40 to-orange-500/20",
    "from-blue-500/40 to-cyan-400/20",
    "from-emerald-500/40 to-teal-400/20",
    "from-purple-500/40 to-violet-400/20",
  ];

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={cardRef}
      className="group relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 md:p-7 backdrop-blur-md overflow-hidden transition-colors duration-500 hover:border-primary/30 hover:bg-white/[0.04] will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="card-shine absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 bg-primary/15 rounded-full blur-[60px] pointer-events-none opacity-0 z-0"
      />

      {/* Animated border glow */}
      <div className="card-border-glow absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-primary/10" />
      </div>

      {/* Background gradient */}
      <div className="absolute -inset-px bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none rounded-2xl sm:rounded-3xl z-0" />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5 sm:mb-6 md:mb-8">
          {/* Large number with gradient */}
          <span
            className={`text-4xl sm:text-5xl md:text-6xl font-black bg-gradient-to-b ${numberColors[index % 4]} bg-clip-text text-transparent select-none leading-none`}
          >
            {(index + 1).toString().padStart(2, "0")}
          </span>

          {/* Arrow button */}
          <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shrink-0">
            <ArrowUpRight
              className="project-arrow text-white opacity-0 transition-opacity"
              size={20}
            />
          </div>
        </div>

        <h4 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white mb-2 sm:mb-3 transition-colors duration-300 leading-tight">
          {project.name}
        </h4>

        <p className="text-xs sm:text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300 line-clamp-2 sm:line-clamp-3 mb-5 sm:mb-6 md:mb-8 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech stack pills */}
      <div className="relative z-10 flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
        {project.techStack.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wide text-white/35 border border-white/[0.06] rounded-full px-2 sm:px-3 py-1 sm:py-1.5 group-hover:text-white/70 group-hover:border-white/20 group-hover:bg-white/[0.03] transition-all duration-300"
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 3 && (
          <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold tracking-wide text-primary/80 border border-primary/20 rounded-full px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10">
            +{project.techStack.length - 3}
          </span>
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent group-hover:w-3/4 transition-all duration-700 ease-out" />
    </Link>
  );
}
