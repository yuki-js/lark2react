import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InputTextArea from './components/InputTextArea'
import ConvertButton from './components/ConvertButton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h1>JSON to React Component</h1>
      <InputTextArea/>
      <ConvertButton/>
    </div>
  </StrictMode>,
)
