const supersaas = require("./supersaas");

async function processSupersaasUsers(db) {
  const supersaasStaff = db.collection("supersaas_staff");
  const allUsers = await supersaas.getAllUsers();

  for (let i = 0; i < allUsers.length; i++) {
    const currentUser = allUsers[i];
    const emailEnding = currentUser["name"].split("@")[1];
    if (emailEnding === "saeinstitute.edu") {
      processStudentUser(db, allUsers[i]);
    }
  }

  console.log("All Done!");
}

async function processStudentUser(db, currentUser) {
  const supersaasStudents = db.collection("supersaas_students");
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

  if (data) {
    const { gpa, icr, firstName, lastName } = data;
    console.log(
      `Processed ${supersaasName} GPA: ${gpa} ICR ${icr} Real Name: ${firstName} ${lastName}`
    );
  } else {
    console.log(
      `${supersaasName} is not in the academic system. Last logged in ${lastLogin} ${credits} credits`
    );
  }
  // const userData = {
  //   fullName: supersaasName,
  //   supersaasID: supersaasID,
  //   role: role,
  //   credits: credits,
  //   lastLogin: lastLogin,
  //   email: supersaasEmail,
  // };

  // if (emailEnding === "saeinstitute.edu") {
  //   supersaasStudents.doc(supersaasID.toString()).set(userData);
  // } else if (emailEnding === "sae.edu") {
  //   supersaasStaff.doc(supersaasID.toString()).set(userData);
  // }
}

exports.processSupersaasUsers = processSupersaasUsers;
