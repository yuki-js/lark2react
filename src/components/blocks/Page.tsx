import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

// Define the type for the elements array
interface TextRun {
  content: string;
}

interface Element {
  text_run: TextRun;
  [key: string]: any;
}

interface BlockData {
  page: {
    elements: Element[];
  };
  [key: string]: any;
}

// Define the props for the Page component
interface PageProps {
  blockData: BlockData;
}

export function Page({ blockData }: PageProps) {
  const hash = useContext(HashContext);

  const title = blockData.page.elements[0].text_run.content;

  const cssStyle = css({
    fontWeight: "bold",
    fontSize: "36px",
  });

  return (
    <div>
      <div css={cssStyle}>{title}</div>
      {hash && displayChildComponent(blockData, hash)}
    </div>
  );
}
