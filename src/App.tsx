import { css } from "@emotion/react";
import InputDocumentId from "./components/InputDocumentId";
import { Converter } from "./components/Converter";
import {
  getDocumentBlocks,
  getTenantAccessToken,
} from "./utils/apiHelper";
import { useEffect, useState } from "react";
import {
  DocumentIdProvider,
  useDocumentId,
} from "./contexts/documentIdContext";


const containerStyle = css({
  display: "flex",
});

//DOCを表示する領域
const mainContentStyle = css({
  flex: 3,
  padding: 20,
});

//コメントを表示する領域
const sidebarStyle = css({
  flex: 1,
  padding: 20,
  backgroundColor: "#f9f9f9",
  borderLeft: "1px solid #ddd",
  overflowY: "auto",
});


function App() {
  return (
    <DocumentIdProvider>
      <AppContent />
    </DocumentIdProvider>
  );
}

function AppContent() {
  const { documentId, setDocumentId } = useDocumentId();

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const tenantAccessToken = await getTenantAccessToken();
        const json = await getDocumentBlocks(documentId, tenantAccessToken);

        setItems(json.data.items);
      } catch (error) {
        setItems([]);
        console.error("API Error:", error);
      }
    }

    if (documentId) {
      fetchData();
    }
  }, [documentId]); // `documentId` が変更されたときのみ実行

  return (
    <div>
      <h1>Lark to React</h1>
      <InputDocumentId setDocumentId={setDocumentId} />
      <div css={containerStyle}>
        <div css={mainContentStyle}>
          {items.length > 0 && <Converter items={items} />}
        </div>
        <div css={sidebarStyle}>
          <div>comment area</div>
        </div>
      </div>
    </div>
  );
}

export default App;
