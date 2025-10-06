import { BaseRepository } from './BaseRepository';
import { ProfileRepository } from './ProfileRepository';
import { Database } from '../lib/database.types';

type Education = Database['public']['Tables']['education']['Row'];
type Experience = Database['public']['Tables']['experience']['Row'];
type Skill = Database['public']['Tables']['skills']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type Certification = Database['public']['Tables']['certifications']['Row'];

export class EducationRepository extends BaseRepository<Education> {
  constructor() {
    super('education');
  }
}

export class ExperienceRepository extends BaseRepository<Experience> {
  constructor() {
    super('experience');
  }
}

export class SkillRepository extends BaseRepository<Skill> {
  constructor() {
    super('skills');
  }
}

export class ProjectRepository extends BaseRepository<Project> {
  constructor() {
    super('projects');
  }
}

export class CertificationRepository extends BaseRepository<Certification> {
  constructor() {
    super('certifications');
  }
}

export const repositories = {
  profile: new ProfileRepository(),
  education: new EducationRepository(),
  experience: new ExperienceRepository(),
  skill: new SkillRepository(),
  project: new ProjectRepository(),
  certification: new CertificationRepository(),
};
