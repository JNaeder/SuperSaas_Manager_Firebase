const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");
const supersaasManager = require("./myScripts/supersaasManager");

admin.initializeApp();
const db = admin.firestore();

// ---------- Scheduled Stuff --------
exports.getSheetInfoSchedule = functions.pubsub
  .schedule("0 * * * *")
  .onRun(async () => {
    console.log("Start getSheetInfoSchedule");
    await googleSheets.getStudentDataFromGoogleSheets(db);
    await supersaasManager.processSuperSaasUsers(db);
    return null;
  });

// ---------- Button Stuff -------------
exports.getSheetInfo = functions.https.onCall(async () => {
  const output = await googleSheets.getStudentDataFromGoogleSheets(db);
  return output;
});

exports.getSupersaasUsers = functions.https.onCall(async (data, context) => {
  const allUsers = await supersaasManager.processSupersaasUsers(db);
  return allUsers;
});

exports.processSuperSaasStudents = functions.https.onCall(
  async (data, context) => {
    await supersaasManager.processSuperSaasUsers(db);
  }
);

exports.processAllBookings = functions.https.onCall(async (data, context) => {
  await supersaasManager.processAllBookings(db);
});

// -------- Webhook Stuff --------------
exports.addNewUserWebHook = functions.https.onRequest(async (req, res) => {
  const bookingData = req.body;
  await supersaasManager.processBooking(db, bookingData);
  res.sendStatus(200);
});
