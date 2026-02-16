/* eslint-disable @typescript-eslint/no-explicit-any */

import OpenAI from 'openai'
import { getNeonClient } from './neon-db'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

let isDbAvailable = false

// Fallback: armazenamento em memória
const sessionMemories = new Map<string, ConversationEntry[]>()

interface ConversationEntry {
  id: string
  userMessage: string
  assistantResponse: string
  timestamp: string
}

/** Formata array de números como string para tipo vector do pgvector */
function formatVector(embedding: number[]): string {
  return '[' + embedding.join(',') + ']'
}

/** Inicializa e testa conexão com o banco de dados */
export async function initVectorStore() {
  const sql = getNeonClient()
  if (!sql) {
    console.log('⚠️ DATABASE_URL não configurada')
    return null
  }

  if (isDbAvailable) return sql

  try {
    await sql`SELECT 1`
    isDbAvailable = true
    console.log('✅ Vector store (Neon) inicializado com sucesso')
    return sql
  } catch (error) {
    console.error('❌ Vector store não disponível:', error)
    console.log('🔄 Usando armazenamento em memória como fallback')
    isDbAvailable = false
    return null
  }
}

/** Compatibilidade: alias para initVectorStore (usado por list-knowledge) */
export const initSupabase = initVectorStore

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  if (magnitudeA === 0 || magnitudeB === 0) return 0
  return dotProduct / (magnitudeA * magnitudeB)
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })
    return response.data[0].embedding
  } catch {
    return []
  }
}

export async function storeConversation(
  sessionId: string,
  userMessage: string,
  assistantResponse: string,
): Promise<void> {
  try {
    const conversationText = `Pergunta: ${userMessage}\nResposta: ${assistantResponse}`
    const conversationId = `${sessionId}_${Date.now()}`

    const embedding = await generateEmbedding(conversationText)
    if (embedding.length === 0) return

    const sql = await initVectorStore()
    if (sql) {
      try {
        const vectorStr = formatVector(embedding)
        const createdAt = new Date().toISOString()
        await sql`
          INSERT INTO conversations (id, session_id, user_message, assistant_response, embedding, created_at)
          VALUES (
            ${conversationId},
            ${sessionId},
            ${userMessage},
            ${assistantResponse},
            ${vectorStr}::vector(1536),
            ${createdAt}::timestamptz
          )
        `
        return
      } catch {
        isDbAvailable = false
      }
    }

    const entry: ConversationEntry & { embedding: number[] } = {
      id: conversationId,
      userMessage,
      assistantResponse,
      timestamp: new Date().toISOString(),
      embedding,
    }
    if (!sessionMemories.has(sessionId)) {
      sessionMemories.set(sessionId, [])
    }
    const sessionMemory = sessionMemories.get(sessionId)!
    sessionMemory.push(entry)
    if (sessionMemory.length > 50) sessionMemory.shift()
  } catch {
    // Silently fail
  }
}

export async function findSimilarConversations(
  sessionId: string,
  currentMessage: string,
  threshold: number = 0.5,
  maxResults: number = 3,
): Promise<ConversationEntry[]> {
  try {
    const currentEmbedding = await generateEmbedding(currentMessage)
    if (currentEmbedding.length === 0) return []

    const sql = await initVectorStore()
    if (sql) {
      try {
        const vectorStr = formatVector(currentEmbedding)
        const rows = await sql`
          SELECT id, user_message, assistant_response, created_at
          FROM find_similar_conversations(
            ${sessionId},
            ${vectorStr}::vector(1536),
            ${threshold},
            ${maxResults}
          )
        `
        const rowsArray = Array.isArray(rows) ? rows : []
        if (rowsArray.length > 0) {
          return rowsArray.map((row: any) => ({
            id: row.id,
            userMessage: row.user_message,
            assistantResponse: row.assistant_response,
            timestamp: row.created_at,
          }))
        }
      } catch {
        isDbAvailable = false
      }
    }

    const sessionMemory = sessionMemories.get(sessionId)
    if (!sessionMemory?.length) return []

    const similarities = sessionMemory.map((entry: any) => ({
      entry,
      similarity: cosineSimilarity(currentEmbedding, entry.embedding),
    }))
    return similarities
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)
      .map(item => ({
        id: item.entry.id,
        userMessage: item.entry.userMessage,
        assistantResponse: item.entry.assistantResponse,
        timestamp: item.entry.timestamp,
      }))
  } catch {
    return []
  }
}

export function createContextFromSimilarConversations(
  similarConversations: ConversationEntry[],
): string {
  if (similarConversations.length === 0) return ''

  let context =
    '\n\nCONTEXTO DE CONVERSAS ANTERIORES (evite repetir exatamente as mesmas informações):\n'
  similarConversations.forEach((conv, index) => {
    context += `\n${index + 1}. PERGUNTA ANTERIOR: "${conv.userMessage}"\n`
    context += `   RESPOSTA DADA: "${conv.assistantResponse}"\n`
  })
  context +=
    '\nIMPORTANTE: Use essas conversas como contexto, mas dê uma perspectiva diferente, detalhes complementares ou informações novas sobre o mesmo assunto.\n'
  return context
}

export async function clearSessionMemory(sessionId: string): Promise<void> {
  try {
    const sql = await initVectorStore()
    if (sql) {
      try {
        await sql`DELETE FROM conversations WHERE session_id = ${sessionId}`
      } catch {
        // Ignore
      }
    }
    sessionMemories.delete(sessionId)
  } catch {
    // Ignore
  }
}

export function getMemoryStats(): {
  totalSessions: number
  totalConversations: number
  supabaseAvailable: boolean
} {
  const totalSessions = sessionMemories.size
  const totalConversations = Array.from(sessionMemories.values()).reduce(
    (sum, sessions) => sum + sessions.length,
    0,
  )
  return {
    totalSessions,
    totalConversations,
    supabaseAvailable: isDbAvailable,
  }
}

// ============== KNOWLEDGE BASE ==============

const knowledgeMemories = new Map<string, KnowledgeEntry[]>()

interface KnowledgeEntry {
  id: string
  content: string
  metadata?: string
  timestamp: string
  embedding?: number[]
}

export async function addMemory(
  content: string,
  metadata?: string,
): Promise<void> {
  try {
    const memoryId = `knowledge_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

    const embedding = await generateEmbedding(content)
    if (embedding.length === 0) throw new Error('Falha ao gerar embedding')

    const sql = await initVectorStore()
    if (sql) {
      try {
        const vectorStr = formatVector(embedding)
        const createdAt = new Date().toISOString()
        await sql`
          INSERT INTO knowledge_base (id, content, metadata, embedding, created_at)
          VALUES (
            ${memoryId},
            ${content},
            ${metadata || null},
            ${vectorStr}::vector(1536),
            ${createdAt}::timestamptz
          )
        `
        return
      } catch {
        isDbAvailable = false
      }
    }

    const entry: KnowledgeEntry = {
      id: memoryId,
      content,
      metadata,
      timestamp: new Date().toISOString(),
      embedding,
    }
    if (!knowledgeMemories.has('general')) {
      knowledgeMemories.set('general', [])
    }
    const memories = knowledgeMemories.get('general')!
    memories.push(entry)
    if (memories.length > 100) memories.shift()
  } catch (error) {
    throw error
  }
}

export async function searchMemories(
  query: string,
  maxResults: number = 5,
  threshold: number = 0.6,
): Promise<KnowledgeEntry[]> {
  try {
    const queryEmbedding = await generateEmbedding(query)
    if (queryEmbedding.length === 0) return []

    const sql = await initVectorStore()
    if (sql) {
      try {
        const vectorStr = formatVector(queryEmbedding)
        const rows = await sql`
          SELECT id, content, metadata, created_at
          FROM find_similar_knowledge(
            ${vectorStr}::vector(1536),
            ${threshold},
            ${maxResults}
          )
        `
        const searchRows = Array.isArray(rows) ? rows : []
        if (searchRows.length > 0) {
          return searchRows.map((row: any) => ({
            id: row.id,
            content: row.content,
            metadata: row.metadata,
            timestamp: row.created_at,
          }))
        }
      } catch (error) {
        console.error('❌ Erro ao buscar conhecimento:', error)
      }
    }

    const memories = knowledgeMemories.get('general')
    if (!memories?.length) return []

    const similarities = memories.map(entry => ({
      entry,
      similarity: entry.embedding
        ? cosineSimilarity(queryEmbedding, entry.embedding)
        : 0,
    }))
    return similarities
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)
      .map(item => ({
        id: item.entry.id,
        content: item.entry.content,
        metadata: item.entry.metadata,
        timestamp: item.entry.timestamp,
      }))
  } catch {
    return []
  }
}

export async function clearAllKnowledge(): Promise<void> {
  try {
    const sql = await initVectorStore()
    if (sql) {
      try {
        await sql`DELETE FROM knowledge_base`
      } catch {
        // Ignore
      }
    }
    knowledgeMemories.clear()
  } catch (error) {
    throw error
  }
}

export async function getKnowledgeStats(): Promise<{
  totalEntries: number
  totalCategories: number
  supabaseAvailable: boolean
}> {
  try {
    const sql = await initVectorStore()
    if (sql) {
      try {
        const rows = await sql`SELECT * FROM get_knowledge_stats()`
        const statsRows = Array.isArray(rows) ? rows : []
        if (statsRows.length > 0 && statsRows[0]) {
          const row = statsRows[0] as any
          return {
            totalEntries: Number(row.total_entries) || 0,
            totalCategories: Number(row.total_categories) || 0,
            supabaseAvailable: true,
          }
        }
        const countRows = await sql`SELECT id FROM knowledge_base`
        const countArray = Array.isArray(countRows) ? countRows : []
        return {
          totalEntries: countArray.length || 0,
          totalCategories: 0,
          supabaseAvailable: true,
        }
      } catch {
        // Fall through to memory
      }
    }

    const memories = knowledgeMemories.get('general') || []
    const categories = new Set(
      memories
        .map(m => {
          try {
            if (m.metadata) {
              const parsed =
                typeof m.metadata === 'string'
                  ? JSON.parse(m.metadata)
                  : m.metadata
              return parsed.categoria
            }
          } catch {
            return 'sem_categoria'
          }
        })
        .filter(Boolean),
    )
    return {
      totalEntries: memories.length,
      totalCategories: categories.size,
      supabaseAvailable: false,
    }
  } catch {
    return {
      totalEntries: 0,
      totalCategories: 0,
      supabaseAvailable: false,
    }
  }
}

/** Lista todos os conhecimentos (para list-knowledge sem query) */
export async function listAllKnowledge(limit: number = 20) {
  const sql = await initVectorStore()
  if (sql) {
    try {
      const rows = await sql`
        SELECT id, content, metadata, created_at
        FROM knowledge_base
        ORDER BY created_at DESC
        LIMIT ${limit}
      `
      const listRows = Array.isArray(rows) ? rows : []
      return listRows.map((row: any) => ({
        id: row.id,
        content: row.content,
        metadata: row.metadata,
        timestamp: row.created_at,
      }))
    } catch {
      // Fall through
    }
  }

  const memories = knowledgeMemories.get('general') || []
  return memories
    .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''))
    .slice(0, limit)
    .map(m => ({
      id: m.id,
      content: m.content,
      metadata: m.metadata,
      timestamp: m.timestamp,
    }))
}
