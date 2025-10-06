export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          title_es: string
          title_en: string
          bio_es: string
          bio_en: string
          photo_url: string | null
          email: string | null
          phone: string | null
          location: string | null
          linkedin: string | null
          github: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name?: string
          title_es?: string
          title_en?: string
          bio_es?: string
          bio_en?: string
          photo_url?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          linkedin?: string | null
          github?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          title_es?: string
          title_en?: string
          bio_es?: string
          bio_en?: string
          photo_url?: string | null
          email?: string | null
          phone?: string | null
          location?: string | null
          linkedin?: string | null
          github?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      education: {
        Row: {
          id: string
          institution_es: string
          institution_en: string
          degree_es: string
          degree_en: string
          description_es: string | null
          description_en: string | null
          start_date: string | null
          end_date: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          institution_es?: string
          institution_en?: string
          degree_es?: string
          degree_en?: string
          description_es?: string | null
          description_en?: string | null
          start_date?: string | null
          end_date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          institution_es?: string
          institution_en?: string
          degree_es?: string
          degree_en?: string
          description_es?: string | null
          description_en?: string | null
          start_date?: string | null
          end_date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      experience: {
        Row: {
          id: string
          company_es: string
          company_en: string
          position_es: string
          position_en: string
          description_es: string | null
          description_en: string | null
          start_date: string | null
          end_date: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_es?: string
          company_en?: string
          position_es?: string
          position_en?: string
          description_es?: string | null
          description_en?: string | null
          start_date?: string | null
          end_date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_es?: string
          company_en?: string
          position_es?: string
          position_en?: string
          description_es?: string | null
          description_en?: string | null
          start_date?: string | null
          end_date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name_es: string
          name_en: string
          category_es: string
          category_en: string
          level: number
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_es?: string
          name_en?: string
          category_es?: string
          category_en?: string
          level?: number
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_es?: string
          name_en?: string
          category_es?: string
          category_en?: string
          level?: number
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name_es: string
          name_en: string
          description_es: string | null
          description_en: string | null
          technologies: string[]
          image_url: string | null
          demo_url: string | null
          repo_url: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_es?: string
          name_en?: string
          description_es?: string | null
          description_en?: string | null
          technologies?: string[]
          image_url?: string | null
          demo_url?: string | null
          repo_url?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_es?: string
          name_en?: string
          description_es?: string | null
          description_en?: string | null
          technologies?: string[]
          image_url?: string | null
          demo_url?: string | null
          repo_url?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      certifications: {
        Row: {
          id: string
          name_es: string
          name_en: string
          issuer_es: string | null
          issuer_en: string | null
          date: string | null
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_es?: string
          name_en?: string
          issuer_es?: string | null
          issuer_en?: string | null
          date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_es?: string
          name_en?: string
          issuer_es?: string | null
          issuer_en?: string | null
          date?: string | null
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
