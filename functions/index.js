const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");

admin.initializeApp();
const db = admin.firestore().collection("students");

exports.sheetinfo = functions.https.onRequest(async (req, res) => {
  googleSheets.getStudentDataFromGoogleSheets(db);
  res.status(200).send("Done");
});

exports.getSheetInfoSchedule = functions.pubsub
  .schedule("* * * * *")
  .onRun(() => {
    console.log(`Hello at ${new Date().getTime()}`);
    return null;
  });
