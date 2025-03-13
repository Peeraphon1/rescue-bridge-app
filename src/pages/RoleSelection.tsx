
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Building2, Ambulance, UserCircle } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/auth/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 max-w-md mx-auto w-full p-6 bg-white">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Flood Relief</h1>
          <p className="text-gray-600">Select your role:</p>
        </div>

        <div className="space-y-4">
          <button
            className="role-button"
            onClick={() => handleRoleSelect("victim")}
          >
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <span>Flood Victim</span>
          </button>

          <button
            className="role-button"
            onClick={() => handleRoleSelect("organization")}
          >
            <Building2 className="w-6 h-6 text-blue-500" />
            <span>Relief Organization</span>
          </button>

          <button
            className="role-button"
            onClick={() => handleRoleSelect("rescuer")}
          >
            <Ambulance className="w-6 h-6 text-green-500" />
            <span>Rescue Volunteer</span>
          </button>

          <button
            className="role-button"
            onClick={() => handleRoleSelect("admin")}
          >
            <UserCircle className="w-6 h-6 text-purple-500" />
            <span>Administrator</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
