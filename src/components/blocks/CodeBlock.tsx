import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../contexts/BlockStoreContext";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";

const boxStyle = css({
  backgroundColor: "#f5f5f5",
  border: "1px solid #a9a9a9",
  borderRadius: "3px",
  marginBottom: "16px",
  
});


const codeBlockStyle = css({
  padding: "16px",
  fontFamily: "monospace",
  fontSize: "14px",
  lineHeight: "1.5",
  overflowX: "auto",
  whiteSpace: "pre",
});

const languageTagStyle = css({
  display: "inline-block",
  padding: "6px 6px",
  borderRadius: "3px",
  fontSize: "14px",
  marginBottom: "8px",
  color: "gray",
});

export const CodeBlock: React.FC = () => {
  const { block } = useCurrentBlock();

  const codeLanguage = CODE_LANGUAGE[block.code.style.language];

  console.log(block);

  // if (!block.code?.elements || !block.code.language) {
  //   return null;
  // }

  const content = block.code.elements
    .map((element: Element) => element.text_run?.content || "")
    .join("");

  return (
    <div css={boxStyle}>
      <div css={languageTagStyle}>{codeLanguage}</div>
      <pre css={codeBlockStyle}>
        <code>{content}</code>
      </pre>
    </div>
  );
};
