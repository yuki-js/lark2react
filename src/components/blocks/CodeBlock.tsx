import { css } from "@emotion/react";
import { CODE_LANGUAGE } from "../../constants/codeLanguage";
import { generateTextStyle } from "../../utils/utils";

// Define the type for the elements array
interface Element {
  text_run: {
    text_element_style: any;
    content: string;
  };
  [key: string]: any;
}

interface BlockData {
  code: {
    elements: Element[];
    style: {
      language: string;
    };
  };
  [key: string]: any;
}

// Define the props for the CodeBlock component
interface CodeBlockProps {
  blockData: BlockData;
}

export function CodeBlock({ blockData }: CodeBlockProps) {
  const elements = blockData.code.elements;
  const codeLanguage = CODE_LANGUAGE[blockData.code.style.language];

  const staticStyle = css({
    wordBreak: "break-word",
  });

  const boxStyle = css({
    backgroundColor: "whitesmoke",
    border: "2px solid darkgray",
    borderRadius: "8px",
    padding: "15px",
    marginTop: "10px",
    marginBottom: "10px",
  });

  const codeLanguageStyle = css({
    fontSize: "12px",
    color: "gray",
  });

  const preStyle = css({
    whiteSpace: "pre-wrap", // 折り返しを有効化
    wordWrap: "break-word",
    overflowWrap: "break-word", // 長い単語を折り返し
    lineHeight: "1.6",
  });

  return (
    <div css={boxStyle}>
      <div css={codeLanguageStyle}>{codeLanguage}</div>
      <pre css={preStyle}>
        <code>
          {elements.map((element, index) => {
            const style = element.text_run.text_element_style;
            const dynamicStyle = generateTextStyle(style);

            return (
              <div key={index} css={[staticStyle, dynamicStyle]}>
                {element.text_run.content}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
  );
}
