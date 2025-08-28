import { Toaster } from "../src/components/ui/toaster";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../src/hooks/useCart";
import { LanguageProvider } from "../src/contexts/LanguageContext";
import Index from "../src/pages/index";
import Collections from "./pages/Collections";
import Exclusive from "./pages/Exclusive";
import Contact from "./pages/Contact";
import Product from "./pages/Product2";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import HauteCoture from "./pages/HauteCouture";
import Category from "./pages/Category";
import AboutUs from "./pages/AboutUs";
import FloatingWhatsApp from '../src/components/Floatingwhatsapp';
import { CurrencyProvider } from '../src/contexts/CurrencyProvider';
import { FloatingCurrencySwitch } from "./components/CurrencySwitcher";
import ScrollToTop from './ScrollToTop';
import DesignerIntro from "./components/exper";
import Demo from "./pages/demo";
import Jalabiyas from "./pages/Jalabiyas";
const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CurrencyProvider>
          <LanguageProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/exclusive" element={<Exclusive />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/hautecouture" element={<HauteCoture />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/category/:id" element={<Category />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/jalabiyas" element={<Jalabiyas />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/exper" element={<DesignerIntro />} />
                  <Route path="/demo" element={<Demo />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
            <FloatingWhatsApp
              phoneNumber="YOUR_WHATSAPP_NUMBER"
              message="Custom message here"
              position="bottom-right" />
            <FloatingCurrencySwitch />
          </LanguageProvider>
        </CurrencyProvider>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;