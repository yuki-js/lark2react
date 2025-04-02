import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Converter } from "./components/Converter";
import { getDocumentBlocks, getTenantAccessToken } from "./utils/apiHelper";
import { Block } from "./types/block";
import { ApiResponse } from "./types/api";
import { CommentList } from "./components/blocks/Comment";
import { CommentProvider } from "./contexts/CommentContext";
import { InputDocumentId } from "./components/InputDocumentId";
import {
  useDocumentContext,
  DocumentProvider,
} from "./contexts/DocumentContext";

const containerStyle = css({
  display: "flex",
});

const mainContentStyle = css({
  flex: 3,
  padding: "20px",
});

const sidebarStyle = css({
  flex: 1,
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderLeft: "1px solid #ddd",
  overflowY: "auto",
});

const headerStyle = css({
  marginBottom: "24px",
});

function AppContent() {
  const { documentId } = useDocumentContext();

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
        const tenantAccessToken = await getTenantAccessToken();

        const json = (await getDocumentBlocks(
          documentId,
          tenantAccessToken,
        )) as ApiResponse;

        // Ensure all required fields are present
        const validatedItems = json.data.items.map((item) => ({
          ...item,
          parent_id: item.parent_id || "", // Ensure parent_id exists
          block_id: item.block_id || "", // Ensure block_id exists
          block_type: item.block_type || 1, // Default to Page type if missing
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

  return (
    <div>
      <header css={headerStyle}>
        <h1>Lark to React</h1>
        <InputDocumentId />
        {error && (
          <div css={css({ color: "#dc3545", marginTop: "8px" })}>{error}</div>
        )}
      </header>

      <div css={containerStyle}>
        <main css={mainContentStyle}>
          {items.length > 0 && <Converter items={items} />}
        </main>
        <aside css={sidebarStyle}>
          <CommentProvider>
            <CommentList />
          </CommentProvider>
        </aside>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DocumentProvider>
      <AppContent />
    </DocumentProvider>
  );
}
