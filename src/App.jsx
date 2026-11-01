import { OrderProvider } from "./Components/UI/OrderChooser";
import GamosaDivider from "./Components/UI/GamosaDivider";
import TopBar from "./Components/Layout/TopBar";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import MobileBar from "./Components/Layout/MobileBar";
import Hero from "./Components/Sections/Hero";
import About from "./Components/Sections/About";
import MenuHighlights from "./Components/Sections/MenuHighlights";
import Gallery from "./Components/Sections/Gallery";
import Reviews from "./Components/Sections/Reviews";
import Reservation from "./Components/Sections/Reservation";
import LocationHours from "./Components/Sections/LocationHours";

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
