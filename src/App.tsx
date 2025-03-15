
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./lib/auth";

// Main pages
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OrganizationRegistrationForm from "./pages/organization/RegistrationForm";
import OrganizationRegistrationPending from "./pages/organization/RegistrationPending";
import RequestHelp from "./pages/victim/RequestHelp";
import RequestDetail from "./pages/victim/RequestDetail";

// Layout
import AppLayout from "./components/layout/AppLayout";
import DashboardRouter from "./pages/dashboard/DashboardRouter";

// Admin pages
import OrganizationDetails from "./pages/admin/OrganizationDetails";

// Team pages
import TeamsPage from "./pages/teams/TeamsPage";

// Organization pages
import RequestDetailList from "./pages/organization/RequestDetailList";

// New pages
import MapPage from "./pages/map/MapPage";
import RequestsListPage from "./pages/requests/RequestsListPage";
import ProfilePage from "./pages/profile/ProfilePage";

// Handle 404
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<RoleSelection />} />
            <Route path="/auth/:role" element={<Login />} />
            <Route path="/auth/:role/register" element={<Register />} />
            
            {/* Organization registration flow */}
            <Route path="/organization/registration" element={<OrganizationRegistrationForm />} />
            <Route path="/organization/pending" element={<OrganizationRegistrationPending />} />
            
            {/* Protected routes */}
            <Route path="/" element={<AppLayout />}>
              <Route path="dashboard" element={<DashboardRouter />} />
              <Route path="request-help" element={<RequestHelp />} />
              <Route path="requests" element={<RequestsListPage />} />
              <Route path="requests/:id" element={<RequestDetail />} />
              <Route path="organization/zones/:zoneId/requests" element={<RequestDetailList />} />
              <Route path="teams" element={<TeamsPage />} />
              <Route path="manage-teams" element={<div>Manage Teams</div>} />
              <Route path="teams/:id" element={<div>Team Detail</div>} />
              <Route path="team-members" element={<div>Team Members</div>} />
              <Route path="missions/:id" element={<div>Mission Detail</div>} />
              <Route path="map" element={<MapPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="notifications" element={<div>Notifications</div>} />
              
              {/* Admin routes */}
              <Route path="admin/organizations" element={<div>All Organizations</div>} />
              <Route path="admin/organizations/:id/details" element={<OrganizationDetails />} />
              <Route path="admin/organizations/:id/approve" element={<div>Approve Organization</div>} />
              <Route path="admin/organizations/:id/reject" element={<div>Reject Organization</div>} />
              <Route path="admin/statistics" element={<div>Statistics</div>} />
            </Route>
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
