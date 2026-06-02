"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Trophy, Award, Medal, BookOpen } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const achievementsData = [
    {
        _id: "ach-1",
        title: "1st Place in Hackathon",
        organization: "Creative Design and Multimedia Institute",
        icon: <Trophy size={28} className="text-yellow-400 group-hover:scale-110 transition-transform duration-500" />,
        description:
            "Won 1st Place in a Hackathon at the Creative Design and Multimedia Institute.",
        color: "from-yellow-400/20 to-amber-500/5",
        borderColor: "group-hover:border-yellow-400/30",
        glowColor: "rgba(250, 204, 21, 0.15)",
        iconBg: "bg-yellow-400/10 border-yellow-400/20",
    },
    {
        _id: "ach-2",
        title: "Google Cloud & Generative AI Certified",
        organization: "GDG Student Clubs at SSIT",
        icon: <Award size={28} className="text-blue-400 group-hover:scale-110 transition-transform duration-500" />,
        description:
            "Certified in Google Cloud Computing Foundations & Generative AI by GDG Student Clubs at SSIT.",
        color: "from-blue-400/20 to-cyan-500/5",
        borderColor: "group-hover:border-blue-400/30",
        glowColor: "rgba(96, 165, 250, 0.15)",
        iconBg: "bg-blue-400/10 border-blue-400/20",
    },
    {
        _id: "ach-3",
        title: "HackSprint 2026 Participant",
        organization: "GDG On Campus",
        icon: <Medal size={28} className="text-emerald-400 group-hover:scale-110 transition-transform duration-500" />,
        description:
            "Participated in HackSprint 2026 by GDG On Campus, contributing to innovative solution development and collaborative problem-solving using Google technologies.",
        color: "from-emerald-400/20 to-teal-500/5",
        borderColor: "group-hover:border-emerald-400/30",
        glowColor: "rgba(52, 211, 153, 0.15)",
        iconBg: "bg-emerald-400/10 border-emerald-400/20",
    },
    {
        _id: "ach-4",
        title: "Code Unnati Program",
        organization: "Edunet Foundation & SAP",
        icon: <BookOpen size={28} className="text-cyan-400 group-hover:scale-110 transition-transform duration-500" />,
        description:
            "Completed training in Emerging Technologies including IoT, Cyber Security and SAP Analytics Cloud (2024-2025).",
        color: "from-cyan-400/20 to-sky-500/5",
        borderColor: "group-hover:border-cyan-400/30",
        glowColor: "rgba(34, 211, 238, 0.15)",
        iconBg: "bg-cyan-400/10 border-cyan-400/20",
    },
];

export default function Achievements() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            // Title animation
            gsap.fromTo(
                ".achievements-title",
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Staggered card reveal
            const cards = gsap.utils.toArray(".achievement-card-wrapper");
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.95,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // Ambient background orbs
            gsap.to(".ach-glow-1", {
                y: -30, x: 20, scale: 1.1, opacity: 0.5,
                duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
            });
            gsap.to(".ach-glow-2", {
                y: 30, x: -20, scale: 0.9, opacity: 0.4,
                duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1,
            });
        },
        { scope: sectionRef }
    );

    return (
        <section 
            className="py-20 md:py-28 relative overflow-hidden" 
            id="achievements" 
            ref={sectionRef}
        >
            {/* Ambient background glowing orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="ach-glow-1 absolute top-[20%] left-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/[0.05] rounded-full blur-[120px]" />
                <div className="ach-glow-2 absolute bottom-[20%] right-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-blue-500/[0.05] rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.01] rounded-full blur-[100px]" />
            </div>

            {/* Section divider */}
            <div className="section-divider mb-16"></div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
                
                {/* Title */}
                <div className="achievements-title">
                    <SectionTitle title="CERTIFICATES & ACHIEVEMENTS" />
                </div>

                {/* Subtitle / Counter */}
                <div className="achievements-title flex items-center gap-4 mb-12 md:mb-16">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 via-primary/30 to-transparent" />
                    <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                        {achievementsData.length} Milestones
                    </span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-primary/20 via-primary/30 to-transparent" />
                </div>

                {/* Grid Layout replacing the horizontal scroll */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {achievementsData.map((item, index) => (
                        <div 
                            key={item._id} 
                            className="achievement-card-wrapper group relative"
                        >
                            <div className={`relative flex flex-col sm:flex-row gap-6 items-start h-full rounded-2xl sm:rounded-3xl border border-white/[0.06] ${item.borderColor} bg-[#0a0a0f]/80 backdrop-blur-xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:bg-[#0a0a0f]`}>
                                
                                {/* Background Gradient Accent */}
                                <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl ${item.color} rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0`} />
                                
                                {/* Shimmer Sweep */}
                                <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-15deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none z-[1]" />

                                {/* Icon Container */}
                                <div className={`shrink-0 flex items-center justify-center w-16 h-16 rounded-2xl border ${item.iconBg} relative z-10 overflow-hidden`}>
                                    {/* Icon Glow */}
                                    <div 
                                        className="absolute inset-0 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: item.glowColor }}
                                    />
                                    <div className="relative z-10">
                                        {item.icon}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 relative z-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-white/40 font-semibold text-xs sm:text-sm tracking-wide uppercase mb-4">
                                        {item.organization}
                                    </p>

                                    <p className="text-sm md:text-[15px] text-white/50 group-hover:text-white/70 leading-relaxed transition-colors duration-500">
                                        {item.description}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
