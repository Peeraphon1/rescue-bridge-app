import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/supabase";
import { signIn, signUp, signOut, getCurrentUser, getCurrentUserProfile } from "@/services/authService";
import { toast } from "sonner";

type AuthContextType = {
  user: any | null;
  profile: any | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (email: string, password: string, role: UserRole, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async (currentUser: any) => {
    if (currentUser) {
      try {
        const userProfile = await getCurrentUserProfile();
        setProfile(userProfile);
        return userProfile;
      } catch (profileError) {
        console.error("Error fetching user profile:", profileError);
        return null;
      }
    }
    return null;
  };

  const refreshProfile = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const refreshedProfile = await fetchProfile(user);
        if (refreshedProfile) {
          console.log("Profile refreshed successfully:", refreshedProfile);
        } else {
          console.warn("Could not refresh profile - no profile found");
        }
      } catch (error) {
        console.error("Error refreshing profile:", error);
        toast.error("Failed to refresh your profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser);
        }
      } catch (error) {
        console.error("Error checking user session:", error);
        if (error instanceof Error && !error.message.includes("Auth session missing")) {
          toast.error("Authentication error. Please try logging in again.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const data = await signIn(email, password, role);
      setUser(data.user);
      const userProfile = await fetchProfile(data.user);
      
      if (!userProfile) {
        toast.error("Could not load your profile. Please try again.");
        await signOut();
        setUser(null);
        setProfile(null);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role: UserRole, name: string) => {
    setIsLoading(true);
    try {
      const data = await signUp(email, password, role, name);
      setUser(data.user);
      
      try {
        const userProfile = await fetchProfile(data.user);
        if (!userProfile) {
          console.warn("Profile not created during registration, will try again on next page load");
        }
      } catch (profileError) {
        console.error("Error fetching profile after signup:", profileError);
      }
      
      toast.success("Registration successful! Check your email to confirm your account.");
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error instanceof Error ? error.message : "Registration failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      setUser(null);
      setProfile(null);
      navigate("/");
      toast.success("You have been logged out");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp: string) => {
    return otp.length === 4;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        login,
        register,
        logout,
        verifyOtp,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
