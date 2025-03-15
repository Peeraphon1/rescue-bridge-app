
import { supabase } from "@/integrations/supabase/client";
import { UserRole } from "@/types/supabase";

export const signIn = async (email: string, password: string, role: UserRole) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Verify that the user has the correct role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      if (profileError.code === "PGRST116") {
        throw new Error("User profile not found. Please contact support.");
      }
      throw profileError;
    }

    if (profile.role !== role) {
      await supabase.auth.signOut();
      throw new Error(`This account is not registered as a ${role}. Please use the correct login.`);
    }

    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string, role: UserRole, name: string) => {
  try {
    // First register the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name,
        },
      },
    });

    if (error) {
      throw error;
    }

    // Manually create a profile for the user
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          role: role,
          name: name,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Even if profile creation fails, we don't want to block the signup
        // The trigger should handle it, this is just a backup
      }
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      if (error.message.includes("Auth session missing")) {
        console.log("No authenticated user");
        return null;
      }
      throw error;
    }
    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentUserProfile = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData.user) {
      throw userError || new Error('No user found');
    }
    
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userData.user.id)
      .maybeSingle();
    
    if (profileError) {
      throw profileError;
    }
    
    if (!profile) {
      throw new Error('Profile not found');
    }
    
    return profile;
  } catch (error) {
    console.error('Error getting current user profile:', error);
    throw error;
  }
};

export const verifyOtp = async (otp: string) => {
  // For demo purposes, any 4-digit OTP is valid
  return otp.length === 4;
};
