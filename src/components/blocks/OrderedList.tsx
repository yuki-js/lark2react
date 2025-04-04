import { useBlockStore } from "../../contexts/BlockStoreContext";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { BlockComponent } from "../BlockComponent";
import { Text } from "./Text";

import { css } from "@emotion/react";

export const OrderedList: React.FC = () => {
  const { block } = useCurrentBlock();
  const blockStore = useBlockStore();

  if (!block.ordered?.elements) {
    return null;
  }

  let seq = block.ordered.style?.sequence;
  if (seq === "auto") {
    seq =
      blockStore.blocks[block.parent_id].children!.findIndex(
        (childId) => childId === block.block_id,
      ) + 1;
  }

  const sty = css({
    paddingLeft: "24px",
    position: "relative",
    "::before": {
      content: `"${seq}"`,
      display: "block",
      margin: "0 auto",
      position: "absolute",
      top: "0em",
      left: "0px",
    },
  });

  return (
    <div css={sty}>
      <Text {...block.ordered} />
      {block.children?.map((childId) => (
        <BlockComponent key={childId} blockId={childId} />
      ))}
    </div>
  );
};
