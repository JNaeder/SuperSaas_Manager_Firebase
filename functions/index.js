const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");

admin.initializeApp();
const db = admin.firestore().collection("students");

exports.getSheetInfo = functions.https.onCall(async (daa, context) => {
  const output = await googleSheets.getStudentDataFromGoogleSheets(
    db,
    functions.logger
  );
  return output;
});

exports.testSheet = functions.https.onRequest(async (req, res) => {
  res.send("Hello!");
});

exports.getSheetInfoSchedule = functions.pubsub
  .schedule("0 */3 * * *")
  .onRun(() => {
    googleSheets.getStudentDataFromGoogleSheets(db, functions.logger);
    functions.logger.debug("Hello!");
    return null;
  });
