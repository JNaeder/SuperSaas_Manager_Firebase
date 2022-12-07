const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");
const supersaas = require("./myScripts/supersaas");

admin.initializeApp();
const db = admin.firestore();

exports.getSheetInfo = functions.https.onCall(async (data, context) => {
  const output = await googleSheets.getStudentDataFromGoogleSheets(
    db,
    functions.logger
  );
  return output;
});

exports.supersaasTest = functions.https.onCall(async (data, context) => {
  // supersaas.getAllAppointments();
  return null;
});

exports.getSheetInfoSchedule = functions.pubsub
  .schedule("0 */3 * * *")
  .onRun(() => {
    googleSheets.getStudentDataFromGoogleSheets(db, functions.logger);
    functions.logger.debug("Hello!");
    return null;
  });
