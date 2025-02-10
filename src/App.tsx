import InputTextArea from "./components/InputTextArea";
import InputDocumentId from "./components/InputDocumentId";
import InputUserAccessToken from "./components/InputUserAccessToken";
import { Converter } from "./components/Converter";
import { getJson, getTenantAccessToken } from "./utils/apiHelper";
import React, { useEffect, useState } from "react";
import { DocumentIdProvider, useDocumentId } from "./contexts/documentIdContext";

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


  

  //指定する必要あり
  const userAccessToken = "u-ecYYbL6W90May1IAgbK1QeYllrZ7k1vFpE0w41102Lt5";
  
  useEffect(() => {
    async function fetchData() {
      try {
        const json = await getJson(documentId, userAccessToken);

        // テナントアクセストークンを取得できるかテスト
        const ta = await getTenantAccessToken();
        console.log(ta);


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
      <h1>JSON to React Component</h1>
      <InputDocumentId setDocumentId={setDocumentId} /> 
      <InputUserAccessToken/> 
      {items.length > 0 && <Converter items={items} />}
    </div>
  );
}

export default App;
