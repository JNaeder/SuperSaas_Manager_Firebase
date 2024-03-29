const supersaas = require("./supersaas");
const logger = require("./logger");
const moment = require("moment-timezone");
const { all } = require("axios");
const { getBannedStudentData } = require("./googleSheets");

const studioRequirements = {
  SSL: 3,
  Audient: 2,
  "02R": 2,
  Avid_S6: 4,
  "Avid S6": 4,
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
  await getBannedStudentData(db);

  const bannedStudentDB = db.collection("banned");
  const result = await bannedStudentDB.get();
  const bannedStudents = await result.docs.map(
    (doc) => doc.data()["studentID"]
  );
  // Loop through each user, and process them if they have a student email
  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const emailEnding = currentUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      await processStudentUser(db, currentUser, bannedStudents);
    } else {
      await processStaffUser(db, currentUser);
    }
  }
}

async function removeOldSupersaasAccounts(db) {
  const supersaasStudentDB = db.collection("supersaas_student");
  const allUsers = await supersaas.getAllUsers();
  const today = moment(new Date());
  for (let i = 0; i < allUsers.length; i++) {
    const theUser = allUsers[i];
    const emailEnding = theUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      const lastSignedIn = moment(theUser["last_login"]);
      const daysSince = today.diff(lastSignedIn, "days");
      if (daysSince > 30) {
        // Get Data about the student from the Academic Databse
        const supersaasID = theUser["id"].toString();
        const studentDoc = await supersaasStudentDB.doc(supersaasID);
        const output = await studentDoc.get();
        const data = await output.data();
        if (data["status"] === "inactive") {
          supersaas.deleteUser(supersaasID);
          // Add new log
          const newLog = {
            studentName: theUser["full_name"],
            dateTime: new Date(),
            log: `Deleted from Supersaas for being an inactive student, and not logged in for 30 days.`,
          };
          logger.newLog(db, newLog);
        }
      }
    }
  }

  // Cleanup SuperSaas DB
  cleanUpSuperSaasDB(db);
}

async function cleanUpSuperSaasDB(db) {
  const supersaasStudentDB = db.collection("supersaas_student");
  const qsnapshot = await supersaasStudentDB.get();
  const docs = await qsnapshot.docs;
  const data = docs.map((doc) => doc.data());
  for (let i = 0; i < data.length; i++) {
    const supersaasStudent = data[i];
    const supersaasID = supersaasStudent["supersaasID"];
    const statusCode = await supersaas.getUserByID(supersaasID);
    if (statusCode !== 200) {
      const output = await supersaasStudentDB.doc(supersaasID).delete();
      console.log(output);
    }
  }
}

async function processStudentUser(db, currentUser, bannedStudents) {
  // Get Database references
  const academicStudents = db.collection("academic_student");
  const supersaasStudentDB = db.collection("supersaas_student");
  const bannedStudentDB = db.collection("banned");

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
    //   // Get data from the database and calculate the credits they should have
    const { gpa, icr, fullName, firstName, lastName, mod, instructor } = data;

    // Get Data about the student from the Academic Databse
    // const bannedDoc = await bannedStudentDB.doc(studentID);
    // const bannedOutput = await bannedDoc.get();
    // const bannedData = await bannedOutput.data();

    let newCredits = "-";
    let canvasGrade = "";
    let attendancePercentage = "";
    if (bannedStudents.includes(studentID)) {
      console.log(`${fullName} is banned. Setting credits to 0`);
      const bannedData = await bannedStudentDB.doc(studentID).get();
      canvasGrade = bannedData.data()["canvasGrade"];
      attendancePercentage = bannedData.data()["attendancePercentage"];
      newCredits = "0";
    }

    //   // If the credits they have now are different than the credits they should have
    if (mod === 1 && credits == "-") {
      const newLog = {
        studentName: fullName,
        dateTime: new Date(),
        log: `Student in Module 1. Credits changed to 0`,
      };
      logger.newLog(db, newLog);
      // Update the user in supersaas
      const userData = {
        name: supersaasEmail,
        credit: "0",
      };
      await supersaas.updateUser(supersaasID, userData);
      newCredits = "0";
    } else if (credits !== newCredits && mod !== 1) {
      const theLog = theEvent === "new" ? `New User Created.` : "";
      const ending = canvasGrade
        ? `: ${canvasGrade} ${attendancePercentage}`
        : "";
      // Add new log
      const newLog = {
        studentName: fullName,
        dateTime: new Date(),
        log: `${theLog} Credits have been changed to ${newCredits}${ending}`,
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
    if (!supersaasID) console.log("NULL ID!");
    // const newDoc = await supersaasStudentDB.doc(supersaasID).set(superSaasData);
    // const writeTime = newDoc.writeTime;
    // // // Update the user in supersaas
    // const userData = {
    //   name: supersaasEmail,
    //   credit: "0",
    // };
    // await supersaas.updateUser(supersaasID, userData);
  }
}

async function processStaffUser(db, currentUser) {
  const staffDB = db.collection("supersaas_staff");

  const role = currentUser["role"];
  const supersaasID = currentUser["id"].toString();
  const lastLogin = currentUser["last_login"];
  const supersaasEmail = currentUser["name"];
  const fullName = currentUser["full_name"];

  // Make new Data for supersaas
  const newSuperSaasData = {
    credit: "-",
    role: 4,
  };

  // Update the supersaas account
  if (role !== 4) {
    await supersaas.updateUser(supersaasID, newSuperSaasData);
  }

  // Make Data for Database
  const newDBData = {
    credits: "-",
    email: supersaasEmail,
    fullName: fullName,
    lastLogin: lastLogin,
    role: 4,
    supersaasID: supersaasID,
  };

  const docRef = await staffDB.doc(supersaasID).get();
  // console.log(fullName, docRef.exists);
  if (!docRef.exists) {
    // Add it to staff Database
    const newDoc = await staffDB.doc(supersaasID).set(newDBData);
    const writeTime = newDoc.writeTime;
    console.log(`Added ${fullName} to DB`);
  }
}

async function processAllBookings(db) {
  const allBookings = await supersaas.getAllFutureAppointments();
  for (let i = 0; i < allBookings.length; i++) {
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
  const todayBookingDB = db.collection("today_bookings");

  // Pull all the data needed from the booking data
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

  // Check if the booking is for today. Add it to the DB if it is
  const todayDate = moment.tz(new Date(), "America/New_York");
  const startDate = moment.tz(start, "America/New_York");
  const bookingIsToday = startDate.isSame(todayDate, "day");
  if (bookingIsToday) {
    if (event === "edit") {
      await deleteTodayBooking(todayBookingDB, booking_id);
    }
    console.log(`Booking is Today. Email is: ${created_by}`);
    addTodayBooking(todayBookingDB, bookingData);
  }

  // Use the student ID to get academic data
  const academicData = await academicStudents
    .doc(studentID)
    .get()
    .then((output) => output.data());

  if (!academicData) {
    console.log(
      `${full_name} is not in the academic system. Cannot process booking.`
    );
    return;
  }

  // See if student can even book the studio
  const correctMod = academicData["mod"];
  const studioRequirement = studioRequirements[res_name];
  const isAllowedToBook = correctMod >= studioRequirement;

  if (!isAllowedToBook) {
    //TODO: PLACEHOLDER - delete booking and email the student.

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

async function deleteBooking(db, bookingData) {
  // Get data from booking data
  const { full_name, res_name, start, email, id } = bookingData;
  const emailEnding = email.split("@")[1];

  // Remove it from today bookings
  const todayBookingDB = db.collection("today_bookings");
  const docRef = todayBookingDB.doc(id.toString());
  const doc = await docRef.get();
  if (doc.exists) {
    docRef.delete();
  }

  // Don't log if a non-user deletes a booking
  if (emailEnding !== "saeinstitute.edu") {
    return;
  }
  // Start the Log
  const startTime = moment(start).format("MM/DD hh:mm A");
  const newString = `Deleted the ${res_name} booking for ${startTime}`;
  const newLog = {
    studentName: full_name,
    dateTime: new Date(),
    log: newString,
  };
  await logger.newLog(db, newLog);
}

async function teacherBooking(bookingData) {
  const startDate = moment(bookingData["startDate"]);
  const endDate = moment(bookingData["endDate"]);
  const timeDiff = endDate.diff(startDate, "days");
  const daysOfWeek = bookingData["daysOfWeek"];

  for (let i = 0; i < timeDiff; i++) {
    const dayName = startDate.format("dddd");
    if (daysOfWeek.includes(dayName)) {
      const output = await supersaas.bookRoom(startDate, bookingData);
      if (output !== 201) {
        return output;
      }
    }
    startDate.add(1, "days");
  }
  return 201;
}

async function getTodayBookings(db) {
  const todayBookingDB = db.collection("today_bookings");

  // Delete all old ones first
  const allDocs = await todayBookingDB.listDocuments();
  const todayDate = moment.tz(new Date(), "America/New_York");
  for (let i = 0; i < allDocs.length; i++) {
    const doc = await allDocs[i].get();
    const data = await doc.data();
    const bookingDate = moment(data["start_time"]);
    if (!bookingDate.isSame(todayDate, "day")) {
      deleteTodayBooking(todayBookingDB, data["booking_id"]);
    }
  }

  const allSuperSaasBookings = await supersaas.getAllAppointmentsfromToday();

  // Go through all today bookings on supersaas and add them to the database
  for (let i = 0; i < allSuperSaasBookings.length; i++) {
    addTodayBooking(todayBookingDB, allSuperSaasBookings[i]);
  }
}

async function addTodayBooking(todayBookingDB, theBookingData) {
  const { id, start, finish, user_id, res_name, full_name, created_by } =
    theBookingData;
  const bookingData = {
    booking_id: id,
    student_name: full_name,
    student_email: created_by,
    studio: res_name,
    start_time: start,
    end_time: finish,
    supersaas_id: user_id,
    status: "OPEN",
  };

  const oldDoc = await todayBookingDB.doc(id.toString()).get();
  if (!oldDoc.exists) {
    const newDoc = todayBookingDB.doc(id.toString());
    const result = await newDoc.create(bookingData);
    console.log(`Wrote Data at ${result.writeTime.toDate()}`);
  }
}

async function deleteTodayBooking(todayBookingDB, booking_id) {
  const docRef = todayBookingDB.doc(booking_id.toString());
  await docRef.delete();
  console.log(`Deleted booking ${booking_id}`);
}

exports.processSuperSaasUsers = processSuperSaasUsers;
exports.removeOldSupersaasAccounts = removeOldSupersaasAccounts;
exports.processStudentUser = processStudentUser;
exports.processAllBookings = processAllBookings;
exports.processBooking = processBooking;
exports.deleteBooking = deleteBooking;
exports.teacherBooking = teacherBooking;
exports.getTodayBookings = getTodayBookings;
