import React, { createContext, useContext, useState, ReactNode } from "react";

interface CommentIdsContextProps {
    commentIds: string[];
    addCommentIds: (ids: string[]) => void;
}

const CommentIdsContext = createContext<CommentIdsContextProps | undefined>(undefined);

export const CommentIdsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [commentIds, setCommentIds] = useState<string[]>([]);

    const addCommentIds = (ids: string[]) => {
        setCommentIds((prevIds) => {
            const updatedIds = Array.from(new Set([...prevIds, ...ids]));
            return updatedIds;
        });
    };

    return (
        <CommentIdsContext.Provider value={{ commentIds, addCommentIds }}>
            {children}
        </CommentIdsContext.Provider>
    );
};

export const useCommentIds = (): CommentIdsContextProps => {
    const context = useContext(CommentIdsContext);
    if (!context) {
        throw new Error("useCommentIds must be used within a CommentIdsProvider");
    }
    return context;
};