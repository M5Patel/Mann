"use client";

import { useLenis } from "lenis/react";
import { MoveUpRight, Github, Linkedin, FileText, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

const COLORS = [
    "bg-yellow-500 text-black",
    "bg-blue-500 text-white",
    "bg-teal-500 text-black",
    "bg-indigo-500 text-white",
    "bg-emerald-500 text-white",
];

const MENU_LINKS = [
    { name: "Home", url: "#" },
    { name: "About Me", url: "#about-me" },
    { name: "Experience", url: "#my-experience" },
    { name: "Projects", url: "#projects" },
    { name: "Freelance", url: "#freelance-work" },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lenis = useLenis();
    const pathname = usePathname();
    const router = useRouter();

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    const handleClick = (target) => {
        const isHome = pathname === "/";

        if (!isHome) {
            if (target === "#") {
                router.push("/");
            } else {
                router.push("/");
                if (lenis)
                    setTimeout(() => {
                        lenis.scrollTo(target, { offset: -30 });
                    }, 1000);
            }
            return;
        }

        if (!lenis) return;

        if (target === "#") {
            lenis.scrollTo(0);
        } else {
            lenis.scrollTo(target, { offset: -30 });
        }
    };

    return (
        <>
            {/* 1. NAV CONTAINER: High z-index [60] to always be on top */}
            <nav className="fixed top-0 left-0 w-full z-[60] pointer-events-none">
                <button
                    className={cn(
                        "group absolute top-4 right-4 z-[60] size-11 md:size-12 cursor-pointer md:right-10 md:top-5 pointer-events-auto rounded-full border border-white/10 bg-black/30 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <span
                        className={cn(
                            "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 -translate-y-[5px] rounded-full bg-white duration-300",
                            {
                                "-translate-y-1/2 rotate-45": isMenuOpen,
                                "md:group-hover:rotate-12": !isMenuOpen,
                            }
                        )}
                    ></span>
                    <span
                        className={cn(
                            "absolute top-1/2 left-1/2 inline-block h-0.5 w-3/5 -translate-x-1/2 translate-y-[5px] rounded-full bg-white duration-300",
                            {
                                "-translate-y-1/2 -rotate-45": isMenuOpen,
                                "md:group-hover:-rotate-12": !isMenuOpen,
                            }
                        )}
                    ></span>
                </button>
            </nav>

            {/* 2. OVERLAY: z-[40], added backdrop-blur for futuristic glass effect */}
            <div
                className={cn(
                    "overlay fixed inset-0 z-[40] bg-black/60 backdrop-blur-md transition-all duration-300",
                    {
                        "pointer-events-none invisible opacity-0": !isMenuOpen,
                    }
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* 3. MENU DRAWER: z-[50] sits above overlay, below button */}
            <div
                className={cn(
                    "fixed top-0 right-0 z-[50] h-svh w-full sm:w-[500px] sm:max-w-[calc(100vw-3rem)] translate-x-full transform gap-y-10 sm:gap-y-14 overflow-y-auto overflow-x-hidden transition-transform duration-700 cubic-bezier(0.4,0,0.2,1)",
                    "flex flex-col py-8 sm:py-10 lg:justify-center",
                    { "translate-x-0 shadow-2xl shadow-black/50": isMenuOpen }
                )}
            >
                {/* 4. BACKGROUND: Changed 'fixed' to 'absolute' so it perfectly fits the drawer */}
                <div
                    className={cn(
                        "bg-primary absolute inset-0 z-[-1] translate-x-1/2 scale-150 rounded-[50%] delay-150 duration-700 ease-in-out",
                        {
                            "translate-x-0": isMenuOpen,
                        }
                    )}
                ></div>

                <div className="mx-6 sm:mx-8 flex w-full max-w-[300px] grow sm:mx-auto md:items-center">
                    <div className="flex w-full gap-8 sm:gap-10 max-lg:flex-col lg:justify-between">
                        <div className="max-lg:order-2">
                            <p className="mb-4 sm:mb-5 text-white/70 md:mb-8 tracking-widest text-sm">SOCIAL</p>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((link) => {
                                    const iconMap = {
                                        github: <Github size={18} className="inline-block mr-2" />,
                                        linkedin: <Linkedin size={18} className="inline-block mr-2" />,
                                        resume: <FileText size={18} className="inline-block mr-2" />,
                                    };
                                    return (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="text-base sm:text-lg capitalize text-white hover:text-white/80 transition-colors hover:underline underline-offset-4 flex items-center"
                                        >
                                            {iconMap[link.name.toLowerCase()]}
                                            {link.name}
                                        </a>
                                    </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="">
                            <p className="mb-4 sm:mb-5 text-white/70 md:mb-8 tracking-widest text-sm">MENU</p>
                            <ul className="space-y-3 sm:space-y-4">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                handleClick(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl font-medium text-white transition-all hover:translate-x-2"
                                        >
                                            <span
                                                className={cn(
                                                    "flex size-3 sm:size-4 items-center justify-center rounded-full bg-white/20 transition-all duration-300 group-hover:scale-[150%]",
                                                    COLORS[idx]
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={10}
                                                    className="scale-0 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                                                />
                                            </span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mx-6 sm:mx-8 w-full max-w-[300px] sm:mx-auto">
                    <p className="mb-3 sm:mb-4 text-white/70 tracking-widest text-sm">GET IN TOUCH</p>
                    <a 
                        className="text-base sm:text-lg text-white hover:opacity-80 transition-opacity break-all" 
                        href={`mailto:${GENERAL_INFO.email}`}
                    >
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
}