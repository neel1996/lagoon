import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function Hint({ isLoading }) {
  const hints = [
    "How to install the app?",
    "How to use the app?",
    "What are the dependencies?",
    "What are the features?",
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eaf5ff",
        margin: "30px auto",
        width: "70%",
        borderRadius: "10px",
        border: "2px solid #ededed",
      }}
    >
      {isLoading ? (
        <Stack
          sx={{
            padding: "20px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              marginBottom: "20px",
              color: "#3576b1",
            }}
          >
            Generating response...
          </Typography>
          <LinearProgress color="primary" />
        </Stack>
      ) : (
        <Stack
          sx={{
            color: "#3576b1",
            padding: "20px",
          }}
        >
          <Typography variant="h6">
            Ask anything from your repository
          </Typography>
          <Typography sx={{ margin: "20px 0px" }}>Try...</Typography>
          <Stack
            sx={{
              padding: "20px",
            }}
          >
            {hints.map((hint, index) => (
              <Typography variant="body2" key={index}>
                {hint}
              </Typography>
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}

Hint.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
