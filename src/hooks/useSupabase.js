import { supabaseClient } from "../supabaseClient";

export const useSupabase = () => {
  const select = async ({ table, options }) => {
    return supabaseClient.from(table).select(options);
  };

  return {
    select,
  };
};
