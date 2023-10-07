import { useQuery } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";

export const useGetRepo = ({ org, repoName }) => {
  const { githubClient } = useGithubClient();

  const getRepo = useQuery({
    queryKey: ["getRepo"],
    queryFn: async () => {
      return await githubClient
        .get(`/repos/${org}/${repoName}`)
        .then(({ data }) => data);
    },
    enabled: !!org && !!repoName && !!githubClient,
  });

  return getRepo;
};
