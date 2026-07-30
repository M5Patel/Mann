import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { GENERAL_INFO, SOCIAL_LINKS } from "@/lib/data";

export default function Footer() {
    return (
        <footer className="pb-8 pt-16 text-center" id="contact">
            <div className="container mx-auto px-6">
                {/* Contact heading */}
                <p className="text-lg text-white/60 tracking-widest uppercase mb-3">
                    Get In Touch
                </p>

                <a
                    href={`mailto:${GENERAL_INFO.email}`}
                    className="mt-2 mb-8 inline-block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white hover:text-primary transition-colors duration-300 hover:underline underline-offset-4 break-all sm:break-normal"
                >
                    {GENERAL_INFO.email}
                </a>

                {/* Social icons */}
                <div className="flex items-center justify-center gap-6 mb-8">
                    <a
                        href="https://github.com/mp0408"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        aria-label="GitHub"
                    >
                        <Github size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/mann-patel-581539258"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </a>
                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="group flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        aria-label="Email"
                    >
                        <Mail size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </a>
                    <a
                        href={`tel:${GENERAL_INFO.phone}`}
                        className="group flex items-center justify-center h-12 w-12 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                        aria-label="Phone"
                    >
                        <Phone size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </a>
                </div>

                {/* Divider */}
                <div className="h-[1px] w-24 mx-auto bg-white/10 mb-6" />

                {/* Copyright */}
                <p className="text-sm text-white/40">
                    © {new Date().getFullYear()}{" "}
                    <a
                        href="https://github.com/mp0408"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-white/60 hover:text-white hover:underline underline-offset-4 transition-colors"
                    >
                        Mann Patel
                    </a>
                    . All rights reserved.
                </p>
            </div>
        </footer>
    );
}
