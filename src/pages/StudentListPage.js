import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import SpotlightStudent from "../components/Student List Stuff/SpotlightStudent";
import StudentFile from "../components/Student List Stuff/StudentFile";
import StudentListSearch from "../components/Student List Stuff/StudentListSearch";
import "../components/Student List Stuff/StudentList_Style.css";

function StudentListPage({ app }) {
  const [allStudents, setAllStudents] = useState([]);
  const [spotlightStudent, setSpotlightStudent] = useState();
  const db = getFirestore(app);

  return (
    <>
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
