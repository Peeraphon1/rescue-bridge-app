
import { Database } from '@/integrations/supabase/types';

// Custom type definitions that extend the generated Supabase types
export type UserRole = 'victim' | 'organization' | 'rescuer' | 'admin';

export type Profile = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: UserRole;
  organization: string | null;
  created_at: string;
};

export type HelpRequest = {
  id: string;
  user_id: string;
  location_lat: number;
  location_lng: number;
  location_address: string;
  needs_food: boolean;
  needs_water: boolean;
  needs_medicine: boolean;
  needs_other: boolean;
  other_details: string | null;
  people_count: number;
  details: string | null;
  status: 'pending' | 'reserved' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
};

export type Organization = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  representative_name: string;
  representative_position: string;
  is_verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason: string | null;
  created_at: string;
};

export type OrganizationDocument = {
  id: string;
  organization_id: string;
  file_path: string;
  file_name: string;
  created_at: string;
};

export type Team = {
  id: string;
  organization_id: string;
  leader_id: string | null;
  name: string;
  is_active: boolean;
  created_at: string;
};

export type TeamMember = {
  id: string;
  team_id: string;
  user_id: string;
  is_leader: boolean;
  created_at: string;
};

export type Mission = {
  id: string;
  team_id: string;
  status: 'preparing' | 'on_way' | 'arrived' | 'completed';
  start_time: string | null;
  end_time: string | null;
  created_at: string;
};

export type MissionRequest = {
  id: string;
  mission_id: string;
  request_id: string;
  created_at: string;
};

export type MissionStatusUpdate = {
  id: string;
  mission_id: string;
  status: 'preparing' | 'on_way' | 'arrived' | 'completed';
  timestamp: string;
};

export type RequestImage = {
  id: string;
  request_id: string;
  image_url: string;
  created_at: string;
};
