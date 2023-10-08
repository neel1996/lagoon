import { pipeline } from "@xenova/transformers";

const pipe = await pipeline("feature-extraction", "Supabase/gte-small");

export default function useGenerateEmbeddings() {
  const generateEmbeddings = async (query) => {
    const output = await pipe(query, {
      pooling: "mean",
      normalize: true,
    });

    return Array.from(output.data);
  };

  return { generateEmbeddings };
}
