import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  env,
  pipeline,
} from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

env.useBrowserCache = false;
env.allowLocalModels = false;

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

const pipe = await pipeline("feature-extraction", "Supabase/gte-small");

serve(async (req) => {
  const data = await req.json();
  console.log("Received request: ", data);

  const {
    record: { id, document_name, document_content, repo_id },
  } = data;
  const channel = supabaseClient.channel(`ingestion_status:${repo_id}`);
  channel.subscribe();

  const output = await pipe(document_content, {
    pooling: "mean",
    normalize: true,
  });
  const embeddings = Array.from(output.data);

  const payload = {
    document_id: id,
    document_name,
    embeddings,
    document_content,
  };

  const { count } = await supabaseClient
    .from("document_embeddings")
    .select("*", { count: "exact" })
    .eq("document_id", id);

  let error = null;
  if (count === 0) {
    console.log("Inserting generated embeddings");
    const res = await supabaseClient
      .from("document_embeddings")
      .insert(payload);
    error = res?.error;
  } else {
    console.log("Updating existing embeddings");
    const res = await supabaseClient
      .from("document_embeddings")
      .update({ embeddings, document_content, updated_at: new Date() })
      .eq("document_id", id);
    error = res?.error;
  }

  if (error) {
    console.error(error);
    broadcastStatus(document_name, "failed", channel);
    return error;
  }

  broadcastStatus(document_name, "ingested", channel);
  console.log("Embeddings saved");
  return new Response(JSON.stringify({ payload }), {
    headers: { "Content-Type": "application/json" },
  });
});

function broadcastStatus(document_name: string, status: string, channel: any) {
  channel.send({
    type: "broadcast",
    event: "ingestion_status",
    payload: {
      path: document_name,
      status,
    },
  });
}
