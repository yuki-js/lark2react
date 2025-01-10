import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

const generateTextStyle = ({
  text_color,
  background_color,
  bold,
  inline_code,
  italic,
  strikethrough,
  underline,
}: TextStyle) => {
  const strikethroughParam = strikethrough ? "line-through" : "none";
  const underlineParam = underline ? "underline" : "none";

  return css({
    color: FONT_COLOR[text_color] || "black",
    fontWeight: bold ? "bold" : "normal",
    fontFamily: inline_code ? "monospace" : "inherit",
    fontStyle: italic ? "italic" : "normal",
    backgroundColor: FONT_BACKGROUND_COLOR[background_color],
    textDecoration:
      [
        strikethroughParam === "line-through" && "line-through",
        underlineParam === "underline" && "underline",
      ]
        .filter(Boolean)
        .join(" ") || "none",
  });
};

export function Todo({ blockData, hash }) {
  const isDone: boolean = blockData.todo.style.done;
  const elements = blockData.todo.elements;

  const labelStyle = css({
    display: "inline-flex",
  });

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <label css={labelStyle}>
      <input type="checkbox" defaultChecked={isDone} />
      <div>
        {elements.map((element, index) => {
          const style = element.text_run.text_element_style;
          console.log(style);
          const dynamicStyle = generateTextStyle(style);

          if (isDone) {
            return (
              <div
                key={index}
                css={[
                  staticStyle,
                  dynamicStyle,
                  css({ textDecoration: "line-through" }),
                ]}
              >
                {element.text_run.content}
              </div>
            );
          } else {
            return (
              <div key={index} css={[staticStyle, dynamicStyle]}>
                {element.text_run.content}
              </div>
            );
          }
        })}
      </div>
    </label>
  );
}
