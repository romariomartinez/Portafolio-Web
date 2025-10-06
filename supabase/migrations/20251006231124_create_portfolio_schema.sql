/*
  # Create Portfolio Management Schema

  ## Overview
  This migration creates the complete database schema for a personal portfolio website with admin management capabilities.

  ## New Tables
  
  ### 1. `profiles`
  Stores user profile information including photo
  - `id` (uuid, primary key) - Links to auth.users
  - `full_name` (text) - Full name
  - `title_es` (text) - Professional title in Spanish
  - `title_en` (text) - Professional title in English
  - `bio_es` (text) - Biography in Spanish
  - `bio_en` (text) - Biography in English
  - `photo_url` (text) - Profile photo URL
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone
  - `location` (text) - Location
  - `linkedin` (text) - LinkedIn URL
  - `github` (text) - GitHub URL
  - `website` (text) - Personal website
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `education`
  Stores educational background
  - `id` (uuid, primary key)
  - `institution_es` (text) - Institution name in Spanish
  - `institution_en` (text) - Institution name in English
  - `degree_es` (text) - Degree name in Spanish
  - `degree_en` (text) - Degree name in English
  - `description_es` (text) - Description in Spanish
  - `description_en` (text) - Description in English
  - `start_date` (text) - Start date
  - `end_date` (text) - End date
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. `experience`
  Stores work experience
  - `id` (uuid, primary key)
  - `company_es` (text) - Company name in Spanish
  - `company_en` (text) - Company name in English
  - `position_es` (text) - Position in Spanish
  - `position_en` (text) - Position in English
  - `description_es` (text) - Description in Spanish
  - `description_en` (text) - Description in English
  - `start_date` (text) - Start date
  - `end_date` (text) - End date
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 4. `skills`
  Stores professional skills
  - `id` (uuid, primary key)
  - `name_es` (text) - Skill name in Spanish
  - `name_en` (text) - Skill name in English
  - `category_es` (text) - Category in Spanish
  - `category_en` (text) - Category in English
  - `level` (integer) - Proficiency level (1-100)
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. `projects`
  Stores portfolio projects
  - `id` (uuid, primary key)
  - `name_es` (text) - Project name in Spanish
  - `name_en` (text) - Project name in English
  - `description_es` (text) - Description in Spanish
  - `description_en` (text) - Description in English
  - `technologies` (text[]) - Array of technologies used
  - `image_url` (text) - Project image URL
  - `demo_url` (text) - Live demo URL
  - `repo_url` (text) - Repository URL
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. `certifications`
  Stores certifications and courses
  - `id` (uuid, primary key)
  - `name_es` (text) - Certification name in Spanish
  - `name_en` (text) - Certification name in English
  - `issuer_es` (text) - Issuer in Spanish
  - `issuer_en` (text) - Issuer in English
  - `date` (text) - Issue date
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public can read all data
  - Only authenticated users can insert/update/delete
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT '',
  title_es text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  bio_es text NOT NULL DEFAULT '',
  bio_en text NOT NULL DEFAULT '',
  photo_url text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  location text DEFAULT '',
  linkedin text DEFAULT '',
  github text DEFAULT '',
  website text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_es text NOT NULL DEFAULT '',
  institution_en text NOT NULL DEFAULT '',
  degree_es text NOT NULL DEFAULT '',
  degree_en text NOT NULL DEFAULT '',
  description_es text DEFAULT '',
  description_en text DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_es text NOT NULL DEFAULT '',
  company_en text NOT NULL DEFAULT '',
  position_es text NOT NULL DEFAULT '',
  position_en text NOT NULL DEFAULT '',
  description_es text DEFAULT '',
  description_en text DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es text NOT NULL DEFAULT '',
  name_en text NOT NULL DEFAULT '',
  category_es text NOT NULL DEFAULT '',
  category_en text NOT NULL DEFAULT '',
  level integer DEFAULT 50,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es text NOT NULL DEFAULT '',
  name_en text NOT NULL DEFAULT '',
  description_es text DEFAULT '',
  description_en text DEFAULT '',
  technologies text[] DEFAULT '{}',
  image_url text DEFAULT '',
  demo_url text DEFAULT '',
  repo_url text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_es text NOT NULL DEFAULT '',
  name_en text NOT NULL DEFAULT '',
  issuer_es text DEFAULT '',
  issuer_en text DEFAULT '',
  date text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public can read profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert profiles"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete profiles"
  ON profiles FOR DELETE
  TO authenticated
  USING (true);

-- Education policies
CREATE POLICY "Public can read education"
  ON education FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update education"
  ON education FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete education"
  ON education FOR DELETE
  TO authenticated
  USING (true);

-- Experience policies
CREATE POLICY "Public can read experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert experience"
  ON experience FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experience"
  ON experience FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experience"
  ON experience FOR DELETE
  TO authenticated
  USING (true);

-- Skills policies
CREATE POLICY "Public can read skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies
CREATE POLICY "Public can read projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Certifications policies
CREATE POLICY "Public can read certifications"
  ON certifications FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert certifications"
  ON certifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update certifications"
  ON certifications FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete certifications"
  ON certifications FOR DELETE
  TO authenticated
  USING (true);