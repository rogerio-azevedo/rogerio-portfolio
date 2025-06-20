/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import { searchMemories, initSupabase } from '@/lib/supabase-vector'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = parseInt(searchParams.get('limit') || '20')
    const query = searchParams.get('query') || ''

    console.log('📋 Listando conhecimento:', { category, limit, query })

    let results = []

    if (query) {
      // Se há uma query, faz busca semântica
      results = await searchMemories(query, limit, 0.3)
    } else {
      // Se não há query específica, busca diretamente no Supabase
      try {
        const supabase = await initSupabase()
        if (supabase) {
          const { data, error } = await supabase
            .from('knowledge_base')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit)

          if (error) throw error

          // Formata os dados para o formato esperado
          results = data
            ? data.map((row: any) => ({
                id: row.id,
                content: row.content,
                metadata: row.metadata,
                timestamp: row.created_at,
              }))
            : []
        } else {
          // Fallback para busca semântica se Supabase não disponível
          results = await searchMemories(
            'conhecimento informações dados pessoais profissionais hobbies projetos habilidades',
            limit,
            0.01,
          )
        }
      } catch (error) {
        console.error('Erro ao buscar no Supabase, usando fallback:', error)
        results = await searchMemories(
          'conhecimento informações dados pessoais profissionais hobbies projetos habilidades',
          limit,
          0.01,
        )
      }
    }

    // Processa os resultados para exibição
    const processedResults = results.map((result: any) => {
      let metadata = {}
      try {
        if (result.metadata && typeof result.metadata === 'string') {
          metadata = JSON.parse(result.metadata)
        } else if (result.metadata && typeof result.metadata === 'object') {
          metadata = result.metadata
        }
      } catch (error) {
        console.error('Erro ao processar metadata:', error)
      }

      return {
        id: result.id,
        content: result.content,
        metadata,
        timestamp: result.timestamp,
        category: (metadata as any).categoria || 'sem_categoria',
        type: (metadata as any).tipo_atualizacao || 'unknown',
        keywords: (metadata as any).palavras_chave || [],
        source: (metadata as any).fonte || 'unknown',
      }
    })

    // Filtra por categoria se especificada
    const filteredResults = category
      ? processedResults.filter((item: any) => item.category === category)
      : processedResults

    // Agrupa por categoria para estatísticas
    const categories = filteredResults.reduce((acc: any, item: any) => {
      const cat = item.category
      if (!acc[cat]) {
        acc[cat] = { count: 0, items: [] }
      }
      acc[cat].count++
      acc[cat].items.push(item)
      return acc
    }, {})

    return NextResponse.json({
      success: true,
      total: filteredResults.length,
      results: filteredResults,
      categories,
      categoryStats: Object.entries(categories).map(
        ([name, data]: [string, any]) => ({
          name,
          count: data.count,
          displayName: getCategoryDisplayName(name),
        }),
      ),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  }
}

function getCategoryDisplayName(category: string): string {
  const categoryNames: Record<string, string> = {
    informações_pessoais: '👤 Informações Pessoais',
    hobbies_interesses: '🎮 Hobbies e Interesses',
    carreira_profissional: '💼 Carreira Profissional',
    projetos: '🚀 Projetos',
    habilidades_tecnicas: '⚡ Habilidades Técnicas',
    experiencias: '🎯 Experiências',
    familia_relacionamentos: '👨‍👩‍👧‍👦 Família e Relacionamentos',
    objetivos_planos: '🎯 Objetivos e Planos',
    preferencias_gostos: '❤️ Preferências e Gostos',
    sem_categoria: '❓ Sem Categoria',
  }

  return categoryNames[category] || `📋 ${category}`
}
