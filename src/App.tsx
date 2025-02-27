import InputTextArea from "./components/InputTextArea";
import InputDocumentId from "./components/InputDocumentId";
import InputUserAccessToken from "./components/InputUserAccessToken";
import { Converter } from "./components/Converter";
import {
  getDocumentBlocks,
  getTenantAccessToken,
  getFile,
} from "./utils/apiHelper";
import React, { useEffect, useState } from "react";
import {
  DocumentIdProvider,
  useDocumentId,
} from "./contexts/documentIdContext";

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
      {items.length > 0 && <Converter items={items} />}
    </div>
  );
}

export default App;
