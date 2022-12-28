import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

function TodayBookings({ app }) {
  const [todayBookings, setTodayBookings] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const db = getFirestore(app);
      const todayBookingDB = collection(db, "today_bookings");
      const docs = await getDocs(todayBookingDB);
      const data = [];
      docs.forEach((doc) => data.push(doc.data()));
      setTodayBookings(data);
    };
    getData();
  }, []);

  return (
    <>
      <h1>Today Bookings</h1>
      {todayBookings.map((booking, i) => (
        <h3 key={i}>{booking["student_name"]}</h3>
      ))}
    </>
  );
}

export default TodayBookings;
