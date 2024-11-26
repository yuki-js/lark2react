import {useState} from 'react'
import { Id2Component } from '../utils/ConvertJsonToReactComponent'

export function Page({blockData, hash}) {
  return (
    <div>
      {blockData.children.map((childId, index) => (
        <div key={index}>
          {Id2Component(childId, hash)}
        </div>
      ))}
    </div>
  )
}


export function Heading1({blockData, hash}){
  return(
    <h1>見出し1</h1>
  )
}

export function Heading2({blockData, hash}){
  return(
    <h2>見出し2</h2>
  )
}


export function Heading3({blockData, hash}){
  return(
    <h2>見出し3</h2>
  )
}