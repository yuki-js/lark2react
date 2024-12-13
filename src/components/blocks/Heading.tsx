import { css } from "@emotion/react";
import { FONT_COLOR } from "../../styles/fontColor";
import { FONT_BACKGROUND_COLOR } from "../../styles/fontBackgroundColor";

function Heading({ blockDataArr, hash, level: level }) {
  let elements;
  switch (level) {
    case 1:
      elements = blockDataArr.heading1.elements;
      break;
    case 2:
      elements = blockDataArr.heading2.elements;
      break;
    case 3:
      elements = blockDataArr.heading3.elements;
      break;
    case 4:
      elements = blockDataArr.heading4.elements;
      break;
    case 5:
      elements = blockDataArr.heading5.elements;
      break;
    case 6:
      elements = blockDataArr.heading6.elements;
      break;
    case 7:
      elements = blockDataArr.heading7.elements;
      break;
    case 8:
      elements = blockDataArr.heading8.elements;
      break;
    case 9:
      elements = blockDataArr.heading9.elements;
      break;
  }

  return (
    <div>
      {elements.map((element, index) => {
        const elementTextColor = element.text_run.text_element_style.text_color;
        const elementBackgroundColor =
          element.text_run.text_element_style.background_color;

        const fontColor = elementTextColor
          ? FONT_COLOR[elementTextColor]
          : "black";
        const backgroundColor = elementBackgroundColor
          ? FONT_BACKGROUND_COLOR[elementBackgroundColor]
          : "transparent";

        const bold = element.text_run.text_element_style.bold
          ? "bold"
          : "normal";
        const inlineCode = element.text_run.text_element_style.inline_code
          ? "monospace"
          : "inherit";
        const italic = element.text_run.text_element_style.italic
          ? "italic"
          : "normal";

        const strikeThrough = element.text_run.text_element_style.strikethrough
          ? "line-through"
          : "none";
        const underline = element.text_run.text_element_style.underline
          ? "underline"
          : "none";

        const decoration =
          [
            strikeThrough === "line-through" && "line-through",
            underline === "underline" && "underline",
          ]
            .filter(Boolean)
            .join(" ") || "none";

        const cssStyle = css({
          color: fontColor,
          fontWeight: bold,
          fontFamily: inlineCode,
          fontStyle: italic,
          textDecoration: decoration,
          backgroundColor: backgroundColor,
          display: "inline-block",
        });

        switch (level) {
          case 1:
            return (
              <h1 key={index} css={cssStyle}>
                {element.text_run.content}
              </h1>
            );
          case 2:
            return (
              <h2 key={index} css={cssStyle}>
                {element.text_run.content}
              </h2>
            );
          case 3:
            return (
              <h3 key={index} css={cssStyle}>
                {element.text_run.content}
              </h3>
            );
          case 4:
            return (
              <h4 key={index} css={cssStyle}>
                {element.text_run.content}
              </h4>
            );
          case 5:
            return (
              <h5 key={index} css={cssStyle}>
                {element.text_run.content}
              </h5>
            );
          case 6:
            return (
              <h6 key={index} css={cssStyle}>
                {element.text_run.content}
              </h6>
            );
          case 7:
            return (
              <h6 key={index} css={cssStyle}>
                {element.text_run.content}
              </h6>
            );
          case 8:
            return (
              <h6 key={index} css={cssStyle}>
                {element.text_run.content}
              </h6>
            );
          case 9:
            return (
              <h6 key={index} css={cssStyle}>
                {element.text_run.content}
              </h6>
            );
        }
      })}
    </div>
  );
}

export function Heading1({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={1}></Heading>;
}

export function Heading2({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={2}></Heading>;
}

export function Heading3({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={3}></Heading>;
}

export function Heading4({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={4}></Heading>;
}

export function Heading5({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={5}></Heading>;
}

export function Heading6({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={6}></Heading>;
}

export function Heading7({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={7}></Heading>;
}

export function Heading8({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={8}></Heading>;
}

export function Heading9({ blockDataArr, hash }) {
  return <Heading blockDataArr={blockDataArr} hash={hash} level={9}></Heading>;
}
