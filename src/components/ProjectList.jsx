"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

import Project from "@/components/Project";
import SectionTitle from "@/components/SectionTitle";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ProjectList() {
  const containerRef = useRef(null);
  const projectsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useGSAP(
    () => {
      // Animate section title
      gsap.fromTo(
        ".projects-section-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Cards reveal animation
      const cards = gsap.utils.toArray(".project-card-wrapper");

      cards.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 60 + i * 15,
          scale: 0.92,
          rotateX: 8,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });

      // Floating glow orbs
      gsap.to(".project-glow-orb-1", {
        y: -30, x: 20, scale: 1.2, opacity: 0.6,
        duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      gsap.to(".project-glow-orb-2", {
        y: 25, x: -15, scale: 0.8, opacity: 0.4,
        duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1,
      });

      // Parallax grid
      gsap.to(".projects-bg-grid", {
        y: -60, ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", end: "bottom top", scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="projects" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="projects-bg-grid absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(216,78,44,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216,78,44,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="project-glow-orb-1 absolute top-[10%] right-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="project-glow-orb-2 absolute bottom-[10%] left-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-blue-600/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.02] rounded-full blur-[150px]" />
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="projects-section-title">
          <SectionTitle title="PROJECTS" />
        </div>

        {/* Counter badge */}
        <div className="projects-section-title flex items-center gap-4 mb-12 md:mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 via-primary/30 to-transparent" />
          <div className="relative">
            <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm block">
              {projectsData.length} Featured Works
            </span>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-primary/20 via-primary/30 to-transparent" />
        </div>

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5"
          ref={projectsRef}
          style={{ perspective: "1200px" }}
        >
          {projectsData.map((project, index) => (
            <div
              key={project._id}
              className="project-card-wrapper relative"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <Project
                index={index}
                project={project}
                selectedProject={selectedProject}
                onMouseEnter={setSelectedProject}
                onMouseLeave={() => setSelectedProject(null)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}