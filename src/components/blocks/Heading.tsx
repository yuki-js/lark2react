import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

interface TextStyle {
  text_color?: number;
  background_color?: number;
  bold: boolean;
  inline_code: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

function Heading({ blockData, level: level }) {
  const hash  = useContext(HashContext); 
  const elements = blockData[`heading${level}`].elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
    padding: "0px",
    margin: "0px",
  });

  return (
    <div>
      {elements.map((element, index) => {
        const style = element.text_run.text_element_style;
        const dynamicStyle = generateTextStyle(style);

        //h7,h8,h9タグはhtmlでは存在しないので
        const HeadingTag = `h${level > 6 ? 6 : level}`;

        //linkスタイルが存在する場合、リンクを張る
        return (
          <HeadingTag key={index} css={[staticStyle, dynamicStyle]}>
            {style.link ? (
              <a href={style.link.url} target="_blank">
                {element.text_run.content}
              </a>
            ) : (
              element.text_run.content
            )}
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
