import axios from "axios";
import { useSession } from "../hooks/useSession";
import { useMemo } from "react";

export const useGithubClient = () => {
  const { session } = useSession();
  const { data } = session;

  const githubClient = useMemo(() => {
    if (!data || !data.providerToken) return null;

    return axios.create({
      baseURL: "https://api.github.com",
      headers: {
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${data.providerToken}`,
      },
    });
  }, [data]);

  return {
    githubClient,
  };
};
