import { useState, useCallback, useEffect } from "react";
import { getCommentContent } from "../../utils/apiHelper";
import { CommentCard } from "./CommentCard";
import { CommentData } from "../../types/api";

type Props = {
  /**
   * The file token for the document, namely the document ID.
   */
  fileToken: string;
};

export function CommentList({ fileToken }: Props) {
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
    // isLoadingの状態に依存するとループになってしまうため
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToken]);

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
        <CommentCard key={comment.comment_id} commentData={comment} />
      ))}
    </div>
  );
}
