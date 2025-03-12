import { css } from "@emotion/react";
import { generateTextStyle } from "../../utils/utils";
import { containsUrl } from "../../utils/utils";

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
  todo: {
    style: {
      done: boolean;
    };
    elements: Element[];
  };
  [key: string]: any;
}

// Define the props for the Todo component
interface TodoProps {
  blockData: BlockData;
}

export function Todo({ blockData }: TodoProps) {
  const isDone: boolean = blockData.todo.style.done;
  const elements = blockData.todo.elements;

  const labelStyle = css({
    display: "inline-flex",
  });

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <label css={labelStyle}>
      <input type="checkbox" defaultChecked={isDone} />
      <div>
        {elements.map((element, index) => {
          const style = element.text_run.text_element_style;
          const dynamicStyle = generateTextStyle(style);

          if (isDone) {
            //linkスタイルが存在する場合、リンクを張る
            return (
              <div
                key={index}
                css={[
                  staticStyle,
                  dynamicStyle,
                  css({ textDecoration: "line-through" }),
                ]}
              >
                {style.link ? (
                  <a href={style.link.url} target="_blank">
                    {element.text_run.content}
                  </a>
                ) : (
                  element.text_run.content
                )}
              </div>
            );
          } else {
            let url;
            let isUrl = false;
            if (style.link) {
              url = decodeURIComponent(style.link.url);
              isUrl = true;
            } else if (containsUrl(element.text_run.content)) {
              url = element.text_run.content;
              isUrl = true;
            }

            //linkスタイルが存在する場合、リンクを張る
            return (
              <div key={index} css={[staticStyle, dynamicStyle]}>
                {isUrl ? (
                  <a href={url} target="_blank">
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
    </label>
  );
}
