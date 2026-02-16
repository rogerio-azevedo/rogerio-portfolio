/**
 * Cliente Neon para conexão serverless com PostgreSQL.
 * Usado pelo vector-store para operações de banco de dados.
 */

import { neon } from '@neondatabase/serverless'

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_PRISMA_URL

let sql: ReturnType<typeof neon> | null = null

export function getNeonClient() {
  if (!connectionString) {
    return null
  }
  if (!sql) {
    sql = neon(connectionString)
  }
  return sql
}

export function isNeonAvailable(): boolean {
  return !!connectionString
}
