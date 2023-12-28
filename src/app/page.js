import HeroSection from '../components/Hero'
import Aboutme from '../components/Aboutme';
import MyPortfolio from '../components/My-portfolio';
import Skills from '../components/Skills';
import ContactMe from '../components/ContactMe';
import FeaturedProjects from '../components/FeaturedProjects'


export default function Home() {
  return (
    <>
      <HeroSection />
      <Aboutme />
      <FeaturedProjects />
      <Skills />
      <MyPortfolio />
      <ContactMe />
    </>
  )
}
