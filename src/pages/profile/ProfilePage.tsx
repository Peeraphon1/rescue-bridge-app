
import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, LogOut, Mail, Phone, User, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ProfilePage = () => {
  const { user, profile, logout, isLoading, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ name, phone })
        .eq("id", user.id);

      if (error) throw error;
      
      await refreshProfile();
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch(role) {
      case "victim":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Victim</Badge>;
      case "organization":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Organization</Badge>;
      case "rescuer":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Rescuer</Badge>;
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Admin</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Unable to load profile information.</p>
        <Button onClick={handleLogout}>Log Out and Try Again</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || "User")}&background=random`} />
              <AvatarFallback>
                <User className="h-8 w-8 text-gray-400" />
              </AvatarFallback>
            </Avatar>
            
            <div>
              <CardTitle>{profile.name || "Anonymous User"}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                {profile.email}
                <span className="ml-2">{getRoleBadge(profile.role)}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="Your phone number"
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center py-2">
                <User className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-gray-700">{profile.name || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center py-2">
                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-gray-700">{profile.email}</p>
                </div>
              </div>
              
              <div className="flex items-center py-2">
                <Phone className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-gray-700">{profile.phone || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center py-2">
                <Shield className="w-5 h-5 text-gray-500 mr-3" />
                <div>
                  <p className="text-sm font-medium">Role</p>
                  <p className="text-gray-700">{profile.role}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between pt-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setName(profile.name || "");
                  setPhone(profile.phone || "");
                }}
              >
                Cancel
              </Button>
              
              <Button 
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
              
              <Button 
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
