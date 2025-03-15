export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      help_requests: {
        Row: {
          created_at: string
          details: string | null
          id: string
          location_address: string
          location_lat: number
          location_lng: number
          needs_food: boolean | null
          needs_medicine: boolean | null
          needs_other: boolean | null
          needs_water: boolean | null
          other_details: string | null
          people_count: number
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          location_address: string
          location_lat: number
          location_lng: number
          needs_food?: boolean | null
          needs_medicine?: boolean | null
          needs_other?: boolean | null
          needs_water?: boolean | null
          other_details?: string | null
          people_count: number
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          location_address?: string
          location_lat?: number
          location_lng?: number
          needs_food?: boolean | null
          needs_medicine?: boolean | null
          needs_other?: boolean | null
          needs_water?: boolean | null
          other_details?: string | null
          people_count?: number
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "help_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_requests: {
        Row: {
          created_at: string
          id: string
          mission_id: string
          request_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mission_id: string
          request_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mission_id?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_requests_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mission_requests_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_status_updates: {
        Row: {
          id: string
          mission_id: string
          status: string
          timestamp: string
        }
        Insert: {
          id?: string
          mission_id: string
          status: string
          timestamp?: string
        }
        Update: {
          id?: string
          mission_id?: string
          status?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "mission_status_updates_mission_id_fkey"
            columns: ["mission_id"]
            isOneToOne: false
            referencedRelation: "missions"
            referencedColumns: ["id"]
          },
        ]
      }
      missions: {
        Row: {
          created_at: string
          end_time: string | null
          id: string
          start_time: string | null
          status: string
          team_id: string
        }
        Insert: {
          created_at?: string
          end_time?: string | null
          id?: string
          start_time?: string | null
          status?: string
          team_id: string
        }
        Update: {
          created_at?: string
          end_time?: string | null
          id?: string
          start_time?: string | null
          status?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "missions_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_documents: {
        Row: {
          created_at: string
          file_name: string
          file_path: string
          id: string
          organization_id: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          organization_id: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string
          created_at: string
          email: string
          id: string
          is_verified: boolean | null
          name: string
          phone: string
          rejection_reason: string | null
          representative_name: string
          representative_position: string
          status: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          id?: string
          is_verified?: boolean | null
          name: string
          phone: string
          rejection_reason?: string | null
          representative_name: string
          representative_position: string
          status?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string
          rejection_reason?: string | null
          representative_name?: string
          representative_position?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organizations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string | null
          organization: string | null
          phone: string | null
          role: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          name?: string | null
          organization?: string | null
          phone?: string | null
          role: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string | null
          organization?: string | null
          phone?: string | null
          role?: string
        }
        Relationships: []
      }
      request_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          request_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          request_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "request_images_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "help_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string
          id: string
          is_leader: boolean | null
          team_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_leader?: boolean | null
          team_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_leader?: boolean | null
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          leader_id: string | null
          name: string
          organization_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          leader_id?: string | null
          name: string
          organization_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          leader_id?: string | null
          name?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_leader_id_fkey"
            columns: ["leader_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
