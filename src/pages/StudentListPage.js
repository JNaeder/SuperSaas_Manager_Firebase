import {
  collection,
  getFirestore,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import SpotlightStudent from "../components/SpotlightStudent";
import StudentFile from "../components/StudentFile";
import StudentListSearch from "./StudentListSearch";

function StudentListPage({ app }) {
  const [allStudents, setAllStudents] = useState([]);
  const [spotlightStudent, setSpotlightStudent] = useState();
  const db = getFirestore(app);

  useEffect(() => {
    const studentDB = collection(db, "supersaas_student");

    const getAllStudents = async () => {
      const newQuery = query(studentDB, orderBy("lastName"));
      const output = await getDocs(newQuery);
      setAllStudents(output.docs);
    };
    getAllStudents();
  }, []);

  return (
    <>
      <h1>Student List</h1>
      <div className="page_container">
        <div>
          <StudentListSearch setAllStudents={setAllStudents} db={db} />
          <div className="student_file_container">
            {allStudents.map((student, i) => (
              <StudentFile
                student={student.data()}
                key={i}
                setSpotlightStudent={setSpotlightStudent}
              />
            ))}
          </div>
        </div>

        <div className="student_spotlight">
          <SpotlightStudent spotlightStudent={spotlightStudent} />
        </div>
      </div>
    </>
  );
}

export default StudentListPage;
