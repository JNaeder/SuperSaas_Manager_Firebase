import { Calendar } from "react-calendar";
import "../components/teacherBookingStyle.css";
import { useState, useEffect } from "react";
import SelectDaysOfWeek from "../components/SelectDaysOfWeek";
import TeacherStudioSelection from "../components/TeacherStudioSelection";
import { teacherBooking } from "../myScripts/appFunctions";
import TimePicker from "react-time-picker";

function TeacherBookingPage({ app }) {
  const [theDate, setTheDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [theTeacher, setTheTeacher] = useState("");
  const [theStudio, setTheStudio] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const payloaad = {
      startDate: theDate[0],
      endDate: theDate[1],
      teacherID: theTeacher,
      studioID: theStudio,
      daysOfWeek: daysOfWeek,
    };

    teacherBooking(payloaad);
  };

  return (
    <>
      <h1>Teacher Booking</h1>
      <div className="teacherBooking_section">
        <TeacherStudioSelection
          setTheTeacher={setTheTeacher}
          setTheStudio={setTheStudio}
          app={app}
        />
        <Calendar onChange={setTheDate} selectRange={true} />
        <SelectDaysOfWeek
          setDaysOfWeek={setDaysOfWeek}
          daysOfWeek={daysOfWeek}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </>
  );
}

export default TeacherBookingPage;
