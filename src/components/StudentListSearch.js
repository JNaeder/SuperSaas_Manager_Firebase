import { collection, orderBy, query, getDocs, where } from "firebase/firestore";

import { useState, useEffect } from "react";

function StudentListSearch({ setAllStudents, db }) {
  const studentDB = collection(db, "supersaas_student");
  const [activeKeywords, setActiveKeyword] = useState(["blocked"]);

  const onCheckboxChange = async (newValue) => {
    if (activeKeywords.includes(newValue)) {
      const newArr = activeKeywords.filter((x) => x != newValue);
      setActiveKeyword(newArr);
    } else {
      const newArr = activeKeywords;
      newArr.push(newValue);
      setActiveKeyword(newArr);
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
    console.log(activeKeywords);

    getTheDocs();
  }, [activeKeywords]);

  return (
    <>
      <form>
        <label htmlFor="active">Active</label>
        <input
          type="checkbox"
          name="active"
          value="active"
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
          onChange={(e) => onCheckboxChange(e.target.value)}
        />
      </form>
    </>
  );
}

export default StudentListSearch;
