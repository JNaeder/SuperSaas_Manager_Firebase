import { collection, orderBy, query, getDocs, where } from "firebase/firestore";

import { useState } from "react";

function StudentListSearch({ setAllStudents, db }) {
  const studentDB = collection(db, "supersaas_student");

  const [searchName, setSearchName] = useState("");
  const [sortValue, setSortValue] = useState("lastName");

  const searchForStudent = async (e) => {
    e.preventDefault();
    const newQuery = query(studentDB, where("fullName", "==", searchName));
    const output = await getDocs(newQuery);
    console.log(output.docs);
    setAllStudents(output.docs);
  };

  const changeSortValue = async (newValue) => {
    const newQuery = query(studentDB, orderBy(newValue));
    const output = await getDocs(newQuery);
    setSortValue(newValue);
    setAllStudents(output.docs);
  };

  const changeSortDirection = async (newDirection) => {
    console.log(newDirection);
    const newQuery = query(studentDB, orderBy(sortValue, newDirection));
    const output = await getDocs(newQuery);
    setAllStudents(output.docs);
  };

  return (
    <>
      <form>
        <label htmlFor="searchName"> Search:</label>
        <input
          name="searchName"
          type="text"
          onChange={(e) => setSearchName(e.target.value)}
        />
        <button onClick={searchForStudent}>Submit</button>

        <label html="sortValue">Sort</label>
        <select
          name="sortValue"
          onChange={(e) => changeSortValue(e.target.value)}
        >
          <option value="lastName">Last Name</option>
          <option value="gpa">GPA</option>
          <option value="icr">ICR</option>
          <option value="lastLogin">Last Login</option>
        </select>

        <select onChange={(e) => changeSortDirection(e.target.value)}>
          <option value="asc">ASC</option>
          <option value="desc">DEC</option>
        </select>
      </form>
    </>
  );
}

export default StudentListSearch;
