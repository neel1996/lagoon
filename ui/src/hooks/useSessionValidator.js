import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../supabaseClient";

export const useSessionValidator = () => {
  const validateSession = useQuery({
    queryKey: ["sessionValidate"],
    queryFn: () => {
      return supabaseClient.auth.getSession().then(({ data }) => ({
        accessToken: data?.session.access_token,
        providerToken: data?.session.provider_token,
        refreshToken: data?.session.refresh_token,
      }));
    },
  });

  return {
    validateSession,
  };
};
