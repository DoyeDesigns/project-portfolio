// import Image from 'next/image'
import Navbar from './components/Navbar'
import HeroSection from './components/Hero'
import Aboutme from './components/Aboutme';
import MyPortfolio from './components/My-portfolio';
import Skills from './components/Skills';
import ContactMe from './components/ContactMe';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Aboutme />
      <MyPortfolio />
      <Skills />
      <ContactMe />
      <Footer />
    </>
  )
}
