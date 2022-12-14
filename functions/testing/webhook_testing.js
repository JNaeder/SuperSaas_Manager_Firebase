const axios = require("axios");

const newBookingPayload = {
  id: 81474473,
  start: "2022-12-19T14:00",
  finish: "2022-12-19T16:00",
  resource_id: 772665,
  created_on: "2022-12-14T17:59:18Z",
  user_id: 11231734,
  res_name: "Production Suite 2",
  created_by: "22062244.us@saeinstitute.edu / administrator",
  price: 100,
  deleted: true,
  updated_on: "2022-12-14T18:01:07Z",
  updated_by: "22062244.us@saeinstitute.edu / administrator",
  status: 94,
  status_message: "Administrator reversed approval",
  full_name: "Stefanos Ioannidis",
  field_1_r: "Mod 1",
  start_utc: "2022-12-19T19:00:00Z",
  finish_utc: "2022-12-19T21:00:00Z",
  email: "22062244.us@saeinstitute.edu",
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
  const url = `http://127.0.0.1:5001/sae-supersaas-manager/us-central1/addNewBookingWebHook`;
  // const url =
  //   "http://127.0.0.1:5001/sae-supersaas-manager/us-central1/changeBookingWebHook";
  axios.post(url, newBookingPayload);
};

main();
