import { css } from "@emotion/react";
import { displayChildComponent } from "../../utils/utils";
import { useContext } from "react";
import { HashContext } from "../../contexts/DataContext";

export function Page({ blockData }) {
  const hash = useContext(HashContext);

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
