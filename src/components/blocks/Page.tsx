import { Id2Component } from '../../utils/ConvertJsonToReactComponent'

function Page({blockData, hash}) {
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

export default Page