-- Habilita a extensão pgvector para busca vetorial
CREATE EXTENSION IF NOT EXISTS vector;

-- Cria a tabela de conversas com suporte a embeddings
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small tem 1536 dimensões
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria índice para busca vetorial eficiente
CREATE INDEX IF NOT EXISTS conversations_embedding_idx 
ON conversations USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Cria índice para filtro por sessão
CREATE INDEX IF NOT EXISTS conversations_session_idx 
ON conversations (session_id);

-- Função para criar tabela (usado pelo código Node.js)
CREATE OR REPLACE FUNCTION create_conversations_table()
RETURNS void AS $$
BEGIN
  -- Esta função existe apenas para compatibilidade
  -- A tabela já foi criada acima
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar conversas similares
CREATE OR REPLACE FUNCTION find_similar_conversations(
  session_id TEXT,
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT DEFAULT 0.5,
  match_count INT DEFAULT 3
)
RETURNS TABLE (
  id TEXT,
  user_message TEXT,
  assistant_response TEXT,
  created_at TIMESTAMPTZ,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id,
    c.user_message,
    c.assistant_response,
    c.created_at,
    (1 - (c.embedding <=> query_embedding)) AS similarity
  FROM conversations c
  WHERE 
    c.session_id = find_similar_conversations.session_id
    AND (1 - (c.embedding <=> query_embedding)) >= similarity_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Função para limpeza automática (opcional)
CREATE OR REPLACE FUNCTION cleanup_old_conversations()
RETURNS void AS $$
BEGIN
  -- Remove conversas com mais de 30 dias
  DELETE FROM conversations 
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Política RLS (Row Level Security) - IMPORTANTE para segurança
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Política que permite todas as operações para usuários autenticados
CREATE POLICY "Permitir todas operações para usuários autenticados" 
ON conversations
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Política que permite operações para service role (usado pelo backend)
CREATE POLICY "Permitir todas operações para service role" 
ON conversations
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Função para obter estatísticas
CREATE OR REPLACE FUNCTION get_conversation_stats()
RETURNS TABLE (
  total_conversations BIGINT,
  total_sessions BIGINT,
  oldest_conversation TIMESTAMPTZ,
  newest_conversation TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_conversations,
    COUNT(DISTINCT session_id) as total_sessions,
    MIN(created_at) as oldest_conversation,
    MAX(created_at) as newest_conversation
  FROM conversations;
END;
$$ LANGUAGE plpgsql;

-- ============== KNOWLEDGE BASE SETUP ==============

-- Cria a tabela de knowledge base com suporte a embeddings
CREATE TABLE IF NOT EXISTS knowledge_base (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-small tem 1536 dimensões
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cria índice para busca vetorial eficiente
CREATE INDEX IF NOT EXISTS knowledge_embedding_idx 
ON knowledge_base USING ivfflat (embedding vector_cosine_ops) 
WITH (lists = 100);

-- Cria índice para metadata (busca por categoria, tags, etc.)
CREATE INDEX IF NOT EXISTS knowledge_metadata_idx 
ON knowledge_base USING gin(metadata);

-- Cria índice para data de criação
CREATE INDEX IF NOT EXISTS knowledge_created_at_idx 
ON knowledge_base (created_at);

-- Função para criar tabela knowledge (usado pelo código Node.js)
CREATE OR REPLACE FUNCTION create_knowledge_table()
RETURNS void AS $$
BEGIN
  -- Esta função existe apenas para compatibilidade
  -- A tabela já foi criada acima
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar conhecimentos similares
CREATE OR REPLACE FUNCTION find_similar_knowledge(
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT DEFAULT 0.6,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ,
  similarity FLOAT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    k.id,
    k.content,
    k.metadata,
    k.created_at,
    (1 - (k.embedding <=> query_embedding)) AS similarity
  FROM knowledge_base k
  WHERE 
    (1 - (k.embedding <=> query_embedding)) >= similarity_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar conhecimentos por categoria
CREATE OR REPLACE FUNCTION find_knowledge_by_category(
  category_name TEXT,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id TEXT,
  content TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    k.id,
    k.content,
    k.metadata,
    k.created_at
  FROM knowledge_base k
  WHERE 
    k.metadata->>'categoria' = category_name
  ORDER BY k.created_at DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- Função para limpeza automática de knowledge antigo (opcional)
CREATE OR REPLACE FUNCTION cleanup_old_knowledge()
RETURNS void AS $$
BEGIN
  -- Remove conhecimentos com mais de 6 meses (ajustar conforme necessário)
  DELETE FROM knowledge_base 
  WHERE created_at < NOW() - INTERVAL '6 months';
END;
$$ LANGUAGE plpgsql;

-- Política RLS para knowledge base
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Política que permite todas as operações para usuários autenticados
CREATE POLICY "Permitir todas operações knowledge para usuários autenticados" 
ON knowledge_base
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);

-- Política que permite operações para service role (usado pelo backend)
CREATE POLICY "Permitir todas operações knowledge para service role" 
ON knowledge_base
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Função para obter estatísticas do knowledge base
CREATE OR REPLACE FUNCTION get_knowledge_stats()
RETURNS TABLE (
  total_entries BIGINT,
  total_categories BIGINT,
  oldest_entry TIMESTAMPTZ,
  newest_entry TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_entries,
    COUNT(DISTINCT metadata->>'categoria') as total_categories,
    MIN(created_at) as oldest_entry,
    MAX(created_at) as newest_entry
  FROM knowledge_base;
END;
$$ LANGUAGE plpgsql; 