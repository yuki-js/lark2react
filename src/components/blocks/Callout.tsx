import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { CALLOUT_BACKGROUND_COLOR } from "../../styles/calloutBackgroundColor";
import { CALLOUT_BORDER_COLOR } from "../../styles/calloutBorderColor";
import { EMOJI } from "../../constants/emoji";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

interface CalloutStyle {
  emoji_id: keyof typeof EMOJI;
  background_color: keyof typeof CALLOUT_BACKGROUND_COLOR;
  border_color: keyof typeof CALLOUT_BORDER_COLOR;
}

interface CalloutProps {
  blockData: {
    callout: CalloutStyle;
  };
}

export function Callout({ blockData }: CalloutProps) {
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
      {hash && <div>{displayChildComponent(blockData, hash)}</div>}
    </div>
  );
}
