import { Box, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useListDocuments } from "../../github/useListDocuments";
import Documents from "./Documents";
import RepoCard from "./RepoCard";
import Loader from "../../Loader";
import { useRepositories } from "../../supabase/useRepositories";

export default function RepoDetails() {
  const { org, name } = useParams();
  const { data, isLoading } = useListDocuments({ org, repoName: name });
  const { getRepository } = useRepositories();

  const [repoInfo, setRepoInfo] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!data) return;

    getRepository({ org, repoName: name }).then((repo) => {
      setRepoInfo({
        id: repo?.id,
        name: data.repo.name,
        org: data.repo.org,
        defaultBranch: data.repo.defaultBranch,
        commit: data.repo.head,
      });
      setDocuments(data.documents);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, name, org]);

  const MemoizedRepoCard = useMemo(() => {
    if (!repoInfo) return null;

    return <RepoCard repoInfo={repoInfo} documentCount={documents.length} />;
  }, [documents, repoInfo]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        padding: "20px",
        margin: "20px",
      }}
    >
      {MemoizedRepoCard}
      <Stack
        sx={{
          marginTop: "20px",
        }}
      >
        {documents && <Documents documents={documents} repoInfo={repoInfo} />}
      </Stack>
    </Box>
  );
}
