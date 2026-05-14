import Banner from "@/components/Banner";
import AboutMe from "@/components/AboutMe";
import Skills from "@/components/Skills";
import Experiences from "@/components/Experiences";
import ProjectList from "@/components/ProjectList";

export default function Home() {
    return (
        <div className="container px-8 md:px-0">
            <Banner />
            <AboutMe />
            <Skills />
            <Experiences />
            <ProjectList />
        </div>
    );
}
