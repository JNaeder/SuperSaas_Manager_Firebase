import { getSuperSaasTodayBookings } from "../myScripts/appFunctions";
import { useState, useEffect } from "react";
import TodayBookingFile from "../components/TodayBookingFile";

function TodayBookings({ app }) {
  const [todayBookings, setTodayBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      const output = await getSuperSaasTodayBookings();
      const allBookings = output.data.filter(
        (booking) => booking["created_by"].split("@")[1] === "saeinstitute.edu"
      );
      setTodayBookings(allBookings);
    };

    getBookings();
  }, []);

  return (
    <>
      <h1>Today Booking</h1>
      {todayBookings.map((booking, i) => (
        <TodayBookingFile booking={booking} key={i} />
      ))}
    </>
  );
}

export default TodayBookings;
