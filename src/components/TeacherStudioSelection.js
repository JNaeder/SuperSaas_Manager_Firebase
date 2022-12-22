import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function TeacherStudioSelection({
  setTheStudio,
  setTheTeacher,
  setTheMod,
  app,
}) {
  const [theStaff, setTheStaff] = useState([]);
  const [allStudios, setAllStudios] = useState([]);

  const db = getFirestore(app);
  const staffDB = collection(db, "supersaas_staff");
  const studioDB = collection(db, "studios");

  const theMods = ["Mod 1", "Mod 2", "Mod 3", "Mod 4"];

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
    const parsedData = JSON.parse(newValue);
    setTheTeacher(parsedData);
  };

  const onChangeStudio = (newValue) => {
    setTheStudio(newValue);
  };

  const onChangeMod = (newValue) => {
    setTheMod(newValue);
  };

  return (
    <>
      <label htmlFor="staff">Staff: </label>
      <select
        onChange={(e) => onChangeStaff(e.target.value)}
        name="staff"
        defaultValue={"-"}
      >
        <option disabled>-</option>
        {theStaff.map((staff, i) => (
          <option key={i} value={JSON.stringify(staff)}>
            {staff["fullName"]}
          </option>
        ))}
      </select>
      <label htmlFor="studios">Studios: </label>
      <select
        onChange={(e) => onChangeStudio(e.target.value)}
        name="studios"
        defaultValue={"-"}
      >
        <option disabled>-</option>
        {allStudios.map((studio, i) => (
          <option key={i} value={studio["supersaasID"]}>
            {studio["studioName"]}
          </option>
        ))}
      </select>

      <label htmlFor="mod">Mod: </label>
      <select
        onChange={(e) => onChangeMod(e.target.value)}
        name="mod"
        defaultValue={"-"}
      >
        <option disabled>-</option>
        {theMods.map((mod, i) => (
          <option key={i} value={mod}>
            {mod}
          </option>
        ))}
      </select>
    </>
  );
}

export default TeacherStudioSelection;
