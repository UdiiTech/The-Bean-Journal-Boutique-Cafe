import { OrderProvider } from "./components/Ui/OrderChooser";
import GamosaDivider from "./components/Ui/GamosaDivider";
import TopBar from "./components/Layout/TopBar";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import MobileBar from "./components/Layout/MobileBar";
import Hero from "./components/Sections/Hero";
import About from "./components/Sections/About";
import MenuHighlights from "./components/Sections/MenuHighlights";
import Gallery from "./components/Sections/Gallery";
import Reviews from "./components/Sections/Reviews";
import Reservation from "./components/Sections/Reservation";
import LocationHours from "./components/Sections/LocationHours";

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
