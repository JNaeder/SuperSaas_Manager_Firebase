const supersaas = require("./supersaas");
const logger = require("./logger");
const moment = require("moment");

const studioRequirements = {
  SSL: 3,
  Audient: 2,
  "02R": 2,
  Avid_S6: 4,
  Neve: 2,
  Production_Suite_1: 2,
  Production_Suite_2: 2,
  Production_Suite_3: 2,
  Production_Suite_4: 2,
  "Production Suite 1": 2,
  "Production Suite 2": 2,
  "Production Suite 3": 2,
  "Production Suite 4": 2,
};

async function processSuperSaasUsers(db) {
  console.log("STARTING TO PROCESS USERS");
  // Get All users from SuperSaas
  const allUsers = await supersaas.getAllUsers();

  // Loop through each user, and process them if they have a student email
  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const emailEnding = currentUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      await processStudentUser(db, allUsers[i]);
    }
    // TODO: Setup something to process staff users as well
  }
}

async function processStudentUser(db, currentUser) {
  // Get Database references
  const academicStudents = db.collection("academic_student");
  const supersaasStudentDB = db.collection("supersaas_student");

  // Get info about the user from SuperSaas
  const supersaasID = currentUser["id"].toString();
  const role = currentUser["role"];
  const supersaasName = currentUser["full_name"];
  const credits = currentUser["credit"];
  const lastLogin = currentUser["last_login"];
  const supersaasEmail = currentUser["name"];
  const studentID = supersaasEmail.split(".")[0];
  const theEvent = currentUser["event"];

  // Get Data about the student from the Academic Databse
  const studentDoc = await academicStudents.doc(studentID);
  const output = await studentDoc.get();
  const data = await output.data();

  // If student exists in the database
  if (data) {
    // Get data from the database and calculate the credits they should have
    const { gpa, icr, fullName, firstName, lastName, mod, instructor } = data;
    const newCredits = supersaas.calculateCredits(data);

    // If the credits they have now are different than the credits they should have
    if (credits !== newCredits) {
      const theLog = theEvent === "new" ? `New User Created.` : "";

      // Add new log
      const newLog = {
        studentName: fullName,
        dateTime: new Date(),
        log: `${theLog} Credits have been changed to ${newCredits}: GPA: ${gpa} ICR: ${icr}`,
      };
      console.log(`${fullName} changed credits`);
      logger.newLog(db, newLog);

      // Update the user in supersaas
      const userData = {
        name: supersaasEmail,
        credit: newCredits,
      };
      await supersaas.updateUser(supersaasID, userData);
    }
    // Check if the name in SuperSaas is correct
    if (fullName !== supersaasName) {
      const newLog = {
        studentName: fullName,
        dateTime: new Date(),
        log: `Name has been corrected. Old name: ${supersaasName}`,
      };
      console.log(`${fullName} changed name`);
      logger.newLog(db, newLog);

      // Update the user in supersaas
      const userData = {
        name: supersaasEmail,
        full_name: fullName,
      };
      await supersaas.updateUser(supersaasID, userData);
    }

    const status = newCredits === "-" ? "active" : "blocked";

    // Setup Data for the SuperSaas Student Database
    const superSaasData = {
      fullName: fullName,
      gpa: gpa,
      icr: icr,
      firstName: firstName,
      lastName: lastName,
      credits: newCredits,
      mod: mod,
      lastLogin: lastLogin,
      supersaasID: supersaasID,
      email: supersaasEmail,
      status: status,
      instructor: instructor,
    };

    const newDoc = await supersaasStudentDB.doc(supersaasID).set(superSaasData);
    const writeTime = newDoc.writeTime;
  } else {
    // Setup Data for the SuperSaas Student Database
    // console.log(`${supersaasName} is not in the system`);
    const superSaasData = {
      fullName: supersaasName,
      firstName: supersaasName.split(" ")[0],
      lastName: supersaasName.split(" ")[1],
      credits: "0",
      lastLogin: lastLogin,
      supersaasID: supersaasID,
      email: supersaasEmail,
      status: "inactive",
    };
    const newDoc = await supersaasStudentDB.doc(supersaasID).set(superSaasData);
    const writeTime = newDoc.writeTime;

    // Update the user in supersaas
    const userData = {
      name: supersaasEmail,
      credit: "0",
    };
    await supersaas.updateUser(supersaasID, userData);
  }
}

async function processAllBookings(db) {
  const allBookings = await supersaas.getAllFutureAppointments();
  for (let i = 0; i < allBookings.length; i++) {
    // processBooking(db, allBookings[i]);
    const { created_by } = allBookings[i];
    const emailEnd = created_by.split("@")[1];
    if (emailEnd === "saeinstitute.edu") {
      processBooking(db, allBookings[i]);
    }
  }
}

async function processBooking(db, bookingData) {
  // Get Collection reference to the academic database
  const academicStudents = db.collection("academic_student");

  // Pull all the data I need from the booking data
  const {
    id: booking_id,
    res_name,
    created_by,
    full_name,
    field_1_r,
    event,
    start,
  } = bookingData;

  // Manipulate some of the data
  const studentID = created_by.split(".")[0];
  const mod = parseInt(field_1_r.split(" ")[1]);
  const startTime = moment(start).format("MM/DD hh:mm A");

  // Use the student ID to get academix data
  const academicData = await academicStudents
    .doc(studentID)
    .get()
    .then((output) => output.data());

  // See if student can even book the studio
  const correctMod = academicData["mod"];
  const studioRequirement = studioRequirements[res_name];
  const isAllowedToBook = correctMod >= studioRequirement;
  console.log(res_name);
  console.log(
    `Correct Mod: ${correctMod} Student Req: ${studioRequirement} StudentName: ${academicData["fullName"]}`
  );
  if (!isAllowedToBook) {
    const newLog = {
      studentName: academicData["fullName"],
      dateTime: new Date(),
      log: `***** Tried booking ${res_name} but is not allowed. Only in Mod ${correctMod} *****`,
    };
    logger.newLog(db, newLog);
    return;
  }

  // Compare the data form supersaas with the academic data
  const wrongData = {
    name: full_name === academicData["fullName"],
    mod: mod === academicData["mod"],
  };

  // If there is any data that does not match up
  if (Object.values(wrongData).includes(false)) {
    // Update the booking with academic data
    await supersaas.updateAppointment(booking_id, {
      full_name: academicData["fullName"],
      field_1_r: `Mod ${academicData["mod"]}`,
    });

    // Get a string of what was changed
    const changes = Object.entries(wrongData)
      .filter((x) => !x[1])
      .map((x) => x[0]);

    // Start a new log
    const newLog = {
      studentName: academicData["fullName"],
      dateTime: new Date(),
      log: `${
        event === "create" ? "Created New Booking" : "Updated Booking"
      } for ${res_name} for ${startTime} (Changed ${changes.join(", ")})`,
    };
    logger.newLog(db, newLog);
    return;
  }
  // Log this if the event from the webhook is create
  if (event === "create") {
    const newCreateBookingLog = {
      studentName: academicData["fullName"],
      dateTime: new Date(),
      log: `Created new booking for ${res_name} for ${startTime}`,
    };
    logger.newLog(db, newCreateBookingLog);
  }
}

async function logDeletedBooking(db, bookingData) {
  const { full_name, res_name, start } = bookingData;
  const startTime = moment(start).format("MM/DD hh:mm A");
  const newString = `Deleted the ${res_name} booking for ${startTime}`;
  const newLog = {
    studentName: full_name,
    dateTime: new Date(),
    log: newString,
  };
  await logger.newLog(db, newLog);
}

exports.processSuperSaasUsers = processSuperSaasUsers;
exports.processStudentUser = processStudentUser;
exports.processAllBookings = processAllBookings;
exports.processBooking = processBooking;
exports.logDeletedBooking = logDeletedBooking;
