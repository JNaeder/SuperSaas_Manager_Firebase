const axios = require("axios");

const newBookingPayload = {
  id: 81372846,
  start: "2022-12-21T12:00",
  finish: "2022-12-21T14:00",
  resource_id: 740584,
  created_on: "2022-12-11T18:21:07Z",
  user_id: 10725135,
  res_name: "02R",
  created_by: "19033674.us@saeinstitute.edu / administrator",
  price: 100,
  deleted: true,
  updated_on: "2022-12-11T18:21:29Z",
  updated_by: "19033674.us@saeinstitute.edu / administrator",
  status: 94,
  status_message: "Administrator reversed approval",
  full_name: "Aaron George",
  field_1_r: "Mod 3",
  start_utc: "2022-12-21T17:00:00Z",
  finish_utc: "2022-12-21T19:00:00Z",
  email: "19033674.us@saeinstitute.edu",
  price_decimal: "1.00",
  role: 3,
  event: "create",
};

const editBookingPayload = {
  id: 81414012,
  start: "2022-12-15T14:00",
  finish: "2022-12-15T16:00",
  resource_id: 866791,
  created_on: "2022-12-13T02:40:54Z",
  user_id: 11143691,
  res_name: "Production Suite 3",
  created_by: "22052045.us@saeinstitute.edu",
  price: 100,
  deleted: false,
  status: 104,
  status_message: "Approved (unlimited credit)  ",
  full_name: "Bailey Hamrick",
  field_1_r: "Mod 2",
  start_utc: "2022-12-15T19:00:00Z",
  finish_utc: "2022-12-15T21:00:00Z",
  email: "22052045.us@saeinstitute.edu",
  price_decimal: "1.00",
  role: 3,
  event: "edit",
};

const newUserPayload = {
  id: 11506891,
  fk: null,
  created_on: "2022-12-12T15:23:53Z",
  role: 3,
  last_login: "2022-12-12T15:25:24Z",
  name: "22052066.us@saeinstitute.edu",
  full_name: "Justin Dantes",
  credit: "10",
  email: "22052066.us@saeinstitute.edu",
  event: "new",
};

const main = async () => {
  // const url = `http://127.0.0.1:5001/sae-supersaas-manager/us-central1/addNewUserWebHook`;
  const url =
    "http://127.0.0.1:5001/sae-supersaas-manager/us-central1/changeBookingWebHook";
  http: axios.post(url, editBookingPayload);
};

main();
