require("dotenv").config();

const accountName = "SAE_New_York";
const apiKey = process.env.SUPERSAAS_API_KEY;
const scheduleID = 510374;

const getAllAppointmentsfromToday = async function () {
  const url = `https://www.supersaas.com/api/range/${scheduleID}.json?today=true&limit=100&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data["bookings"];
};

const getAllFutureAppointments = async function () {
  const url = `https://www.supersaas.com/api/range/${scheduleID}.json?api_key=${apiKey}&limit=1000`;
  const response = await fetch(url);
  const data = await response.json();
  return data["bookings"];
};

const getAllUsers = async function () {
  const url = `https://supersaas.com/api/users.json?account=${accountName}&api_key=${apiKey}&limit=1000`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

exports.getAllUsers = getAllUsers;
