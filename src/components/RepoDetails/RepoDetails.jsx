import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useListDocuments } from "../../github/useListDocuments";
import Documents from "./Documents";
import RepoCard from "./RepoCard";
import Loader from "../../Loader";

export default function RepoDetails() {
  const { org, name } = useParams();
  const { data, isLoading } = useListDocuments({ org, repoName: name });

  const [repoInfo, setRepoInfo] = useState(null);
  const [documents, setDocuments] = useState(null);

  useEffect(() => {
    if (!data) return;

    setRepoInfo({
      name: data.repo.name,
      org: data.repo.org,
      defaultBranch: data.repo.defaultBranch,
      commit: data.repo.head,
    });
    setDocuments(data.documents);
  }, [data, isLoading]);

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
      {repoInfo && (
        <RepoCard repoInfo={repoInfo} documentCount={documents.length} />
      )}
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
