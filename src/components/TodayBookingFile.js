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
  const theDate = moment(booking["start"]).format("MM/DD");
  const startTime = moment(booking["start"]).format("hh:mm A");
  const endTime = moment(booking["finish"]).format("hh:mm A");
  return (
    <div className={chooseColor(booking["res_name"])}>
      <span>
        <b>{booking["full_name"]}</b>
      </span>
      <span>{booking["res_name"]}</span>
      <span>
        {startTime} - {endTime}
      </span>
      <button>Block</button>
      <button>Good</button>
    </div>
  );
}

export default TodayBookingFile;
