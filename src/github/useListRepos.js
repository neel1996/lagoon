import { useQuery } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";
import { useListOrgs } from "./useListOrgs";

export const useListRepos = () => {
  const { githubClient } = useGithubClient();
  const { data: orgs, isLoading } = useListOrgs();

  const repoList = useQuery({
    queryKey: ["repoList"],
    queryFn: async () => {
      const requests = orgs.map((org) => {
        return githubClient.get(`/orgs/${org.login}/repos`);
      });

      const responses = await Promise.all(requests);
      const repos = [];
      responses.forEach((response) => {
        return repos.push(...response.data);
      });

      return repos.map((repo) => {
        return {
          id: repo.id,
          name: {
            name: repo.name,
            org: repo.owner.login,
          },
          lastUpdated: repo.updated_at,
          ingestionStatus: "Not Ingested",
          numberOfDocuments: 0,
          org: repo.owner.login,
        };
      });
    },
    enabled: !!orgs && !isLoading,
  });

  return repoList;
};
