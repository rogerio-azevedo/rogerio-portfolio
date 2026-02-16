# Migração Supabase → Neon

Este documento descreve a migração do banco de dados do Supabase para o Neon (Vercel).

## O que foi feito

- **Driver**: `@supabase/supabase-js` substituído por `@neondatabase/serverless`
- **Camada de dados**: `supabase-vector.ts` renomeado para `vector-store.ts` (genérico)
- **Schema**: `neon-setup.sql` criado sem RLS (Neon não usa roles do Supabase)
- **Índices**: `lists=10` no ivfflat (adequado para datasets pequenos)

## Restaurar dados do backup Supabase

### 1. Extrair dados do backup

```bash
node scripts/restore-from-supabase-backup.mjs "/caminho/para/seu-backup.backup"
```

Isso gera `scripts/restore-output.sql` com os dados de `conversations` e `knowledge_base`.

### 2. Executar schema no Neon

Com `DATABASE_URL` definida no ambiente:

```bash
source .env  # ou: export DATABASE_URL="postgresql://..."
psql "$DATABASE_URL" -f src/data/neon-setup.sql
```

Ou use o **SQL Editor** do Neon: copie o conteúdo de `src/data/neon-setup.sql` e execute.

### 3. Restaurar os dados

```bash
psql "$DATABASE_URL" -f scripts/restore-output.sql
```

Ou cole o conteúdo de `scripts/restore-output.sql` no SQL Editor do Neon.

## Variáveis de ambiente

### Manter (Neon)

- `DATABASE_URL` ou `POSTGRES_URL` – conexão com o Neon

### Remover (Supabase)

Após validar que tudo funciona, remova do `.env`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Vercel

No dashboard da Vercel, adicione `DATABASE_URL` (ou `POSTGRES_URL`) e remova as variáveis do Supabase.

## Scripts npm

- `npm run db:setup` – executa o schema no Neon (requer `DATABASE_URL`)
- `npm run db:restore` – restaura dados do `restore-output.sql`
- `npm run db:extract-backup` – precisa do caminho do backup como argumento
