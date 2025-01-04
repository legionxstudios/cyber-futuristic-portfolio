import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-cyberdark flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyberpink to-cybercyan">
          Welcome Back
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#ff1493',
                  brandAccent: '#d10f7c',
                }
              }
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};