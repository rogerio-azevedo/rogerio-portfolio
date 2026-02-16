-- Schema Neon - Migração do Supabase
-- Executar no SQL Editor do Neon ou via: psql $DATABASE_URL -f neon-setup.sql

-- Habilita a extensão pgvector para busca vetorial
CREATE EXTENSION IF NOT EXISTS vector;

-- Cria a tabela de conversas com suporte a embeddings
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_response TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice vetorial: lists=10 adequado para datasets pequenos (<10k linhas)
-- Recrear com lists maior quando a base crescer
CREATE INDEX IF NOT EXISTS conversations_embedding_idx
ON conversations USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 10);

CREATE INDEX IF NOT EXISTS conversations_session_idx
ON conversations (session_id);

-- Função para criar tabela (compatibilidade)
CREATE OR REPLACE FUNCTION create_conversations_table()
RETURNS void AS $$
BEGIN
  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Função para buscar conversas similares
CREATE OR REPLACE FUNCTION find_similar_conversations(
  p_session_id TEXT,
  query_embedding vector(1536),
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
    (1 - (c.embedding <=> query_embedding))::FLOAT AS similarity
  FROM conversations c
  WHERE
    c.session_id = p_session_id
    AND (1 - (c.embedding <=> query_embedding)) >= similarity_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

-- ============== KNOWLEDGE BASE ==============

CREATE TABLE IF NOT EXISTS knowledge_base (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  metadata JSONB,
  embedding vector(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS knowledge_embedding_idx
ON knowledge_base USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 10);

CREATE INDEX IF NOT EXISTS knowledge_metadata_idx
ON knowledge_base USING gin(metadata);

CREATE INDEX IF NOT EXISTS knowledge_created_at_idx
ON knowledge_base (created_at);

CREATE OR REPLACE FUNCTION create_knowledge_table()
RETURNS void AS $$
BEGIN
  RETURN;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION find_similar_knowledge(
  query_embedding vector(1536),
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
    (1 - (k.embedding <=> query_embedding))::FLOAT AS similarity
  FROM knowledge_base k
  WHERE
    (1 - (k.embedding <=> query_embedding)) >= similarity_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql;

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
    COUNT(*)::BIGINT as total_entries,
    COUNT(DISTINCT metadata->>'categoria')::BIGINT as total_categories,
    MIN(created_at) as oldest_entry,
    MAX(created_at) as newest_entry
  FROM knowledge_base;
END;
$$ LANGUAGE plpgsql;
