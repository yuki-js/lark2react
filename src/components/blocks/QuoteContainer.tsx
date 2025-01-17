import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";
import { generateTextStyle } from "../../utils/utils";


export function QuoteContainer({ blockData, hash }) {

    const cssStyle = css({
        borderLeft: "4px solid lightgray",
        paddingLeft: "16px",
    });

    return(
        <div css={cssStyle}>
            {displayChildComponent(blockData, hash)}
        </div>
    )
}