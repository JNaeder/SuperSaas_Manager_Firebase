import { collection, orderBy, query, getDocs, where } from "firebase/firestore";

import { useState, useEffect } from "react";

function StudentListSearch({ setAllStudents, db }) {
  const studentDB = collection(db, "supersaas_student");
  const [activeKeywords, setActiveKeyword] = useState(["blocked"]);
  const [sortValue, setSortValue] = useState("lastName");

  const onCheckboxChange = async (newValue) => {
    if (activeKeywords.includes(newValue)) {
      const newArr = activeKeywords.filter((x) => x !== newValue);
      setActiveKeyword(newArr);
    } else {
      const newArr = [...activeKeywords];
      newArr.push(newValue);
      setActiveKeyword(newArr);
    }
  };

  const onSortValueChange = async (newValue) => {
    setSortValue(newValue);
  };

  useEffect(() => {
    const getTheDocs = async () => {
      const newQuery = query(
        studentDB,
        where("status", "in", activeKeywords),
        orderBy(sortValue)
      );
      const output = await getDocs(newQuery);
      setAllStudents(output.docs);
    };

    getTheDocs();
  }, [activeKeywords, sortValue]);

  return (
    <>
      <form>
        <div>
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
        </div>
        <div>
          <label htmlFor="sortValue">Sort By:</label>
          <select
            name="sortValue"
            onChange={(e) => onSortValueChange(e.target.value)}
          >
            <option value="lastName">Last Name</option>
            <option value="gpa">GPA</option>
            <option value="icr">ICR</option>
            <option value="lastLogin">Last Login</option>
          </select>
        </div>
      </form>
    </>
  );
}

export default StudentListSearch;
