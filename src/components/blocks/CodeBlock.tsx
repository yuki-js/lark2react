import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../contexts/BlockStoreContext";

const codeBlockStyle = css({
  backgroundColor: "#f6f8fa",
  borderRadius: "6px",
  padding: "16px",
  marginBottom: "16px",
  fontFamily: "monospace",
  fontSize: "14px",
  lineHeight: "1.5",
  overflowX: "auto",
  whiteSpace: "pre",
});

const languageTagStyle = css({
  display: "inline-block",
  padding: "2px 6px",
  backgroundColor: "#e1e4e8",
  borderRadius: "3px",
  fontSize: "12px",
  marginBottom: "8px",
  color: "#24292e",
});

export const CodeBlock: React.FC = () => {
  const { block } = useCurrentBlock();

  if (!block.code?.elements || !block.code.language) {
    return null;
  }

  const content = block.code.elements
    .map((element: Element) => element.text_run?.content || "")
    .join("");

  return (
    <div>
      <div css={languageTagStyle}>{block.code.language}</div>
      <pre css={codeBlockStyle}>
        <code>{content}</code>
      </pre>
    </div>
  );
};
