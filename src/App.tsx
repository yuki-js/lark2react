import InputTextArea from './components/InputTextArea'
import { Converter } from './components/Converter';
import { convertJsonToReactComponent } from './utils/ConvertJsonToReactComponent';
import React, { useState } from 'react';

function App() {
  const [items, setItems] = useState<any[]>([]); 

  const handleConvert = (inputText: string) => {
    try {
      const jsonObject = JSON.parse(inputText);

      const items = jsonObject.data.items;
      setItems(items);
    }catch (error){
      console.log(`エラー: ${(error as Error).message}`);
    }
  };

  
  return (
    <div>
      <h1>JSON to React Component</h1>
      <InputTextArea onConvert={handleConvert} />
      {items.length > 0 && <Converter items={items} />}
    </div>
  )

}

export default App
