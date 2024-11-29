import { css } from '@emotion/css'
import { FONT_COLOR } from '../../design/fontColor';


export function Heading1({blockData, hash}){
    const elements = blockData.heading1.elements;
    
    return(
      <div>
        {elements.map((element, index)=>{

          const fontColor = element.text_run.text_element_style.text_color ? FONT_COLOR[element.text_run.text_element_style.text_color] : "black";
          const bold = element.text_run.text_element_style.bold ? "bold" : "normal";
          const inlineCode = element.text_run.text_element_style.inline_code ? "monospace" : "inherit";
          const italic = element.text_run.text_element_style.italic ? "italic" : "normal";
          
          const strikeThrough = element.text_run.text_element_style.strikethrough ? "line-through" : "none";
          const underline = element.text_run.text_element_style.underline ? "underline" : "none";
          
          const decoration = [
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
            display: "inline-block",
          });

          return(
            <h1 key={index} className={cssStyle}>{element.text_run.content}</h1>
          )
          
        })}
      </div>
    )
  }


export function Heading2({blockData, hash}){
  const title = blockData.heading2.elements[0].text_run.content;
  return(
    <h2>{title}</h2>
  )
}


export function Heading3({blockData, hash}){
  const title = blockData.heading3.elements[0].text_run.content;
  return(
    <h3>{title}</h3>
  )
}


export function Heading4({blockData, hash}){
  const title = blockData.heading4.elements[0].text_run.content;
  return(
    <h4>{title}</h4>
  )
}

export function Heading5({blockData, hash}){
  const title = blockData.heading4.elements[0].text_run.content;
  return(
    <h5>{title}</h5>
  )
}