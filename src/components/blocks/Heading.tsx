/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FONT_COLOR } from '../../design/fontColor';
import { FONT_BACKGROUND_COLOR } from '../../design/fontBackgroundColor'; 

function Heading({blockData, hash, tag}){

    let elements;
    switch(tag){
      case 1:
        elements = blockData.heading1.elements;
        break;
      case 2:
        elements = blockData.heading2.elements;
        break;
      case 3:
        elements = blockData.heading3.elements;
        break;
      case 4:
        elements = blockData.heading4.elements;
        break;
      case 5:
        elements = blockData.heading5.elements;
        break;
    }
    
    
    return(
      <div>
        {elements.map((element, index)=>{

          const elementTextColor = element.text_run.text_element_style.text_color;
          const elementBackgroundColor = element.text_run.text_element_style.background_color;

          const fontColor = elementTextColor ? FONT_COLOR[elementTextColor] : "black";
          const backgroundColor = elementBackgroundColor ? FONT_BACKGROUND_COLOR[elementBackgroundColor] : "transparent";
          
          
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
            backgroundColor: backgroundColor,
            display: "inline-block",
          });

        
          switch(tag){
            case 1:
              return(
                <h1 key={index} css={cssStyle}>{element.text_run.content}</h1>
              )
            case 2:
              return(
                <h2 key={index} css={cssStyle}>{element.text_run.content}</h2>
              )
            case 3:
              return(
                <h3 key={index} css={cssStyle}>{element.text_run.content}</h3>
              )
            case 4:
              return(
                <h4 key={index} css={cssStyle}>{element.text_run.content}</h4>
              )
            case 5:
              return(
                <h5 key={index} css={cssStyle}>{element.text_run.content}</h5>
              )
          }
          
        })}
      </div>
    )
  }


export function Heading1({blockData, hash}){
  return(
    <Heading blockData={blockData} hash={hash} tag={1}></Heading>
  )
}  


export function Heading2({blockData, hash}){
  return(
    <Heading blockData={blockData} hash={hash} tag={2}></Heading>
  )
}


export function Heading3({blockData, hash}){ 
  return(
    <Heading blockData={blockData} hash={hash} tag={3}></Heading>
  )
}


export function Heading4({blockData, hash}){ 
  return(
    <Heading blockData={blockData} hash={hash} tag={4}></Heading>
  )
}


export function Heading5({blockData, hash}){ 
  return(
    <Heading blockData={blockData} hash={hash} tag={5}></Heading>
  )
}