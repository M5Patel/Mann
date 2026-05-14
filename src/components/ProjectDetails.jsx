"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Code, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
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
    <section className="px-6 pt-10 pb-24 md:px-12 bg-zinc-950 text-white min-h-screen">
      <div className="container mx-auto max-w-7xl" ref={containerRef}>
        <Link
          href="/"
          className="fade-in-later group mb-12 inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="transition-transform duration-300 group-hover:-translate-x-2" />
          Back to Projects
        </Link>

        {/* Header Section */}
        <div className="fade-in-later flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {project.name}
          </h1>

          <div className="flex items-center gap-6">
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white hover:underline transition-all"
              >
                <Code size={24} /> <span className="text-lg">Code</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white hover:underline transition-all"
              >
                <ExternalLink size={24} /> <span className="text-lg">Live</span>
              </a>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-20">
          {/* Sidebar */}
          <div className="md:col-span-4 space-y-10">
            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3">
                Year
              </h3>
              <p className="text-xl">{project.year}</p>
            </div>

            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white/10 px-4 py-2 rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Info */}
          <div className="md:col-span-8 space-y-10">
            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3">
                Overview
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>

            <div className="fade-in-later">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/40 mb-3">
                Key Features
              </h3>
              <ul className="list-inside list-disc space-y-3 text-lg text-white/80">
                {project.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Banner Image */}
        <div className="fade-in-later w-full overflow-hidden rounded-2xl shadow-2xl">
          <div
            className="aspect-video w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        </div>
      </div>
    </section>
  );
}
