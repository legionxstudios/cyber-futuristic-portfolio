import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CookieConsent } from "@/components/CookieConsent";
import { SocialProofPopup } from "@/components/SocialProofPopup";
import { useEffect } from "react";
import Index from "./pages/Index";
import CaseStudy from "./pages/CaseStudy";
import CaseStudies from "./pages/CaseStudies";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import MetaImage from "./pages/MetaImage";
import Sitemap from "@/components/Sitemap";

const queryClient = new QueryClient();

// Route change tracking component
const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Push session_start event on route change
    window.dataLayer.push({
      event: 'session_start',
      page_path: location.pathname + location.search,
      page_title: document.title,
      page_location: window.location.href,
      page_referrer: document.referrer
    });
    
    console.log('Route changed, pushed to dataLayer:', {
      event: 'session_start',
      page_path: location.pathname + location.search,
      page_title: document.title
    });
  }, [location]);

  return null;
};

const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouteTracker />
          <Toaster />
          <Sonner />
          <CookieConsent />
          <SocialProofPopup />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/meta-image" element={<MetaImage />} />
            <Route path="/sitemap.xml" element={<Sitemap />} />
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <Index />
                  <Footer />
                </>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route
              path="/:slug"
              element={
                <>
                  <CaseStudy />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <AuthGuard requireAdmin>
                  <AdminDashboard />
                </AuthGuard>
              }
            />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </BrowserRouter>
);

export default App;