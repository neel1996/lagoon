import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useIngestDocuments } from "../../hooks/useIngestDocuments";

export default function IngestAllAction({ org, repo, documents }) {
  const { ingestDocuments } = useIngestDocuments();

  return (
    <Button
      variant="contained"
      sx={{
        background: "#5d8c8b",
        color: "white",
        padding: "10px 20px",
        "&:hover": {
          background: "#5d8c8b",
        },
      }}
      onClick={() => {
        ingestDocuments({ org, repo, documents });
      }}
    >
      <Typography variant="body1">Ingest All</Typography>
    </Button>
  );
}

IngestAllAction.propTypes = {
  org: PropTypes.string.isRequired,
  repo: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object).isRequired,
};
