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

  const getIngestedDocumentsForRepo = async ({ repoId }) => {
    const { data, error, count } = await supabaseClient
      .from(table)
      .select(
        `
        id,
        repo_id,
        document_name,
        document_embeddings(
          document_id,
          document_name
        )
      `,
        {
          count: "exact",
        }
      )
      .eq("repo_id", repoId);

    if (error) {
      console.error(error);
      return;
    }

    if (count === 0) {
      return null;
    }

    const ingestDocuments = data
      .filter((item) => item.document_embeddings)
      .map((item) => {
        return item.document_embeddings.document_name;
      });

    return ingestDocuments;
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
    getDocument,
    getIngestedDocumentsForRepo,
    insertNewDocument,
    updateDocumentContent,
  };
};
