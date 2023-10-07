import { useMutation } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";
import { Buffer } from "buffer";

export const useDownloadRepoContent = () => {
  const { githubClient } = useGithubClient();

  const downloadRepoContent = useMutation({
    mutationKey: "downloadRepoContent",
    mutationFn: async ({ org, repo, documents }) => {
      const downloads = [];
      for (const document of documents) {
        downloads.push(
          githubClient.get(`/repos/${org}/${repo}/contents/${document.id}`)
        );
      }

      const resolved = await Promise.all(downloads);
      const data = resolved.map((response) => {
        return {
          name: response.data.name,
          path: response.data.path,
          content: Buffer.from(response.data.content, "base64").toString(),
        };
      });

      return data;
    },
  });

  return downloadRepoContent;
};
