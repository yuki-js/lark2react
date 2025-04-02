import React, { createContext, useContext, useState } from "react";

interface DocumentContextType {
  documentId: string;
  setDocumentId: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error(
      "useDocumentContext must be used within a DocumentProvider",
    );
  }
  return context;
};

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [documentId, setDocumentId] = useState<string>("");

  return (
    <DocumentContext.Provider value={{ documentId, setDocumentId }}>
      {children}
    </DocumentContext.Provider>
  );
};
