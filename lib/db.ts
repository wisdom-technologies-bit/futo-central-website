import { Pool } from 'pg'

let pool: Pool | null = null

export function getDatabase() {
  if (!process.env.DATABASE_URL) return null
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, max: 5, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined })
  return pool
}

export async function withDatabase<T>(work: (db: Pool) => Promise<T>) {
  const db = getDatabase()
  if (!db) throw new Error('DATABASE_NOT_CONFIGURED')
  return work(db)
}
