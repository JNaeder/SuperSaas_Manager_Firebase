const supersaas = require("./supersaas");

async function processSupersaasUsers(db) {
  const allUsers = await supersaas.getAllUsers();

  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const emailEnding = currentUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      processStudentUser(db, allUsers[i]);
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
  // const output = await db.getAll(studentDoc);
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
exports.processSupersaasUsers = processSupersaasUsers;
