import React, { createContext, useContext } from "react";
import { Block, BlockContext as IBlockContext, Document } from "../types/block";

const BlockContext = createContext<IBlockContext | null>(null);

export interface BlockProviderProps {
  block: Block;
  parent?: Block;
  level?: number;
  document: Document;
  children: React.ReactNode;
}

export const BlockProvider: React.FC<BlockProviderProps> = ({
  block,
  parent,
  level = 0,
  document,
  children,
}) => {
  const value: IBlockContext = {
    block,
    parent,
    level,
    document,
  };

  return (
    <BlockContext.Provider value={value}>{children}</BlockContext.Provider>
  );
};

export const useBlock = (): IBlockContext => {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error("useBlock must be used within a BlockProvider");
  }
  return context;
};

export const DocumentProvider: React.FC<{
  document: Document;
  children: React.ReactNode;
}> = ({ document, children }) => {
  const rootBlock = document.blocks[0];
  if (!rootBlock) {
    throw new Error("Document has no blocks");
  }

  return (
    <BlockProvider block={rootBlock} document={document} level={0}>
      {children}
    </BlockProvider>
  );
};
