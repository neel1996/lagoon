import { supabaseClient } from "../supabaseClient";

export const useDocuments = () => {
  const table = "documents";

  const getDocument = async ({ repoId, documentName }) => {
    const { data, count } = await supabaseClient
      .from(table)
      .select("*", {
        count: "exact",
      })
      .eq("repo_id", repoId)
      .eq("document_name", documentName);

    if (count === 0) {
      return null;
    }

    return data[0];
  };

  const insertNewDocument = async ({ repoId, documentName, content }) => {
    const existingDocument = await getDocument({ repoId, documentName });
    if (existingDocument) {
      return await updateDocumentContent({ existingDocument, content });
    }

    const { data, error } = await supabaseClient
      .from(table)
      .insert([
        {
          repo_id: repoId,
          document_name: documentName,
          document_content: content,
        },
      ])
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const updateDocumentContent = async ({ existingDocument, content }) => {
    const { data, error } = await supabaseClient
      .from(table)
      .update({ document_content: content, updated_at: new Date() })
      .eq("id", existingDocument.id)
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  return {
    insertNewDocument,
    updateDocumentContent,
  };
};
