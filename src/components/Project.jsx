"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

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

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -6;
    const tiltY = (x - 0.5) * 6;
    setTilt({ x: tiltX, y: tiltY });

    if (glowRef.current) {
      glowRef.current.style.left = `${x * 100}%`;
      glowRef.current.style.top = `${y * 100}%`;
    }
  }, []);

  const handleMouseEnter = contextSafe(() => {
    if (onMouseEnter) onMouseEnter(project.slug);
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1.02, duration: 0.4, ease: "power2.out" });
      gsap.to(cardRef.current.querySelector(".card-shine"), { opacity: 1, duration: 0.5 });
      gsap.to(cardRef.current.querySelector(".card-inner-border"), { opacity: 1, duration: 0.6 });
      gsap.fromTo(
        cardRef.current.querySelector(".card-shimmer"),
        { x: "-100%", opacity: 0.6 },
        { x: "200%", opacity: 0, duration: 1.2, ease: "power2.inOut" }
      );
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (onMouseLeave) onMouseLeave();
    setTilt({ x: 0, y: 0 });
    if (cardRef.current) {
      gsap.to(cardRef.current, { scale: 1, duration: 0.5, ease: "power2.inOut" });
      gsap.to(cardRef.current.querySelector(".card-shine"), { opacity: 0, duration: 0.5 });
      gsap.to(cardRef.current.querySelector(".card-inner-border"), { opacity: 0, duration: 0.5 });
    }
  });

  const accentGradients = [
    "from-primary via-orange-500 to-amber-400",
    "from-blue-500 via-cyan-400 to-teal-400",
    "from-emerald-500 via-teal-400 to-cyan-400",
    "from-purple-500 via-violet-400 to-fuchsia-400",
  ];

  const accentSolids = [
    "bg-primary",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-purple-500",
  ];

  const numberColors = [
    "from-primary/60 via-orange-400/40 to-amber-300/20",
    "from-blue-500/60 via-cyan-400/40 to-teal-300/20",
    "from-emerald-500/60 via-teal-400/40 to-cyan-300/20",
    "from-purple-500/60 via-violet-400/40 to-fuchsia-300/20",
  ];

  const accentBgGlow = [
    "rgba(216,78,44,0.08)",
    "rgba(59,130,246,0.06)",
    "rgba(16,185,129,0.06)",
    "rgba(139,92,246,0.06)",
  ];

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={cardRef}
      className="group relative flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Outer gradient border */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl p-[1px] z-0">
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white/[0.08] to-white/[0.02]" />
      </div>

      {/* Card body */}
      <div className="relative z-[1] flex flex-col h-full rounded-2xl sm:rounded-3xl bg-[#0a0a0f]/90 backdrop-blur-xl border border-white/[0.04] overflow-hidden transition-all duration-500 group-hover:border-white/[0.08]">
        
        {/* Cursor-following glow */}
        <div
          ref={glowRef}
          className="card-shine absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] pointer-events-none opacity-0 z-0"
          style={{ background: accentBgGlow[index % 4] }}
        />

        {/* Shimmer sweep */}
        <div className="card-shimmer absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none z-[2] -translate-x-full skew-x-[-15deg]" />

        {/* Animated inner border glow */}
        <div className="card-inner-border absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 pointer-events-none z-[1]">
          <div className={`absolute inset-[-1px] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${accentGradients[index % 4]} opacity-20`} />
        </div>

        {/* Top accent bar */}
        <div className="relative h-1 w-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-r ${accentGradients[index % 4]} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
        </div>

        {/* Card content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6 md:p-7">
          
          {/* Header row */}
          <div className="flex justify-between items-start mb-4 sm:mb-5">
            {/* Number */}
            <span className={`text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-br ${numberColors[index % 4]} bg-clip-text text-transparent select-none leading-none tracking-tighter`}>
              {(index + 1).toString().padStart(2, "0")}
            </span>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 transition-all duration-500 opacity-0 group-hover:opacity-100">
                  <ExternalLink size={14} className="text-white/50" />
                </div>
              )}
              <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all duration-500 group-hover:${accentSolids[index % 4]} group-hover:border-transparent group-hover:shadow-lg`}>
                <ArrowUpRight
                  className="text-white/30 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Project name */}
          <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white/90 group-hover:text-white mb-3 transition-colors duration-300 leading-tight line-clamp-2">
            {project.name}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-white/35 group-hover:text-white/55 transition-colors duration-500 line-clamp-2 mb-5 sm:mb-6 leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Bottom section */}
          <div className="mt-auto space-y-4">
            {/* Divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-[9px] sm:text-[10px] font-semibold tracking-wide text-white/30 border border-white/[0.06] rounded-full px-2.5 py-1 group-hover:text-white/65 group-hover:border-white/15 group-hover:bg-white/[0.03] transition-all duration-400"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className={`text-[9px] sm:text-[10px] font-bold tracking-wide rounded-full px-2.5 py-1 border transition-all duration-400 ${
                  index % 4 === 0 ? 'text-primary/70 border-primary/15 bg-primary/[0.06] group-hover:bg-primary/15' :
                  index % 4 === 1 ? 'text-blue-400/70 border-blue-400/15 bg-blue-400/[0.06] group-hover:bg-blue-400/15' :
                  index % 4 === 2 ? 'text-emerald-400/70 border-emerald-400/15 bg-emerald-400/[0.06] group-hover:bg-emerald-400/15' :
                  'text-purple-400/70 border-purple-400/15 bg-purple-400/[0.06] group-hover:bg-purple-400/15'
                }`}>
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom accent glow on hover */}
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent ${
          index % 4 === 0 ? 'via-primary' :
          index % 4 === 1 ? 'via-blue-500' :
          index % 4 === 2 ? 'via-emerald-500' :
          'via-purple-500'
        } to-transparent group-hover:w-4/5 transition-all duration-700 ease-out`} />

        {/* Corner accent glow */}
        <div 
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
          style={{ background: accentBgGlow[index % 4] }}
        />
      </div>
    </Link>
  );
}
