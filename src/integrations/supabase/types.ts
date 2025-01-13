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
      business_types: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          budget_efficiency: string | null
          budget_heading: string | null
          business_type: string | null
          challenge: string[] | null
          client: string | null
          cover_image: string | null
          created_at: string | null
          created_by: string | null
          graph_image: string | null
          id: string
          industry: string | null
          is_featured: boolean | null
          key_takeaways: Json | null
          lead_generation: string | null
          leads_heading: string | null
          slug: string
          solution: Json | null
          subtitle: string | null
          title: string
          tools_used: Json | null
          traffic_final: number | null
          traffic_heading: string | null
          traffic_initial: number | null
          unique_visitors: string | null
          updated_at: string | null
          visitors_heading: string | null
        }
        Insert: {
          budget_efficiency?: string | null
          budget_heading?: string | null
          business_type?: string | null
          challenge?: string[] | null
          client?: string | null
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          graph_image?: string | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          key_takeaways?: Json | null
          lead_generation?: string | null
          leads_heading?: string | null
          slug: string
          solution?: Json | null
          subtitle?: string | null
          title: string
          tools_used?: Json | null
          traffic_final?: number | null
          traffic_heading?: string | null
          traffic_initial?: number | null
          unique_visitors?: string | null
          updated_at?: string | null
          visitors_heading?: string | null
        }
        Update: {
          budget_efficiency?: string | null
          budget_heading?: string | null
          business_type?: string | null
          challenge?: string[] | null
          client?: string | null
          cover_image?: string | null
          created_at?: string | null
          created_by?: string | null
          graph_image?: string | null
          id?: string
          industry?: string | null
          is_featured?: boolean | null
          key_takeaways?: Json | null
          lead_generation?: string | null
          leads_heading?: string | null
          slug?: string
          solution?: Json | null
          subtitle?: string | null
          title?: string
          tools_used?: Json | null
          traffic_final?: number | null
          traffic_heading?: string | null
          traffic_initial?: number | null
          unique_visitors?: string | null
          updated_at?: string | null
          visitors_heading?: string | null
        }
        Relationships: []
      }
      homepage_settings: {
        Row: {
          created_at: string | null
          hero_image: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          hero_image?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          hero_image?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          focus: string | null
          icon: string
          id: string
          proficiency: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          focus?: string | null
          icon: string
          id?: string
          proficiency: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          focus?: string | null
          icon?: string
          id?: string
          proficiency?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author: string
          created_at: string | null
          display_order: number | null
          id: string
          linkedin_url: string | null
          quote: string
          relationship: string
          updated_at: string | null
        }
        Insert: {
          author: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          linkedin_url?: string | null
          quote: string
          relationship: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          linkedin_url?: string | null
          quote?: string
          relationship?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      work_experience: {
        Row: {
          company: string
          created_at: string | null
          date_range: string
          description: string[]
          id: string
          location: string
          role: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          date_range: string
          description?: string[]
          id?: string
          location: string
          role: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          date_range?: string
          description?: string[]
          id?: string
          location?: string
          role?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "user"
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
