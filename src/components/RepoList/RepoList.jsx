import { Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useListRepos } from "../../github/useListRepos";
import RepoName from "./RepoName";
import UpdatedDate from "./UpdatedDate";
import FloatingBot from "../FloatingBot";
import Loader from "../../Loader";

export default function RepoList() {
  const repos = useListRepos();
  const { data, isLoading } = repos;

  if (isLoading) {
    return <Loader />;
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      renderCell: (params) => {
        return <RepoName params={params} />;
      },
    },
    {
      field: "org",
      headerName: "Organization",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            variant="body1"
            sx={{
              fontWeight: "500",
              color: "#42a2a1",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "lastUpdated",
      headerName: "Last Updated",
      flex: 1,
      renderCell: (params) => {
        return <UpdatedDate date={params.value} />;
      },
    },
    {
      field: "ingestionStatus",
      headerName: "Ingestion Status",
      flex: 1,
    },
    {
      field: "numberOfDocuments",
      headerName: "Number of Documents",
      flex: 1,
    },
  ];

  return (
    <Grid
      sx={{
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        margin: "20px auto",
      }}
    >
      <FloatingBot />
      <DataGrid
        autoHeight
        columns={columns}
        rows={data}
        slots={{
          noRowsOverlay: () => (
            <Typography variant="h5">No repositories found</Typography>
          ),
        }}
      />
    </Grid>
  );
}
