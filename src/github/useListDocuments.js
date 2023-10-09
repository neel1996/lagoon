import { useQuery } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";
import { useGetRepo } from "./useGetRepo";

export const useListDocuments = ({ org, repoName }) => {
  const { githubClient } = useGithubClient();
  const { data: repo, isLoading } = useGetRepo({ org, repoName });

  const allowedExtensions = [
    "md",
    "markdown",
    "rst",
    "adoc",
    "html",
    "tex",
    "txt",
    "xml",
    "json",
    "yaml",
    "toml",
    "mdx",
    "textile",
    "wiki",
    "sphinx",
    "tf",
    "api",
  ];

  const getDocuments = useQuery({
    queryKey: ["getDocuments"],
    queryFn: async () => {
      const response = await githubClient.get(
        `/repos/${org}/${repoName}/git/trees/${repo?.default_branch}?recursive=1`
      );

      const filteredFiles = response.data.tree
        .filter((item) => {
          const extension = item.path.split(".").pop();
          return allowedExtensions.includes(extension);
        })
        .map((item) => {
          return {
            id: item.path,
            size: item.size,
            url: item.url,
            status: {
              path: item.path,
            },
            action: {
              org,
              repoName,
              path: item.path,
            },
          };
        });

      return {
        repo: {
          name: repo.name,
          org: repo.owner.login,
          defaultBranch: repo.default_branch,
          head: response.data.sha.substring(0, 7),
        },
        documents: filteredFiles,
      };
    },
    enabled: !!githubClient && !isLoading && !!repo?.default_branch,
  });

  return getDocuments;
};
