import {useState} from 'react'


export function Page(props) {
  return (
    <div>
        {props.componentArr}
    </div>
  )
}


export function Heading1(props){
  return(
    <h1>{props.name}</h1>
  )
}

export function Heading2(props){
  return(
    <h2>{props.name}</h2>
  )
}


export function Heading3(props){
  return(
    <h2>{props.name}</h2>
  )
}