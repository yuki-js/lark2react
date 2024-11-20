

interface OutputTextAreaProps {
    output: string;
}


function OutputTextArea({output}: OutputTextAreaProps) {

  return (
    <div>
        <textarea
            value={output}
            readOnly
            style={{
                padding: "10px",
                width: "70%",
                height: "400px"
            }}
        />
    </div>
  )
}

export default OutputTextArea
