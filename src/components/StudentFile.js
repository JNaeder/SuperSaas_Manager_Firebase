import moment from "moment";

function StudentFile({ student }) {
  const lastLoggedIn = moment(student["last_login"]).fromNow();
  const outputString = `Name: ${student["full_name"]} - Email:${student["name"]} - Credits: ${student["credit"]} - Last Login: ${lastLoggedIn}`;

  return (
    <>
      <div className="student_file">{outputString}</div>
    </>
  );
}

export default StudentFile;
