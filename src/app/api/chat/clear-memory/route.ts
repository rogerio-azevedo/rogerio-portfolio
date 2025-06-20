import { NextRequest, NextResponse } from 'next/server'
import { clearSessionMemory } from '@/lib/supabase-vector'

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId || typeof sessionId !== 'string') {
      return NextResponse.json(
        { error: 'Session ID é obrigatório' },
        { status: 400 },
      )
    }

    // Limpa a memória vetorial da sessão
    clearSessionMemory(sessionId)

    return NextResponse.json({
      success: true,
      message: 'Memória da sessão limpa com sucesso',
      sessionId,
    })
  } catch (error) {
    console.error('Erro ao limpar memória da sessão:', error)

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        message: 'Falha ao limpar memória da sessão',
      },
      { status: 500 },
    )
  }
}
