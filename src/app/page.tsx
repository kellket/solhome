import Calculator from "@/components/Calculator";
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <HeroSlider />

      <Calculator />

      <AboutSection />

      <ServicesSection />

      <ProjectsSection />
    </>
  );
}
