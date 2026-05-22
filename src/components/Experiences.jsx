"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Code2, Palette } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";
import { experienceData } from "@/data/experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experienceIcons = {
    "exp-1": <Code2 size={20} className="text-primary" />,
    "exp-2": <Palette size={20} className="text-primary" />,
    "exp-3": <Briefcase size={20} className="text-primary" />,
};

export default function Experiences() {
    const containerRef = useRef(null);
    const experience = experienceData;

    useGSAP(
        () => {
            if (!experience.length) return;
            gsap.fromTo(
                ".experience-item",
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        { scope: containerRef, dependencies: [experience] }
    );

    return (
        <section className="py-section" id="my-experience">
            <div className="container mx-auto px-6 md:px-8" ref={containerRef}>
                <SectionTitle title="My Experience" />

                    <div className="grid gap-10 md:gap-14">
                        {experience.map((item) => (
                            <div
                                key={item._id}
                                className="experience-item relative pl-8 border-l border-white/10 hover:border-primary/40 transition-colors duration-500"
                            >
                                {/* Timeline dot */}
                                <div className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-primary/80 border-2 border-black" />

                                <div className="flex items-center gap-3 mb-2">
                                    {experienceIcons[item._id]}
                                    <p className="cursor text-base md:text-lg text-white/60 font-medium">
                                        {item.company}
                                    </p>
                                </div>

                                <p className="cursor text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-2">
                                    {item.title}
                                </p>

                                <span className="inline-block text-xs md:text-sm font-medium tracking-wide text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-3 py-1 mb-3">
                                    {item.duration}
                                </span>

                                {item.description && (
                                    <p className="cursor text-sm md:text-base text-white/50 max-w-2xl leading-relaxed">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
    );
}
