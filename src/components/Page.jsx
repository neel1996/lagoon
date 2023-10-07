import { ArrowBack } from "@mui/icons-material";
import { Box, Divider, Grid, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Page({ heading, children }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        margin: "20px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            margin: "auto 0px",
          }}
        >
          <IconButton
            size="large"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBack />
          </IconButton>
        </Box>
        <Typography variant="h3" padding="10px">
          {heading}
        </Typography>
      </Grid>
      <Divider />
      {children}
    </Box>
  );
}

Page.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.node,
};
