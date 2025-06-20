/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { addMemory, searchMemories } from '@/lib/supabase-vector'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Sistema de categorização e processamento automático
async function processAndCategorizeUpdate(userInput: string) {
  const categorizationPrompt = `
Você é um assistente especializado em categorizar e processar informações pessoais.

Sua tarefa é analisar a informação fornecida pelo usuário e:
1. Identificar a categoria mais apropriada
2. Extrair as informações-chave
3. Reformular de forma estruturada e clara
4. Identificar se é uma atualização, adição ou remoção de informação

CATEGORIAS DISPONÍVEIS:
- informações_pessoais: dados básicos, localização, background
- hobbies_interesses: atividades de lazer, passatempos, entretenimento
- carreira_profissional: trabalho atual, empresas, cargos, responsabilidades
- projetos: projetos pessoais, profissionais, side projects
- habilidades_tecnicas: tecnologias, linguagens, ferramentas, competências
- experiencias: experiências passadas, aprendizados, conquistas
- familia_relacionamentos: família, relacionamentos pessoais
- objetivos_planos: metas futuras, planos, aspirações
- preferencias_gostos: gostos pessoais, preferências, opiniões

FORMATO DE RESPOSTA (JSON):
{
  "categoria": "categoria_identificada",
  "tipo_atualizacao": "adicionar|atualizar|remover",
  "informacao_processada": "informação reformulada de forma clara e estruturada",
  "palavras_chave": ["palavra1", "palavra2", "palavra3"],
  "contexto_adicional": "contexto ou detalhes relevantes se houver"
}

ENTRADA DO USUÁRIO: "${userInput}"

Processe esta informação:`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: categorizationPrompt },
        { role: 'user', content: userInput },
      ],
      temperature: 0.3,
      max_tokens: 500,
    })

    const result = response.choices[0]?.message?.content
    if (!result) throw new Error('Erro na categorização')

    return JSON.parse(result)
  } catch (error) {
    console.error('Erro na categorização:', error)
    throw new Error('Falha ao processar a informação')
  }
}

// Verificar se já existe informação similar para atualizar ou substituir
async function checkExistingInformation(
  categoria: string,
  palavrasChave: string[],
) {
  try {
    const searchQuery = palavrasChave.join(' ')
    const existingMemories = await searchMemories(searchQuery, 3)

    // Filtrar por categoria se possível (pode implementar filtro por metadata depois)
    return existingMemories.filter(
      (memory: any) =>
        memory.content.toLowerCase().includes(categoria.toLowerCase()) ||
        palavrasChave.some(palavra =>
          memory.content.toLowerCase().includes(palavra.toLowerCase()),
        ),
    )
  } catch (error) {
    console.error('Erro ao buscar informações existentes:', error)
    return []
  }
}

// Formatar informação para armazenamento
function formatForStorage(processedInfo: any) {
  const timestamp = new Date().toISOString()

  return {
    content: `[${processedInfo.categoria.toUpperCase()}] ${processedInfo.informacao_processada}`,
    metadata: {
      categoria: processedInfo.categoria,
      tipo_atualizacao: processedInfo.tipo_atualizacao,
      palavras_chave: processedInfo.palavras_chave,
      contexto_adicional: processedInfo.contexto_adicional,
      data_atualizacao: timestamp,
      fonte: 'conversa_natural',
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 },
      )
    }

    console.log('💬 Processando atualização de conhecimento:', message)

    // 1. Categorizar e processar a informação
    const processedInfo = await processAndCategorizeUpdate(message)
    console.log('📂 Informação categorizada:', processedInfo)

    // 2. Verificar informações existentes similares
    const existingInfo = await checkExistingInformation(
      processedInfo.categoria,
      processedInfo.palavras_chave,
    )

    // 3. Formatar para armazenamento
    const formattedInfo = formatForStorage(processedInfo)

    // 4. Armazenar nova informação
    console.log('💾 Tentando armazenar informação formatada:', {
      content: formattedInfo.content.substring(0, 100) + '...',
      metadata:
        JSON.stringify(formattedInfo.metadata).substring(0, 200) + '...',
    })

    await addMemory(
      formattedInfo.content,
      JSON.stringify(formattedInfo.metadata),
    )

    console.log('✅ Informação armazenada com sucesso!')

    // 5. Gerar resposta de confirmação
    const confirmationPrompt = `
Você acabou de receber e processar uma atualização de conhecimento pessoal.

INFORMAÇÃO PROCESSADA:
- Categoria: ${processedInfo.categoria}
- Tipo: ${processedInfo.tipo_atualizacao}
- Conteúdo: ${processedInfo.informacao_processada}
- Palavras-chave: ${processedInfo.palavras_chave.join(', ')}

${
  existingInfo.length > 0
    ? `
INFORMAÇÕES SIMILARES EXISTENTES:
${existingInfo.map((info: any) => `- ${info.content}`).join('\n')}
`
    : 'Nenhuma informação similar encontrada anteriormente.'
}

Responda de forma natural e amigável confirmando que você:
1. Entendeu e categorizou a informação
2. Armazenou na base de conhecimento
3. Usará essa informação nas próximas conversas
4. Se houve conflito com informações anteriores, explique como será tratado

Mantenha a resposta concisa e natural.`

    const confirmationResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: confirmationPrompt },
        {
          role: 'user',
          content: `Confirme o processamento da informação: "${message}"`,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    })

    const confirmation =
      confirmationResponse.choices[0]?.message?.content ||
      'Informação atualizada com sucesso!'

    return NextResponse.json({
      success: true,
      message: confirmation,
      processedInfo: {
        categoria: processedInfo.categoria,
        tipo: processedInfo.tipo_atualizacao,
        conteudo: processedInfo.informacao_processada,
        palavrasChave: processedInfo.palavras_chave,
      },
      existingInfoCount: existingInfo.length,
    })
  } catch (error) {
    console.error('❌ Erro ao atualizar conhecimento:', error)

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 },
    )
  }
}
