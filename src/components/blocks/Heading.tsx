import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";

function Heading({ blockData, hash, level: level }) {
  const elements = blockData[`heading${level}`].elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      {elements.map((element, index) => {
        const elementTextColor = element.text_run.text_element_style.text_color;
        const elementBackgroundColor =
          element.text_run.text_element_style.background_color;

        const fontColor = elementTextColor
          ? FONT_COLOR[elementTextColor]
          : "black";
        const backgroundColor = elementBackgroundColor
          ? FONT_BACKGROUND_COLOR[elementBackgroundColor]
          : "transparent";

        const bold = element.text_run.text_element_style.bold
          ? "bold"
          : "normal";
        const inlineCode = element.text_run.text_element_style.inline_code
          ? "monospace"
          : "inherit";
        const italic = element.text_run.text_element_style.italic
          ? "italic"
          : "normal";

        const strikeThrough = element.text_run.text_element_style.strikethrough
          ? "line-through"
          : "none";
        const underline = element.text_run.text_element_style.underline
          ? "underline"
          : "none";

        const decoration =
          [
            strikeThrough === "line-through" && "line-through",
            underline === "underline" && "underline",
          ]
            .filter(Boolean)
            .join(" ") || "none";

        const cssStyle = css({
          color: fontColor,
          fontWeight: bold,
          fontFamily: inlineCode,
          fontStyle: italic,
          textDecoration: decoration,
          backgroundColor: backgroundColor,
        });

        //h7,h8,h9タグはhtmlでは存在しないので
        const HeadingTag = `h${level > 6 ? 6 : level}`;

        return (
          <HeadingTag key={index} css={[staticStyle, cssStyle]}>
            {element.text_run.content}
          </HeadingTag>
        );
      })}
    </div>
  );
}

export const Heading1 = (props) => <Heading {...props} level={1} />;
export const Heading2 = (props) => <Heading {...props} level={2} />;
export const Heading3 = (props) => <Heading {...props} level={3} />;
export const Heading4 = (props) => <Heading {...props} level={4} />;
export const Heading5 = (props) => <Heading {...props} level={5} />;
export const Heading6 = (props) => <Heading {...props} level={6} />;
export const Heading7 = (props) => <Heading {...props} level={7} />;
export const Heading8 = (props) => <Heading {...props} level={8} />;
export const Heading9 = (props) => <Heading {...props} level={9} />;
