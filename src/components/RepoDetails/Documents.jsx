import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import IngestAllAction from "./IngestAllAction";
import { useIngestDocuments } from "../../hooks/useIngestDocuments";
import IngestionStatus from "./IngestionStatus";
import { useDocuments } from "../../supabase/useDocuments";
import { supabaseClient } from "../../supabaseClient";

export default function Documents({ documents, repoInfo }) {
  const [ingestedDocuments, setIngestedDocuments] = useState(null);
  const [statusMap, setStatusMap] = useState({});
  const { ingestDocuments } = useIngestDocuments();
  const { getIngestedDocumentsForRepo } = useDocuments();

  const formatSize = useCallback((size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    if (size < 1024 * 1024 * 1024)
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }, []);

  useEffect(() => {
    if (!repoInfo || !("id" in repoInfo)) return;

    getIngestedDocumentsForRepo({
      repoId: repoInfo.id,
    }).then((data) => {
      setIngestedDocuments(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repoInfo]);

  useEffect(() => {
    if (!repoInfo || !("id" in repoInfo)) return;

    const repoId = repoInfo.id;
    const channel = supabaseClient.channel(`ingestion_status:${repoId}`);

    channel
      .on("broadcast", { event: "ingestion_status" }, ({ payload }) => {
        setStatusMap((prevStatusMap) => {
          const newStatusMap = { ...prevStatusMap };
          newStatusMap[payload.path] = payload.status;
          return newStatusMap;
        });
      })
      .subscribe();
  }, [repoInfo]);

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
      field: "status",
      headerName: "Status",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        const { path } = params.value;
        let status = statusMap[path];
        if (!status) {
          status = "not_ingested";

          if (ingestedDocuments && ingestedDocuments.includes(path)) {
            status = "ingested";
          }
        }

        return <IngestionStatus status={status} />;
      },
    },
    {
      field: "action",
      headerName: "Ingest",
      flex: 1,
      renderCell: (params) => {
        const { org, repoName, path } = params.value;

        return (
          <Button
            variant="outlined"
            onClick={() => {
              setStatusMap((prevStatusMap) => {
                const newStatusMap = { ...prevStatusMap };
                newStatusMap[path] = "processing";
                return newStatusMap;
              });

              ingestDocuments({
                org,
                repo: repoName,
                documents: [{ id: path }],
              });
            }}
            disabled={statusMap[path] === "processing"}
          >
            {{
              not_ingested: "Ingest",
              ingested: "Re-ingest",
              processing: "Ingesting...",
              failed: "Ingest",
            }[statusMap[path]] || "Ingest"}
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
      action: PropTypes.shape({
        org: PropTypes.string,
        repoName: PropTypes.string,
        path: PropTypes.string,
      }),
    })
  ),
  repoInfo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    org: PropTypes.string,
    defaultBranch: PropTypes.string,
    commit: PropTypes.string,
  }),
};
