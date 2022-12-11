const creds = require("../google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1XgSe-lkrjvOb9y04XGfJ0G2n_nwLSaVFLFd9OxA-KdY"
);
const logger = require("./logger");

async function getStudentDataFromGoogleSheets(db) {
  // Set up databse and output
  const academicStudentDB = db.collection("academic_student");

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["NY GPA Dashboard PowerBI"];
  const allStudents = await sheet.getRows();

  // Loop through all the students in the Google Sheet
  for (let i = 0; i < allStudents.length; i++) {
    // Get Student Info
    const studentID = allStudents[i]["StuNum"];
    const studentName = allStudents[i]["Student Name"];
    const studentNameFirst = studentName.split(" ")[0];
    const studentNameLast = studentName.split(" ").slice(1)[0];
    const studentModAndClassTime = allStudents[i]["CourseCode"];
    const studentMod = parseInt(studentModAndClassTime.split("-")[0][4]);
    const currentInstructor = allStudents[i]["Instructor"];
    const gpa = parseFloat(allStudents[i]["ProjectedGPA"]);
    const icr = parseFloat(allStudents[i]["ICR"]);

    // Create Student Object
    const newStudentObject = {
      firstName: studentNameFirst,
      lastName: studentNameLast,
      fullName: studentName,
      studentID: studentID,
      instructor: currentInstructor,
      mod: studentMod,
      gpa: gpa,
      icr: icr,
    };

    // Get the data from the academic database
    const studentAcademicFile = await academicStudentDB.doc(studentID).get();
    const studentAcademicData = await studentAcademicFile.data();

    // If there is a document for the student already in the databse
    if (studentAcademicData) {
      // See if anything has changed from the database
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
        console.log(`Changed ${studentName}`);
      }
    }
    // If student is not in the database already
    else {
      const newDoc = await academicStudentDB
        .doc(studentID)
        .set(newStudentObject);
      const writeTime = newDoc.writeTime;
      const newLog = {
        studentName: studentName,
        dateTime: new Date(),
        log: `Created student in academic database`,
      };
      logger.newLog(db, newLog);
    }
  }

  // Somehow loop through all the students in the database, and check to see if they are in the google sheet
  // If not, remove them from the database
}

exports.getStudentDataFromGoogleSheets = getStudentDataFromGoogleSheets;
