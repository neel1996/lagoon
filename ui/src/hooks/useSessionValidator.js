import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../supabaseClient";

export const useSessionValidator = () => {
  const validateSession = useQuery({
    queryKey: ["sessionValidate"],
    queryFn: () => {
      return supabaseClient.auth.getSession().then(({ data }) => data?.session);
    },
  });

  return {
    validateSession,
  };
};
