import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";

export function Page({ blockData, hash }) {
  const title = blockData.page.elements[0].text_run.content;

  const cssStyle = css({
    fontWeight: "bold",
    fontSize: "36px",
  });

  return (
    <div>
      <div css={cssStyle}>{title}</div>
      {displayChildComponent(blockData, hash)}
    </div>
  );
}
