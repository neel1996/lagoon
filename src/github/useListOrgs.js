import { useQuery } from "@tanstack/react-query";
import { useGithubClient } from "./useGithubClient";
import { useSession } from "../hooks/useSession";

export const useListOrgs = () => {
  const { githubClient } = useGithubClient();
  const { session } = useSession();
  const { data } = session;

  const orgsList = useQuery({
    queryKey: ["orgsList"],
    queryFn: () => {
      if (!data) return null;

      return githubClient
        .get(`/users/${data.userName}/orgs`)
        .then(({ data }) => {
          return data;
        });
    },
  });

  return orgsList;
};
