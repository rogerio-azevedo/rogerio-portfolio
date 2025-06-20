/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
// Usa Service Role Key para operações no servidor (APIs)
// Usa Anon Key para operações no frontend (se necessário)
const supabaseKey =
  typeof window === 'undefined'
    ? process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      ''
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let supabase: any = null
let isSupabaseAvailable = false

// Fallback: armazenamento em memória (igual ao anterior)
const sessionMemories = new Map<string, ConversationEntry[]>()

interface ConversationEntry {
  id: string
  userMessage: string
  assistantResponse: string
  timestamp: string
}

// Função para inicializar Supabase
export async function initSupabase() {
  if (supabase) return supabase

  try {
    if (!supabaseUrl || !supabaseKey) {
      console.log('⚠️ Variáveis de ambiente do Supabase não configuradas')
      console.log('DEBUG - URL:', supabaseUrl ? 'OK' : 'MISSING')
      console.log('DEBUG - KEY:', supabaseKey ? 'OK' : 'MISSING')
      isSupabaseAvailable = false
      return null
    }

    supabase = createClient(supabaseUrl, supabaseKey)

    // Testa conexão básica
    const { data, error } = await supabase
      .from('conversations')
      .select('count')
      .single()

    if (
      error &&
      !error.message.includes('relation "conversations" does not exist')
    ) {
      throw error
    }

    isSupabaseAvailable = true
    console.log('✅ Supabase inicializado com sucesso')

    // Cria tabela se não existir
    await createTableIfNotExists()

    return supabase
  } catch (error) {
    console.error('❌ Supabase não disponível:', error)
    console.log('🔄 Usando armazenamento em memória como fallback')
    isSupabaseAvailable = false
    return null
  }
}

// Função para criar tabela de conversas com suporte a vetores
async function createTableIfNotExists() {
  if (!supabase) return

  try {
    // SQL para criar tabela com extensão pgvector
    const { error } = await supabase.rpc('create_conversations_table', {})

    if (error && !error.message.includes('already exists')) {
      console.error('❌ Erro ao criar tabela:', error)
    } else {
      console.log('✅ Tabela de conversas verificada/criada')
    }
  } catch (error) {
    console.error('❌ Erro ao verificar tabela:', error)
  }
}

// Função para calcular similaridade de cosseno (fallback)
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))

  if (magnitudeA === 0 || magnitudeB === 0) return 0
  return dotProduct / (magnitudeA * magnitudeB)
}

// Função para gerar embedding de um texto
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })

    return response.data[0].embedding
  } catch (error) {
    return []
  }
}

// Função para armazenar uma conversa na memória vetorial
export async function storeConversation(
  sessionId: string,
  userMessage: string,
  assistantResponse: string,
): Promise<void> {
  try {
    const conversationText = `Pergunta: ${userMessage}\nResposta: ${assistantResponse}`
    const conversationId = `${sessionId}_${Date.now()}`

    // Gera embedding primeiro
    const embedding = await generateEmbedding(conversationText)
    if (embedding.length === 0) {
      return
    }

    // Tenta usar Supabase primeiro
    if (isSupabaseAvailable) {
      const supabaseClient = await initSupabase()

      if (supabaseClient) {
        try {
          const { error } = await supabaseClient.from('conversations').insert({
            id: conversationId,
            session_id: sessionId,
            user_message: userMessage,
            assistant_response: assistantResponse,
            embedding: embedding,
            created_at: new Date().toISOString(),
          })

          if (error) throw error

          return
        } catch (error) {
          isSupabaseAvailable = false // Desabilita para próximas tentativas
        }
      }
    }

    // Fallback: armazenamento em memória
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

    // Limita a 50 conversas por sessão
    if (sessionMemory.length > 50) {
      sessionMemory.shift()
    }
  } catch (error) {}
}

// Função para buscar conversas similares
export async function findSimilarConversations(
  sessionId: string,
  currentMessage: string,
  threshold: number = 0.5,
  maxResults: number = 3,
): Promise<ConversationEntry[]> {
  try {
    // Gera embedding da mensagem atual
    const currentEmbedding = await generateEmbedding(currentMessage)
    if (currentEmbedding.length === 0) {
      return []
    }

    // Tenta usar Supabase primeiro
    if (isSupabaseAvailable) {
      const supabaseClient = await initSupabase()

      if (supabaseClient) {
        try {
          // Busca por similaridade usando pgvector
          const { data, error } = await supabaseClient.rpc(
            'find_similar_conversations',
            {
              session_id: sessionId,
              query_embedding: currentEmbedding,
              similarity_threshold: threshold,
              match_count: maxResults,
            },
          )

          if (error) throw error

          if (data && data.length > 0) {
            const conversations: ConversationEntry[] = data.map((row: any) => ({
              id: row.id,
              userMessage: row.user_message,
              assistantResponse: row.assistant_response,
              timestamp: row.created_at,
            }))

            return conversations
          }
        } catch (error) {
          isSupabaseAvailable = false // Desabilita para próximas tentativas
        }
      }
    }

    // Fallback: busca em memória
    const sessionMemory = sessionMemories.get(sessionId)
    if (!sessionMemory || sessionMemory.length === 0) {
      return []
    }

    const similarities = sessionMemory.map((entry: any) => ({
      entry,
      similarity: cosineSimilarity(currentEmbedding, entry.embedding),
    }))

    const relevantConversations = similarities
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)
      .map(item => ({
        id: item.entry.id,
        userMessage: item.entry.userMessage,
        assistantResponse: item.entry.assistantResponse,
        timestamp: item.entry.timestamp,
      }))

    return relevantConversations
  } catch (error) {
    return []
  }
}

// Função para criar contexto baseado em conversas similares
export function createContextFromSimilarConversations(
  similarConversations: ConversationEntry[],
): string {
  if (similarConversations.length === 0) {
    return ''
  }

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

// Função para limpar memória da sessão
export async function clearSessionMemory(sessionId: string): Promise<void> {
  try {
    // Limpa Supabase
    if (isSupabaseAvailable) {
      const supabaseClient = await initSupabase()
      if (supabaseClient) {
        try {
          const { error } = await supabaseClient
            .from('conversations')
            .delete()
            .eq('session_id', sessionId)

          if (error) throw error
        } catch (error) {}
      }
    }

    // Limpa memória (fallback)
    sessionMemories.delete(sessionId)
  } catch (error) {}
}

// Função para obter estatísticas da memória
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
    supabaseAvailable: isSupabaseAvailable,
  }
}

// ============== FUNÇÕES PARA KNOWLEDGE BASE GERAL ==============

// Armazenamento em memória para knowledge base (fallback)
const knowledgeMemories = new Map<string, KnowledgeEntry[]>()

interface KnowledgeEntry {
  id: string
  content: string
  metadata?: string
  timestamp: string
  embedding?: number[]
}

// Função para adicionar conhecimento à base
export async function addMemory(
  content: string,
  metadata?: string,
): Promise<void> {
  try {
    const memoryId = `knowledge_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Gera embedding primeiro
    const embedding = await generateEmbedding(content)
    if (embedding.length === 0) {
      throw new Error('Falha ao gerar embedding')
    }

    // Tenta usar Supabase primeiro
    let supabaseSuccess = false

    try {
      const supabaseClient = await initSupabase()

      if (supabaseClient) {
        // Força criação da tabela de knowledge se não existir
        await createKnowledgeTableIfNotExists()

        const insertData = {
          id: memoryId,
          content: content,
          metadata: metadata || null,
          embedding: embedding,
          created_at: new Date().toISOString(),
        }

        console.log('📝 DEBUG - Dados a inserir:', {
          id: insertData.id,
          contentLength: insertData.content.length,
          hasMetadata: !!insertData.metadata,
          embeddingLength: insertData.embedding.length,
        })

        const { error } = await supabaseClient
          .from('knowledge_base')
          .insert(insertData)

        if (error) {
          throw error
        }

        supabaseSuccess = true
        return
      } else {
      }
    } catch (error) {
      // Não retorna aqui, vai para o fallback
    }

    // Fallback: armazenamento em memória
    if (!supabaseSuccess) {
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

      // Limita a 100 entradas de conhecimento em memória
      if (memories.length > 100) {
        memories.shift()
      }
    }
  } catch (error) {
    throw error // Re-throw para que a rota detecte o erro
  }
}

// Função para buscar conhecimentos similares
export async function searchMemories(
  query: string,
  maxResults: number = 5,
  threshold: number = 0.6,
): Promise<KnowledgeEntry[]> {
  try {
    console.log(
      '🔍 Buscando conhecimentos para:',
      query.substring(0, 50) + '...',
    )

    // Gera embedding da query
    const queryEmbedding = await generateEmbedding(query)
    if (queryEmbedding.length === 0) {
      console.log('❌ Falha ao gerar embedding para busca de conhecimento')
      return []
    }

    // Força tentativa com Supabase sempre (ignora estado isSupabaseAvailable)
    const supabaseClient = await initSupabase()

    if (supabaseClient) {
      try {
        // Busca por similaridade usando pgvector
        const { data, error } = await supabaseClient.rpc(
          'find_similar_knowledge',
          {
            query_embedding: queryEmbedding,
            similarity_threshold: threshold,
            match_count: maxResults,
          },
        )

        if (error) throw error

        if (data && data.length > 0) {
          const knowledge: KnowledgeEntry[] = data.map((row: any) => ({
            id: row.id,
            content: row.content,
            metadata: row.metadata,
            timestamp: row.created_at,
          }))

          console.log(
            '✅ Conhecimentos encontrados no Supabase:',
            knowledge.length,
          )
          return knowledge
        } else {
          console.log('📭 Nenhum conhecimento encontrado no Supabase')
        }
      } catch (error) {
        console.error('❌ Erro ao buscar conhecimento no Supabase:', error)
      }
    }

    // Fallback: busca em memória
    const memories = knowledgeMemories.get('general')
    if (!memories || memories.length === 0) {
      console.log('📭 Nenhum conhecimento em memória')
      return []
    }

    console.log('📚 Conhecimentos em memória:', memories.length)

    const similarities = memories.map(entry => ({
      entry,
      similarity: entry.embedding
        ? cosineSimilarity(queryEmbedding, entry.embedding)
        : 0,
    }))

    const relevantKnowledge = similarities
      .filter(item => item.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxResults)
      .map(item => ({
        id: item.entry.id,
        content: item.entry.content,
        metadata: item.entry.metadata,
        timestamp: item.entry.timestamp,
      }))

    console.log(
      '✅ Conhecimentos relevantes (fallback):',
      relevantKnowledge.length,
    )
    return relevantKnowledge
  } catch (error) {
    console.error('❌ Erro ao buscar conhecimentos similares:', error)
    return []
  }
}

// Função para criar tabela de knowledge base se não existir
async function createKnowledgeTableIfNotExists() {
  if (!supabase) {
    return
  }

  try {
    // Primeiro tenta chamar a função RPC
    const { error } = await supabase.rpc('create_knowledge_table', {})

    if (error) {
      // Se a função não existe, tenta criar a tabela diretamente
      if (
        error.message.includes('function') &&
        error.message.includes('does not exist')
      ) {
        // Testa se a tabela existe fazendo uma query simples
        const { data, error: testError } = await supabase
          .from('knowledge_base')
          .select('count')
          .single()

        if (testError) {
          throw new Error(
            'Tabela knowledge_base não está configurada no Supabase',
          )
        } else {
        }
      } else {
        throw error
      }
    } else {
    }
  } catch (error) {
    throw error
  }
}

// Função para limpar toda a base de conhecimento
export async function clearAllKnowledge(): Promise<void> {
  try {
    // Força inicialização e limpeza do Supabase primeiro
    try {
      const supabaseClient = await initSupabase()
      if (supabaseClient) {
        const { error } = await supabaseClient
          .from('knowledge_base')
          .delete()
          .neq('id', 'never_match_this_id') // Condição que sempre será true para deletar tudo

        if (error) {
          throw error
        }
      } else {
      }
    } catch (error) {
      // Não retorna aqui, continua para limpar a memória também
    }

    // Limpa memória (fallback)
    knowledgeMemories.clear()
  } catch (error) {
    throw error
  }
}

// Função para obter estatísticas da base de conhecimento
export async function getKnowledgeStats(): Promise<{
  totalEntries: number
  totalCategories: number
  supabaseAvailable: boolean
}> {
  try {
    // Força inicialização e tenta obter stats do Supabase primeiro
    try {
      const supabaseClient = await initSupabase()
      if (supabaseClient) {
        // Tenta usar a função RPC se existir
        const { data, error } = await supabaseClient.rpc('get_knowledge_stats')

        if (!error && data && data.length > 0) {
          return {
            totalEntries: parseInt(data[0].total_entries) || 0,
            totalCategories: parseInt(data[0].total_categories) || 0,
            supabaseAvailable: true,
          }
        }

        // Se a função RPC não funcionar, faz uma query direta
        if (
          error &&
          error.message.includes('function') &&
          error.message.includes('does not exist')
        ) {
          const { data: countData, error: countError } = await supabaseClient
            .from('knowledge_base')
            .select('id')

          if (!countError && countData) {
            return {
              totalEntries: countData.length,
              totalCategories: 0, // Não conseguimos calcular categorias sem a função RPC
              supabaseAvailable: true,
            }
          }
        }
      }
    } catch (error) {}

    // Fallback: stats da memória
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
          } catch {}
          return 'sem_categoria'
        })
        .filter(Boolean),
    )

    return {
      totalEntries: memories.length,
      totalCategories: categories.size,
      supabaseAvailable: false,
    }
  } catch (error) {
    return {
      totalEntries: 0,
      totalCategories: 0,
      supabaseAvailable: false,
    }
  }
}
