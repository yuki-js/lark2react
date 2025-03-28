import React, { useEffect } from "react";
import { useCommentContext } from "../../contexts/CommentContext";
import { useDocumentContext } from "../../contexts/DocumentContext";

interface CommentProps {
  commentId: string;
}

export function Comment({ commentId, quote }: CommentProps) {
  return (
    <div>
      <strong>Comment ID:</strong> {commentId}
      <br />
      <strong>Quote:</strong> {quote}
    </div>
  );
}

export function CommentList() {
  const { comments, fetchComments } = useCommentContext();
  const { documentId } = useDocumentContext();

  useEffect(() => {
    if (documentId) {
      const fileToken = documentId ; // Replace with your file token
      fetchComments(fileToken);
    }
    
  }, [documentId]);

  if (comments.length === 0) {
    return <div>No comments available</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.comment_id}
          commentId={comment.comment_id}
          quote={comment.quote}
        />
      ))}
    </div>
  );
}
