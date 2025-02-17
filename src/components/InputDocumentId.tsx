import { useState } from "react";
import { useDocumentId } from "../contexts/documentIdContext";

function InputDocumentId() {
  const { documentId, setDocumentId } = useDocumentId();

  const handleChange = (event: { target: { value: any } }) => {
    setDocumentId(event.target.value);
  };

  return (
    <div>
      <input
        value={documentId}
        onChange={handleChange}
        placeholder="ここにdocment idを入力"
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "70%",
        }}
      />
    </div>
  );
}

export default InputDocumentId;
