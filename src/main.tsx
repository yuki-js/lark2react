import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import InputTextArea from './components/InputTextArea'


function App() {
  const [output, setOutput] = useState("");

  const handleConvert = (inputText: string) => {
    setOutput(inputText);
    console.log(inputText);
  };

  return (
    <div>
      <h1>JSON to React Component</h1>
      <InputTextArea onConvert={handleConvert} />
      <div>{output}</div>
    </div>
  )
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
