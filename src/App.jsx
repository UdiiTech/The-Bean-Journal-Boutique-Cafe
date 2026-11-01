import { OrderProvider } from "./components/ui/OrderChooser";
import GamosaDivider from "./components/ui/GamosaDivider";
import TopBar from "./components/layout/TopBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileBar from "./components/layout/MobileBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import MenuHighlights from "./components/sections/MenuHighlights";
import Gallery from "./components/sections/Gallery";
import Reviews from "./components/sections/Reviews";
import Reservation from "./components/sections/Reservation";
import LocationHours from "./components/sections/LocationHours";

export default function App() {
  return (
    <OrderProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <TopBar />
      <Header />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <GamosaDivider />
        <About />
        <MenuHighlights />
        <Gallery />
        <Reviews />
        <Reservation />
        <GamosaDivider />
        <LocationHours />
      </main>

      <Footer />
      <MobileBar />
    </OrderProvider>
  );
}
