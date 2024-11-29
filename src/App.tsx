import InputTextArea from './components/InputTextArea'
import OutputTextArea from './components/OutputTextArea';
import { convertJsonToReactComponent } from './utils/ConvertJsonToReactComponent';


function App() {
  //const [output, setOutput] = useState("");

  const handleConvert = (inputText: string) => {
    //TODO:変換処理を書く
    console.log(convertJsonToReactComponent(inputText));

    //reactConponentを文字列として渡す reactComponentString
    // setOutput(reactComponentString);
  };

  return (
    <div>
      <h1>JSON to React Component</h1>
      <InputTextArea onConvert={handleConvert} />
      <OutputTextArea output={""}/>
    </div>
  )

}

export default App
