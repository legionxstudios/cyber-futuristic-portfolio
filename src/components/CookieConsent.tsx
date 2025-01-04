import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react";

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
      <div className="container relative flex flex-col sm:flex-row items-center justify-between gap-4 py-4 text-center sm:text-left">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -top-2 -right-2 sm:top-4 sm:right-4"
          onClick={() => setShow(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
        <p className="text-sm text-muted-foreground pr-12">
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