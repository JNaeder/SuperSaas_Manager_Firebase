require("dotenv").config();
const supersaas = require("supersaas-api-client");
const moment = require("moment");

const client = new supersaas.Client({
  accountName: "SAE_New_York",
  api_key: "DB15OLn37rWxCBMrTBCiWw",
});

const schedulID = 510374;
const todayDate = moment().format("YYYY-DD-MM HH:MM:SS");

async function getAllAppointments() {
  const output = client.appointments.list(
    schedulID,
    false,
    todayDate,
    500,
    (err, data) => {
      console.log([...data]);
    }
  );
}

exports.getAllAppointments = getAllAppointments;
getAllAppointments();
