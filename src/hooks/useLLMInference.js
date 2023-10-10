import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLLMInference = () => {
  const infer = useMutation({
    mutationKey: "infer",
    mutationFn: async ({ context, query }) => {
      let formattedContext = context
        .replace(/\n/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      return axios.post("/api/infer", { context: formattedContext, query });
    },
  });

  return infer;
};
