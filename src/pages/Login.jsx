import { GitHub } from "@mui/icons-material";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useSession } from "../hooks/useSession";
import { useSignInWithGithub } from "../supabase/useSigninWithGithub";

export default function Login() {
  const navigate = useNavigate();
  const { session } = useSession();
  const login = useSignInWithGithub();
  const { data, isError, isLoading } = session;

  if (isLoading) return null;

  if (!isError && data) {
    navigate("/");
    return;
  }

  const loginWithGithub = async () => {
    login.mutateAsync();
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "400px",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          padding: "50px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
          borderBottomWidth: "5px",
          borderBottomStyle: "solid",
          borderBottomColor: "primary.main",
        }}
      >
        <Typography variant="h3">Lagoon</Typography>
        <Typography
          variant="caption"
          sx={{
            fontWeight: "normal",
            color: "#777",
            fontSize: "16px",
          }}
        >
          Get to know your repos
        </Typography>
        <Button
          sx={{
            margin: "20px auto",
            backgroundColor: "primary.main",
            padding: "10px 20px",
            color: "#fff",
            ":hover": {
              backgroundColor: "#3b3f43",
            },
          }}
          startIcon={<GitHub fontSize="large" />}
          onClick={loginWithGithub}
        >
          Sign in with GitHub
        </Button>
      </Stack>
    </Grid>
  );
}
