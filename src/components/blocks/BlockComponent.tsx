import React, { memo } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { CurrentBlockProvider } from "../../contexts/CurrentBlockContext";
import { useBlockStore } from "../../contexts/BlockStoreContext";
import { Page } from "./Page";
import { TextBlock } from "./Text";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Heading7,
  Heading8,
  Heading9,
} from "./Heading";
import { UnorderedList } from "./UnorderedList";
import { OrderedList } from "./OrderedList";
import { CodeBlock } from "./CodeBlock";
import { Todo } from "./Todo";
import { Callout } from "./Callout";
import { Divider } from "./Divider";
import { Image } from "./Image";
import { QuoteContainer } from "./QuoteContainer";
import { css } from "@emotion/react";

const BLOCK_COMPONENTS: Record<number, React.FC> = {
  1: Page, // Page
  2: TextBlock, // Text
  3: Heading1, // Heading1
  4: Heading2, // Heading2
  5: Heading3, // Heading3
  6: Heading4, // Heading4
  7: Heading5, // Heading5
  8: Heading6, // Heading6
  9: Heading7, // Heading7
  10: Heading8, // Heading8
  11: Heading9, // Heading9
  12: UnorderedList, // UnorderedList
  13: OrderedList, // OrderedList
  14: CodeBlock, // CodeBlock
  17: Todo, // Todo
  19: Callout, // Callout
  22: Divider, // Divider
  27: Image, // Image
  34: QuoteContainer, // QuoteContainer
};

const unsupportedBlockStyle = css({
  fontSize: "14px",
  padding: "12px",
  margin: "8px 0",
  backgroundColor: "#fff3f3",
  border: "1px solid #dc3545",
  borderRadius: "4px",
  color: "#dc3545",
});

interface UnsupportedBlockProps {
  type: number;
  error?: string;
}

const UnsupportedBlock: React.FC<UnsupportedBlockProps> = ({ type, error }) => (
  <div css={unsupportedBlockStyle}>
    <strong>Unsupported block type: {type}</strong>
    {error && <div>{error}</div>}
  </div>
);

interface BlockComponentProps {
  blockId: string;
}

const BlockComponentBase: React.FC<BlockComponentProps> = ({ blockId }) => {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    return <UnsupportedBlock type={-1} error={`Block ${blockId} not found`} />;
  }

  const Component = BLOCK_COMPONENTS[block.block_type];

  if (!Component) {
    return <UnsupportedBlock type={block.block_type} />;
  }
  const showDebugInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Block ID:", blockId);
    console.log("Block Data:", block);
    console.log("Parent Block Data:", blocks[block.parent_id]);
  };
  return (
    <div onClick={showDebugInfo}>
      <CurrentBlockProvider blockId={blockId}>
        <ErrorBoundary>
          <Component />
        </ErrorBoundary>
      </CurrentBlockProvider>
    </div>
  );
};

export const BlockComponent = memo(BlockComponentBase);
BlockComponent.displayName = "BlockComponent";
