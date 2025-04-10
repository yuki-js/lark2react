import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { TextElement, TextStyle } from "../../types/block";
import { containsUrl } from "../../utils/utils";
import { Comment } from "../Comment";

const textContainerStyle = css({});

export const Text: React.FC<{
  elements: TextElement[];
  style?: TextStyle;
}> = ({ elements, style }) => {
  const align = style?.align || 1;
  const containerStyle = css({
    textAlign:
      align === 1
        ? "left"
        : align === 2
          ? "center"
          : align === 3
            ? "right"
            : "left",
  });

  return (
    <div css={[textContainerStyle, containerStyle]}>
      {elements.map((element, index) => {
        if (!element.text_run) {
          return null;
        }

        const style = css({
          color: element.text_run.text_element_style?.bold ? "#000" : "#333",
          fontWeight: element.text_run.text_element_style?.bold
            ? "bold"
            : "normal",
          fontStyle: element.text_run.text_element_style?.italic
            ? "italic"
            : "normal",
          textDecoration:
            [
              element.text_run.text_element_style?.strikethrough &&
                "line-through",
              element.text_run.text_element_style?.underline && "underline",
            ]
              .filter(Boolean)
              .join(" ") || "none",
          fontFamily: element.text_run.text_element_style?.inline_code
            ? "monospace"
            : "inherit",
          backgroundColor: element.text_run.text_element_style?.inline_code
            ? "#f6f8fa"
            : "transparent",
          padding: element.text_run.text_element_style?.inline_code
            ? "2px 4px"
            : "0",
          borderRadius: element.text_run.text_element_style?.inline_code
            ? "3px"
            : "0",
        });

        //文字列にリンクが紐づいているor文字列がhttps://で始まる場合はリンクとして扱う
        let url = element.text_run.text_element_style?.link?.url;
        let isUrl = false;
        if (url) {
          url = decodeURIComponent(url);
          isUrl = true;
        } else if (containsUrl(element.text_run.content)) {
          url = element.text_run.content;
          isUrl = true;
        }

        const inner = (
          <span key={index} css={style}>
            {isUrl ? (
              <a href={url} target="_blank">
                {element.text_run.content}
              </a>
            ) : (
              element.text_run.content
            )}
          </span>
        );

        //コメントが紐づけられている場合は、文字列にマーカーを付与
        const comment = element.text_run.text_element_style?.comment_ids;

        if (Array.isArray(comment) && comment.length > 0) {
          return (
            <Comment commentIds={comment} key={index}>
              {inner}
            </Comment>
          );
        }

        return inner;
      })}
    </div>
  );
};

export const TextBlock: BlockInnerComponent = ({ block }) => {
  return (
    <Text
      elements={block.text?.elements as unknown as TextElement[]} // todo: safer way
      style={block.text?.style}
    />
  );
};
