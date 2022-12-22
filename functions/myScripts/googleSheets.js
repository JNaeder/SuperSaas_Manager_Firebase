const creds = require("../google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1XgSe-lkrjvOb9y04XGfJ0G2n_nwLSaVFLFd9OxA-KdY"
);
const logger = require("./logger");

async function getStudentDataFromGoogleSheets(db) {
  console.log("STARTING TO PROCESS GOOGLE SHEET");
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
    const studentNameLast = studentName.split(" ").slice(1).join(" ");
    const studentModAndClassTime = allStudents[i]["CourseCode"];
    const studentMod = parseInt(studentModAndClassTime[4]);
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

      // Log this
      const newLog = {
        studentName: studentName,
        dateTime: new Date(),
        log: `Created student in academic database`,
      };
      logger.newLog(db, newLog);
      console.log(`Added ${studentName} to the system.`);
    }
  }
}

async function removeOldStudentsFromDB(db) {
  const academicStudentDB = db.collection("academic_student");
  const result = await academicStudentDB.get();
  const allStudents = await result.docs.map((doc) => doc.data());

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["NY GPA Dashboard PowerBI"];
  const allGoogleStudents = await sheet.getRows();
  const allStudentIDs = allGoogleStudents.map((student) => student["StuNum"]);

  for (let i = 0; i < allStudents.length; i++) {
    const theStudent = allStudents[i];
    const studentID = theStudent["studentID"];
    if (!allStudentIDs.includes(studentID)) {
      console.log(
        `${theStudent["fullName"]} is NOT in the system. Deleted from Database.`
      );
      const docRef = academicStudentDB.doc(studentID);
      const output = await docRef.delete();
      console.log(`Deleted in ${output.writeTime.toDate()}`);

      const newLog = {
        studentName: theStudent["fullName"],
        dateTime: new Date(),
        log: `Student is not in the system. Deleted from Academic Database.`,
      };

      logger.newLog(db, newLog);
    }
  }
}

exports.getStudentDataFromGoogleSheets = getStudentDataFromGoogleSheets;
exports.removeOldStudentsFromDB = removeOldStudentsFromDB;
