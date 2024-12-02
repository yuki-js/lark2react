export function Text({ blockData, hash }) {
  const title = blockData.text.elements[0].text_run.content
  return <div>{title}</div>
}
