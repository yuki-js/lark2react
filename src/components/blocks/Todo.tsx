import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

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
          const dynamicStyle = generateTextStyle(style);

          if (isDone) {
            //linkスタイルが存在する場合、リンクを張る
            return (
              <div
                key={index}
                css={[
                  staticStyle,
                  dynamicStyle,
                  css({ textDecoration: "line-through" }),
                ]}
              >
                {style.link ? (
                  <a href={style.link.url} target="_blank">
                    {element.text_run.content}
                  </a>
                ) : (
                  element.text_run.content
                )}
              </div>
            );
          } else {
            //linkスタイルが存在する場合、リンクを張る
            return (
              <div key={index} css={[staticStyle, dynamicStyle]}>
                {style.link ? (
                  <a href={style.link.url} target="_blank">
                    {element.text_run.content}
                  </a>
                ) : (
                  element.text_run.content
                )}
              </div>
            );
          }
        })}
      </div>
    </label>
  );
}
