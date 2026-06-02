"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, MessageSquare } from "lucide-react";
import { useRef } from "react";

import SectionTitle from "@/components/SectionTitle";
import { reviewsData } from "@/data/reviews";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const avatarGradients = [
  "from-primary to-orange-400",
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-purple-500 to-violet-400",
  "from-rose-500 to-pink-400",
  "from-amber-500 to-yellow-400",
  "from-indigo-500 to-blue-400",
  "from-teal-500 to-emerald-400",
];

const ReviewCard = ({ review, index }) => {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="review-card group relative flex flex-col rounded-2xl sm:rounded-3xl border border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-xl p-5 sm:p-6 md:p-7 overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-[#0a0a0f] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] min-h-[280px]">
      {/* Background glow */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        style={{ background: `rgba(${index % 2 === 0 ? '216,78,44' : '59,130,246'},0.08)` }}
      />

      {/* Quote icon */}
      <div className="absolute top-4 right-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500">
        <Quote size={60} className="text-white" />
      </div>

      {/* Shimmer on hover */}
      <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-15deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none z-[1]" />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4 relative z-10">
        {[...Array(review.rating)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className="text-amber-400 fill-amber-400"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-sm sm:text-[15px] text-white/50 group-hover:text-white/70 leading-relaxed mb-6 transition-colors duration-500 flex-1 relative z-10">
        "{review.review}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 mt-auto relative z-10">
        {/* Avatar */}
        <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg group-hover:scale-105 transition-transform duration-500`}>
          {initials}
        </div>
        <div>
          <p className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-white transition-colors duration-300">
            {review.name}
          </p>
          <p className="text-[11px] sm:text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300 tracking-wide">
            {review.role}
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent ${
        index % 4 === 0 ? 'via-primary' :
        index % 4 === 1 ? 'via-blue-500' :
        index % 4 === 2 ? 'via-emerald-500' :
        'via-purple-500'
      } to-transparent group-hover:w-3/4 transition-all duration-700 ease-out`} />
    </div>
  );
};

export default function Reviews() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Section title animation
      gsap.fromTo(
        ".reviews-section-title",
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

      // Cards staggered reveal
      const cards = gsap.utils.toArray(".review-card");
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
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Floating orbs
      gsap.to(".review-glow-1", {
        y: -25, x: 15, scale: 1.15, opacity: 0.5,
        duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
      gsap.to(".review-glow-2", {
        y: 20, x: -10, scale: 0.9, opacity: 0.3,
        duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      id="reviews"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="review-glow-1 absolute top-[15%] right-[10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-primary/[0.06] rounded-full blur-[120px]" />
        <div className="review-glow-2 absolute bottom-[15%] left-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-indigo-500/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16"></div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Title */}
        <div className="reviews-section-title">
          <SectionTitle
            title="CLIENT REVIEWS"
            icon={<MessageSquare size={22} className="text-primary animate-pulse" />}
          />
        </div>

        {/* Counter badge */}
        <div className="reviews-section-title flex items-center gap-4 mb-12 md:mb-16">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 via-primary/30 to-transparent" />
          <span className="text-[11px] font-bold tracking-[0.3em] text-white/40 uppercase px-5 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            {reviewsData.length} Satisfied Clients
          </span>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-primary/20 via-primary/30 to-transparent" />
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {reviewsData.map((review, index) => (
            <ReviewCard
              key={review._id}
              review={review}
              index={index}
            />
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="reviews-section-title mt-14 text-center">
          <div className="inline-block rounded-full border border-white/[0.05] bg-white/[0.02] px-6 py-2.5 backdrop-blur-sm">
            <p className="gradient-text-primary text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Trusted by clients across India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
