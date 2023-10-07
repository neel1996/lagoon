import { GitHub } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function RepoName({ params }) {
  const { name, org } = params.value;
  const navigate = useNavigate();

  return (
    <Grid
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px",
        justifyContent: "center",
        margin: "auto 0px",
        padding: "10px",
        background: "#82a5d4",
        borderRadius: "10px",
        color: "white",
        "&:hover": {
          cursor: "pointer",
          background: "#5f8fb4",
        },
      }}
      onClick={() => {
        navigate(`/repo/${org}/${name}`);
      }}
    >
      <GitHub />
      <Typography variant="body1">{name}</Typography>
    </Grid>
  );
}

RepoName.propTypes = {
  params: PropTypes.shape({
    value: PropTypes.shape({
      name: PropTypes.string,
      org: PropTypes.string,
    }),
  }),
};
