import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { Converter } from "./components/Converter";
import { getDocumentBlocks, getTenantAccessToken, getCommentContent } from "./utils/apiHelper";
import { Block } from "./contexts/BlockStoreContext";
import { ApiResponse } from "./types/api";
import { CommentIdsProvider } from "./contexts/commentIdsContext";
import { CommentList } from "./components/blocks/Comment";

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

const inputStyle = css({
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "16px",
  "&:focus": {
    outline: "none",
    borderColor: "#1a73e8",
    boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
  },
});

export default function App() {
  const [documentId, setDocumentId] = useState<string>("");
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

        const comment = await getCommentContent("Lqzudvi1DokvIqxBn2rj94udpob", tenantAccessToken);
        console.log("comment");
        console.log(comment);

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

  const handleDocumentIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDocumentId(event.target.value);
  };

  return (
    <CommentIdsProvider>
      <div>
        <header css={headerStyle}>
          <h1>Lark to React</h1>
          <input
            type="text"
            value={documentId}
            onChange={handleDocumentIdChange}
            placeholder="Enter Document ID"
            css={inputStyle}
          />
          {error && (
            <div css={css({ color: "#dc3545", marginTop: "8px" })}>{error}</div>
          )}
        </header>

        <div css={containerStyle}>
          <main css={mainContentStyle}>
            {items.length > 0 && <Converter items={items} />}
          </main>
          <aside css={sidebarStyle}>
            {/* Comments section can be implemented here */}
            <CommentList />
          </aside>
        </div>
      </div>
    </CommentIdsProvider>
  );
}
