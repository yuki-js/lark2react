import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { BlockComponent } from "./BlockComponent";


export const QuoteContainer: React.FC = () => {
  const { block } = useCurrentBlock();
  console.log(block);

  const quoteContainerStyle = css({
    borderLeft: "4px solid lightgray",
    paddingLeft: "16px",
  })

  return (
    
    <div css={quoteContainerStyle}>
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
    
  );
};


