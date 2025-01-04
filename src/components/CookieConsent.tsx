import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const CookieConsent = () => {
  const [show, setShow] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    const preferences = {
      analytics: true,
      functional: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShow(false);
    toast({
      title: "Preferences saved",
      description: "Your cookie preferences have been saved.",
    });

    // Here you would typically initialize analytics
    console.log("Cookie preferences saved:", preferences);
  };

  const handleDecline = () => {
    const preferences = {
      analytics: false,
      functional: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setShow(false);
    toast({
      title: "Preferences saved",
      description: "Your cookie preferences have been saved.",
    });
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-center sm:text-left">
        <p className="text-sm text-muted-foreground">
          We use cookies to enhance your browsing experience and analyze site traffic.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Decline
          </Button>
          <Button size="sm" onClick={handleAccept}>
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};