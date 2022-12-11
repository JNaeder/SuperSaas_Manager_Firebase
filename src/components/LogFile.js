import moment from "moment";

function LogFile({ log }) {
  const dateTime = moment(log["dateTime"].toDate()).format("MM/DD hh:mm:ss A");
  return (
    <tr>
      {<td>{dateTime}</td>}
      <td>{log["studentName"]}</td>
      <td>{log["log"]}</td>
    </tr>
  );
}

export default LogFile;
