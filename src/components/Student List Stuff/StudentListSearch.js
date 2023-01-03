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
    <div className="search_form">
      <form>
        <div className="filter_container">
          <label htmlFor="active" className="filter_label">
            Active
          </label>
          <input
            type="checkbox"
            className="filter_checkbox"
            name="active"
            value="active"
            onChange={(e) => onCheckboxChange(e.target.value)}
          />
          <label htmlFor="blocked" className="filter_label">
            Blocked
          </label>
          <input
            type="checkbox"
            className="filter_checkbox"
            name="blocked"
            value="blocked"
            defaultChecked
            onChange={(e) => onCheckboxChange(e.target.value)}
          />
          <label htmlFor="inactive" className="filter_label">
            Inactive
          </label>
          <input
            type="checkbox"
            className="filter_checkbox"
            name="inactive"
            value="inactive"
            onChange={(e) => onCheckboxChange(e.target.value)}
          />
        </div>
        <div className="sort_container">
          <label htmlFor="sortValue" className="sort_label">
            Sort By:
          </label>
          <select
            name="sortValue"
            className="sort_select"
            onChange={(e) => onSortValueChange(e.target.value)}
          >
            <option value="lastName">Last Name</option>
            <option value="gpa">GPA</option>
            <option value="icr">ICR</option>
            <option value="lastLogin">Last Login</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default StudentListSearch;
