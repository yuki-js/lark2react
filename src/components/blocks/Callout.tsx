import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
import { CALLOUT_BACKGROUND_COLOR } from "../../styles/calloutBackgroundColor";
import { CALLOUT_BORDER_COLOR } from "../../styles/calloutBorderColor";
import { generateTextStyle } from "../../utils/utils";

export function Callout({ blockData, hash }) {

    const style = blockData.callout

    const boxStyle = css({
        backgroundColor:  CALLOUT_BACKGROUND_COLOR[style.background_color],
        border:  `2px solid ${CALLOUT_BORDER_COLOR[style.border_color]}`,
        borderRadius: "8px",
        padding: "15px",
        marginTop: "10px",
        marginBottom: "10px",
      });

  return <div css={boxStyle}>{displayChildComponent(blockData, hash)}</div>;
}
