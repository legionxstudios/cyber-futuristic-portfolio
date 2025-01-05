import { Toaster } from "src/components/ui/toaster";
import { Toaster as Sonner } from "src/components/ui/sonner";
import { TooltipProvider } from "src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Navigation } from "src/components/Navigation";
import { Footer } from "src/components/Footer";
import { AuthGuard } from "src/components/auth/AuthGuard";
import { CookieConsent } from "src/components/CookieConsent";
import Index from "./pages/Index";
import CaseStudy from "./pages/CaseStudy";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import MetaImage from "./pages/MetaImage";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CookieConsent />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/meta-image" element={<MetaImage />} />
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