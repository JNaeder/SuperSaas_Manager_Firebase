const creds = require("../google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1v1d2RHcofxOYnUU5m7SDgymvIU160RUvpsaO0r1MNCM"
);

async function getStudentDataFromGoogleSheets(db, logger) {
  // Setup database
  const academicStudentDB = db.collection("academic_student");

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

    const studentAcademicFile = await academicStudentDB.doc(studentID).get();
    const studentAcademicData = await studentAcademicFile.data();

    const icrEquals = icr === studentAcademicData["icr"];
    const gpaEquals = gpa === studentAcademicData["gpa"];
    const modEquals = studentMod === studentAcademicData["mod"];
    const instructorEquals =
      currentInstructor === studentAcademicData["instructor"];

    if (!icrEquals || !gpaEquals || !modEquals || !instructorEquals) {
      //   // Add it to the database
      const newDoc = await academicStudentDB
        .doc(studentID)
        .set(newStudentObject);
      const writeTime = newDoc.writeTime.toDate();
      logger.debug(`${studentName} updated at ${writeTime}`);
    }
  }

  return "Done";
}

exports.getStudentDataFromGoogleSheets = getStudentDataFromGoogleSheets;
