import { useEffect, useState } from "react";
import { BlockComponent } from "./blocks/BlockComponent";
import { BlockStoreProvider } from "../contexts/BlockStoreContext";
import { Block } from "../types/block";
import { ApiResponse } from "../types/api";
import { getDocumentBlocks } from "../utils/apiHelper";

interface ConverterProps {
  documentId: string;
}

export const Converter: React.FC<ConverterProps> = ({ documentId }) => {
  const [items, setItems] = useState<Block[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!documentId) {
        setItems([]);
        setError(null);
        return;
      }

      try {
        const json = (await getDocumentBlocks(documentId)) as ApiResponse;

        const validatedItems = json.data.items.map((item) => ({
          ...item,
          parent_id: item.parent_id || "",
          block_id: item.block_id || "",
          block_type: item.block_type || 1,
        })) as Block[];

        setItems(validatedItems);
        setError(null);
      } catch (error) {
        setItems([]);
        setError(
          error instanceof Error ? error.message : "Failed to fetch document",
        );
        console.error("API Error:", error);
      }
    }

    fetchData();
  }, [documentId]);

  if (error) {
    return <div style={{ color: "#dc3545" }}>{error}</div>;
  }

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
