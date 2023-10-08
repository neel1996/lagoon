import useGenerateEmbeddings from "../hooks/useGenerateEmbeddings";
import { supabaseClient } from "../supabaseClient";

export const useVectorSearch = () => {
  const { generateEmbeddings } = useGenerateEmbeddings();

  const search = async (query) => {
    const query_embedding = await generateEmbeddings(query);

    const { data, error } = await supabaseClient.rpc("match_documents", {
      query_embedding,
      match_threshold: 0.5,
      match_count: 2,
    });

    if (error || data?.length === 0) {
      return null;
    }

    return data
      .map((item) => {
        return item.document_content;
      })
      .join(" ");
  };

  return { search };
};
