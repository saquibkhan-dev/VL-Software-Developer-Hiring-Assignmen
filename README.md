# Learn with Jiji Backend

Backend service for the Learn with Jiji search & respond flow. It exposes a single API endpoint that accepts a user query, stores the query, and returns matching learning resources from Supabase.

## Requirements
- Node.js 18+
- Supabase project with Auth, Database, and Storage enabled

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` and set your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
3. Apply the SQL in `db/schema.sql` to your Supabase project (includes tables, RLS, and a profile trigger).
4. Upload sample files to the `learning-resources` bucket:
   - `rag-101.pptx`
   - `rag-walkthrough.mp4`

## Running
```bash
npm run dev
```

## API
### POST /ask-jiji
**Request**
```json
{
  "query": "Explain RAG"
}
```

**Headers**
- `Authorization: Bearer <Supabase JWT>`

**Example**
```bash
curl -X POST http://localhost:3000/ask-jiji \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer <SUPABASE_JWT>" \\
  -d '{\"query\":\"Explain RAG\"}'
```

**Response**
```json
{
  "requestId": "uuid",
  "answer": "Here's a quick overview for: \"Explain RAG\". Review the resources below for deeper learning.",
  "resources": [
    {
      "id": "uuid",
      "title": "RAG 101 Deck",
      "description": "Introductory slides covering retrieval augmented generation.",
      "type": "ppt",
      "url": "https://..."
    }
  ]
}
```

## Auth & RLS
- The API expects a Supabase JWT in the `Authorization` header.
- RLS is enabled for `profiles`, `queries`, and `resources` tables.
- Authenticated users can read resources, and users can only insert/read their own queries.
- A trigger creates a `profiles` row when a new auth user is created; the API also upserts profiles on demand.

## System design notes
- **Efficiency:** resource lookup uses trigram indexes for fuzzy matching, and profile sync + search run concurrently to reduce latency.
- **Scalability:** add a caching layer (Redis) for hot queries and introduce async jobs for analytics aggregation.
- **Search relevance:** upgrade to pgvector embeddings + hybrid search for better semantic matching.
- **Storage delivery:** use signed URLs for private content and a CDN in front of Supabase Storage.
- **Observability:** emit structured logs with request IDs and ship to a centralized log pipeline.

## Improvement with more time
- Add vector-based search (e.g., pgvector) to improve relevance ranking and support semantic search.
