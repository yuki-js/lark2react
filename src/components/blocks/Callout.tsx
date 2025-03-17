import { css } from "@emotion/react";
import { useCurrentBlock } from "../../contexts/CurrentBlockContext";
import { Element } from "../../contexts/BlockStoreContext";

const calloutContainerStyle = css({
  display: "flex",
  padding: "16px",
  backgroundColor: "#f5f6f7",
  borderRadius: "4px",
  marginBottom: "16px",
  gap: "12px",
});

const emojiStyle = css({
  fontSize: "20px",
  lineHeight: "24px",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const contentStyle = css({
  flex: 1,
  "& > *:last-child": {
    marginBottom: 0,
  },
});

const getEmojiFromId = (emojiId: string): string => {
  // Convert emoji ID to actual emoji
  // This is a simplified version - you might want to implement a more comprehensive mapping
  const emojiMap: Record<string, string> = {
    bulb: "💡",
    warning: "⚠️",
    info: "ℹ️",
    note: "📝",
    check: "✅",
    error: "❌",
    face_with_hand_over_mouth: "🤭",
    melon: "🍈",
    // Add more mappings as needed
  };

  return emojiMap[emojiId] || "📌"; // Default emoji if ID not found
};

const getBackgroundColor = (colorId: number): string => {
  const colors: Record<number, string> = {
    1: "#e8f0fe", // Light blue
    2: "#fce8e6", // Light red
    3: "#fef6e6", // Light yellow
    4: "#e6f4ea", // Light green
    5: "#f3e8fd", // Light purple
    6: "#fff3e0", // Light orange
  };
  return colors[colorId] || "#f5f6f7"; // Default light gray
};

const getBorderColor = (colorId: number): string => {
  const colors: Record<number, string> = {
    1: "#4285f4", // Blue
    2: "#ea4335", // Red
    3: "#fbbc04", // Yellow
    4: "#34a853", // Green
    5: "#a142f4", // Purple
    6: "#fb8c00", // Orange
  };
  return colors[colorId] || "#dadce0"; // Default gray
};

export const Callout: React.FC = () => {
  const { block } = useCurrentBlock();

  if (!block.callout?.emoji_id) {
    return null;
  }

  const emoji = getEmojiFromId(block.callout.emoji_id);
  const backgroundColor = getBackgroundColor(block.callout.background_color);
  const borderColor = getBorderColor(block.callout.border_color);

  const customCalloutStyle = css({
    backgroundColor,
    borderLeft: `4px solid ${borderColor}`,
  });

  return (
    <div css={[calloutContainerStyle, customCalloutStyle]}>
      <div css={emojiStyle}>{emoji}</div>
      <div css={contentStyle}>
        {block.text?.elements.map((element: Element, index: number) => {
          if (!element.text_run) {
            return null;
          }

          const style = css({
            color: element.text_run.text_element_style?.bold ? "#000" : "#333",
            fontWeight: element.text_run.text_element_style?.bold
              ? "bold"
              : "normal",
            fontStyle: element.text_run.text_element_style?.italic
              ? "italic"
              : "normal",
            textDecoration:
              [
                element.text_run.text_element_style?.strikethrough &&
                  "line-through",
                element.text_run.text_element_style?.underline && "underline",
              ]
                .filter(Boolean)
                .join(" ") || "none",
            fontFamily: element.text_run.text_element_style?.inline_code
              ? "monospace"
              : "inherit",
            backgroundColor: element.text_run.text_element_style?.inline_code
              ? "#f6f8fa"
              : "transparent",
            padding: element.text_run.text_element_style?.inline_code
              ? "2px 4px"
              : "0",
            borderRadius: element.text_run.text_element_style?.inline_code
              ? "3px"
              : "0",
          });

          return (
            <span key={index} css={style}>
              {element.text_run.content}
            </span>
          );
        })}
      </div>
    </div>
  );
};
