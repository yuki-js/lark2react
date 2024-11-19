import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TextArea from './components/TextArea'
import ConvertButton from './components/ConvertButton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <TextArea/>
      <ConvertButton/>
    </div>
  </StrictMode>,
)
