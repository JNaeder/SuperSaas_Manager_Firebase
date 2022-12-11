import { getFirestore, collection, doc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import LogFile from "./LogFile";

function LogContainer({ app }) {
  const [currentLogs, setCurrentLogs] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const logCollection = collection(db, "logs");
    const getAllLogs = async () => {
      const output = await getDocs(logCollection);
      setCurrentLogs(output.docs);
    };

    getAllLogs();
  }, []);

  return (
    <>
      <table className="log_table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Student</th>
            <th>Log</th>
          </tr>
        </thead>
        <tbody>
          {currentLogs.map((log, i) => (
            <LogFile log={log.data()} key={i} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LogContainer;
