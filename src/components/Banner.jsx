"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import Button from "@/components/Button";
import Magnet from "@/components/Magnet";
import ShinyText from "@/components/ShinyText";

const img = "/assets/Patel.jpeg";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Banner() {
  const containerRef = useRef(null);
  const codeRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "bottom 70%",
          end: "bottom 10%",
          scrub: 1,
        },
      });

      tl.fromTo(
        ".slide-up-and-fade",
        { y: 0 },
        { y: -150, opacity: 0, stagger: 0.05 },
      );

      // Enhanced Futuristic Floating Animation (Subtle 3D rotation)
      gsap.to(".profile-img", {
        y: -15,
        rotationX: 4,
        rotationY: -4,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Ambient background pulse
      gsap.to(".bg-glow", {
        scale: 1.1,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    (context) => {
      if (!context) return;

      const animateUps = context.selector?.(".animateUp") ?? [];

      if (animateUps.length > 0) {
        const wrapperTl = gsap.timeline();

        wrapperTl
          .to(".wrapper", { overflow: "hidden", duration: 0.4 })
          .from(animateUps, {
            y: "100%",
            duration: 2,
            delay: 1.5,
            ease: "power2.out", // Changed to a snappier modern ease
            scrollTrigger: {
              trigger: codeRef.current,
              start: "top+=100 bottom",
              toggleActions: "play none none reverse",
            },
          });
      }
    },
    { scope: codeRef },
  );

 const handleScrollToProjects = () => {
   
    const el = document.getElementById("projects"); 
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="banner"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* FUTURISTIC AMBIENT GLOWS */}
      <div className="bg-glow absolute top-1/2 left-[10%] -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="bg-glow absolute top-1/3 right-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div
        className="container relative z-10 flex h-svh items-center justify-center gap-10 max-lg:flex-col max-md:pb-10 lg:justify-between lg:gap-0"
        ref={containerRef}
      >
        {/* Left Side: Text and Button */}
        <div className="max-w-[544px] flex-col items-start justify-center pt-20 max-lg:flex md:pt-0">
          <h1 className="banner-title slide-up-and-fade text-6xl font-extrabold tracking-tighter leading-[.95] sm:text-[80px]">
            {/* 2027 Style Gradient Text */}
            <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent cursor drop-shadow-lg">
              FRONTEND
            </span>
            <br />{" "}
            <span className="cursor lg:ml-4 text-gray-100">DEVELOPER</span>
          </h1>
          <ShinyText
            className="slide-up-and-fade cursor text-lg md:text-xl mt-6 text-gray-300 font-light"
            text="
            Hi ! I'm Mann Patel. A Frontend Developer with hands-on experience through
            building high-performance, scalable, and responsive web solutions.
          "
          />
          <Magnet magnetStrength={6}>
            <Button
              as="button"
              variant="primary"
              className="banner-Button slide-up-and-fade cursor mt-9 rounded-full px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.8)] hover:scale-105 hover:bg-white hover:text-black"
              onClick={handleScrollToProjects}
            >
              View Projects
            </Button>
          </Magnet>
        </div>

        {/* Right Side: Image and Code Snippet */}
        <div className="flex flex-col items-center lg:items-end gap-10 cursor">
          {/* FUTURISTIC PROFILE IMAGE WRAPPER */}
          {/* Removed grayscale, added glassmorphic ring, neon shadow, and hover scale */}
          <div className="profile-img relative w-56 h-56 md:w-[320px] md:h-[320px] rounded-full p-2 bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_0_60px_-15px_rgba(255,255,255,0.15)] group">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img
                src={img}
                alt="Mann Patel"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Inner futuristic overlay ring */}
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none"></div>
            </div>
          </div>

          {/* GLASSMORPHIC CODE SNIPPET */}
          <div className="slide-up-and-fade hidden lg:block backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden group">
            {/* Subtle code block glare */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>

            <code
              ref={codeRef}
              className="flex flex-col text-xs tracking-widest text-gray-300 md:text-sm font-mono"
            >
              <span className="text-primary block text-lg font-bold mb-2">
                {"<span>"}
              </span>
              <div className="inline-block leading-8 md:translate-x-5 border-l border-white/10 pl-4">
                <div className="wrapper">
                  <span className="animateUp inline-block text-gray-100">
                    Proficient in the latest web technologies and
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block text-gray-100">
                    frameworks, continuously expanding my skill set
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block text-gray-100">
                    to stay at the forefront of the industry.
                  </span>
                </div>
              </div>
              <span className="text-primary block text-lg font-bold mt-2">
                {"</span>"}
              </span>
            </code>
          </div>

          {/* Mobile Code Snippet - Glassmorphic */}
          <div className="slide-up-and-fade lg:hidden backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-sm">
            <code className="flex flex-col text-[11px] tracking-wider text-gray-300 font-mono">
              <span className="text-primary block text-base font-bold mb-1">
                {"<span>"}
              </span>
              <div className="inline-block leading-6 border-l border-white/10 pl-3 ml-2">
                <span className="inline-block text-gray-100">
                  Proficient in the latest web technologies and frameworks,
                  continuously expanding my skill set to stay at the forefront
                  of the industry.
                </span>
              </div>
              <span className="text-primary block text-base font-bold mt-1">
                {"</span>"}
              </span>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
