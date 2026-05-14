import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollButton from "@/components/ScrollButton";
import Signature from "@/components/Signature";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

export const metadata = {
  title: "Mann Patel | Full-Stack Developer",
  description: "Full-Stack developer building modern, scalable web applications with clean UI and smooth interactions. This is the personal portfolio of Mann Patel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${josefinSans.variable} relative bg-black text-white antialiased select-none font-sans`}
        style={{ fontFamily: "var(--font-josefin-sans), sans-serif" }}
      >
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
