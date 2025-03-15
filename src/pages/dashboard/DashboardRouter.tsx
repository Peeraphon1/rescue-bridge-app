
import React from "react";
import { useAuth } from "@/lib/auth";
import VictimDashboard from "./VictimDashboard";
import OrganizationDashboard from "./OrganizationDashboard";
import RescuerDashboard from "./RescuerDashboard";
import AdminDashboard from "./AdminDashboard";
import { Loader2 } from "lucide-react";

const DashboardRouter = () => {
  const { profile, isLoading } = useAuth();

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
      <div className="text-center py-10">
        <p>Profile information not available. Please try again later.</p>
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
