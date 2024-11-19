import React from 'react'

function TextArea() {
  
  return (
    <div>
        <textarea
            placeholder="ここにJSONを入力"
            style={{
                padding: "10px",
                width: "100%",
                height: "400px"
            }}
        />
    </div>
  )
}

export default TextArea
