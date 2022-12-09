import moment from "moment";

function LogItem({ item }) {
  const changes = item["changes"];
  const name = item["studentName"];
  const theTime = moment(item["write_time"]["_seconds"]).format("HH:MM:SS");
  console.log(theTime);
  return (
    <>
      <p>{`Changed ${name}'s ${[...changes]} at ${theTime}`}</p>
    </>
  );
}

export default LogItem;
