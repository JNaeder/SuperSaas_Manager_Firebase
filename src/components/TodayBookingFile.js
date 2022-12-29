import moment from "moment/moment";

const chooseColor = (res_name) => {
  const base = "todayBooking_file ";
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
  }
};

function TodayBookingFile({ booking }) {
  const { studio, studentName } = booking;
  const bgColor = chooseColor(studio);
  const gridStyle = {
    backgroundColor: bgColor,
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
  };
  return (
    <>
      <div style={gridStyle}>{studentName}</div>
    </>
  );
}

export default TodayBookingFile;
