import { useEffect } from "react";
import { useCommentContext } from "../../contexts/CommentContext";
import { useDocumentContext } from "../../contexts/DocumentContext";
import { css } from "@emotion/react";


interface CommentProps {
  comment_id: string;
  quote: string;
  reply_list?: any;
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
      <div css={quoteStyle} >{comment.quote}</div> 
      {comment.reply_list?.replies.map((reply: any, i: number) => (
        <div key={i} css={replyStyle}>
          {reply.content.elements.map((element: any, j: number) => (
            <span key={j}>
              {element.text_run?.text || "No text available"}
            </span>
          ))}
        </div>
      ))}
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
          comment={comment}
        />
      ))}
    </div>
  );
}




