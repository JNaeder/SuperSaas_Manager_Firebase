function calculateClassName(student) {
  const theCredits = student["credits"];
  const status = student["status"];
  if (status === "active") {
    if (theCredits === "-") {
      return "student_file active";
    } else {
      return "student_file blocked";
    }
  } else {
    return "student_file inactive";
  }
}

function StudentFile({ student, setSpotlightStudent }) {
  const theClassName = calculateClassName(student);

  return (
    <button
      className={theClassName}
      id="student_file"
      onClick={() => setSpotlightStudent(student)}
    >
      <p>
        {student["lastName"]}, {student["firstName"]}
      </p>
    </button>
  );
}

export default StudentFile;
