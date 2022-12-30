import { MdCheckCircle, MdDangerous } from "react-icons/md";
import { doc, updateDoc } from "firebase/firestore";

const bookingCheck = async (booking, todayBookingDB) => {
  const { booking_id, student_name } = booking;
  const answer = window.confirm(`Are you sure ${student_name} did show up?`);
  if (answer) {
    const newData = { status: "GOOD" };
    const docRef = doc(todayBookingDB, booking_id.toString());
    await updateDoc(docRef, newData);
  }
};

const bookingBlock = async (booking, todayBookingDB) => {
  const { booking_id, student_name } = booking;
  const answer = window.confirm(
    `Are you sure ${student_name} did not show up?`
  );
  if (answer) {
    const newData = { status: "MISSED" };
    const docRef = doc(todayBookingDB, booking_id.toString());
    await updateDoc(docRef, newData);
  }
};

function TodayBookingButtons({ booking, todayBookingDB }) {
  const { student_email, status } = booking;
  const emailEnding = student_email.split(" / ")[0].split("@")[1];
  if (emailEnding === "saeinstitute.edu") {
    if (status === "OPEN") {
      return (
        <>
          <div className="booking_buttons_container">
            <button
              className="booking_button good"
              onClick={() => bookingCheck(booking, todayBookingDB)}
            >
              <MdCheckCircle />
            </button>
            <button
              className="booking_button bad"
              onClick={() => bookingBlock(booking, todayBookingDB)}
            >
              <MdDangerous />
            </button>
          </div>
        </>
      );
    } else if (status === "MISSED") {
      return (
        <div className="booking_buttons_container bad">
          <MdDangerous />
        </div>
      );
    } else if (status === "GOOD") {
      return (
        <div className="booking_buttons_container good">
          <MdCheckCircle />
        </div>
      );
    }
  }
}

export default TodayBookingButtons;
