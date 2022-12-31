const axios = require("axios");

const newBookingPayload = {
  id: 81800412,
  start: "2022-12-30T18:00",
  finish: "2022-12-30T20:00",
  resource_id: 772666,
  created_on: "2022-12-31T03:18:49Z",
  user_id: 0,
  res_name: "SSL",
  created_by: "administrator",
  price: 100,
  deleted: false,
  status: 104,
  status_message: "Approved (unlimited credit)  ",
  full_name: "SAE Institute of Technology - New York",
  field_1_r: "Mod 1",
  start_utc: "2022-12-30T23:00:00Z",
  finish_utc: "2022-12-31T01:00:00Z",
  price_decimal: "1.00",
  role: 3,
  event: "create",
};

const editBookingPayload = {
  id: 81800412,
  start: "2022-12-30T18:00",
  finish: "2022-12-30T20:00",
  resource_id: 740587,
  created_on: "2022-12-31T03:18:49Z",
  user_id: 0,
  res_name: "Avid S6",
  created_by: "administrator",
  price: 100,
  deleted: false,
  updated_on: "2022-12-31T03:19:08Z",
  updated_by: "administrator",
  status: 104,
  status_message: "Approved (unlimited credit)  ",
  full_name: "SAE Institute of Technology - New York",
  field_1_r: "Mod 1",
  start_utc: "2022-12-30T23:00:00Z",
  finish_utc: "2022-12-31T01:00:00Z",
  price_decimal: "1.00",
  role: 3,
  event: "edit",
};

const createBooking = async () => {
  const url =
    "http://127.0.0.1:5001/sae-supersaas-manager/us-central1/changeBookingWebHook";
  axios.post(url, newBookingPayload);
};

const editBooking = async () => {
  const url =
    "http://127.0.0.1:5001/sae-supersaas-manager/us-central1/changeBookingWebHook";
  axios.post(url, editBookingPayload);
};

// createBooking();
editBooking();
