import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "../supabaseClient";

export const useSession = () => {
  const session = useQuery({
    queryKey: ["sessionValidate"],
    queryFn: () => {
      return supabaseClient.auth.getSession().then(({ data }) => {
        if (!data.session) {
          return null;
        }

        if (!data.session.provider_token) {
          return null;
        }

        return {
          accessToken: data?.session.access_token,
          providerToken: data?.session.provider_token,
          refreshToken: data?.session.refresh_token,
          userName: data?.session.user.user_metadata.user_name,
        };
      });
    },
  });

  return {
    session,
  };
};
