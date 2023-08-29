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
    const rawStudentName = allStudents[i]["Student Name"];
    const studentNameFirst = rawStudentName.split(", ")[1];
    const studentNameLast = rawStudentName.split(", ")[0];
    const studentName = `${studentNameFirst} ${studentNameLast}`;
    const studentModAndClassTime = allStudents[i]["CourseCode"];
    const studentMod = parseInt(studentModAndClassTime[4]);
    const currentInstructor = allStudents[i]["Instructor"];
    const gpa = parseFloat(allStudents[i]["ProjectedGPA"]).toFixed(2);
    const icr = (parseFloat(allStudents[i]["ICR"]) * 100).toFixed(2);

    // Create Student Object
    const newStudentObject = {
      firstName: studentNameFirst.trim(),
      lastName: studentNameLast.trim(),
      fullName: studentName.trim(),
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

async function clearBannedDB(db) {
  console.log("Clearing Banned DB");
  const bannedStudentDB = db.collection("banned");
  const result = await bannedStudentDB.get();
  await result.docs.map((doc) => {
    bannedStudentDB.doc(doc.id).delete();
  });
  console.log("Done clearing DB");
}

async function getBannedStudentData(db) {
  await clearBannedDB(db);

  // Get banned student database
  const bannedStudentDB = db.collection("banned");

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["High Risk Summary PowerBI "];
  const allStudents = await sheet.getRows();

  for (let i = 0; i < allStudents.length; i++) {
    // output.push(allStudents[i]["StuNum"]);

    const studentId = allStudents[i]["StuNum"];
    const attendancePercentage =
      parseFloat(allStudents[i]["Attendance Percentage"]) * 100;
    const canvasGrade = parseFloat(allStudents[i]["Canvas Score"]);

    const newStudentObject = {
      studentID: studentId,
      attendancePercentage: attendancePercentage,
      canvasGrade: canvasGrade,
    };

    if (canvasGrade > 70 || attendancePercentage > 70) {
      const newDoc = await bannedStudentDB.doc(studentId).set(newStudentObject);
      const writeTime = newDoc.writeTime;
      console.log(`Added ${studentId} to the banned database.`);
      console.log("attend", attendancePercentage, "grade", canvasGrade, "\n");
    }
  }

  // return output;
}

async function removeOldStudentsFromDB(db) {
  // Get student academic data from database
  const academicStudentDB = db.collection("academic_student");
  const result = await academicStudentDB.get();
  const allStudents = await result.docs.map((doc) => doc.data());

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["NY GPA Dashboard PowerBI"];
  const allGoogleStudents = await sheet.getRows();
  const allStudentIDs = allGoogleStudents.map((student) => student["StuNum"]);

  // Loop through all the students in the database
  for (let i = 0; i < allStudents.length; i++) {
    const theStudent = allStudents[i];
    const studentID = theStudent["studentID"];
    // Check if current student ID is not in the google database
    if (!allStudentIDs.includes(studentID)) {
      console.log(
        `${theStudent["fullName"]} is NOT in the system. Deleted from Database.`
      );
      // Remove student from academic database
      const docRef = academicStudentDB.doc(studentID);
      const output = await docRef.delete();
      console.log(`Deleted in ${output.writeTime.toDate()}`);

      // Log it
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
exports.getBannedStudentData = getBannedStudentData;
