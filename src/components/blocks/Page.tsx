import { css } from "@emotion/react";
import { id2Component } from "../../utils/utils";

export function Page({ blockData, hash }) {
  const title = blockData.page.elements[0].text_run.content;

  const cssStyle = css({
    fontWeight: "bold",
    fontSize: "36px",
  });

  return (
    <div>
      <div css={cssStyle}>{title}</div>
      {blockData.children.map((childId, index) => (
        <div key={index}>{id2Component(childId, hash)}</div>
      ))}
    </div>
  );
}
