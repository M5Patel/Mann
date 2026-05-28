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
        icon: <Trophy size={24} className="text-yellow-400" />,
        description:
            "Won 1st Place in a Hackathon at the Creative Design and Multimedia Institute.",
    },
    {
        _id: "ach-2",
        title: "Google Cloud & Generative AI Certified",
        organization: "GDG Student Clubs at SSIT",
        icon: <Award size={24} className="text-blue-400" />,
        description:
            "Certified in Google Cloud Computing Foundations & Generative AI by GDG Student Clubs at SSIT.",
    },
    {
        _id: "ach-3",
        title: "HackSprint 2026 Participant",
        organization: "GDG On Campus",
        icon: <Medal size={24} className="text-emerald-400" />,
        description:
            "Participated in HackSprint 2026 by GDG On Campus, contributing to innovative solution development and collaborative problem-solving using Google technologies.",
    },
    {
        _id: "ach-4",
        title: "Code Unnati Program",
        organization: "Edunet Foundation & SAP",
        icon: <BookOpen size={24} className="text-cyan-400" />,
        description:
            "Completed training in Emerging Technologies including IoT, Cyber Security and SAP Analytics Cloud (2024-2025).",
    },
];

export default function Achievements() {
    const sectionRef = useRef(null);
    const scrollRef = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            // Desktop layout (lg and up): Pin page and scroll horizontally
            mm.add("(min-width: 1024px)", () => {
                const scrollEl = scrollRef.current;
                const sectionEl = sectionRef.current;
                if (!scrollEl || !sectionEl) return;

                // Adjust classes to display horizontally
                scrollEl.classList.remove("w-full");
                scrollEl.classList.add("min-w-max");

                const cardWidth = 340;
                const gap = 48; // gap-12 is 3rem = 48px
                const totalCards = achievementsData.length;
                const totalTranslation = (totalCards - 1) * (cardWidth + gap);

                const pinTimeline = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionEl,
                        pin: true,
                        scrub: 0.5,
                        start: "top top",
                        end: () => `+=${totalTranslation + 400}`,
                        invalidateOnRefresh: true,
                    },
                });

                // Translate timeline horizontally (spans the entire scroll timeline)
                pinTimeline.to(scrollEl, {
                    x: -totalTranslation,
                    ease: "none",
                }, 0);

                // Animate timeline nodes & cards in sequence as user scrolls
                const items = scrollEl.querySelectorAll(".achievement-item-wrapper");
                items.forEach((item, index) => {
                    const dot = item.querySelector(".timeline-dot");
                    const dotInner = item.querySelector(".dot-inner");
                    const connector = item.querySelector(".connector-line");
                    const card = item.querySelector(".achievement-card-anim-wrapper");

                    const startTime = index * 0.3;

                    // Dot border lights up
                    pinTimeline.to(dot, {
                        borderColor: "#d84e2c",
                        duration: 0.15,
                    }, startTime);

                    // Inner dot gets primary color
                    pinTimeline.to(dotInner, {
                        backgroundColor: "#d84e2c",
                        scale: 1.3,
                        duration: 0.15,
                    }, startTime);

                    // Vertical connector line grows
                    pinTimeline.fromTo(connector, 
                        { scaleY: 0.2, transformOrigin: "top" },
                        { scaleY: 1, duration: 0.2 }, 
                        startTime
                    );

                    // Card slides up & fades to full opacity
                    pinTimeline.fromTo(card, 
                        { y: 30, opacity: 0.6, scale: 0.98 },
                        { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" },
                        startTime
                    );
                });
            });

            // Mobile layout (< 1024px): Swipe horizontally, fade/translate vertically
            mm.add("(max-width: 1023px)", () => {
                const scrollEl = scrollRef.current;
                const sectionEl = sectionRef.current;
                if (!scrollEl || !sectionEl) return;

                scrollEl.classList.remove("min-w-max");
                scrollEl.classList.add("w-full");

                // Reset translation
                gsap.set(scrollEl, { x: 0 });

                // Mobile swipe entrance animation
                gsap.fromTo(
                    scrollEl.querySelectorAll(".achievement-card-anim-wrapper"),
                    {
                        y: 40,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionEl,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef }
    );

    return (
        <section 
            className="relative overflow-hidden py-24 select-none lg:h-screen flex flex-col justify-center w-full" 
            id="achievements" 
            ref={sectionRef}
        >
            {/* Ambient background glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* Title container aligned to grid */}
            <div className="container mx-auto px-6 max-w-7xl z-10 w-full mb-8">
                <SectionTitle title="CERTIFICATE & ACHIEVEMENT" />
            </div>

            {/* Horizontal Scroll Layout container (Full Width) */}
            <div className="w-full overflow-hidden z-10 relative">
                <div 
                    ref={scrollRef} 
                    className="flex flex-row gap-8 sm:gap-12 overflow-x-auto lg:overflow-hidden pb-12 pt-2 px-6 sm:px-12 md:px-24 lg:px-[calc(50vw-170px)] w-full select-none scrollbar-none relative z-10"
                >
                    {achievementsData.map((item, index) => (
                        <div 
                            key={item._id} 
                            className="achievement-item-wrapper relative flex flex-col items-center flex-shrink-0 w-[280px] md:w-[340px] z-10"
                        >
                            {/* Horizontal line segment to the next dot */}
                            {index < achievementsData.length - 1 && (
                                <div className="absolute left-1/2 top-[16px] w-[calc(100%+3rem)] h-[2px] bg-white/10 z-0 pointer-events-none" />
                            )}
                            {/* Timeline Dot */}
                            <div className="timeline-dot mb-6 flex h-8 w-8 items-center justify-center rounded-full bg-black border-2 border-white/20 hover:border-primary transition-[border-color] duration-300 relative z-20">
                                <div className="h-3 w-3 rounded-full bg-white/30 dot-inner" />
                            </div>
                            
                            {/* Vertical connector line to card */}
                            <div className="w-[2px] h-6 bg-gradient-to-b from-white/20 to-white/10 mb-4 connector-line" />
                            
                            {/* Card GSAP Animation Wrapper */}
                            <div className="achievement-card-anim-wrapper w-full opacity-60">
                                {/* Card content */}
                                <div className="achievement-card w-full group relative rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md hover:border-primary/40 hover:bg-white/[0.04] hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(216,78,44,0.1)] transition-all duration-500 flex flex-col h-[280px] overflow-hidden text-left">
                                    {/* Accent glows */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-primary/20 transition-colors duration-700" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-[40px] pointer-events-none group-hover:bg-white/10 transition-colors duration-700" />

                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-500 shadow-lg relative z-10">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-snug group-hover:text-white transition-colors relative z-10 line-clamp-2">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-primary font-semibold text-xs tracking-wide mb-3 relative z-10 line-clamp-1">
                                        {item.organization}
                                    </p>

                                    <p className="text-xs md:text-sm text-white/70 leading-relaxed mt-auto relative z-10 font-medium line-clamp-3">
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
