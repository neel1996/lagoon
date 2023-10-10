create table
  public.repositories (
    id uuid not null default gen_random_uuid (),
    name text not null,
    org text not null,
    is_disabled boolean null default false,
    created_at timestamp with time zone not null default now(),
    created_by uuid not null default auth.uid (),
    constraint repositories_pkey primary key (id),
    constraint repositories_name_key unique (name)
  ) tablespace pg_default;


create table
  public.documents (
    id uuid not null default gen_random_uuid (),
    repo_id uuid not null,
    document_name text not null,
    document_content text not null,
    created_at timestamp with time zone not null default now(),
    created_by uuid not null default auth.uid (),
    updated_at timestamp with time zone null,
    constraint documents_pkey primary key (id),
    constraint documents_repo_id_fkey foreign key (repo_id) references repositories (id) on delete cascade
  ) tablespace pg_default;

create trigger "embed-documents"
after insert
or
update on documents for each row
execute function supabase_functions.http_request (
  'https://<project_ref>.functions.supabase.co/embed-documents',
  'POST',
  '{"Content-type":"application/json"}',
  '{}',
  '5000'
);


create table
  public.document_embeddings (
    document_id uuid not null,
    document_name text not null,
    embeddings public.vector not null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null,
    document_content text null,
    constraint document_embeddings_pkey primary key (document_id),
    constraint document_embeddings_document_id_fkey foreign key (document_id) references documents (id) on delete cascade
  ) tablespace pg_default;


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