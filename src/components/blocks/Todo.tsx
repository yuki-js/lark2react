import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";

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
          const elementTextColor =
            element.text_run.text_element_style.text_color;
          const elementBackgroundColor =
            element.text_run.text_element_style.background_color;
          //チェックされている場合はgray色
          //todo : 黒以外の文字がチェックされた場合、本来は色が保存されるが、現在は強制的にgray
          const fontColor = FONT_COLOR[7];
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
          const cssStyle = css({
            color: fontColor,
            fontWeight: bold,
            fontFamily: inlineCode,
            fontStyle: italic,
            backgroundColor: backgroundColor,
          });

          
          if(isDone){
            return (
              <div key={index} css={[staticStyle, cssStyle,css({textDecoration: "line-through"})]}>
                {element.text_run.content}
              </div>
            );
          }else{
            return (
              <div key={index} css={[staticStyle, cssStyle]}>
                {element.text_run.content}
              </div>
            );
          };

        })}
      </div>
    </label>
  );
}
