import { Paper } from "@mui/material";
import PropTypes from "prop-types";

export default function IngestionStatus({ status }) {
  const statusData = {
    not_ingested: {
      backgroundColor: "#d16666",
      color: "#ffffff",
      label: "Not ingested",
    },
    ingested: {
      backgroundColor: "#42a773",
      color: "#ffffff",
      label: "Ingested",
    },
    processing: {
      backgroundColor: "#f4b92c",
      color: "#4f4f4f",
      label: "Processing",
    },
    failed: {
      backgroundColor: "#d16666",
      color: "#ffffff",
      label: "Failed",
    },
  };

  if (!(status in statusData)) {
    return null;
  }

  return (
    <Paper
      sx={{
        backgroundColor: statusData[status].backgroundColor,
        color: statusData[status].color,
        padding: "14px",
        fontWeight: "500",
        fontSize: "14px",
        width: "100%",
      }}
    >
      {statusData[status].label}
    </Paper>
  );
}

IngestionStatus.propTypes = {
  status: PropTypes.string,
};
