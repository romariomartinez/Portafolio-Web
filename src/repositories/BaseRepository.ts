import { supabase } from '../lib/supabase';

// Cache simple en memoria con TTL
interface CacheItem {
  data: unknown;
  timestamp: number;
}

const cache: Map<string, CacheItem> = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos en milisegundos

function getCacheKey(tableName: string, id?: string): string {
  return id ? `${tableName}:${id}` : tableName;
}

function isCacheValid(key: string): boolean {
  const item = cache.get(key);
  if (!item) return false;
  return Date.now() - item.timestamp < CACHE_TTL;
}

function setCache(data: unknown, tableName: string, id?: string): void {
  const key = getCacheKey(tableName, id);
  cache.set(key, { data, timestamp: Date.now() });
}

function getCache(tableName: string, id?: string): unknown | null {
  const key = getCacheKey(tableName, id);
  if (isCacheValid(key)) {
    return cache.get(key)?.data ?? null;
  }
  return null;
}

function invalidateCache(tableName: string, id?: string): void {
  const key = getCacheKey(tableName, id);
  cache.delete(key);
}

export abstract class BaseRepository<T> {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async getAll(forceRefresh = false): Promise<T[]> {
    // Verificar que Supabase esté configurado
    if (!supabase) {
      console.warn('Supabase no configurado');
      return [];
    }

    // Verificar cache primero
    if (!forceRefresh) {
      const cachedData = getCache(this.tableName);
      if (cachedData) {
        return cachedData as T[];
      }
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    
    // Guardar en cache
    setCache(data as T[], this.tableName);
    
    return data as T[];
  }

  async getById(id: string, forceRefresh = false): Promise<T | null> {
    // Verificar que Supabase esté configurado
    if (!supabase) {
      console.warn('Supabase no configurado');
      return null;
    }

    // Verificar cache primero
    if (!forceRefresh) {
      const cachedData = getCache(this.tableName, id);
      if (cachedData) {
        return cachedData as T;
      }
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    
    // Guardar en cache
    setCache(data as T, this.tableName, id);
    
    return data as T | null;
  }

  async create(item: Partial<T>): Promise<T> {
    if (!supabase) {
      throw new Error('Supabase no configurado');
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .insert(item as never)
      .select()
      .single();

    if (error) throw error;
    
    // Invalidar cache
    invalidateCache(this.tableName);
    
    return data as T;
  }

  async update(id: string, item: Partial<T>): Promise<T> {
    if (!supabase) {
      throw new Error('Supabase no configurado');
    }

    const { data, error } = await supabase
      .from(this.tableName)
      .update({ ...item, updated_at: new Date().toISOString() } as never)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    // Invalidar cache
    invalidateCache(this.tableName);
    invalidateCache(this.tableName, id);
    
    return data as T;
  }

  async delete(id: string): Promise<void> {
    if (!supabase) {
      throw new Error('Supabase no configurado');
    }

    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Invalidar cache
    invalidateCache(this.tableName);
    invalidateCache(this.tableName, id);
  }

  // Método para limpiar todo el cache
  static clearCache(): void {
    cache.clear();
  }
}
