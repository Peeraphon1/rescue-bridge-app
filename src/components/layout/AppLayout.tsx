
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import BottomNavigation from "./BottomNavigation";
import { Loader2 } from "lucide-react";

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pb-16 bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        <main className="p-4">
          <Outlet />
        </main>
        <BottomNavigation />
      </div>
    </div>
  );
};

export default AppLayout;
