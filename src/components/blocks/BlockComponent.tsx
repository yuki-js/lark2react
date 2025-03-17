import React, { memo } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { CurrentBlockProvider } from "../../contexts/CurrentBlockContext";
import { useBlockStore } from "../../contexts/BlockStoreContext";
import { Page } from "./Page";
import { Text } from "./Text";
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
  2: Text, // Text
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
  level?: number;
}

const BlockComponentBase: React.FC<BlockComponentProps> = ({
  blockId,
  level = 0,
}) => {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    return <UnsupportedBlock type={-1} error={`Block ${blockId} not found`} />;
  }

  const Component = BLOCK_COMPONENTS[block.block_type];

  if (!Component) {
    return <UnsupportedBlock type={block.block_type} />;
  }

  return (
    <CurrentBlockProvider blockId={blockId} level={level}>
      <ErrorBoundary>
        <Component />
        {block.children?.map((childId) => (
          <BlockComponent key={childId} blockId={childId} level={level + 1} />
        ))}
      </ErrorBoundary>
    </CurrentBlockProvider>
  );
};

export const BlockComponent = memo(BlockComponentBase);
BlockComponent.displayName = "BlockComponent";
