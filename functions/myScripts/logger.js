async function newLog(db, newLog) {
  const loggerDB = db.collection("logs");
  await loggerDB.add(newLog);
}

exports.newLog = newLog;
