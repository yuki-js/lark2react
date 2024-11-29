import {useState} from 'react'
import { Id2Component } from '../../utils/ConvertJsonToReactComponent'

export function Page({blockData, hash}) {
  const title = blockData.page.elements[0].text_run.content;
  return (
    <div>
      <div>{title}</div>
      {blockData.children.map((childId, index) => (
        <div key={index}>
          {Id2Component(childId, hash)}
        </div>
      ))}
    </div>
  )
}


export function Text({blockData, hash}){
  const title = blockData.text.elements[0].text_run.content;
  return(
    <div>{title}</div>
  )
}


export function Heading1({blockData, hash}){
  const title = blockData.heading1.elements[0].text_run.content;
  return(
    <h1>{title}</h1>
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

