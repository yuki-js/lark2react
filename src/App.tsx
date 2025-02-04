import InputTextArea from "./components/InputTextArea";
import InputDocumentId from "./components/InputDocumentId";
import InputUserAccessToken from "./components/InputUserAccessToken";
import { Converter } from "./components/Converter";
import { connectApi } from "./utils/apiHelper";
import React, { useState } from "react";
import { DocumentIdProvider, useDocumentId } from "./contexts/documentIdContext";

function App() {
  const [items, setItems] = useState<any[]>([]);

  const handleConvert = (inputText: string) => {
    try {
      const jsonObject = JSON.parse(inputText);
      const items = jsonObject.data.items;
      setItems(items);
    } catch (error) {
      console.log(`エラー: ${(error as Error).message}`);
    }
  };

  return (
    <DocumentIdProvider>
      <AppContent />
    </DocumentIdProvider>
  );
}


function AppContent() {
  const { documentId, setDocumentId } = useDocumentId(); 

  const [items, setItems] = useState<any[]>([]);

  const handleConvert = (inputText: string) => {
    try {
      const jsonObject = JSON.parse(inputText);
      const items = jsonObject.data.items;
      setItems(items);
    } catch (error) {
      console.log(`エラー: ${(error as Error).message}`);
    }
  };

  //指定する必要あり
  const userAccessToken = "";

  return (
    <div>
      <h1>JSON to React Component</h1>
      <InputDocumentId setDocumentId={setDocumentId} /> 
      <InputUserAccessToken/> 
      <div>{connectApi(documentId, userAccessToken)}</div> 
      <InputTextArea onConvert={handleConvert} />
      {items.length > 0 && <Converter items={items} />}
    </div>
  );
}

export default App;
