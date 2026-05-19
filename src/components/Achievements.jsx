"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Trophy, Award, Medal } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const achievementsData = [
    {
        _id: "ach-1",
        title: "1st Place in Hackathon",
        organization: "Creative Design and Multimedia Institute",
        icon: <Trophy size={24} className="text-yellow-400" />,
        description:
            "Secured 1st place in a competitive hackathon by developing an innovative full-stack solution under a tight deadline.",
    },
    {
        _id: "ach-2",
        title: "Google Cloud & Generative AI Certified",
        organization: "GDG Student Clubs at SSIT",
        icon: <Award size={24} className="text-blue-400" />,
        description:
            "Certified in Google Cloud Computing Foundations & Generative AI, demonstrating expertise in modern cloud infrastructure and AI integration.",
    },
    {
        _id: "ach-3",
        title: "HackSprint 2026 Participant",
        organization: "GDG On Campus",
        icon: <Medal size={24} className="text-emerald-400" />,
        description:
            "Contributed to innovative solution development and collaborative problem-solving using Google technologies at HackSprint 2026.",
    },
];

export default function Achievements() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.from(".achievement-card", {
                y: 40,
                opacity: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                },
            });
        },
        { scope: containerRef }
    );

    return (
        <section className="py-24" id="achievements">
            <div className="container mx-auto px-6 max-w-7xl" ref={containerRef}>
                <SectionTitle title="CERTIFICATE & ACHIEVEMENT" />

                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mt-12">
                    {achievementsData.map((item, index) => (
                        <div
                            key={item._id}
                            className={`achievement-card group relative rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-md hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-500 flex flex-col overflow-hidden`}
                        >
                            {/* Decorative background glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />

                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 shadow-lg relative z-10">
                                {item.icon}
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors relative z-10">
                                {item.title}
                            </h3>
                            
                            <p className="text-primary font-semibold text-sm tracking-wide mb-5 relative z-10">
                                {item.organization}
                            </p>

                            <p className="text-sm md:text-base text-white/70 leading-relaxed mt-auto relative z-10 font-medium">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
