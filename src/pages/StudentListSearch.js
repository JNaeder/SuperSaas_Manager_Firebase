import { collection, orderBy, query, getDocs, where } from "firebase/firestore";

import { useState } from "react";

function StudentListSearch({ setAllStudents, db }) {
  const studentDB = collection(db, "supersaas_student");

  const [searchName, setSearchName] = useState("");

  const getAllStudents = async () => {
    const newQuery = query(studentDB, orderBy("lastName"));
    const output = await getDocs(newQuery);
    setAllStudents(output.docs);
  };

  const searchForStudent = async () => {
    const newQuery = query(studentDB, where("fullName", "==", searchName));
    const output = await getDocs(newQuery);
    setAllStudents(output.docs);
  };

  return (
    <>
      <form>
        <label htmlFor="searchName"> Search:</label>
        <input name="searchName" type="text" />

        <button>Submit</button>
      </form>
    </>
  );
}

export default StudentListSearch;
