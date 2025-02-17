import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";
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
