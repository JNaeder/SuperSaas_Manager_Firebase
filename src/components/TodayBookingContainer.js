import TodayBookingFile from "./TodayBookingFile";
import "./todayBookingContainerStyle.css";

function TodayBookingContainer({ todayBookings }) {
  return (
    <>
      <div className="booking_container">
        <h4 style={{ gridColumn: 2 }} className="booking_title">
          Suite 1
        </h4>
        <h4 style={{ gridColumn: 3 }} className="booking_title">
          Suite 2
        </h4>
        <h4 style={{ gridColumn: 4 }} className="booking_title">
          Suite 3
        </h4>
        <h4 style={{ gridColumn: 5 }} className="booking_title">
          Suite 4
        </h4>
        <h4 style={{ gridColumn: 6 }} className="booking_title">
          Audient
        </h4>
        <h4 style={{ gridColumn: 7 }} className="booking_title">
          02R
        </h4>
        <h4 style={{ gridColumn: 8 }} className="booking_title">
          SSL
        </h4>
        <h4 style={{ gridColumn: 9 }} className="booking_title">
          S6
        </h4>
        <h4 style={{ gridColumn: 10 }} className="booking_title">
          Neve
        </h4>
        <h4 style={{ gridRow: "2 / span 2" }}>10 am</h4>
        <h4 style={{ gridRow: "4 / span 2" }}>12 pm</h4>
        <h4 style={{ gridRow: "6 / span 2" }}>2 pm</h4>
        <h4 style={{ gridRow: "8 / span 2" }}>4 pm</h4>
        <h4 style={{ gridRow: "10 / span 2" }}>6 pm</h4>
        <h4 style={{ gridRow: "12 / span 2" }}>8 pm</h4>
        {todayBookings.map((booking, i) => (
          <TodayBookingFile booking={booking} key={i} />
        ))}
      </div>
    </>
  );
}

export default TodayBookingContainer;