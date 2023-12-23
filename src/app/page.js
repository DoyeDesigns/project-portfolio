import HeroSection from '../components/Hero'
import Aboutme from '../components/Aboutme';
import MyPortfolio from '../components/My-portfolio';
import Skills from '../components/Skills';
import ContactMe from '../components/ContactMe';


export default function Home() {
  return (
    <>
      <HeroSection />
      <Aboutme />
      <MyPortfolio />
      <Skills />
      <ContactMe />
    </>
  )
}
