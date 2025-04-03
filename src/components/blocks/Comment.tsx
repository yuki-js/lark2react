import { useEffect } from "react";
import { useCommentContext } from "../../contexts/CommentContext";
import { css } from "@emotion/react";

export interface CommentProps {
  comment: {
    comment_id: string;
    quote: string;
    reply_list?: {
      replies: Reply[];
    };
  };
}

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

export function Comment({ comment }: CommentProps) {
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
  const { comments, fetchComments } = useCommentContext();

  useEffect(() => {
    if (fileToken) {
      // Fetch comments when fileToken changes
      fetchComments(fileToken);
    }
  }, [fileToken, fetchComments]);

  if (comments.length === 0) {
    return <div>No comments available</div>;
  }

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.comment_id} comment={comment} />
      ))}
    </div>
  );
}
