import { Box } from "@mui/material";
import PropTypes from "prop-types";
import CodeBlock from "./CodeBlock";

export default function Response({ response }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#eaf5ff",
        margin: "30px auto",
        width: "80%",
        borderRadius: "10px",
        border: "2px solid #ededed",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          wordBreak: "break-word",
        }}
      >
        <CodeBlock message={response} />
      </Box>
    </Box>
  );
}

Response.propTypes = {
  response: PropTypes.string.isRequired,
};
