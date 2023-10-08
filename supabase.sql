create or replace function match_documents (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  document_id uuid,
  document_content text,
  similarity float
)
language sql stable
as $$
  select
    document_embeddings.document_id,
    document_embeddings.document_content,
    1 - (document_embeddings.embeddings <=> query_embedding) as similarity
  from document_embeddings
  where 1 - (document_embeddings.embeddings <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;