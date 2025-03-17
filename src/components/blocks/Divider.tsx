import { css } from "@emotion/react";

const dividerStyle = css({
  height: "1px",
  backgroundColor: "#e1e4e8",
  border: "none",
  margin: "24px 0",
  width: "100%",
});

export const Divider: React.FC = () => {
  return <hr css={dividerStyle} />;
};
