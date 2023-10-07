import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function UpdatedDate({ date }) {
  const dateObj = new Date(date);
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const dateString = dateObj.toLocaleDateString(undefined, dateOptions);

  return <Typography variant="body1">{dateString}</Typography>;
}

UpdatedDate.propTypes = {
  date: PropTypes.string.isRequired,
};
