import { css } from "@emotion/react";
import { BlockInnerComponent } from "../../types";
import { BlockComponent } from "../BlockComponent";

export const QuoteContainer: BlockInnerComponent = ({ block }) => {
  const quoteContainerStyle = css({
    borderLeft: "4px solid lightgray",
    paddingLeft: "16px",
    marginTop: "8px",
    marginBottom: "8px",
  });

  return (
    <div css={quoteContainerStyle}>
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
