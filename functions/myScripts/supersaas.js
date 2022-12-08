require("dotenv").config();
const axios = require("axios");

const accountName = "SAE_New_York";
const apiKey = process.env.SUPERSAAS_API_KEY;
const scheduleID = 510374;

const getAllAppointmentsfromToday = async function () {
  const url = `https://www.supersaas.com/api/range/${scheduleID}.json?today=true&limit=1000&api_key=${apiKey}`;
  const response = await axios(url);
  return response.data["bookings"];
};

const getAllFutureAppointments = async function () {
  const url = `https://www.supersaas.com/api/range/${scheduleID}.json?api_key=${apiKey}&limit=1000`;
  const response = await axios(url);
  return response.data["bookings"];
};

const getAllUsers = async function () {
  const url = `https://supersaas.com/api/users.json?account=${accountName}&api_key=${apiKey}&limit=1000`;
  const response = await axios(url);
  return response.data;
};

const updateUser = async function (supersaasID, newData) {
  const url = `https://supersaas.com/api/users/${supersaasID}.json?account=${accountName}&api_key=${apiKey}`;
  const response = await axios.put(url, newData);
  console.log(response.data);
};

const calculateCredits = function (studentData) {
  const { icr, gpa } = studentData;
  if (icr < 70.0 || gpa < 2.0) {
    return "0";
  }
  return "-";
};

exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.calculateCredits = calculateCredits;
