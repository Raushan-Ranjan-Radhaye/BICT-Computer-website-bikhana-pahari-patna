import Career from "./components/Career";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Typing from "./components/Typing";
import Enquiry from "./components/Enquiry";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Courses />
        <Features />
        <Typing />
        <Career />
        <Enquiry />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
