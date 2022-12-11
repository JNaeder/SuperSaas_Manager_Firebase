const supersaas = require("./supersaas");
const logger = require("./logger");

async function processSuperSaasUsers(db) {
  const allUsers = await supersaas.getAllUsers();

  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const emailEnding = currentUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      processStudentUser(db, allUsers[i]);
    } else if (emailEnding === "sae.edu") {
      console.log("Process Staff User");
    }
  }

  return allUsers;
}

async function processStudentUser(db, currentUser) {
  const academicStudents = db.collection("academic_student");

  const supersaasID = currentUser["id"];
  const role = currentUser["role"];
  const supersaasName = currentUser["full_name"];
  const credits = currentUser["credit"];
  const lastLogin = currentUser["last_login"];
  const supersaasEmail = currentUser["name"];

  const studentID = supersaasEmail.split(".")[0];

  const studentDoc = await academicStudents.doc(studentID);
  const output = await studentDoc.get();
  const data = await output.data();

  const userData = {
    name: supersaasEmail,
    credits: credits,
    full_name: supersaasEmail,
  };

  if (data) {
    const { gpa, icr, firstName, lastName } = data;
    const newCredits = supersaas.calculateCredits(data);

    if (credits !== newCredits) {
      console.log(
        `${firstName} ${lastName} credits have been changed to ${newCredits}: GPA: ${gpa} ICR: ${icr}`
      );
      const userData = {
        name: supersaasEmail,
        credit: newCredits,
      };
      supersaas.updateUser(supersaasID, userData);
    }
  }
}

async function processBooking(db, bookingData) {
  const academicStudents = db.collection("academic_student");

  const {
    id: booking_id,
    resource_id,
    user_id,
    res_name,
    created_by,
    full_name,
    field_1_r,
    event,
  } = bookingData;

  const studentID = created_by.split(".")[0];
  const mod = parseInt(field_1_r.split(" ")[1]);

  const academicData = await academicStudents
    .doc(studentID)
    .get()
    .then((output) => output.data());

  const newCreateBookingLog = {
    studentName: academicData["fullName"],
    dateTime: new Date(),
    log: `${event} booking for ${res_name}`,
  };
  logger.newLog(db, newCreateBookingLog);

  const wrongData = {
    name: full_name === academicData["fullName"],
    mod: mod === academicData["mod"],
  };

  if (Object.values(wrongData).includes(false)) {
    await supersaas.updateAppointment(booking_id, {
      full_name: academicData["fullName"],
      field_1_r: `Mod ${academicData["mod"]}`,
    });

    const changes = Object.entries(wrongData)
      .filter((x) => !x[1])
      .map((x) => x[0]);

    const newLog = {
      studentName: academicData["fullName"],
      dateTime: new Date(),
      log: `Updated Booking for ${res_name}. Changed ${changes.join(", ")}`,
    };
    logger.newLog(db, newLog);
    return;
  }
}

exports.processSuperSaasUsers = processSuperSaasUsers;
exports.processBooking = processBooking;
