import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

// Dados estáticos básicos agora vêm da base de conhecimento
import {
  storeConversation,
  findSimilarConversations,
  createContextFromSimilarConversations,
} from '@/lib/supabase-vector'
// Token estimator removido - usamos prompt direto agora

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

// Função para buscar configurações do sistema da base de conhecimento
async function getSystemConfig(): Promise<{
  systemPrompt: string
  offTopicResponse: string
  noDataResponse: string
  curiosities: string[]
}> {
  try {
    const { searchMemories } = await import('@/lib/supabase-vector')
    const results = await searchMemories(
      'SISTEMA_PROMPTS configurações assistente',
      1,
      0.3,
    )

    if (results.length > 0) {
      // Parse das configurações da base de conhecimento
      return {
        systemPrompt: `Você é o assistente do Rogerio Azevedo. 

REGRAS CRÍTICAS:
1. RESPOSTA MEGA CURTA: Máximo 1-2 frases
2. UM ASSUNTO SÓ: Fale de 1 hobby/projeto específico
3. TOM CASUAL: WhatsApp style com emojis
4. TERMINE SEMPRE: Frases completas, nunca corte
5. USE SÓ OS DADOS: Nunca invente nada

FOCO: "Vender" o Rogerio destacando seus projetos e habilidades.

Use APENAS as informações fornecidas. Se não souber, redirecione.`,

        offTopicResponse: `Desculpe, eu sou o assistente do Rogerio e sei apenas sobre fatos relacionados a ele e sua carreira. 

Quer saber uma curiosidade? 🤔`,

        noDataResponse: `Não tenho essa informação específica sobre o Rogerio na minha base de conhecimento. 

Posso te contar sobre sua carreira profissional, projetos ou tecnologias. O que gostaria de saber? 🤔`,

        curiosities: [
          'Rogerio é um desenvolvedor full-stack experiente com foco em React, TypeScript e Node.js!',
          'Ele tem experiência em liderança técnica e comunicação com executivos C-level!',
          'Rogerio já trabalhou em diversos projetos interessantes - quer saber mais sobre algum específico?',
          'Além de programador, ele tem hobbies interessantes - posso contar mais se você perguntar!',
        ],
      }
    }

    // Fallback para valores padrão se não encontrar na base
    throw new Error('Configurações não encontradas na base')
  } catch (error) {
    console.error('❌ Erro ao buscar configurações, usando fallback:', error)

    // Fallback com configurações básicas
    return {
      systemPrompt: `Você é o assistente do Rogerio Azevedo. Use apenas as informações fornecidas.`,
      offTopicResponse: `Desculpe, eu sou o assistente do Rogerio e sei apenas sobre fatos relacionados a ele.`,
      noDataResponse: `Não tenho essa informação sobre o Rogerio.`,
      curiosities: ['Rogerio é um desenvolvedor experiente!'],
    }
  }
}

// Função para verificar se a pergunta é relevante usando busca semântica
async function isQueryRelevantToRogerio(query: string): Promise<boolean> {
  try {
    const { searchMemories } = await import('@/lib/supabase-vector')

    // Busca na base de conhecimento incluindo as categorias
    const results = await searchMemories(query, 3, 0.4)

    // Se encontrou algum resultado, considera relevante
    if (results.length > 0) {
      console.log(
        '✅ Query considerada relevante - encontrados:',
        results.length,
        'resultados',
      )
      return true
    }

    // Palavras-chave básicas como fallback para casos onde a busca vetorial falha
    const basicKeywords = [
      'rogerio',
      'rogério',
      'azevedo',
      'você',
      'vc',
      'voce',
    ]
    const lowerQuery = query.toLowerCase().trim()

    const hasBasicKeyword = basicKeywords.some(keyword =>
      lowerQuery.includes(keyword),
    )

    if (hasBasicKeyword) {
      console.log(
        '✅ Query considerada relevante - contém palavra-chave básica',
      )
      return true
    }

    console.log('❌ Query não considerada relevante')
    return false
  } catch (error) {
    console.error('❌ Erro ao verificar relevância:', error)

    // Fallback para palavras-chave básicas em caso de erro
    const basicKeywords = [
      'rogerio',
      'rogério',
      'azevedo',
      'você',
      'vc',
      'voce',
    ]
    const lowerQuery = query.toLowerCase().trim()

    return basicKeywords.some(keyword => lowerQuery.includes(keyword))
  }
}

// Função para buscar informações relevantes da base vetorial
async function getRelevantKnowledge(query: string): Promise<string> {
  try {
    const { searchMemories } = await import('@/lib/supabase-vector')

    console.log('🔍 Buscando conhecimento para query:', query)

    // Busca conhecimentos similares na base vetorial com threshold otimizado
    const relevantKnowledge = await searchMemories(query, 5, 0.3)

    console.log('📚 Conhecimentos encontrados:', relevantKnowledge.length)

    if (relevantKnowledge.length === 0) {
      console.log(
        '⚠️ Nenhum conhecimento encontrado, tentando threshold mais baixo...',
      )

      // Tenta com threshold ainda menor
      const fallbackKnowledge = await searchMemories(query, 5, 0.1)
      console.log(
        '🔄 Fallback encontrou:',
        fallbackKnowledge.length,
        'resultados',
      )

      if (fallbackKnowledge.length === 0) {
        return ''
      }

      // Usa os resultados do fallback
      let formattedKnowledge = '\n\nCONHECIMENTO RELEVANTE (fallback):\n'
      fallbackKnowledge.forEach((knowledge, index) => {
        formattedKnowledge += `${index + 1}. ${knowledge.content}\n`
      })

      return formattedKnowledge
    }

    // Formata os conhecimentos encontrados
    let formattedKnowledge = '\n\nCONHECIMENTO RELEVANTE:\n'
    relevantKnowledge.forEach((knowledge, index) => {
      formattedKnowledge += `${index + 1}. ${knowledge.content}\n`
    })

    console.log('✅ Conhecimento formatado e incluído no prompt')

    return formattedKnowledge
  } catch (error) {
    console.error('Erro ao buscar conhecimento relevante:', error)
    return ''
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      sessionId = 'default', // ID da sessão para memória vetorial
    } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 },
      )
    }

    // 🔒 COMANDO SECRETO: Detectar se é uma atualização de conhecimento
    if (
      message.toLowerCase().startsWith('/update ') ||
      message.toLowerCase().startsWith('/atualizar ') ||
      message.toLowerCase().includes('quero atualizar meu conhecimento') ||
      message.toLowerCase().includes('preciso te contar algo')
    ) {
      console.log('🔑 Comando secreto detectado - atualizando conhecimento')

      // Remove o comando da mensagem se existir
      const cleanMessage = message
        .replace(/^\/update\s+/i, '')
        .replace(/^\/atualizar\s+/i, '')
        .replace(/quero atualizar meu conhecimento:?\s*/i, '')
        .replace(/preciso te contar algo:?\s*/i, '')
        .trim()

      try {
        // Usa a mesma funcionalidade do endpoint de update-knowledge
        const { addMemory } = await import('@/lib/supabase-vector')

        // Processo similar ao endpoint de update-knowledge
        const processAndCategorizeUpdate = async (userInput: string) => {
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

          const response = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 500,
            temperature: 0.3,
            messages: [{ role: 'user', content: categorizationPrompt }],
          })

          const result = response.content[0]
          if (result.type !== 'text') throw new Error('Erro na categorização')

          return JSON.parse(result.text)
        }

        // Processar a informação
        const processedInfo = await processAndCategorizeUpdate(cleanMessage)

        // Formatar para armazenamento
        const formattedInfo = {
          content: `[${processedInfo.categoria.toUpperCase()}] ${processedInfo.informacao_processada}`,
          metadata: {
            categoria: processedInfo.categoria,
            tipo_atualizacao: processedInfo.tipo_atualizacao,
            palavras_chave: processedInfo.palavras_chave,
            contexto_adicional: processedInfo.contexto_adicional,
            data_atualizacao: new Date().toISOString(),
            fonte: 'chat_secreto',
          },
        }

        // Armazenar no banco vetorial
        await addMemory(
          formattedInfo.content,
          JSON.stringify(formattedInfo.metadata),
        )

        // Retorna resposta especial para atualização de conhecimento
        return NextResponse.json({
          message: `✅ **Conhecimento atualizado via chat!**\n\n📂 **Categoria:** ${processedInfo.categoria}\n🔄 **Tipo:** ${processedInfo.tipo_atualizacao}\n📝 **Processado:** ${processedInfo.informacao_processada}\n🏷️ **Tags:** ${processedInfo.palavras_chave.join(', ')}\n\n*Agora posso usar essa informação nas próximas conversas!* 😊`,
          timestamp: new Date().toISOString(),
          isKnowledgeUpdate: true,
          processedInfo: {
            categoria: processedInfo.categoria,
            tipo: processedInfo.tipo_atualizacao,
            conteudo: processedInfo.informacao_processada,
            palavrasChave: processedInfo.palavras_chave,
          },
        })
      } catch (error) {
        console.error('Erro ao processar atualização de conhecimento:', error)
        return NextResponse.json({
          message: `❌ Erro ao atualizar conhecimento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          timestamp: new Date().toISOString(),
        })
      }
    }

    // VALIDAÇÃO: Verifica se a pergunta é relevante para o Rogerio usando busca semântica
    const isRelevant = await isQueryRelevantToRogerio(message)
    if (!isRelevant) {
      // Busca configurações e seleciona uma curiosidade aleatória
      const config = await getSystemConfig()
      const randomCuriosity =
        config.curiosities[
          Math.floor(Math.random() * config.curiosities.length)
        ]

      return NextResponse.json({
        message: `${config.offTopicResponse}\n\n${randomCuriosity}`,
        timestamp: new Date().toISOString(),
        isOffTopic: true,
      })
    }

    // Busca conversas similares na memória vetorial
    const similarConversations = await findSimilarConversations(
      sessionId,
      message,
    )

    console.log('🔍 DEBUG - Conversas similares:', {
      sessionId,
      message,
      similarConversationsCount: similarConversations.length,
      conversations: similarConversations.map(c => ({
        userMessage: c.userMessage,
        assistantResponse: c.assistantResponse.substring(0, 100) + '...',
      })),
    })

    // Cria contexto baseado em conversas similares
    const vectorContext =
      createContextFromSimilarConversations(similarConversations)

    console.log(
      '🧠 DEBUG - Contexto vetorial:',
      vectorContext.substring(0, 200) + '...',
    )

    // Busca informações relevantes da base vetorial
    const relevantKnowledge = await getRelevantKnowledge(message)

    // Log para verificar os dados incluídos no prompt
    console.log(
      '🔍 Dados incluídos no prompt:',
      relevantKnowledge.length > 0
        ? `${relevantKnowledge.substring(0, 200)}...`
        : 'Nenhum conhecimento encontrado',
    )

    // MESMA ESTRATÉGIA DO TESTE: dar espaço suficiente para completar naturalmente
    const targetTokens = 100 // Tokens que queremos
    const maxTokens = 200 // Espaço generoso para evitar truncamento

    // Busca configurações do sistema
    const config = await getSystemConfig()

    // Cria o prompt do sistema simplificado
    const systemPrompt = `⚠️ ATENÇÃO: ZERO INVENÇÃO PERMITIDA ⚠️

REGRAS ABSOLUTAS:
1. SOMENTE use informações que estão literalmente escritas abaixo
2. Se os dados não mencionam algo específico, diga "Não tenho essa informação"  
3. PROIBIDO inventar: hobbies, atividades, características pessoais
4. Máximo ${targetTokens} tokens - seja direto e conciso
5. SEMPRE termine frases adequadamente

DADOS REAIS SOBRE ROGERIO (USE APENAS ISTO):

${config.systemPrompt}${vectorContext}

INFORMAÇÕES SOBRE ROGERIO AZEVEDO:${relevantKnowledge}`

    console.log(
      '🎯 Prompt final com controle de tamanho:',
      systemPrompt.substring(0, 300) + '...',
    )

    // Adiciona instrução de concisão à pergunta do usuário
    const enhancedMessage = `${message}\n\nresponda de forma sucinta com um parágrafo apenas.`

    console.log('🎯 Mensagem com instrução de concisão:', enhancedMessage)

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: maxTokens,
      temperature: 0.5, // MENOS CRIATIVO PARA EVITAR INVENÇÕES
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: enhancedMessage,
        },
      ],
    })

    const assistantMessage = response.content[0]

    if (assistantMessage.type !== 'text') {
      throw new Error('Resposta inválida da API')
    }

    // Implementação EXATA do padrão que funciona no teste (LOOP múltiplas continuações)
    let finalResponse = assistantMessage.text
    let wasTruncated = false
    let continuationCount = 0
    let currentResponse = response
    const maxContinuations = 1 // EXATAMENTE igual ao teste

    // Loop para continuar até que pare naturalmente ou atinja limite de continuações
    while (
      currentResponse.stop_reason === 'max_tokens' &&
      continuationCount < maxContinuations
    ) {
      console.log(
        `⚠️ Resposta truncada (tentativa ${continuationCount + 1}), continuando geração...`,
      )
      wasTruncated = true
      continuationCount++

      try {
        // Continuação mais inteligente baseada no fórum OpenAI
        const currentTokens = Math.ceil(finalResponse.length / 3.5)
        const remainingTokens = Math.max(targetTokens - currentTokens, 30)

        console.log(
          `📊 Tokens atuais: ${currentTokens}, Restantes: ${remainingTokens}`,
        )

        const continuation = await anthropic.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: Math.min(remainingTokens + 20, 100), // Espaço para completar a ideia
          temperature: 0.5, // MENOS CRIATIVO PARA EVITAR INVENÇÕES
          system: `Complete a resposta de forma NATURAL usando NO MÁXIMO ${remainingTokens} tokens restantes. 

NÃO repita informações. Continue exatamente de onde parou e TERMINE a resposta adequadamente.`,
          messages: [
            {
              role: 'user',
              content: `Pergunta original: ${message}`,
            },
            {
              role: 'assistant',
              content: finalResponse,
            },
            {
              role: 'user',
              content: `Complete a resposta em ${remainingTokens} tokens. Finalize adequadamente.`,
            },
          ],
        })

        const continuationMessage = continuation.content[0]
        if (continuationMessage.type === 'text') {
          // Remove espaços duplos e conecta naturalmente (EXATO como no teste)
          finalResponse = finalResponse.trimEnd() + continuationMessage.text
          currentResponse = continuation
          console.log(`✅ Continuação ${continuationCount} bem-sucedida`)
        } else {
          break
        }
      } catch (error) {
        console.error('❌ Erro na continuação:', error)
        finalResponse = finalResponse + '\n\n[Erro na continuação]'
        break
      }
    }

    // Se ainda está truncado após todas as tentativas
    if (
      currentResponse.stop_reason === 'max_tokens' &&
      continuationCount >= maxContinuations
    ) {
      console.log('⚠️ Limite de continuações atingido, encerrando')
      finalResponse = finalResponse + '\n\n[Resposta pode estar incompleta]'
    }

    console.log('📝 Resposta final:', finalResponse)
    console.log('📊 Stop reason:', response.stop_reason)
    console.log('📏 Tamanho da resposta:', finalResponse.length, 'caracteres')

    // Armazena a conversa na memória vetorial para futuras referências
    await storeConversation(sessionId, message, finalResponse)

    return NextResponse.json({
      message: finalResponse,
      timestamp: new Date().toISOString(),
      isOffTopic: false,
      metadata: {
        stopReason: response.stop_reason,
        wasTruncated,
        wasAutoContinued: wasTruncated,
      },
    })
  } catch (error) {
    console.error('Erro no chat agent:', error)

    // Busca configurações para resposta de erro
    const config = await getSystemConfig()

    return NextResponse.json(
      {
        error: 'Erro interno do servidor',
        message: config.noDataResponse,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'AI Agent está funcionando!',
    model: 'Claude 3 Haiku',
    timestamp: new Date().toISOString(),
  })
}
