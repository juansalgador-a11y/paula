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
      date_requests: {
        Row: {
          created_at: string | null
          food_choice: string | null
          id: string
          meeting_date: string
          spotify_link: string | null
          time_choice: string | null
          wants_date: boolean
        }
        Insert: {
          created_at?: string | null
          food_choice?: string | null
          id?: string
          meeting_date: string
          spotify_link?: string | null
          time_choice?: string | null
          wants_date: boolean
        }
        Update: {
          created_at?: string | null
          food_choice?: string | null
          id?: string
          meeting_date?: string
          spotify_link?: string | null
          time_choice?: string | null
          wants_date?: boolean
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
