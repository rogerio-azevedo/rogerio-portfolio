import { NextResponse } from 'next/server'
import { clearAllKnowledge, getKnowledgeStats } from '@/lib/vector-store'

export async function POST() {
  try {
    // Obter estatísticas antes da limpeza
    const statsBefore = await getKnowledgeStats()
    console.log('📊 Stats antes da limpeza:', statsBefore)

    // Limpar toda a base de conhecimento
    await clearAllKnowledge()

    // Verificar estatísticas após a limpeza
    const statsAfter = await getKnowledgeStats()

    return NextResponse.json({
      success: true,
      message:
        'Base de conhecimento completamente limpa! Pronta para novos dados.',
      statsBefore,
      statsAfter,
      entriesRemoved: statsBefore.totalEntries - statsAfter.totalEntries,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
