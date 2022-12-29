import TodayBookingFile from "./TodayBookingFile";
import "./todayBookingContainerStyle.css";

function TodayBookingContainer({ todayBookings }) {
  return (
    <>
      <div className="booking_container">
        {todayBookings.map((booking, i) => (
          <TodayBookingFile booking={booking} key={i} />
        ))}
      </div>
    </>
  );
}

export default TodayBookingContainer;
