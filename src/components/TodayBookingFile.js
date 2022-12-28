import moment from "moment/moment";

const chooseColor = (res_name) => {
  const base = "todayBooking_file ";
  if (res_name.includes("Suite")) {
    return base + "suite";
  } else if (res_name.includes("Audient")) {
    return base + "audient";
  } else if (res_name.includes("02R")) {
    return base + "o2r";
  } else if (res_name.includes("Neve")) {
    return base + "neve";
  }
};

function TodayBookingFile({ booking }) {
  return <></>;
}

export default TodayBookingFile;
