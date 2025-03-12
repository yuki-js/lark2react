import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { generateTextStyle } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";
import { containsUrl } from "../../utils/utils";

// Define the type for the elements array
interface Element {
  text_run?: {
    text_element_style: any;
    content: string;
  };
  [key: string]: any;
}

interface BlockData {
  ordered: {
    elements: Element[];
    style: {
      sequence: number;
    };
  };
  [key: string]: any;
}

// Define the props for the OrderedList component
interface OrderedListProps {
  blockDataArr: BlockData[];
}

//FIXME: 番号の位置を左側にずらしたい
export function OrderedList({ blockDataArr }: OrderedListProps) {
  const hash = useContext(HashContext);
  const startIndex = blockDataArr[0].ordered.style.sequence;

  const staticStyle = css({
    display: "inline-block",
    wordBreak: "break-word",
  });

  return (
    <div>
      <ol start={startIndex}>
        {blockDataArr.map((blockData, i) => {
          const elements = blockData.ordered.elements;

          return (
            <div key={i}>
              <li>
                {elements.map((element, j) => {
                  if (element?.text_run) {
                    const style = element.text_run.text_element_style;
                    const dynamicStyle = generateTextStyle(style);

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
                      <div key={j} css={[staticStyle, dynamicStyle]}>
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
              </li>
              {hash && <div>{displayChildComponent(blockData, hash)}</div>}
            </div>
          );
        })}
      </ol>
    </div>
  );
}
