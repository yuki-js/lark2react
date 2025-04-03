import { useEffect, useState, useCallback } from "react";
import { getCommentContent } from "../../utils/apiHelper";

import { css } from "@emotion/react";

export interface Reply {
  content: {
    elements: Element[];
  };
  reply_id: string;
}

export interface Element {
  text_run?: {
    text: string;
  };
}

export interface CommentData {
  comment_id: string;
  quote: string;
  reply_list?: {
    replies: Reply[];
  };
}

export function Comment({
  commentData: comment,
}: {
  commentData: CommentData;
}) {
  const containerStyle = css({
    padding: "16px",
    marginBottom: "8px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  });

  const quoteStyle = css({
    borderLeft: "2px solid lightgray",
    paddingLeft: "4px",
    fontSize: "10px",
    color: "#555",
    marginBottom: "8px",
  });

  const replyStyle = css({
    fontSize: "12px",
    marginTop: "8px",
    paddingLeft: "8px",
  });

  return (
    <div css={containerStyle}>
      <div css={quoteStyle}>{comment.quote}</div>
      {comment.reply_list?.replies.map((reply: Reply, i: number) => (
        <div key={i} css={replyStyle}>
          {reply.content.elements.map((element: Element, j: number) => (
            <span key={j}>{element.text_run?.text || "No text available"}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

interface CommentListProps {
  fileToken: string;
}

export function CommentList({ fileToken }: CommentListProps) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!fileToken || isLoading) return;

    setIsLoading(true);
    try {
      const response = await getCommentContent(fileToken);
      setComments(response.data.items);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setComments([]);
    } finally {
      setIsLoading(false);
    }
  }, [fileToken, isLoading]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (isLoading) {
    return <div>Loading comments...</div>;
  }

  if (!fileToken) {
    return null;
  }

  if (comments.length === 0) {
    return <div>No comments available</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.comment_id} commentData={comment} />
      ))}
    </div>
  );
}
