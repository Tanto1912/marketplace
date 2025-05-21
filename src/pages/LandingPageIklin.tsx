import Navbar from "../iklin.online/Navbariklin";
import ProductIklin from "../iklin.online/ProductIklin";
import Hero from "../iklin.online/HeroIklin";
import About from "../iklin.online/AboutIklin";
import Contact from "../iklin.online/Contact";
import Footer from "../iklin.online/FooterIklin";

function LandingPageIklin() {
  return (
    <div>
      <Navbar />
      <Hero />
      <ProductIklin />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPageIklin;
