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

const updateAppointment = async function (bookingID, newData) {
  const url = `https://www.supersaas.com/api/bookings/${bookingID}.json?schedule_id=${scheduleID}&account=${accountName}&api_key=${apiKey}`;
  const response = await axios.put(url, newData);
  return response.data;
};

const getAllUsers = async function () {
  const url = `https://supersaas.com/api/users.json?account=${accountName}&api_key=${apiKey}&limit=1000`;
  const response = await axios(url);
  return response.data;
};

const updateUser = async function (supersaasID, newData) {
  const url = `https://supersaas.com/api/users/${supersaasID}.json?account=${accountName}&api_key=${apiKey}`;
  const response = await axios.put(url, newData);
  return response.data;
};

const bookRoom = async function (bookingData) {
  const url = `https://www.supersaas.com/api/bookings.json?schedule_id=${scheduleID}&account=${accountName}&api_key=${apiKey}`;
  const payload = {
    start: bookingData["start"],
  };
};

const calculateCredits = function (studentData) {
  const { icr, gpa } = studentData;
  if (icr < 70.0 || gpa < 2.0) {
    return "0";
  }
  return "-";
};

exports.getAllAppointmentsfromToday = getAllAppointmentsfromToday;
exports.getAllFutureAppointments = getAllFutureAppointments;
exports.updateAppointment = updateAppointment;
exports.getAllUsers = getAllUsers;
exports.updateUser = updateUser;
exports.calculateCredits = calculateCredits;
exports.bookRoom = bookRoom;
