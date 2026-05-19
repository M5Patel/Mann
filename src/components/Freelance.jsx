"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";
import { freelanceData } from "@/data/experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Freelance() {
    const freelanceRef = useRef(null);
    const freelance = freelanceData;

    useGSAP(
        () => {
            if (!freelance.length) return;
            gsap.from(".freelance-item", {
                y: 50,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: freelanceRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: freelanceRef, dependencies: [freelance] }
    );

    return (
        <section className="pb-section" id="freelance-work">
            <div className="container mx-auto px-6 max-w-7xl" ref={freelanceRef}>
                <SectionTitle title="Freelance Work" />

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-12">
                    {freelance.map((item, index) => (
                        <div
                            key={item._id}
                            className={`freelance-item group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden flex flex-col h-full`}
                        >
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />
                            
                            {/* Corner accent */}
                            <div className="absolute top-0 left-0 h-[2px] w-16 bg-gradient-to-r from-primary to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 left-0 h-16 w-[2px] bg-gradient-to-b from-primary to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            <p className="text-xs md:text-sm font-bold tracking-widest text-primary uppercase mb-4 relative z-10">
                                {item.client}
                            </p>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-white transition-colors duration-300 relative z-10">
                                {item.title}
                            </h3>

                            <p className="text-sm md:text-base text-white/70 font-medium leading-relaxed mb-8 relative z-10 flex-1">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                                {item.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] md:text-xs font-semibold tracking-wide text-white/60 border border-white/10 rounded-full px-3 py-1.5 bg-white/[0.03] group-hover:text-white/90 group-hover:border-white/30 group-hover:bg-white/[0.05] transition-all duration-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
