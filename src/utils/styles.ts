import { css } from "@emotion/react";
import { FONT_COLOR } from "../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../styles/fontBackgroundColor";

interface TextStyle {
  text_color: number;
  background_color: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

export const generateTextStyle = ({
  text_color,
  background_color,
  bold,
  inline_code,
  italic,
  strikethrough,
  underline,
}: TextStyle) => {
  const strikethroughParam = strikethrough ? "line-through" : "none";
  const underlineParam = underline ? "underline" : "none";

  return css({
    color: FONT_COLOR[text_color] || "black",
    fontWeight: bold ? "bold" : "normal",
    fontFamily: inline_code ? "monospace" : "inherit",
    fontStyle: italic ? "italic" : "normal",
    backgroundColor: FONT_BACKGROUND_COLOR[background_color] || "transparent",
    textDecoration:
      [
        strikethroughParam === "line-through" && "line-through",
        underlineParam === "underline" && "underline",
      ]
        .filter(Boolean)
        .join(" ") || "none",
  });
};
