import { useMemo, useCallback, useRef, useEffect } from "react";
import { useCommentIds } from "../contexts/commentIdsContext";
import { TextElement } from "../types/block";

export const useManageCommentIds = (elements: TextElement[]) => {
  const { addCommentIds } = useCommentIds(); // Access the context function
  const prevCommentIdsRef = useRef<string[] | null>(null); // Track previous comment IDs

  // Memoize the comment IDs to avoid recalculating on every render
  const commentIds = useMemo(() => {
    let ids: string[] = [];
    elements.forEach((element) => {
      if (element.text_run?.text_element_style.comment_ids) {
        ids = ids.concat(element.text_run.text_element_style.comment_ids);
      }
    });
    return [...new Set(ids)]; // Ensure unique IDs
  }, [elements]);

  // Callback to add comment IDs only if they have changed
  const addCommentIdsIfChanged = useCallback(() => {
    const prevCommentIds = prevCommentIdsRef.current;
    const hasChanged =
      !prevCommentIds ||
      commentIds.some((id) => !prevCommentIds.includes(id)) ||
      prevCommentIds.some((id) => !commentIds.includes(id));

    if (hasChanged && commentIds.length > 0) {
      addCommentIds(commentIds); // Add the new comment IDs to the context
      console.log("Comment IDs added:", commentIds);
      prevCommentIdsRef.current = commentIds; // Update the ref with the current IDs
    }
  }, [commentIds, addCommentIds]);

  // Effect to call the addCommentIdsIfChanged function
  useEffect(() => {
    addCommentIdsIfChanged();
  }, [commentIds, addCommentIdsIfChanged]);
};
