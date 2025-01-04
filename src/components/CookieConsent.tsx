import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [functional, setFunctional] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setOpen(true);
    }
  }, []);

  const handleSave = () => {
    const preferences = {
      analytics,
      functional,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setOpen(false);
    toast({
      title: "Preferences saved",
      description: "Your cookie preferences have been updated.",
    });

    // Here you would typically initialize/disable analytics based on preferences
    console.log("Cookie preferences saved:", preferences);
  };

  const handleAcceptAll = () => {
    setAnalytics(true);
    setFunctional(true);
    handleSave();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            We use cookies to enhance your browsing experience and analyze our traffic. Please
            choose your preferences below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="functional"
              checked={functional}
              onCheckedChange={(checked) => setFunctional(checked as boolean)}
            />
            <label
              htmlFor="functional"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Functional Cookies
              <p className="text-sm text-muted-foreground mt-1">
                Essential for the website to function properly.
              </p>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="analytics"
              checked={analytics}
              onCheckedChange={(checked) => setAnalytics(checked as boolean)}
            />
            <label
              htmlFor="analytics"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Analytics Cookies
              <p className="text-sm text-muted-foreground mt-1">
                Help us understand how visitors interact with our website.
              </p>
            </label>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => handleSave()}>
            Save Preferences
          </Button>
          <Button onClick={handleAcceptAll}>Accept All</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};