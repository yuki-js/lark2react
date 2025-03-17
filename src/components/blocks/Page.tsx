import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";

const titleStyle = css({
  fontWeight: "bold",
  fontSize: "36px",
  marginBottom: "24px",
});

export const Page: React.FC = () => {
  const { block } = useCurrentBlock();

  if (!block.page?.elements[0]?.text_run) {
    return null;
  }

  const title = block.page.elements[0].text_run.content;
  const align = block.page.style?.align || 1;

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
    <div css={containerStyle}>
      <div css={titleStyle}>{title}</div>
    </div>
  );
};
