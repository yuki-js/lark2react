import { css } from "@emotion/react";
import { generateTextStyle } from "../../utils/utils";

// Define the type for the elements array
interface Element {
  text_run: {
    text_element_style: any;
    content: string;
    link?: {
      url: string;
    };
  };
  [key: string]: any;
}

interface BlockData {
  [key: string]: {
    elements: Element[];
  };
}

// Define the props for the Heading component
interface HeadingProps {
  blockData: BlockData;
  level: number;
}

function Heading({ blockData, level }: HeadingProps) {
  const elements: Element[] = blockData[`heading${level}`].elements;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
    padding: "0px",
    margin: "0px",
  });

  return (
    <div>
      {elements.map((element, index) => {
        //elements配列の中にtext_runを持たない(発言者mention_userプロパティを持つ)ものが存在するので
        if (element?.text_run) {
          const style = element.text_run.text_element_style;
          const dynamicStyle = generateTextStyle(style);

          //h7,h8,h9タグはhtmlでは存在しないので
          const HeadingTag =
            `h${level > 6 ? 6 : level}` as keyof JSX.IntrinsicElements;

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
        }
      })}
    </div>
  );
}

export const Heading1 = (props: HeadingProps) => (
  <Heading {...props} level={1} />
);
export const Heading2 = (props: HeadingProps) => (
  <Heading {...props} level={2} />
);
export const Heading3 = (props: HeadingProps) => (
  <Heading {...props} level={3} />
);
export const Heading4 = (props: HeadingProps) => (
  <Heading {...props} level={4} />
);
export const Heading5 = (props: HeadingProps) => (
  <Heading {...props} level={5} />
);
export const Heading6 = (props: HeadingProps) => (
  <Heading {...props} level={6} />
);
export const Heading7 = (props: HeadingProps) => (
  <Heading {...props} level={7} />
);
export const Heading8 = (props: HeadingProps) => (
  <Heading {...props} level={8} />
);
export const Heading9 = (props: HeadingProps) => (
  <Heading {...props} level={9} />
);
