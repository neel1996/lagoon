import { useQuery } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";
import { useListOrgs } from "./useListOrgs";
import { useRepositories } from "../supabase/useRepositories";
import { useDocuments } from "../supabase/useDocuments";

export const useListRepos = () => {
  const { githubClient } = useGithubClient();
  const { data: orgs, isLoading } = useListOrgs();
  const { getAllRepositories, insertNewRepositoryIfNotExists } =
    useRepositories();
  const { getIngestedDocumentsForRepo } = useDocuments();

  const repoList = useQuery({
    queryKey: ["repoList"],
    queryFn: async () => {
      const requests = orgs.map((org) => {
        return githubClient.get(`/orgs/${org.login}/repos`);
      });

      const reposFromDB = await getAllRepositories();
      const orgRepoMap = {};
      reposFromDB.forEach((repo) => {
        if (!orgRepoMap[repo.org]) {
          orgRepoMap[repo.org] = [];
        }
        orgRepoMap[repo.org].push(repo);
      });

      const responses = await Promise.all(requests);
      const repos = [];
      responses.forEach((response) => {
        return repos.push(...response.data);
      });

      const rows = [];
      for (const repo of repos) {
        let repositoryFromDB = orgRepoMap[repo.owner.login]?.find(
          (r) => r.name === repo.name
        );

        if (!repositoryFromDB) {
          repositoryFromDB = await insertNewRepositoryIfNotExists({
            org: repo.owner.login,
            repo: repo.name,
          });
        }

        const ingestedDocs = await getIngestedDocumentsForRepo({
          repoId: repositoryFromDB.id,
        });

        let ingestionStatus = "NOT_INGESTED";
        if (ingestedDocs && ingestedDocs.length > 0) {
          ingestionStatus = "INGESTED";
        }

        rows.push({
          id: repo.id,
          name: {
            name: repo.name,
            org: repo.owner.login,
          },
          lastUpdated: repo.updated_at,
          ingestionStatus,
          org: repo.owner.login,
        });
      }

      return rows;
    },
    enabled: !!orgs && !isLoading,
  });

  return repoList;
};
