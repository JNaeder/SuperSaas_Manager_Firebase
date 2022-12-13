import {
  collection,
  getFirestore,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import StudentFile from "../components/StudentFile";

function StudentListPage({ app }) {
  const [allStudents, setAllStudents] = useState([]);
  useEffect(() => {
    const db = getFirestore(app);
    const studentDB = collection(db, "supersaas_students");

    const getAllStudents = async () => {
      const newQuery = query(studentDB, orderBy("fullName"));
      const output = await getDocs(newQuery);
      console.log(output);
      setAllStudents(output.docs);
    };
    getAllStudents();
  }, []);

  return (
    <>
      <h1>Student List</h1>
      <div className="student_file_container">
        {allStudents.map((student, i) => (
          <StudentFile student={student.data()} key={i} />
        ))}
      </div>
    </>
  );
}

export default StudentListPage;
