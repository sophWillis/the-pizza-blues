import ReactMarkdown from "react-markdown";
import styles from "./rich-text.module.css";

export const RichText = ({ content, textAlign = "Left" }) => (
  <ReactMarkdown
    className={[
      styles["rich-text"],
      styles[`rich-text--${textAlign.toLowerCase()}`],
    ].join(" ")}
    linkTarget="_blank"
    disallowedElements={["h1"]}
  >
    {content}
  </ReactMarkdown>
);
