import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { CODE_LANGUAGE } from "../../code_language/codeLanguage";

export function CodeBlock({ blockData, hash }) {
  const elements = blockData.code.elements;
  const codeLanguage = CODE_LANGUAGE[blockData.code.style.language];

  const boxStyle = css({
    backgroundColor: "whitesmoke",
    border: "2px solid darkgray",
    borderRadius: "8px",
    padding: "15px",
  })

  const codeLanguageStyle = css({
    fontSize: "12px",
    color: "gray",
  })

  const preStyle = css({
    whiteSpace: "pre-wrap", // 折り返しを有効化
    wordWrap: "break-word",
    overflowWrap: "break-word", // 長い単語を折り返し
    
  });

  return (
    <div css={boxStyle}>
      <div css={codeLanguageStyle}>{codeLanguage}</div>
      <pre css={preStyle}>
        <code>
          {elements.map((element, index) => {
            const elementTextColor =
              element.text_run.text_element_style.text_color;
            const elementBackgroundColor =
              element.text_run.text_element_style.background_color;

            const fontColor = elementTextColor
              ? FONT_COLOR[elementTextColor]
              : "black";
            const backgroundColor = elementBackgroundColor
              ? FONT_BACKGROUND_COLOR[elementBackgroundColor]
              : "transparent";

            const bold = element.text_run.text_element_style.bold
              ? "bold"
              : "normal";

            {
              /* todo inline codeでは、ボーダーラインなども表示させた方がいい*/
            }
            const inlineCode = element.text_run.text_element_style.inline_code
              ? "monospace"
              : "inherit";

            const italic = element.text_run.text_element_style.italic
              ? "italic"
              : "normal";

            const strikeThrough = element.text_run.text_element_style
              .strikethrough
              ? "line-through"
              : "none";
            const underline = element.text_run.text_element_style.underline
              ? "underline"
              : "none";

            const decoration =
              [
                strikeThrough === "line-through" && "line-through",
                underline === "underline" && "underline",
              ]
                .filter(Boolean)
                .join(" ") || "none";

            const cssStyle = css({
              color: fontColor,
              fontWeight: bold,
              fontFamily: inlineCode,
              fontStyle: italic,
              textDecoration: decoration,
              backgroundColor: backgroundColor,
              
              wordBreak: "break-word",
            });

            return (
              <div key={index} css={cssStyle}>
                {element.text_run.content}
              </div>
            );
          })}
        </code>
      </pre>
    </div>
    
  );
}
