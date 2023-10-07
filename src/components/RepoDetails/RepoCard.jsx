import {
  AccountTree,
  AvTimer,
  Factory,
  GitHub,
  Tag,
} from "@mui/icons-material";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function RepoCard({ repoInfo, documentCount }) {
  const icons = {
    org: <Factory />,
    defaultBranch: <AccountTree />,
    commit: <Tag />,
  };

  return (
    <Stack
      rowGap={4}
      sx={{
        width: "60%",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "flex-start",
          background: "#82a5d4",
          width: "fit-content",
          color: "white",
        }}
      >
        <GitHub />
        <Typography variant="body1">{repoInfo.name}</Typography>
      </Box>
      <Grid
        container
        sx={{
          color: "#777",
          display: "flex",
          alignItems: "center",
          gap: "40px",
          justifyContent: "flex-start",
        }}
      >
        {Object.keys(repoInfo).map((key) => {
          if (key === "name") return null;
          return (
            <Box
              key={key}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                justifyContent: "flex-start",
              }}
            >
              {icons[key]}
              <Typography variant="body1">{repoInfo[key]}</Typography>
            </Box>
          );
        })}
      </Grid>
      <Grid
        container
        sx={{
          color: "#808588",
        }}
      >
        <AvTimer />
        <Typography variant="body1">{documentCount} valid documents</Typography>
      </Grid>
    </Stack>
  );
}

RepoCard.propTypes = {
  repoInfo: PropTypes.shape({
    name: PropTypes.string,
    org: PropTypes.string,
    defaultBranch: PropTypes.string,
    commit: PropTypes.string,
  }),
  documentCount: PropTypes.number,
};
