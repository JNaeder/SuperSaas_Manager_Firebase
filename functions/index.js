const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");
const supersaasManager = require("./myScripts/supersaasManager");
const logger = require("./myScripts/logger");

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
exports.addNewBookingWebHook = functions.https.onRequest(async (req, res) => {
  const bookingData = req.body;
  await supersaasManager.processBooking(db, bookingData);
  res.sendStatus(200);
});

exports.changeBookingWebHook = functions.https.onRequest(async (req, res) => {
  const bookingData = req.body;
  const { event, full_name, res_name, start } = bookingData;
  const newString = `${full_name} ${event}ed the ${res_name} booking for ${start}`;
  const newLog = {
    studentName: full_name,
    dateTime: new Date(),
    log: newString,
  };
  await logger.newLog(db, newLog);
  res.sendStatus(200);
});

exports.addNewUserWebHook = functions.https.onRequest(async (req, res) => {
  const newUserData = req.body;
  await supersaasManager.processSuperSaasUser(db, newUserData);
  res.sendStatus(200);
});
