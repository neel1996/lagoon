import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import Markdown from "react-markdown";
import HighLighter from "./HighLighter";

export default function CodeBlock({ message }) {
  if (message?.indexOf("`") === -1) {
    return message.split("\n").map((m, idx) => {
      return (
        <>
          <Typography variant="body2" key={m + idx}>
            {m}
          </Typography>
          {idx !== message.split("\n").length - 1 && <br />}
        </>
      );
    });
  }

  return (
    <Typography
      variant="body2"
      style={{
        userSelect: "text",
      }}
    >
      <Markdown
        components={{
          code({ inline, ...props }) {
            return <HighLighter inline={inline} {...props} />;
          },
        }}
      >
        {message}
      </Markdown>
    </Typography>
  );
}

CodeBlock.propTypes = {
  message: PropTypes.string.isRequired,
};
