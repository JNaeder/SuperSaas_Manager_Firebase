import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import TodayBookingContainer from "../components/TodayBookingContainer";

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
    <>
      <TodayBookingContainer
        todayBookings={todayBookings}
        todayBookingDB={todayBookingDB}
      />
    </>
  );
}

export default TodayBookings;
