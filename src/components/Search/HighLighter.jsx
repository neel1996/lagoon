import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import PropTypes from "prop-types";

export default function HighLighter(props) {
  const match = /language-(\w+)/.exec(props.className || "");

  return !props.inline && match ? (
    <SyntaxHighlighter
      style={{
        ...atomDark,
        userSelect: "all",
      }}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(props.children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code {...props} className="language-javascript">
      {props.children}
    </code>
  );
}

HighLighter.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  inline: PropTypes.bool.isRequired,
};
