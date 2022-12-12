function calculateClassName(theCredits) {
  if (theCredits === "0") {
    return "student_file blocked";
  } else if (theCredits === "-") {
    return "student_file active";
  } else {
    return "student_file";
  }
}

function StudentFile({ student }) {
  const theClassName = calculateClassName(student["credits"]);

  return (
    <div className={theClassName} id="student_file">
      <p>
        Name: <b>{student["fullName"]}</b>
      </p>
      <div>
        <span>Email: {student["email"]} </span>
        <span>Credits: {student["credits"]} </span>
      </div>
    </div>
  );
}

export default StudentFile;
