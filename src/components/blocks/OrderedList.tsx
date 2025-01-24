import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
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

//FIXME: 番号の位置を左側にずらしたい
export function OrderedList({ blockDataArr}) {
  const hash  = useContext(HashContext); 
  const startIndex = blockDataArr[0].ordered.style.sequence;

  const olStyle = css({
    paddingLeft: "0px",
  });

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
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
                  const style = element.text_run.text_element_style;
                  const dynamicStyle = generateTextStyle(style);

                  //linkスタイルが存在する場合、リンクを張る
                  return (
                    <div key={j} css={[staticStyle, dynamicStyle]}>
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
              </li>
              <div>{displayChildComponent(blockData, hash)}</div>
            </div>
          );
        })}
      </ol>
    </div>
  );
}
