import moment from "moment/moment";
import { MdCheckCircle, MdDangerous } from "react-icons/md";

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

  const onAllow = () => {
    console.log(
      `${booking["full_name"]} has showed up for their ${booking["res_name"]} booking`
    );
  };

  const onBlock = () => {
    console.log(
      `${booking["full_name"]} did not show uo for their ${booking["res_name"]}. Student is now blocked.`
    );
  };
  return (
    <>
      <tr className={chooseColor(booking["res_name"])}>
        <td>{booking["res_name"]}</td>
        <td>{booking["full_name"]}</td>
        <td>{startTime}</td>
        <td>{endTime}</td>
        <td>
          <button className="todayBooking_button allow" onClick={onAllow}>
            {<MdCheckCircle />}
          </button>
        </td>
        <td>
          <button className="todayBooking_button block" onClick={onBlock}>
            {<MdDangerous />}
          </button>
        </td>
      </tr>
    </>
  );
}

export default TodayBookingFile;
