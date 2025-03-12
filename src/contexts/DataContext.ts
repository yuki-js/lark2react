import { createContext } from "react";
import { BlockItem } from "../utils/utils";


export const BlockDataContext = createContext(null);
export const HashContext = createContext<Record<string, BlockItem> | null>(null);
