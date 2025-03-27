import React, { createContext, useContext, useState } from "react";
import { getCommentContent, getTenantAccessToken } from "../utils/apiHelper";

interface Comment {
  comment_id: string;
  quote: string;
  reply_list?: any; // Adjust the type based on your API response
}

interface CommentContextType {
  comments: Comment[];
  fetchComments: (fileToken: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async (fileToken: string) => {
    try {
      const accessToken = await getTenantAccessToken();
      const response = await getCommentContent(fileToken, accessToken);
      setComments(response.data.items); // this is array, Assuming `items` contains the comments
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  return (
    <CommentContext.Provider value={{ comments, fetchComments }}>
      {children}
    </CommentContext.Provider>
  );
};
