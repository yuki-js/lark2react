import { BlockComponent } from "./blocks/BlockComponent";
import { Block, BlockStoreProvider } from "../contexts/BlockStoreContext";

interface ConverterProps {
  items: Block[];
}

export const Converter: React.FC<ConverterProps> = ({ items }) => {
  // Find the root block (usually a Page block with no parent)
  const rootId =
    items.find((block) => !block.parent_id)?.block_id || items[0]?.block_id;

  if (!rootId) {
    return null;
  }

  return (
    <BlockStoreProvider items={items}>
      <BlockComponent blockId={rootId} />
    </BlockStoreProvider>
  );
};
