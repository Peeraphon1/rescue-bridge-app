
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

const DashboardRouter = () => {
  const { profile, isLoading, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !profile && user) {
      toast.error("Could not load your profile. Please try logging in again.");
    }
  }, [isLoading, profile, user]);

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
        <div className="flex justify-center gap-3">
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
