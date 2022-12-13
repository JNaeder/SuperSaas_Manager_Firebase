async function newLog(db, newLog) {
  const loggerDB = db.collection("logs");
  console.log(newLog);
  const docRef = await loggerDB.add(newLog);
  console.log(`Made new document with id ${docRef.id}`);
}

exports.newLog = newLog;
