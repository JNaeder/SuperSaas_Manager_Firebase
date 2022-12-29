import moment from "moment/moment";
import { MdCheckCircle, MdDangerous } from "react-icons/md";

const chooseColor = (res_name) => {
  if (res_name.includes("Suite")) {
    return "#5e35b1";
  } else if (res_name.includes("Audient")) {
    return "#d81b60";
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
      return 9;
    case "Neve":
      return 10;
  }
};

const bookingCheck = (booking) => {
  console.log(`${booking["student_name"]} showed up and is good to go.`);
};

const bookingBlock = (booking) => {
  console.log(
    `${booking["student_name"]} did not show up to their ${booking["studio"]} booking`
  );
};

function TodayBookingFile({ booking }) {
  const { studio, student_name, start_time, end_time, student_email } = booking;
  const color = chooseColor(studio);
  const column = getColumn(studio);
  const rowStart = moment(start_time).hour() - 8;
  const rowEnd = moment(end_time).hour() - 8;
  const emailEnding = student_email.split(" / ")[0].split("@")[1];
  const gridStyle = {
    backgroundColor: color,
    gridColumn: `${column} / span 1`,
    gridRow: `${rowStart} / ${rowEnd}`,
  };
  return (
    <>
      <div style={gridStyle} className="booking">
        <h4 className="booking_student_name">{student_name}</h4>

        {emailEnding === "saeinstitute.edu" ? (
          <div className="booking_buttons_container">
            <button
              className="booking_button good"
              onClick={() => bookingCheck(booking)}
            >
              <MdCheckCircle />
            </button>
            <button
              className="booking_button bad"
              onClick={() => bookingBlock(booking)}
            >
              <MdDangerous />
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default TodayBookingFile;
