import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import LogFile from "./LogFile";

function LogContainer({ app }) {
  const [currentLogs, setCurrentLogs] = useState([]);

  useEffect(() => {
    const db = getFirestore(app);
    const logCollection = collection(db, "logs");
    const newQuery = query(logCollection, orderBy("dateTime", "desc"));
    const getAllLogs = async () => {
      onSnapshot(newQuery, (output) => {
        setCurrentLogs(output.docs);
      });
    };

    getAllLogs();
  }, []);

  return (
    <div className="log_container">
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
    </div>
  );
}

export default LogContainer;
