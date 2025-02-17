import React, { createContext, useContext, useState } from "react";

// Contextの型
interface DocumentIdContextType {
  documentId: string;
  setDocumentId: (id: string) => void;
}

const DocumentIdContext = createContext<DocumentIdContextType | undefined>(
  undefined,
);

export const DocumentIdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [documentId, setDocumentId] = useState("");

  return (
    <DocumentIdContext.Provider value={{ documentId, setDocumentId }}>
      {children}
    </DocumentIdContext.Provider>
  );
};

// Contextを簡単に使うためのカスタムフック
export const useDocumentId = (): DocumentIdContextType => {
  const context = useContext(DocumentIdContext);

  if (!context) {
    throw new Error("useDocumentId must be used within a DocumentProvider");
  }
  return context;
};
