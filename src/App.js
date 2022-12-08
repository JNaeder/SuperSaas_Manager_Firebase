import "./App.css";
import {
  getGoogleSheetInfo,
  processSuperSaasStudents,
  updateAllInfo,
} from "./myScripts/appFunctions";

function App() {
  return (
    <div className="App">
      <h1>Mini SuperSaas Manager</h1>
      <button onClick={processSuperSaasStudents}>
        Process SuperSaas Students
      </button>
      <button onClick={getGoogleSheetInfo}>Process Google Sheets</button>
      <button onClick={updateAllInfo}>Update Everything</button>
    </div>
  );
}

export default App;
