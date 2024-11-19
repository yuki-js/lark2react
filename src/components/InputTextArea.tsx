import React, {useState} from 'react'

function InputTextArea() {

  const [jsonInput, setJsonInput] = useState("");

  const handleChange = (event) => {
      setJsonInput(event.target.value)
  };

  return (
    <div>
        <textarea
            value = {jsonInput}
            onChange = {handleChange}
            placeholder="ここにJSONを入力"
            style={{
                padding: "10px",
                width: "70%",
                height: "400px"
            }}
        />
        <p>{jsonInput}</p>
    </div>
  )
}

export default InputTextArea
