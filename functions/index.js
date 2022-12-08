const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");
const supersaasManager = require("./myScripts/supersaasManager");

admin.initializeApp();
const db = admin.firestore();

exports.getSheetInfo = functions.https.onCall(async (data, context) => {
  const output = await googleSheets.getStudentDataFromGoogleSheets(
    db,
    functions.logger
  );
  return output;
});

exports.getSheetInfoSchedule = functions.pubsub
  .schedule("0 */3 * * *")
  .onRun(async () => {
    const output = await googleSheets.getStudentDataFromGoogleSheets(
      db,
      functions.logger
    );
    functions.logger.debug(output);
    return null;
  });

exports.getSupersaasUsers = functions.https.onCall(async (data, context) => {
  const allUsers = await supersaasManager.processSupersaasUsers(db);
  return allUsers;
});

exports.processSuperSaasStudents = functions.https.onCall(
  async (data, context) => {
    await supersaasManager.processSupersaasUsers(db);
  }
);
