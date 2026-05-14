"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import { getAge } from "@/lib/utils";
import ShinyText from "./ShinyText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AboutMe() {
  const container = useRef(null);
  const age = getAge("2002-09-21");

  useGSAP(
    () => {
      // Entry Animation
      const tlIn = gsap.timeline({
        scrollTrigger: {
          id: "about-me-in",
          trigger: container.current,
          start: "top 75%",
          end: "center center",
          scrub: 1, // Increased scrub slightly for a smoother, buttery feel
        },
      });

      tlIn.from(".slide-up-and-fade", {
        y: 100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)", // Adds a futuristic materializing effect
        stagger: 0.08,
        ease: "power2.out",
      });

      // Exit Animation
      const tlOut = gsap.timeline({
        scrollTrigger: {
          id: "about-me-out",
          trigger: container.current,
          start: "bottom 40%",
          end: "bottom top",
          scrub: 1,
        },
      });

      tlOut.to(".slide-up-and-fade", {
        y: -100,
        opacity: 0,
        scale: 0.95,
        filter: "blur(5px)",
        stagger: 0.02,
        ease: "power2.in",
      });
    },
    { scope: container }
  );

  return (
    <section className="relative overflow-hidden pb-section text-white" id="about-me">
      {/* Background Glowing Orb Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 opacity-50 blur-[120px]"></div>

      <div className="container relative z-10" ref={container}>
      
        <h2 className="slide-up-and-fade mb-12 text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
          <ShinyText
            className="cursor"
            text="I believe in a user-centered design approach, ensuring that every project I work on is tailored to meet the specific needs of its users."
          />
        </h2>

        {/* Glassmorphic Profile Card */}
        <div className="slide-up-and-fade relative mt-12 rounded-3xl border border-white/10 bg-white/[0.02] p-8 shadow-2xl backdrop-blur-md md:p-12">
          
          {/* Cyberpunk Corner Accents */}
          <div className="absolute left-0 top-0 h-[1px] w-8 bg-cyan-500/50"></div>
          <div className="absolute left-0 top-0 h-8 w-[1px] bg-cyan-500/50"></div>
          <div className="absolute bottom-0 right-0 h-[1px] w-8 bg-indigo-500/50"></div>
          <div className="absolute bottom-0 right-0 h-8 w-[1px] bg-indigo-500/50"></div>

          <div className="grid items-start gap-12 md:grid-cols-12">
            <div className="cursor space-y-4 md:col-span-5">
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                I'm Mann Patel.
              </h1>

              <p className="max-w-md text-lg text-white/60">
                Computer Engineer and Full-Stack Developer focused on building
                modern, scalable web applications with clean UI, smooth
                interactions, and high performance.
              </p>
            </div>
 
            <div className="cursor md:col-span-7">
              <div className="max-w-[500px] space-y-6 text-base text-white/70 sm:text-lg">
                <p>
                  My expertise includes the <span className="text-white">MERN stack</span>, modern JavaScript
                  frameworks, and UI/UX design. I focus on writing clean,
                  maintainable code while creating seamless user experiences that
                  are fast, scalable, and visually engaging.
                </p>

                <p>
                  I’m passionate about learning new technologies, building
                  innovative projects, and constantly improving my development
                  workflow to create better digital experiences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Punchline */}
        <div className="slide-up-and-fade cursor col-span-full mt-16 text-center">
          <div className="inline-block rounded-full border border-white/5 bg-white/5 px-6 py-2 backdrop-blur-sm">
            <p className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-sm font-medium uppercase tracking-widest text-transparent sm:text-base">
              Turning ideas into powerful web experiences
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}