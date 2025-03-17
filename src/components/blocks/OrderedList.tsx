import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../contexts/BlockStoreContext";

const listStyle = css({
  listStyleType: "decimal",
  marginLeft: "24px",
  marginBottom: "16px",
});

const listItemStyle = css({
  marginBottom: "8px",
  "&:last-child": {
    marginBottom: 0,
  },
});

export const OrderedList: React.FC = () => {
  const { block, level } = useCurrentBlock();

  if (!block.bullet?.elements) {
    return null;
  }

  const align = block.bullet.style?.align || 1;

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

  const nestedListStyle = css(
    listStyle,
    level > 0 && {
      listStyleType:
        level % 3 === 1
          ? "lower-alpha"
          : level % 3 === 2
            ? "lower-roman"
            : "decimal",
    },
  );

  return (
    <ol css={[nestedListStyle, containerStyle]}>
      {block.bullet.elements.map((element: Element, index: number) => {
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

        return (
          <li key={index} css={listItemStyle}>
            <span css={style}>{element.text_run.content}</span>
          </li>
        );
      })}
    </ol>
  );
};
