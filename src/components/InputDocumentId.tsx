import React from "react";
import { css } from "@emotion/react";
import { useDocumentContext } from "../contexts/DocumentContext";

const inputStyle = css({
  width: "100%",
  padding: "8px 12px",
  fontSize: "14px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  marginBottom: "16px",
  "&:focus": {
    outline: "none",
    borderColor: "#1a73e8",
    boxShadow: "0 0 0 2px rgba(26, 115, 232, 0.2)",
  },
});

export const InputDocumentId: React.FC = () => {
  const { documentId, setDocumentId } = useDocumentContext(); // Contextから値を取得

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentId(event.target.value); // ContextのdocumentIdを更新
  };

  return (
    <input
      type="text"
      value={documentId}
      onChange={handleChange}
      placeholder="Enter Document ID"
      css={inputStyle}
    />
  );
};
