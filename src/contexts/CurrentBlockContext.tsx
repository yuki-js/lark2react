import React, { createContext, useContext } from "react";
import { useBlockStore } from "./BlockStoreContext";
import { Block } from "../types/block";

interface CurrentBlockContext {
  block: Block;
}

const CurrentBlockContext = createContext<CurrentBlockContext | null>(null);

// 大した処理をしていないのでeslintを無効化
// eslint-disable-next-line react-refresh/only-export-components
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
  children,
}) => {
  const { blocks } = useBlockStore();
  const block = blocks[blockId];

  if (!block) {
    throw new Error(`Block with id ${blockId} not found`);
  }

  return (
    <CurrentBlockContext.Provider value={{ block }}>
      {children}
    </CurrentBlockContext.Provider>
  );
};
