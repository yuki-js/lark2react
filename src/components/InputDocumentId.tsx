import { useState } from "react";
import { useDocumentId } from "../contexts/documentIdContext";
import { extractDocId } from "../utils/utils";

function InputDocumentId() {
  const { documentId, setDocumentId } = useDocumentId();
  const { url, setUrl } = useState("");

  const handleChange = (event: { target: { value: any } }) => {
    setDocumentId(extractDocId(event.target.value));
  };

  return (
    <div>
      <input
        value={url}
        onChange={handleChange}
        placeholder="ここにURLを入力"
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
