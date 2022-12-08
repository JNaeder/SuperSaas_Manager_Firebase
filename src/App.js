import "./App.css";
import { getGoogleSheetInfo, getSuperSaasInfo } from "./myScripts/appFunctions";
import { useState } from "react";
import StudentFile from "./components/StudentFile";

function App() {
  const [studentList, setStudentList] = useState([]);

  return (
    <div className="App">
      <h1>Mini SuperSaas Manager</h1>
      <button
        onClick={() => {
          getSuperSaasInfo().then((data) => setStudentList(data));
        }}
      >
        SuperSaas Stuff
      </button>
      <button onClick={getGoogleSheetInfo}>Process Google Sheets</button>
      {studentList.map((student, i) => (
        <StudentFile student={student} key={i} />
      ))}
    </div>
  );
}

export default App;
