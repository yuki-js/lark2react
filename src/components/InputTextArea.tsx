import { useState } from 'react'

interface InputTextAreaProps {
  onConvert: (inputText: string) => void
}

function InputTextArea({ onConvert }: InputTextAreaProps) {
  const [jsonInput, setJsonInput] = useState('')

  const handleChange = (event: { target: { value: any } }) => {
    setJsonInput(event.target.value)
  }

  return (
    <div>
      <textarea
        value={jsonInput}
        onChange={handleChange}
        placeholder="ここにJSONを入力"
        style={{
          padding: '10px',
          width: '70%',
          height: '400px',
        }}
      />
      <div>
        <button onClick={() => onConvert(jsonInput)}>Convert to React</button>
      </div>
    </div>
  )
}

export default InputTextArea
