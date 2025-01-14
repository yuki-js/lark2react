import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

function Heading({ blockData, hash, level: level }) {
  const elements = blockData[`heading${level}`].elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      {elements.map((element, index) => {
        const style = element.text_run.text_element_style;
        const dynamicStyle = generateTextStyle(style);

        //h7,h8,h9タグはhtmlでは存在しないので
        const HeadingTag = `h${level > 6 ? 6 : level}`;

        return (
          <HeadingTag key={index} css={[staticStyle, dynamicStyle]}>
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
