import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../contexts/BlockStoreContext";

const quoteContainerStyle = css({
  borderLeft: "4px solid #e1e4e8",
  paddingLeft: "16px",
  marginBottom: "16px",
  color: "#6a737d",
  "& > *:last-child": {
    marginBottom: 0,
  },
});

const quoteContentStyle = css({
  fontSize: "16px",
  lineHeight: "1.6",
  fontStyle: "italic",
});

export const QuoteContainer: React.FC = () => {
  const { block } = useCurrentBlock();

  if (!block.quote?.elements) {
    return null;
  }

  const align = block.quote.style?.align || 1;

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
    <blockquote css={[quoteContainerStyle, containerStyle]}>
      <div css={quoteContentStyle}>
        {block.quote.elements.map((element: Element, index: number) => {
          if (!element.text_run) {
            return null;
          }

          const style = css({
            color: element.text_run.text_element_style?.bold
              ? "#000"
              : "#6a737d",
            fontWeight: element.text_run.text_element_style?.bold
              ? "bold"
              : "normal",
            fontStyle: "italic", // Always italic for quotes
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
            <span key={index} css={style}>
              {element.text_run.content}
            </span>
          );
        })}
      </div>
    </blockquote>
  );
};
