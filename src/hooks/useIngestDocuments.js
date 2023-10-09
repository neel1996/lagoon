import { useDownloadRepoContent } from "../github/useDownloadRepoContent";
import { useDocuments } from "../supabase/useDocuments";
import { useRepositories } from "../supabase/useRepositories";

export const useIngestDocuments = () => {
  const { mutateAsync } = useDownloadRepoContent();
  const { insertNewRepositoryIfNotExists } = useRepositories();
  const { insertNewDocument } = useDocuments();

  const ingestDocuments = async ({ org, repo, documents }) => {
    const data = await mutateAsync({ org, repo, documents });

    const repository = await insertNewRepositoryIfNotExists({ org, repo });
    if (repository) {
      const documentPromises = [];
      for (const document of data) {
        documentPromises.push(
          insertNewDocument({
            repoId: repository.id,
            documentName: document.path,
            content: document.content,
          })
        );
      }

      await Promise.all(documentPromises);
    }
  };

  return { ingestDocuments };
};
