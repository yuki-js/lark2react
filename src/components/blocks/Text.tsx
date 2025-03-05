import { css } from "@emotion/react";
import { generateTextStyle } from "../../utils/utils";
import { containsUrl } from "../../utils/utils";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

export function Text({ blockData }) {
  const elements = blockData.text.elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      {elements.map((element, index) => {
        if (element?.text_run) {
          const style = element.text_run.text_element_style;
          const dynamicStyle = generateTextStyle(style);

          //url処理
          let url;
          let isUrl = false;
          if (style.link) {
            url = decodeURIComponent(style.link.url);
            isUrl = true;
          } else if (containsUrl(element.text_run.content)) {
            url = element.text_run.content;
            isUrl = true;
          }

          //comment処理
          let commentIds = [];
          let isComment = false;
          if(style.comment_ids){
            commentIds = style.comment_ids;
            isComment = true;
          }

          return (
            <div key={index} css={[staticStyle, dynamicStyle]}>
              {isUrl ? (
                <a href={url} target="_blank">
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
  );
}
