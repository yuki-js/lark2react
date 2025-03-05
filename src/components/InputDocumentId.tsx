import { useState } from "react";
import { extractDocId } from "../utils/utils";

import { FC } from "react";

interface InputDocumentIdProps {
  setDocumentId: (id: string) => void;
}

const InputDocumentId: FC<InputDocumentIdProps> = ({ setDocumentId }) => {
  const { url, setUrl } = useState("");

  const handleChange = (event: { target: { value: string } }) => {
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

