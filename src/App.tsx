import InputTextArea from './components/InputTextArea'
import { convertJsonToReactComponent } from './utils/ConvertJsonToReactComponent';


function App() {

  const handleConvert = (inputText: string) => {
    //TODO:変換処理を書く
    console.log(convertJsonToReactComponent(inputText));

  };

  return (
    <div>
      <h1>JSON to React Component</h1>
      <InputTextArea onConvert={handleConvert} />
    </div>
  )

}

export default App
