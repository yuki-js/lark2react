import { css } from "@emotion/react";
import { id2Component, displayChildComponent } from "../../utils/utils";

export function Page({ blockDataArr, hash }) {
  const title = blockDataArr.page.elements[0].text_run.content;

  const cssStyle = css({
    fontWeight: "bold",
    fontSize: "36px",
  });

  return (
    <div>
      <div css={cssStyle}>{title}</div>
      {displayChildComponent(blockDataArr, hash)}
    </div>
  );
}
