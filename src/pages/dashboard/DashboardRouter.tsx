
import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import VictimDashboard from "./VictimDashboard";
import OrganizationDashboard from "./OrganizationDashboard";
import RescuerDashboard from "./RescuerDashboard";
import AdminDashboard from "./AdminDashboard";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const DashboardRouter = () => {
  const { profile, isLoading, user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !profile && user) {
      // Try to refresh the profile one more time
      refreshProfile();
      
      // Show a more helpful error message
      toast.error("Could not load your profile. We'll try to refresh it for you.");
    }
  }, [isLoading, profile, user, refreshProfile]);

  // Add a helper function to create profile if missing
  const createMissingProfile = async () => {
    if (!user) return;
    
    try {
      toast.loading("Attempting to create your profile...");
      
      // Get user metadata to determine role
      const { data: userData } = await supabase.auth.getUser();
      const role = userData?.user?.user_metadata?.role || 'victim';
      const name = userData?.user?.user_metadata?.name || 'User';
      
      // Create profile
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          role: role,
          name: name,
        });
        
      if (error) throw error;
      
      // Refresh profile after creation
      await refreshProfile();
      toast.success("Profile created successfully!");
      
      // Wait a moment then redirect to dashboard
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error("Failed to create profile. Please try logging out and in again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-10 px-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Profile Not Available</h2>
        <p className="text-gray-600 mb-6">
          We couldn't load your profile information. This might be due to an authentication issue.
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Button variant="default" onClick={createMissingProfile}>
            Create My Profile
          </Button>
          <div className="flex justify-center gap-3 mt-3">
            <Button variant="outline" onClick={() => navigate("/")}>
              Go Home
            </Button>
            <Button 
              variant="default"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              Log Out & Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  switch (profile.role) {
    case "victim":
      return <VictimDashboard />;
    case "organization":
      return <OrganizationDashboard />;
    case "rescuer":
      return <RescuerDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <VictimDashboard />;
  }
};

export default DashboardRouter;
