import { Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import Hint from "./Hint";
import { useCallback, useState } from "react";
import { useVectorSearch } from "../../supabase/useVectorSearch";
import { useLLMInference } from "../../hooks/useLLMInference";
import Response from "./Response";

export default function Search() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { search } = useVectorSearch();
  const { mutateAsync } = useLLMInference();

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      setResponse("");
      setIsLoading(true);
      const matchingContent = await search(query);

      if (matchingContent && query) {
        const { data } = await mutateAsync({
          context: matchingContent,
          query,
        });

        setIsLoading(false);
        setResponse(data?.response);
      }
    },
    [query, search, mutateAsync]
  );

  return (
    <Stack>
      <form onSubmit={handleSubmit}>
        <SearchBar query={query} setQuery={setQuery} disabled={isLoading} />
      </form>

      {response ? (
        <Response response={response} />
      ) : (
        <Hint isLoading={isLoading} />
      )}
    </Stack>
  );
}
