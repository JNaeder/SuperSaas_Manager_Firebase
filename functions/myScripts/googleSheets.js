const creds = require("../google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1v1d2RHcofxOYnUU5m7SDgymvIU160RUvpsaO0r1MNCM"
);

async function getStudentDataFromGoogleSheets(db, logger) {
  // Setup database
  const rawStudentDB = db.collection("academic_student");

  // Setup the Google Sheets
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const allStudents = await sheet.getRows();

  const qSnapshot = await rawStudentDB.get();
  const academicStudents = qSnapshot.docs.map((docSnapshot) => {
    return docSnapshot.data();
  });

  // Loop through all the students in the Google Sheet
  for (let i = 0; i < allStudents.length; i++) {
    // Get Student Info
    const studentID = allStudents[i]["StuNum"];
    const academicFile = academicStudents.filter(
      (student) => student["studentID"] === studentID
    );
    console.log(academicFile);

    // const studentName = allStudents[i]["Student Name"];
    // const studentNameFirst = studentName.split(", ")[1];
    // const studentNameLast = studentName.split(", ")[0];
    // const studentMod = allStudents[i]["Mod Section"];
    // const currentInstructor = allStudents[i]["Instructor"];
    // const gpa = parseFloat(allStudents[i]["Projected GPA"]);
    // const icr = parseFloat(allStudents[i]["Running ICR"]);

    // Create Student Object
    //   const newStudentObject = {
    //     firstName: studentNameFirst,
    //     lastName: studentNameLast,
    //     studentID: studentID,
    //     mod: studentMod,
    //     instructor: currentInstructor,
    //     gpa: gpa,
    //     icr: icr,
    //   };

    //   // Add it to the database
    //   rawStudentDB.doc(studentID).set(newStudentObject);
    //   // console.log(db.doc(studentID));
    //   logger.debug(`${studentName} Grade:${gpa}`);
  }
  return "All Students have been processed";
}

exports.getStudentDataFromGoogleSheets = getStudentDataFromGoogleSheets;
