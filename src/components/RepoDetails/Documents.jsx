import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback } from "react";
import PropTypes from "prop-types";
import IngestAllAction from "./IngestAllAction";
import { useIngestDocuments } from "../../hooks/useIngestDocuments";

export default function Documents({ documents, repoInfo }) {
  const { ingestDocuments } = useIngestDocuments();

  const formatSize = useCallback((size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "Document name",
      flex: 2,
      renderCell: (params) => {
        return (
          <Typography
            variant="body1"
            sx={{
              fontWeight: "500",
              color: "#464f4e",
            }}
          >
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "size",
      headerName: "Document size",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              color: "#5d8c8b",
            }}
          >
            {formatSize(params.value)}
          </Typography>
        );
      },
    },
    {
      field: "action",
      headerName: "Ingest",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            onClick={() => {
              const { org, repoName, path } = params.value;
              ingestDocuments({
                org,
                repo: repoName,
                documents: [{ id: path }],
              });
            }}
          >
            Ingest
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
      <Grid
        container
        sx={{
          margin: "30px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Documents</Typography>
        <IngestAllAction
          org={repoInfo.org}
          repo={repoInfo.name}
          documents={documents}
        />
      </Grid>
      <DataGrid
        columns={columns}
        rows={documents}
        rowCount={documents.length}
      />
    </Box>
  );
}

Documents.propTypes = {
  documents: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
      action: PropTypes.string,
    })
  ),
  repoInfo: PropTypes.shape({
    name: PropTypes.string,
    org: PropTypes.string,
    defaultBranch: PropTypes.string,
    commit: PropTypes.string,
  }),
};
