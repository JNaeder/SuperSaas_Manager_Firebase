const functions = require("firebase-functions");
const admin = require("firebase-admin");
const googleSheets = require("./myScripts/googleSheets");
const supersaasManager = require("./myScripts/supersaasManager");
const supersaas = require("./myScripts/supersaas");
var serviceAccount = require("./firebase_credentials.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sae-supersaas-manager-default-rtdb.firebaseio.com",
});
const db = admin.firestore();

// ---------- Scheduled Stuff --------
exports.getSheetInfoSchedule = functions.pubsub
  .schedule("0 */2 * * *")
  .onRun(async () => {
    console.log("Start getSheetInfoSchedule");
    await googleSheets.getStudentDataFromGoogleSheets(db);
    await supersaasManager.removeOldSupersaasAccounts(db);
    return null;
  });

exports.removeOldStudentsSchedule = functions.pubsub
  .schedule("0 */2 * * *")
  .onRun(async () => {
    console.log("Start Remove Old Studnets");
    await googleSheets.removeOldStudentsFromDB(db);
    return null;
  });

exports.processAllStudentsSchedule = functions.pubsub
  .schedule("0 */2 * * *")
  .onRun(async () => {
    console.log("Start process All Students");
    await supersaasManager.processSuperSaasUsers(db);
    return null;
  });

exports.getTodayBookingsSchedule = functions.pubsub
  .schedule("0 1 * * *")
  .onRun(async () => {
    console.log("Get Today Bookings");
    await supersaasManager.getTodayBookings(db);
    return null;
  });

// ---------- Button Stuff -------------
exports.getTodayBookings = functions.https.onCall(async () => {
  const output = supersaasManager.getTodayBookings(db);
  return output;
});

exports.getSheetInfo = functions.https.onCall(async () => {
  const output = await googleSheets.getStudentDataFromGoogleSheets(db);
  return output;
});

exports.removeOldStudents = functions.https.onCall(async () => {
  const output = await googleSheets.removeOldStudentsFromDB(db);
  return output;
});

exports.removeOldSupersaasAccounts = functions.https.onCall(async () => {
  const output = await supersaasManager.removeOldSupersaasAccounts(db);
  return output;
});

exports.getSupersaasUsers = functions.https.onCall(async () => {
  const allUsers = await supersaasManager.processSupersaasUsers(db);
  return allUsers;
});

exports.getSuperSaasTodayBookings = functions.https.onCall(async () => {
  const todayBookings = await supersaas.getAllAppointmentsfromToday();
  return todayBookings;
});

exports.processSuperSaasStudents = functions.https.onCall(async () => {
  await supersaasManager.processSuperSaasUsers(db);
  return;
});

exports.processAllBookings = functions.https.onCall(async () => {
  await supersaasManager.processAllBookings(db);
  return;
});

exports.teacherBooking = functions.https.onCall(async (data, context) => {
  const output = await supersaasManager.teacherBooking(data);
  return output;
});

// -------- Webhook Stuff --------------
exports.addNewBookingWebHook = functions.https.onRequest(async (req, res) => {
  const bookingData = req.body;
  await supersaasManager.processBooking(db, bookingData);
  res.sendStatus(200);
});

exports.changeBookingWebHook = functions.https.onRequest(async (req, res) => {
  const bookingData = req.body;
  const { created_by, email } = bookingData;
  console.log(`Booking made by: ${created_by}`);
  console.log(`Email: ${email}`);
  const { event } = bookingData;
  if (event === "destroy") {
    supersaasManager.deleteBooking(db, bookingData);
  } else {
    await supersaasManager.processBooking(db, bookingData);
  }
  res.sendStatus(200);
});

exports.addNewUserWebHook = functions.https.onRequest(async (req, res) => {
  const newUserData = req.body;
  await supersaasManager.processStudentUser(db, newUserData);
  res.sendStatus(200);
});

exports.getStudentDataWebHook = functions.https.onRequest(async (req, res) => {
  const logger = functions.logger;

  const stored_key =
    "pE4XV7mkJXqfHqzaf7FJ6yp53dsBROyQRg3FPLYjB7BnSUWDAvFQU9jKFdALl8gf";
  const { api_key } = req.body;
  if (stored_key == api_key) {
    logger.debug(req.body);
    console.log(req.body);
    res.status(200).send("Hey Buddy. Thanks for sending me data!");
  } else {
    logger.debug(`Invalid request with API_KEY: ${api_key}`);
    res.sendStatus(401);
  }
});

supersaasManager.processSuperSaasUsers(db);
