import React, { createContext, useContext } from "react";
import { Block, useBlockStore } from "./BlockStoreContext";

interface CurrentBlockContext {
  block: Block;
  level: number;
  parentBlock?: Block;
}

const CurrentBlockContext = createContext<CurrentBlockContext | null>(null);

export const useCurrentBlock = () => {
  const context = useContext(CurrentBlockContext);
  if (!context) {
    throw new Error(
      "useCurrentBlock must be used within a CurrentBlockProvider",
    );
  }
  return context;
};

interface CurrentBlockProviderProps {
  blockId: string;
  level?: number;
  children: React.ReactNode;
}

export const CurrentBlockProvider: React.FC<CurrentBlockProviderProps> = ({
  blockId,
  level = 0,
  children,
}) => {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  const parentBlock = block.parent_id ? blocks[block.parent_id] : undefined;

  return (
    <CurrentBlockContext.Provider value={{ block, level, parentBlock }}>
      {children}
    </CurrentBlockContext.Provider>
  );
};
