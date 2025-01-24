import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

export function Text({ blockData}) {
  const hash  = useContext(HashContext); 
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
      })}
    </div>
  );
}
