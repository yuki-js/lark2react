import { id2Component } from '../../utils/ConvertJsonToReactComponent'

export function Page({blockData, hash}) {
    const title = blockData.page.elements[0].text_run.content;
    return (
      <div>
        <div>{title}</div>
        {blockData.children.map((childId, index) => (
          <div key={index}>
            {id2Component(childId, hash)}
          </div>
        ))}
      </div>
    )
  }

