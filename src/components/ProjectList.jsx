"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";

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

      // Stacked cards reveal animation
      const cards = gsap.utils.toArray(".project-card-wrapper");

      cards.forEach((card, i) => {
        // Initial state: cards are stacked and slightly overlapping
        gsap.set(card, {
          opacity: 0,
          y: 80 + i * 20,
          scale: 0.88,
          rotateX: 12,
          rotateY: i % 2 === 0 ? -4 : 4,
          transformPerspective: 1200,
          transformOrigin: "center bottom",
        });

        // Scroll-triggered reveal with stagger
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          delay: i * 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      });

      // Floating glow orbs animation
      gsap.to(".project-glow-orb-1", {
        y: -30,
        x: 20,
        scale: 1.2,
        opacity: 0.6,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".project-glow-orb-2", {
        y: 25,
        x: -15,
        scale: 0.8,
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Parallax depth effect on scroll
      gsap.to(".projects-bg-grid", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" id="projects" ref={containerRef}>
      {/* Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="projects-bg-grid absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(216,78,44,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(216,78,44,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orbs */}
        <div className="project-glow-orb-1 absolute top-[10%] right-[5%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="project-glow-orb-2 absolute bottom-[10%] left-[5%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="projects-section-title">
          <SectionTitle title="PROJECTS" />
        </div>

        {/* Counter badge */}
        <div className="projects-section-title flex items-center gap-3 mb-10 md:mb-14">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
          <span className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase">
            {projectsData.length} Featured Works
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6"
          ref={projectsRef}
          style={{ perspective: "1200px" }}
        >
          {projectsData.map((project, index) => (
            <div
              key={project._id}
              className="project-card-wrapper relative group/card"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Animated border glow on hover */}
              <div
                className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 blur-sm pointer-events-none"
                style={{
                  background: `conic-gradient(from ${index * 90}deg, transparent, rgba(216,78,44,0.4), transparent, rgba(216,78,44,0.2), transparent)`,
                }}
              />

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