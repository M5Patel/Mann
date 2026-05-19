"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import Button from "@/components/Button";
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
      ref={containerRef}
    >
      {/* FUTURISTIC AMBIENT GLOWS */}
      <div className="bg-glow absolute top-1/2 left-[10%] -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="bg-glow absolute top-1/3 right-[10%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div
        className="container relative z-10 flex h-svh items-center justify-center gap-10 max-lg:flex-col max-md:pb-10 lg:justify-between lg:gap-0"
      >
        {/* Left Side: Text and Button */}
        <div className="max-w-[544px] flex-col items-start justify-center pt-20 max-lg:flex md:pt-0">
          <h1 className="banner-title slide-up-and-fade text-6xl font-extrabold tracking-tighter leading-[.95] sm:text-[80px]">
            {/* 2027 Style Gradient Text */}
            <span className="bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent cursor drop-shadow-lg">
              Full-Stack
            </span>
            <br />{" "}
            <span className="cursor lg:ml-4 text-gray-100">DEVELOPER</span>
          </h1>
          <ShinyText
            className="slide-up-and-fade cursor text-lg md:text-xl mt-6 text-gray-300 font-light"
            text="
            Hi ! I'm Mann Patel. A Full-Stack Developer with hands-on experience through
            building high-performance, scalable, and responsive web solutions.
          "
          />
          <Button
            as="button"
            variant="primary"
            className="banner-Button slide-up-and-fade cursor mt-9 rounded-full px-8 py-4 font-semibold text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.8)] hover:bg-white hover:text-black"
            onClick={handleScrollToProjects}
          >
            View Projects
          </Button>
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
          <div className="slide-up-and-fade hidden lg:block backdrop-blur-xl bg-gray-950/40 border border-white/10 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] relative overflow-hidden group min-w-[420px]">
            {/* Subtle code block glare */}
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>

            {/* Mac OS Window Controls */}
            <div className="flex items-center gap-2 mb-5 border-b border-white/10 pb-3">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="ml-2 text-xs font-medium text-white/40 uppercase tracking-[0.2em] font-sans">developer.js</span>
            </div>

            <code
              ref={codeRef}
              className="flex flex-col text-sm tracking-wider font-mono"
            >
              <div className="inline-block leading-8 text-white/80 space-y-1">
                <div className="wrapper">
                  <span className="animateUp inline-block">
                    <span className="text-purple-400 font-semibold">const</span> developer = <span className="text-emerald-400">"Mann Patel"</span>;
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block">
                    <span className="text-purple-400 font-semibold">const</span> expertise = [
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block pl-6">
                    <span className="text-emerald-400">"Full-Stack Web"</span>, 
                    <span className="text-emerald-400"> "MERN"</span>, 
                    <span className="text-emerald-400"> "Next.js"</span>
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block">
                    ];
                  </span>
                </div>
                <div className="wrapper mt-3">
                  <span className="animateUp inline-block text-gray-400 italic text-xs">
                    // Building high-performance, scalable solutions
                  </span>
                </div>
                <div className="wrapper">
                  <span className="animateUp inline-block">
                    developer.<span className="text-blue-400">build</span>(<span className="text-emerald-400">"Future"</span>);
                  </span>
                </div>
              </div>
            </code>
          </div>

          {/* Mobile Code Snippet - Glassmorphic */}
          <div className="slide-up-and-fade lg:hidden backdrop-blur-xl bg-gray-950/40 border border-white/10 rounded-2xl p-5 shadow-2xl w-full max-w-sm">
            <div className="flex items-center gap-1.5 mb-3 border-b border-white/10 pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
            </div>
            <code className="flex flex-col text-xs tracking-wider font-mono">
              <div className="inline-block leading-6 text-white/80">
                <span className="text-purple-400">const</span> developer = <span className="text-emerald-400">"Mann Patel"</span>;<br/>
                <span className="text-purple-400">const</span> stack = [<span className="text-emerald-400">"MERN"</span>, <span className="text-emerald-400">"Next.js"</span>];<br/>
                developer.<span className="text-blue-400">build</span>(<span className="text-emerald-400">"Future"</span>);
              </div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
