const creds = require("../google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1v1d2RHcofxOYnUU5m7SDgymvIU160RUvpsaO0r1MNCM"
);

async function getStudentDataFromGoogleSheets(db, logger) {
  // Setup database
  const academicStudentDB = db.collection("academic_student");

  const output = [];

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const allStudents = await sheet.getRows();

  // // Loop through all the students in the Google Sheet
  for (let i = 0; i < allStudents.length; i++) {
    // Get Student Info
    const studentID = allStudents[i]["StuNum"];
    const studentName = allStudents[i]["Student Name"];
    const studentNameFirst = studentName.split(", ")[1];
    const studentNameLast = studentName.split(", ")[0];
    const studentMod = allStudents[i]["Mod Section"];
    const currentInstructor = allStudents[i]["Instructor"];
    const gpa = parseFloat(allStudents[i]["Projected GPA"]);
    const icr = parseFloat(allStudents[i]["Running ICR"]);

    //   // Create Student Object
    const newStudentObject = {
      firstName: studentNameFirst,
      lastName: studentNameLast,
      studentID: studentID,
      mod: studentMod,
      instructor: currentInstructor,
      gpa: gpa,
      icr: icr,
    };

    // Get the data from the academic database
    const studentAcademicFile = await academicStudentDB.doc(studentID).get();
    const studentAcademicData = await studentAcademicFile.data();

    const dataChanges = {
      gpa: gpa === studentAcademicData["gpa"],
      icr: icr === studentAcademicData["icr"],
      mod: studentMod === studentAcademicData["mod"],
      instructor: currentInstructor === studentAcademicData["instructor"],
    };

    // If something doesn't match, write the google data to the database.
    if (Object.values(dataChanges).includes(false)) {
      const theChanges = Object.entries(dataChanges)
        .filter((entry) => !entry[1])
        .map((entry) => entry[0]);

      const newDoc = await academicStudentDB
        .doc(studentID)
        .set(newStudentObject);
      const writeTime = newDoc.writeTime;

      const log = {
        write_time: writeTime,
        studentName: studentName,
        changes: theChanges,
      };
      output.push(log);
      logger.debug(studentName);
    }
  }

  return output;
}

exports.getStudentDataFromGoogleSheets = getStudentDataFromGoogleSheets;
