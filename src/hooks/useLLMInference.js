import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLLMInference = () => {
  const infer = useMutation({
    mutationKey: "infer",
    mutationFn: async ({ context, query }) => {
      return axios.post("/api/infer", { context, query });
    },
  });

  return infer;
};
