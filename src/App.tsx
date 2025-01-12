import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { CookieConsent } from "@/components/CookieConsent";
import { SocialProofPopup } from "@/components/SocialProofPopup";
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

const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
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