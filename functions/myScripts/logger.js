async function newLog(db, newLog) {
  const loggerDB = db.collection("logs");
  const docRef = await loggerDB.add(newLog);
  console.log(`Made new Log in Databse with id ${docRef.id}`);
}

exports.newLog = newLog;
