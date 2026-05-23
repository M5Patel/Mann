"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {
  ExternalLink,
  Globe,
  Cpu,
  Trophy,
  Terminal,
} from "lucide-react";

import SectionTitle from "@/components/SectionTitle";
import { freelanceData } from "@/data/experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const freelanceIcons = {
  "fl-1": <Globe size={18} className="text-primary group-hover:text-white transition-colors duration-500" />,
  "fl-2": <Cpu size={18} className="text-primary group-hover:text-white transition-colors duration-500" />,
  "fl-3": <Trophy size={18} className="text-primary group-hover:text-white transition-colors duration-500" />,
  "fl-4": <Terminal size={18} className="text-primary group-hover:text-white transition-colors duration-500" />,
};

const FreelanceCard = ({ item }) => {
  return (
    <a 
      href={item.liveLink !== "Private/Internal System" ? item.liveLink : "#"}
      target={item.liveLink !== "Private/Internal System" ? "_blank" : "_self"}
      rel="noreferrer"
      className="freelance-item relative pl-10 md:pl-20 w-full group py-4 block"
    >
      {/* Timeline Icon */}
      <div className="icon-container absolute left-[-16px] md:left-[-20px] top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 bg-zinc-950 flex items-center justify-center z-10 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)]">
         <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
         <div className="relative z-10 group-hover:scale-110 transition-transform duration-500">
            {freelanceIcons[item._id] || <Globe size={16} className="text-primary group-hover:text-white transition-colors duration-500" />}
         </div>
      </div>

      {/* Connection Line to Card */}
      <div className="connection-line absolute left-[16px] md:left-[20px] top-1/2 -translate-y-1/2 w-8 md:w-16 h-[1px] bg-gradient-to-r from-primary/50 to-transparent group-hover:from-primary group-hover:to-primary/20 transition-all duration-500 origin-left" />

      {/* Main Card */}
      <div 
        className="card-content relative block w-full bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 md:p-6 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-primary/5"
      >
        <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center justify-between">
           <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                   {item.client}
                 </span>
              </div>
              
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                 {item.title}
              </h3>
              
              <p className="text-sm text-white/50 leading-relaxed max-w-2xl line-clamp-2">
                 {item.description}
              </p>
           </div>

           {/* Call to action */}
           {item.liveLink !== "Private/Internal System" && (
             <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-zinc-900 group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-md">
                <ExternalLink size={18} className="text-white/50 group-hover:text-white transition-colors duration-500" />
             </div>
           )}
        </div>
      </div>
    </a>
  );
};

export default function Freelance() {
  const freelanceRef = useRef(null);
  const freelance = freelanceData;

  useGSAP(
    () => {
      if (!freelance.length) return;

      const items = gsap.utils.toArray(".freelance-item");
      
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { 
            y: 40, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Timeline Progress Line
      gsap.fromTo(".timeline-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: freelanceRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    },
    { scope: freelanceRef, dependencies: [freelance] }
  );

  return (
    <section className="pb-20" id="freelance-work">
      <div className="container mx-auto px-6 max-w-5xl" ref={freelanceRef}>
        <SectionTitle title="Freelance Work" />

        <div className="relative mt-16">
          {/* Vertical Timeline Track */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px]">
            <div className="absolute inset-0 bg-white/5 origin-top" />
            <div className="timeline-progress absolute top-0 left-0 w-full h-full bg-primary origin-top" />
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            {freelance.map((item) => (
              <FreelanceCard 
                key={item._id} 
                item={item} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
