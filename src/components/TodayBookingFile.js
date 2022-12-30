import moment from "moment/moment";
import TodayBookingButtons from "./TodayBookingButtons";

const chooseColor = (res_name) => {
  if (res_name.includes("Suite")) {
    return "#5e35b1";
  } else if (res_name.includes("Audient")) {
    return "#d2635a";
  } else if (res_name.includes("02R")) {
    return "#43a047";
  } else if (res_name.includes("Neve")) {
    return "#d81b60";
  } else if (res_name.includes("SSL")) {
    return "#01acc1";
  } else if (res_name.includes("S6")) {
    return "#f9a825";
  }
};

const getColumn = (res_name) => {
  switch (res_name) {
    case "Production Suite 1":
    case "Production_Suite_1":
      return 2;
    case "Production Suite 2":
    case "Production_Suite_2":
      return 3;
    case "Production Suite 3":
    case "Production_Suite_3":
      return 4;
    case "Production Suite 4":
    case "Production_Suite_4":
      return 5;
    case "Audient":
      return 6;
    case "02R":
      return 7;
    case "SSL":
      return 8;
    case "Avid S6":
    case "Avid_S6":
      return 9;
    case "Neve":
      return 10;
    default:
      return 1;
  }
};

function TodayBookingFile({ booking, todayBookingDB }) {
  const { studio, student_name, start_time, end_time } = booking;
  const color = chooseColor(studio);
  const column = getColumn(studio);
  const rowStart = moment(start_time).hour() - 8;
  const rowEnd = moment(end_time).hour() - 8;
  const gridStyle = {
    backgroundColor: color,
    gridColumn: `${column} / span 1`,
    gridRow: `${rowStart} / ${rowEnd}`,
  };
  return (
    <>
      <div style={gridStyle} className="booking">
        <h4 className="booking_student_name">{student_name}</h4>

        <TodayBookingButtons
          booking={booking}
          todayBookingDB={todayBookingDB}
        />
      </div>
    </>
  );
}

export default TodayBookingFile;
