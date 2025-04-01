import { BlockComponent } from "./blocks/BlockComponent";
import { BlockStoreProvider } from "../contexts/BlockStoreContext";
import { Block } from "../types/block";

interface ConverterProps {
  items: Block[];
}

export const Converter: React.FC<ConverterProps> = ({ items }) => {
  // Find the root block (usually a Page block with no parent)
  const rootId =
    items.find((block) => block.block_type === 1)?.block_id ||
    items[0]?.block_id;

  if (!rootId) {
    return null;
  }

  return (
    <BlockStoreProvider items={items}>
      <BlockComponent blockId={rootId} />
    </BlockStoreProvider>
  );
};
