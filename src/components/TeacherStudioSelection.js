import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

function TeacherStudioSelection({ setTheStudio, setTheTeacher, app }) {
  const [theStaff, setTheStaff] = useState([]);
  const [allStudios, setAllStudios] = useState([]);

  const db = getFirestore(app);
  const staffDB = collection(db, "supersaas_staff");
  const studioDB = collection(db, "studios");

  useEffect(() => {
    const getStaff = async () => {
      const output = await getDocs(staffDB);
      const docs = output.docs.map((doc) => doc.data());
      setTheStaff(docs);
    };

    getStaff();

    const getStudios = async () => {
      const output = await getDocs(studioDB);
      const docs = output.docs.map((doc) => doc.data());
      setAllStudios(docs);
    };

    getStudios();
  }, []);

  const onChangeStaff = (newValue) => {
    setTheTeacher(newValue);
  };

  const onChangeStudio = (newValue) => {
    setTheStudio(newValue);
  };

  return (
    <>
      <label htmlFor="staff">Staff: </label>
      <select onChange={(e) => onChangeStaff(e.target.value)} name="staff">
        {theStaff.map((staff, i) => (
          <option key={i} value={staff["supersaasID"]}>
            {staff["fullName"]}
          </option>
        ))}
      </select>
      <label htmlFor="studios">Studios: </label>
      <select onChange={(e) => onChangeStudio(e.target.value)} name="studios">
        {allStudios.map((studio, i) => (
          <option key={i} value={studio["supersaasID"]}>
            {studio["studioName"]}
          </option>
        ))}
      </select>
    </>
  );
}

export default TeacherStudioSelection;
