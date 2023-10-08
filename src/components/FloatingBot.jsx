import { SmartToy } from "@mui/icons-material";
import { Box, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FloatingBot() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: "30px",
      }}
    >
      <Fab
        sx={{
          backgroundColor: "#3f74bb",
          "&:hover": {
            backgroundColor: "#82a5d4",
          },
        }}
        onClick={() => {
          navigate("/search");
        }}
      >
        <SmartToy
          sx={{
            color: "#fff",
          }}
        />
      </Fab>
    </Box>
  );
}
