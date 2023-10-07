import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "../supabaseClient";

export const useSignInWithGithub = () => {
  const login = useMutation({
    mutationKey: "login",
    mutationFn: async () => {
      const { user, session, error } =
        await supabaseClient.auth.signInWithOAuth({
          provider: "github",
          options: { scopes: "repo" },
        });

      if (error) {
        throw new Error(error.message);
      }

      return { user, session };
    },
  });

  return login;
};
