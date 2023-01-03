import { Calendar } from "react-calendar";
import "../components/Teacher Booking Stuff/TeacherBooking_Style.css";
import "../components/Teacher Booking Stuff/TeacherBooking_Calendar_Style.css";
import { useState, useEffect } from "react";
import SelectDaysOfWeek from "../components/Teacher Booking Stuff/SelectDaysOfWeek";
import TeacherStudioSelection from "../components/Teacher Booking Stuff/TeacherStudioSelection";
import TeacherTimeSelection from "../components/Teacher Booking Stuff/TeacherTimeSelection";
import { teacherBookingFunction } from "../myScripts/appFunctions";

function TeacherBookingPage({ app }) {
  const [theDate, setTheDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [daysOfWeek, setDaysOfWeek] = useState();
  const [theTeacher, setTheTeacher] = useState();
  const [theStudio, setTheStudio] = useState("");
  const [theMod, setTheMod] = useState("");
  const [buttonState, setButtonState] = useState(true);

  const listOfData = [
    theDate,
    startTime,
    endTime,
    daysOfWeek,
    theTeacher,
    theStudio,
    theMod,
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      startDate: theDate[0],
      endDate: theDate[1],
      teacherID: theTeacher,
      studioID: theStudio,
      daysOfWeek: daysOfWeek,
      startTime: startTime,
      endTime: endTime,
      mod: theMod,
    };
    const output = await teacherBookingFunction(payload);
    if (output === 201) {
      alert("Successfully Created Bookings");
      window.location.reload();
    } else {
      alert(`Could not create booking: Error code ${output}`);
    }
  };

  useEffect(() => {
    for (let i = 0; i < listOfData.length; i++) {
      const hasValue = !!listOfData[i];
      if (!hasValue) {
        setButtonState(true);
        return;
      }
    }
    setButtonState(false);
  }, listOfData);

  return (
    <div className="teacher_booking_section">
      <TeacherStudioSelection
        setTheTeacher={setTheTeacher}
        setTheStudio={setTheStudio}
        setTheMod={setTheMod}
        app={app}
      />
      <Calendar onChange={setTheDate} selectRange={true} calendarType={"US"} />
      <TeacherTimeSelection
        setStartTime={setStartTime}
        setEndTime={setEndTime}
      />
      <SelectDaysOfWeek setDaysOfWeek={setDaysOfWeek} daysOfWeek={daysOfWeek} />
      <button
        onClick={onSubmit}
        id="submit_button"
        disabled={buttonState}
        className="book_button"
      >
        Book
      </button>
    </div>
  );
}

export default TeacherBookingPage;
