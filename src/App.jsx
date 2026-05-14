import { ReactLenis } from "lenis/react";
import { Routes, Route } from "react-router-dom";

import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import ParticleBackground from "@/components/ParticleBackground";
import Preloader from "@/components/Preloader";
import ScrollButton from "@/components/ScrollButton";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import Signature from "@/components/Signature";
import Home from "@/pages/Home";
import ProjectPage from "@/pages/ProjectPage";
import NotFound from "@/pages/NotFound";

function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen flex-col">
                <main className="relative flex-1">{children}</main>
                <Footer />
            </div>
            <ScrollProgressIndicator />
            <Preloader />
            <Cursor />
            <ParticleBackground />
            <div className="relative mx-auto max-w-[1600px]">
                <div className="right-6 bottom-6 hidden xl:absolute xl:block">
                    <ScrollButton scrollToTop />
                </div>
            </div>
            <Signature />
        </>
    );
}

export default function App() {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.4,
            }}
        >
            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <PageTransition>
                                    <Home />
                                </PageTransition>
                            </Layout>
                        }
                    />
                    <Route
                        path="/projects/:id"
                        element={
                            <Layout>
                                <PageTransition>
                                    <ProjectPage />
                                </PageTransition>
                            </Layout>
                        }
                    />
                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </main>
        </ReactLenis>
    );
}
