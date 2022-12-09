import "./App.css";
import {
  getGoogleSheetInfo,
  processSuperSaasStudents,
  updateAllInfo,
} from "./myScripts/appFunctions";
import { useState } from "react";
import LogList from "./components/LogList";

function App() {
  const newLog = (theLog) => {
    const newLogList = logItems.concat(theLog);
    setLogItems(newLogList);
  };

  const [logItems, setLogItems] = useState([]);

  return (
    <div className="App">
      <h1>Mini SuperSaas Manager</h1>
      {/* <button onClick={processSuperSaasStudents}>
        Process SuperSaas Students
      </button> */}
      <button
        onClick={async () => {
          const output = await getGoogleSheetInfo();
          newLog(output);
        }}
      >
        Process Google Sheets
      </button>
      {/* <button onClick={updateAllInfo}>Update Everything</button> */}
      {/* <LogList logItems={logItems} /> */}
    </div>
  );
}

export default App;
