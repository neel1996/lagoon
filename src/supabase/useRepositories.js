import { supabaseClient } from "../supabaseClient";

export const useRepositories = () => {
  const table = "repositories";

  const getRepository = async ({ org, repoName }) => {
    const { data, count } = await supabaseClient
      .from(table)
      .select("*", {
        count: "exact",
      })
      .eq("org", org)
      .eq("name", repoName);

    if (count === 0) {
      return null;
    }

    return data[0];
  };

  const insertNewRepositoryIfNotExists = async ({ org, repo }) => {
    const existingRepo = await getRepository({ org, repoName: repo });
    if (existingRepo) {
      return existingRepo;
    }

    const { data, error } = await supabaseClient
      .from(table)
      .insert({ name: repo, org })
      .select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  };

  const getAllRepositories = async () => {
    const { data, error } = await supabaseClient.from(table).select("*");

    if (error) {
      console.error(error);
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    return data;
  };

  return {
    getRepository,
    getAllRepositories,
    insertNewRepositoryIfNotExists,
  };
};
