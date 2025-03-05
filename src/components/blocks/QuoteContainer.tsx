import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

export function QuoteContainer({ blockData }) {
  const hash = useContext(HashContext);
  const cssStyle = css({
    borderLeft: "4px solid lightgray",
    paddingLeft: "16px",
  });

  return <div css={cssStyle}>{displayChildComponent(blockData, hash)}</div>;
}
