const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore().collection("students");

const creds = require("./google_credentials.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const doc = new GoogleSpreadsheet(
  "1v1d2RHcofxOYnUU5m7SDgymvIU160RUvpsaO0r1MNCM"
);

exports.newuser = functions.https.onRequest(async (req, res) => {
  const data = req.body;
  await db.add(data);
  const outputString = `${data.name} has been added to the DB`;
  res.status(200).send(outputString);
});

exports.sheetinfo = functions.https.onRequest(async (req, res) => {
  await doc.useServiceAccountAuth(creds);
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const allRows = await sheet.getRows();

  for (let i = 0; i < allRows.length; i++) {
    // Get Student Info
    const studentID = allRows[i]["StuNum"];
    const studentName = allRows[i]["Student Name"];

    // Check them in the DB
    const studentByID = await db.where("studentID", "==", studentID).get();
    const studentDoesNotExist = studentByID.empty;

    // Update/Add them
    if (studentDoesNotExist) {
      // Add student to the database
      console.log(`Add ${studentName}`);
    } else {
      // Check the GPA/ICR/Mod/Class and update them if necessary
      console.log(`Update ${studentName}`);
    }
  }

  res.status(200).send("Done");
});
