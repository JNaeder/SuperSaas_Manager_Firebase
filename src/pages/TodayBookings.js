import { getSuperSaasTodayBookings } from "../myScripts/appFunctions";

function TodayBookings({ app }) {
  getSuperSaasTodayBookings();
  return (
    <>
      <h1>Today Booking</h1>
      <p>Under Construction</p>
    </>
  );
}

export default TodayBookings;
