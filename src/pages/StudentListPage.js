import { getFirestore } from "firebase/firestore";
import { useState } from "react";
import SpotlightStudent from "../components/SpotlightStudent";
import StudentFile from "../components/StudentFile";
import StudentListSearch from "../components/StudentListSearch";

function StudentListPage({ app }) {
  const [allStudents, setAllStudents] = useState([]);
  const [spotlightStudent, setSpotlightStudent] = useState();
  const db = getFirestore(app);

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
