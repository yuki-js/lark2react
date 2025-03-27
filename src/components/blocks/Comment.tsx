import React, { useEffect } from "react";
import { useCommentContext } from "../../contexts/CommentContext";

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

  useEffect(() => {
    const fileToken = "Lqzudvi1DokvIqxBn2rj94udpob"; // Replace with your file token
    fetchComments(fileToken);
  }, [fetchComments]);

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
