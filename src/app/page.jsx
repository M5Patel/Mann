"use client";

import Banner from "@/components/Banner";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Experiences from "@/components/Experiences";
import ProjectList from "@/components/ProjectList";
import Achievements from "@/components/Achievements";
import Freelance from "@/components/Freelance";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="w-full">
        <Banner />
        <AboutMe />
        <Skills />
        <Experiences />
        <ProjectList />
         <Freelance />
        <Achievements />
      </div>
    </PageTransition>
  );
}
