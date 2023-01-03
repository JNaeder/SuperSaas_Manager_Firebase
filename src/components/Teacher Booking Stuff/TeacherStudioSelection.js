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
    <div className="teacher_studio_selection">
      <div className="label_select">
        <label htmlFor="staff">Staff Member</label>
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
      </div>
      <div className="label_select">
        <label htmlFor="studios">Studio</label>
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
      </div>
      <div className="label_select">
        <label htmlFor="mod">Mod</label>
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
      </div>
    </div>
  );
}

export default TeacherStudioSelection;
