import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../types/block";
import { containsUrl } from "../../utils/utils";

const todoContainerStyle = css({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "8px",
  gap: "8px",
});

const checkboxStyle = css({
  width: "16px",
  height: "16px",
  marginTop: "4px",
  appearance: "none",
  border: "2px solid #666",
  borderRadius: "3px",
  position: "relative",
  cursor: "pointer",
  "&:checked": {
    backgroundColor: "#1a73e8",
    borderColor: "#1a73e8",
    "&::after": {
      content: '""',
      position: "absolute",
      left: "4px",
      top: "1px",
      width: "4px",
      height: "8px",
      border: "solid white",
      borderWidth: "0 2px 2px 0",
      transform: "rotate(45deg)",
    },
  },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
  },
});

const contentStyle = css({
  flex: 1,
});

const doneTextStyle = css({
  textDecoration: "line-through",
  color: "#666",
});

export const Todo: React.FC = () => {
  const { block } = useCurrentBlock();

  if (!block.todo?.elements) {
    return null;
  }

  const isDone = block.todo.style?.done || false;
  const align = block.todo.style?.align || 1;

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
    <div css={[todoContainerStyle, containerStyle]}>
      <input type="checkbox" checked={isDone} css={checkboxStyle} readOnly />
      <div css={[contentStyle, isDone && doneTextStyle]}>
        {block.todo.elements.map((element: Element, index: number) => {
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
                isDone && "line-through",
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

          return (
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
        })}
      </div>
    </div>
  );
};
