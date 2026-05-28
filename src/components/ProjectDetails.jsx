"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { projectsData } from "@/data/projects";

gsap.registerPlugin(useGSAP);

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projectsData.find((p) => p.slug === id);
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(
    () => {
      if (!project) return;

      gsap.from(".fade-in-later", {
        autoAlpha: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });
    },
    { scope: containerRef, dependencies: [project] },
  );

  if (!project) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center py-10">
        <p className="text-3xl text-white/60">Project not found</p>
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-6 pt-8 sm:pt-10 pb-20 sm:pb-24 md:px-12 bg-zinc-950 text-white min-h-screen">
      <div className="container mx-auto max-w-5xl" ref={containerRef}>
        <Link
          href="/"
          className="fade-in-later group mb-12 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-2" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="fade-in-later flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10 mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            {project.name}
          </h1>

          {(project.sourceCode || project.liveUrl) && (
            <div className="flex flex-wrap items-center gap-4">
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-all bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/30 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide"
                >
                  <Github size={18} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-black hover:bg-white/90 transition-all bg-white border border-transparent px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
                >
                  <ExternalLink size={18} /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          {/* Sidebar - Tech Stack */}
          <div className="md:col-span-4 space-y-10">
            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/[0.06] border border-white/10 px-4 py-2 rounded-lg text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Info - Overview & Key Features */}
          <div className="md:col-span-8 space-y-12">
            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                Overview
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>

            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-4">
                Key Features
              </h3>
              <ul className="space-y-4">
                {project.features.map((f, i) => (
                  <li key={f} className="flex items-start gap-3 text-base md:text-lg text-white/80">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
