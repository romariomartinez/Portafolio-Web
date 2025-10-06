import { BaseRepository } from './BaseRepository';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export class ProfileRepository extends BaseRepository<Profile> {
  constructor() {
    super('profiles');
  }

  async getFirst(): Promise<Profile | null> {
    const profiles = await this.getAll();
    return profiles.length > 0 ? profiles[0] : null;
  }
}
