import { css } from "@emotion/react";
import { generateTextStyle } from "../../utils/utils";
import { containsUrl } from "../../utils/utils";
import { useCommentIds } from "../../contexts/commentIdsContext";
import { useEffect, useMemo, useRef, useCallback } from "react";

// Define the type for the elements array
interface Element {
  text_run: {
    text_element_style: any;
    content: string;
    link?: {
      url: string;
    };
    comment_ids?: string[];
  };
  [key: string]: any;
}

interface BlockData {
  text: {
    elements: Element[];
  };
  [key: string]: any;
}

// Define the props for the Text component
interface TextProps {
  blockData: BlockData;
}

export function Text({ blockData }: TextProps) {
  const elements = blockData.text.elements;
  const { commentIdsList, addCommentIds } = useCommentIds();
  
  const prevCommentIdsRef = useRef<string[] | null>(null);
  


  const commentIds = useMemo(() => {
    let ids: string[] = [];
    elements.forEach((element) => {
      if (element.text_run?.text_element_style.comment_ids) {
        ids = ids.concat(element.text_run.text_element_style.comment_ids);
      }
    });
    return ids;
  }, [elements]);

  const addCommentIdsIfChanged = useCallback(() => {
    const prevCommentIds = prevCommentIdsRef.current;
    const hasChanged =
      !prevCommentIds ||
      commentIds.some((id) => !prevCommentIds.includes(id)) ||
      prevCommentIds.some((id) => !commentIds.includes(id));

    if (hasChanged && commentIds.length > 0) {
      addCommentIds(commentIds);
      prevCommentIdsRef.current = commentIds;
    }
  }, [commentIds, addCommentIds]);

  useEffect(() => {
    addCommentIdsIfChanged();
  }, [commentIds, addCommentIdsIfChanged]);

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  useEffect(() => {
    addCommentIdsIfChanged();
  }, [commentIds, addCommentIdsIfChanged]);

  return (
    <div>
      {elements.map((element, index) => {
        if (element?.text_run) {
          const style = element.text_run.text_element_style;
          const dynamicStyle = generateTextStyle(style);

          // URL 処理
          let url;
          let isUrl = false;
          if (style.link) {
            url = decodeURIComponent(style.link.url);
            isUrl = true;
          } else if (containsUrl(element.text_run.content)) {
            url = element.text_run.content;
            isUrl = true;
          }

          return (
            <div key={index} css={[staticStyle, dynamicStyle]}>
              {isUrl ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {element.text_run.content}
                </a>
              ) : (
                element.text_run.content
              )}
            </div>
          );
        }
      })}
    </div>
  );
}