import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { BlockComponent } from "./BlockComponent";

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
  console.log(block);

  if (!block.quote?.elements) {
    return null;
  }

  console.log(block.children);

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
        {block.children?.map((childId) => (
          <BlockComponent key={childId} blockId={childId} />
        ))}
      </div>
    </blockquote>
  );
};
