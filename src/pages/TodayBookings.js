import {
  getFirestore,
  collection,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import TodayBookingContainer from "../components/TodayBookingContainer";

function TodayBookings({ app }) {
  const [todayBookings, setTodayBookings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore(app);
      const todayBookingDB = collection(db, "today_bookings");
      onSnapshot(todayBookingDB, (output) => {
        const data = [];
        output.docs.forEach((doc) => {
          data.push(doc.data());
        });
        setTodayBookings(data);
      });
      // const docs = await getDocs(todayBookingDB);
      const data = [];
      // docs.forEach((doc) => data.push(doc.data()));
      // setTodayBookings(data);
    };
    getData();
  }, []);

  return (
    <>
      <TodayBookingContainer todayBookings={todayBookings} />
    </>
  );
}

export default TodayBookings;
