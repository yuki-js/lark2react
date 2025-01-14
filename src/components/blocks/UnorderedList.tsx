import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
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

//FIXME: 点の位置を左側にずらしたい
export function UnorderedList({ blockDataArr, hash }) {
  const ulStyle = css({
    paddingLeft: "0px",
  });

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      <ul>
        {blockDataArr.map((blockData, i) => {
          const elements = blockData.bullet.elements;

          return (
            <div key={i}>
              <li>
                {elements.map((element, j) => {
                  const style = element.text_run.text_element_style;
                  const dynamicStyle = generateTextStyle(style);

                  return (
                    <div key={j} css={[staticStyle, dynamicStyle]}>
                      {element.text_run.content}
                    </div>
                  );
                })}
              </li>
              <div>{displayChildComponent(blockData, hash)}</div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
