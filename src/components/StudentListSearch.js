import { collection, orderBy, query, getDocs, where } from "firebase/firestore";

import { useState, useEffect } from "react";

function StudentListSearch({ setAllStudents, db }) {
  const studentDB = collection(db, "supersaas_student");

  const [creditKeywords, setCreditKeywords] = useState(["0", "-"]);
  const [activeKeywords, setActiveKeyword] = useState(["inactive", "active"]);

  const onCheckboxChange = async (newValue) => {
    if (newValue === "inactive") {
      if (activeKeywords.includes(newValue)) {
        setActiveKeyword(["active"]);
      } else {
        setActiveKeyword(["inactive", "active"]);
      }
    }

    if (newValue === "active" || newValue === "blocked") {
      const activeValue = newValue === "active" ? "-" : "0";
      if (creditKeywords.includes(activeValue)) {
        const arr = creditKeywords;
        const newArr = arr.filter((x) => x !== activeValue);
        setCreditKeywords(newArr);
      } else {
        const arr = creditKeywords;
        arr.push(activeValue);
        setCreditKeywords(arr);
      }
    }
  };

  useEffect(() => {
    const getTheDocs = async () => {
      const newQuery = query(
        studentDB,
        where("status", "in", activeKeywords),
        orderBy("lastName")
      );
      const output = await getDocs(newQuery);
      setAllStudents(output.docs);
    };

    getTheDocs();
  }, [creditKeywords, activeKeywords]);

  // const createNewSearch = async () => {
  //   const newQuery = query(studentDB, where("status", "==", newValue));
  //   const output = await getDocs(newQuery);
  //   setAllStudents(output.docs);
  // };

  return (
    <>
      <form>
        <label htmlFor="active">Active</label>
        <input
          type="checkbox"
          name="active"
          value="active"
          defaultChecked
          onChange={(e) => onCheckboxChange(e.target.value)}
        />
        <label htmlFor="active">Blocked</label>
        <input
          type="checkbox"
          name="active"
          value="blocked"
          defaultChecked
          onChange={(e) => onCheckboxChange(e.target.value)}
        />
        <label htmlFor="active">Inactive</label>
        <input
          type="checkbox"
          name="active"
          value="inactive"
          defaultChecked
          onChange={(e) => onCheckboxChange(e.target.value)}
        />
      </form>
    </>
  );
}

export default StudentListSearch;
