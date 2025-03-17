import React, { createContext, useContext } from "react";

interface TextElementStyle {
  bold?: boolean;
  inline_code?: boolean;
  italic?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
}

interface TextRun {
  content: string;
  text_element_style?: TextElementStyle;
  comment_ids?: string[];
}

export interface Element {
  text_run: TextRun;
}

interface BlockStyle {
  align?: number;
  folded?: boolean;
  done?: boolean;
  sequence?: number | "auto";
}

interface BlockContent {
  elements: Element[];
  style?: BlockStyle;
}

interface ImageContent {
  token: string;
  width: number;
  height: number;
}

export interface Block {
  block_id: string;
  block_type: number;
  parent_id: string;
  children?: string[];
  page?: BlockContent;
  text?: BlockContent;
  heading1?: BlockContent;
  heading2?: BlockContent;
  heading3?: BlockContent;
  heading4?: BlockContent;
  heading5?: BlockContent;
  heading6?: BlockContent;
  heading7?: BlockContent;
  heading8?: BlockContent;
  heading9?: BlockContent;
  bullet?: BlockContent;
  ordered?: BlockContent;
  code?: BlockContent & {
    language: string;
  };
  todo?: BlockContent & {
    style?: BlockStyle & {
      done?: boolean;
    };
  };
  callout?: {
    background_color: number;
    border_color: number;
    emoji_id: string;
  };
  image?: ImageContent;
  quote?: BlockContent;
  comment_ids?: string[];
}

interface BlockStore {
  blocks: Record<string, Block>;
  rootId: string;
}

const BlockStoreContext = createContext<BlockStore | null>(null);

export const useBlockStore = () => {
  const context = useContext(BlockStoreContext);
  if (!context) {
    throw new Error("useBlockStore must be used within a BlockStoreProvider");
  }
  return context;
};

interface BlockStoreProviderProps {
  items: Block[];
  children: React.ReactNode;
}

export const BlockStoreProvider: React.FC<BlockStoreProviderProps> = ({
  items,
  children,
}) => {
  // Convert array to map for O(1) lookups
  const blocks = items.reduce<Record<string, Block>>((acc, block) => {
    acc[block.block_id] = block;
    return acc;
  }, {});

  // Find root block (block with no parent)
  const rootId =
    items.find((block) => !block.parent_id)?.block_id || items[0]?.block_id;

  return (
    <BlockStoreContext.Provider value={{ blocks, rootId }}>
      {children}
    </BlockStoreContext.Provider>
  );
};
