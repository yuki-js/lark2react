import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";

export function OrderedList({ blockDataArr, hash }) {

  const startIndex = blockDataArr[0].ordered.style.sequence;
  
  const olStyle = css({
    paddingLeft: "0px",
  });

  return (
    <div>
      <ol start={startIndex}>
        {blockDataArr.map((blockData, i) => {
          const elements = blockData.ordered.elements;

          return (
            <div key={i}>
              <li>
                {elements.map((element, j) => {
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
                  const inlineCode = element.text_run.text_element_style
                    .inline_code
                    ? "monospace"
                    : "inherit";

                  const italic = element.text_run.text_element_style.italic
                    ? "italic"
                    : "normal";

                  const strikeThrough = element.text_run.text_element_style
                    .strikethrough
                    ? "line-through"
                    : "none";
                  const underline = element.text_run.text_element_style
                    .underline
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
                    display: "inline-block",
                  });

                  return (
                    <div key={j} css={cssStyle}>
                      {element.text_run.content}
                    </div>
                  );
                })}
              </li>
              <div>{displayChildComponent(blockData, hash)}</div>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
