import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

// Define the type for the blockData parameter
interface BlockData {
  [key: string]: any;
}

// Define the props for the QuoteContainer component
interface QuoteContainerProps {
  blockData: BlockData;
}

export function QuoteContainer({ blockData }: QuoteContainerProps) {
  const hash = useContext(HashContext);
  const cssStyle = css({
    borderLeft: "4px solid lightgray",
    paddingLeft: "16px",
  });

  return <div css={cssStyle}>{displayChildComponent(blockData, hash)}</div>;
}
