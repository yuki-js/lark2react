import { useCommentIds } from "../../contexts/commentIdsContext";

interface CommentProps {
  commentId: string;
}

export function Comment({ commentId }: CommentProps) {
  return <div>Comment ID: {commentId}</div>;
}

export function CommentList() {
  const { commentIds } = useCommentIds();

  if (!commentIds) {
    return <div>No comments available</div>;
  }
  return (
    <div>
      {commentIds.map((commentId, index) => (
        <Comment key={index} commentId={commentId} />
      ))}
    </div>
  );
}
