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

  useGSAP(
    () => {
      // Staggered fade up for project items
      gsap.from(".project-row", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", // Triggers when the top of container hits 75% down viewport
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="py-24" id="projects" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl">
        <SectionTitle title="PROJECTS" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8" ref={projectsRef}>
          {projectsData.map((project, index) => (
            <div key={project._id} className={`project-row h-full`}>
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