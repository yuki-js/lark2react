import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { CALLOUT_BACKGROUND_COLOR } from "../../styles/calloutBackgroundColor";
import { CALLOUT_BORDER_COLOR } from "../../styles/calloutBorderColor";
import { EMOJI } from "../../constants/emoji";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

export function Callout({ blockData }) {
  const hash = useContext(HashContext);
  const style = blockData.callout;

  const emoji = EMOJI[style.emoji_id];

  const boxStyle = css({
    backgroundColor: CALLOUT_BACKGROUND_COLOR[style.background_color],
    border: `2px solid ${CALLOUT_BORDER_COLOR[style.border_color]}`,
    borderRadius: "8px",
    padding: "15px",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    gap: "8px",
  });

  return (
    <div css={boxStyle}>
      <div style={{ fontSize: "24px" }}>{emoji}</div>
      <div>{displayChildComponent(blockData, hash)}</div>
    </div>
  );
}
