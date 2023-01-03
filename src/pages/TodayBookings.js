import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import TodayBookingContainer from "../components/Today Booking Stuff/TodayBookingContainer";

function TodayBookings({ app }) {
  const [todayBookings, setTodayBookings] = useState([]);
  const db = getFirestore(app);
  const todayBookingDB = collection(db, "today_bookings");

  useEffect(() => {
    const getData = async () => {
      onSnapshot(todayBookingDB, (output) => {
        const data = [];
        output.docs.forEach((doc) => {
          data.push(doc.data());
        });
        setTodayBookings(data);
      });
    };
    getData();
  }, []);

  return (
    <div className="today_booking_page">
      <TodayBookingContainer
        todayBookings={todayBookings}
        todayBookingDB={todayBookingDB}
      />
    </div>
  );
}

export default TodayBookings;
