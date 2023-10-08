import { KeyboardArrowRight, Search } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function SearchBar({ query, setQuery, disabled }) {
  return (
    <Grid
      container
      sx={{
        width: "80%",
        alignContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0px 5px 5px rgb(0, 0, 0, 0.2)",
        margin: "30px auto",
        border: "2px solid #ededed",
      }}
    >
      <Grid
        item
        xl={11}
        sm={11}
        xs={10}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          "&.MuiOutlinedInput-notchedOutline": {
            borderWidth: "0px",
            outline: "none",
          },
        }}
      >
        <TextField
          fullWidth
          variant="standard"
          placeholder={"What are looking for?"}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={disabled}
          sx={{
            borderRadius: "10px 0px 0px 10px",
          }}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <KeyboardArrowRight
                  sx={{
                    fontSize: "40px",
                    color: "#86878a",
                    padding: "0px",
                  }}
                />
              </InputAdornment>
            ),
            style: {
              color: "#777",
              border: "none",
              outline: "none",
              padding: "14px",
            },
          }}
        />
      </Grid>
      <Grid
        item
        xl={1}
        sm={1}
        xs={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          borderRadius: "0px 10px 10px 0px",
        }}
      >
        <IconButton
          type="submit"
          sx={{
            height: "100%",
          }}
        >
          <Search
            sx={{
              color: "#777",
            }}
          />
        </IconButton>
      </Grid>
    </Grid>
  );
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};
