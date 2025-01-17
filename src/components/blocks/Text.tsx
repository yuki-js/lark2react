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

export function Text({ blockData, hash }) {
  const elements = blockData.text.elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      {elements.map((element, index) => {
        const style = element.text_run.text_element_style;
        const dynamicStyle = generateTextStyle(style);

        //linkスタイルが存在する場合、リンクを張る
        //FIXME : できればリダイレクトされるようにしたい
        if (style.link) {
          return (
            <div key={index} css={[staticStyle, dynamicStyle]}>
              <a href={style.link.url} target="_self">
                {element.text_run.content}
              </a>
            </div>
          );
        }

        return (
          <div key={index} css={[staticStyle, dynamicStyle]}>
            {element.text_run.content}
          </div>
        );
      })}
    </div>
  );
}
