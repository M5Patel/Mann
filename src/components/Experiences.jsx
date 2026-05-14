import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";
import { experienceData } from "@/data/experience";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Experiences() {
    const containerRef = useRef(null);
    const experience = experienceData;

    useGSAP(
        () => {
            if (!experience.length) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    end: "bottom 50%",
                    toggleActions: "restart none none reverse",
                    scrub: 1,
                },
            });

            tl.from(".experience-item", {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef, dependencies: [experience] }
    );

    useGSAP(
        () => {
            if (!experience.length) return;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "bottom 50%",
                    end: "bottom 20%",
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef, dependencies: [experience] }
    );

    return (
        <section className="py-section" id="my-experience">
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-14">
                    {experience.map((item) => (
                        <div key={item._id} className="experience-item">
                            <p className="cursor text-xl text-white/80">{item.company}</p>
                            <p className="cursor mt-3.5 mb-2.5 text-3xl leading-none md:text-4xl">
                                {item.title}
                            </p>
                            <p className="cursor text-lg text-white/80">
                                {item.startDate} - {item.endDate}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
