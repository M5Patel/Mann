"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Button({
    variant,
    className,
    children,
    as = "link",
    ...rest
}) {
    // 2027 Futuristic Variants: Added glows, glassmorphism, and border-transitions
    const variantClasses = {
        primary: `bg-primary text-black font-bold shadow-[0_0_15px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:bg-white hover:text-black`,
        secondary: `bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`,
        success: `bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-400`,
        warning: `bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-orange-400`,
        danger: `bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:bg-rose-400`,
        info: `bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400`,
        light: `bg-white/80 text-black hover:bg-white`,
        dark: `bg-black/80 border border-white/20 text-white hover:bg-black`,
        link: `text-gray-300 hover:text-primary underline-offset-4 hover:underline`,
        "no-color": "",
    }[variant || "primary"];

    // Base classes: Rounded pills, bouncy active states, and crisp typography
    const buttonClasses = cn(
        `group relative inline-flex h-12 md:h-14 items-center justify-center overflow-hidden rounded-full px-8 text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-500 ease-out hover:-translate-y-1 active:scale-95 outline-none`,
        variantClasses,
        className
    );

    // DRY: Extracting the inner content so we don't repeat it 3 times
    const innerContent = (
        <>
            {/* Futuristic Sweeping Glare Effect (replaces the old circle fill) */}
            {variant !== "link" && variant !== "no-color" && (
                <span className="absolute top-0 left-[-100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-30deg] transition-all duration-700 ease-in-out group-hover:left-[100%] z-0"></span>
            )}
            
            {/* The actual text, safely kept above the background effects */}
            <span className="relative z-10 flex items-center gap-2 w-full justify-center">
                {children}
            </span>
        </>
    );

    if (as === "link") {
        const { target, href, ...linkRest } = rest;

        if (target === "_blank") {
            return (
                <a
                    className={buttonClasses}
                    href={href || "#"}
                    target="_blank"
                    rel="noreferrer noopener"
                    {...linkRest}
                >
                    {innerContent}
                </a>
            );
        }

        return (
            <Link className={buttonClasses} href={href || "/"} {...linkRest}>
                {innerContent}
            </Link>
        );
    } 
    
    // Default to a standard button element
    return (
        <button className={buttonClasses} {...rest}>
            {innerContent}
        </button>
    );
}