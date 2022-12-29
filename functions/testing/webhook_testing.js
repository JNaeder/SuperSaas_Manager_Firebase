const axios = require("axios");

const newBookingPayload = {
  id: 81773234,
  start: "2022-12-29T10:00",
  finish: "2022-12-29T12:00",
  resource_id: 740582,
  created_on: "2022-12-29T14:58:50Z",
  user_id: 11429396,
  res_name: "Production Suite 1",
  created_by: "22051974.us@saeinstitute.edu / administrator",
  price: 100,
  deleted: true,
  updated_on: "2022-12-29T14:59:13Z",
  updated_by: "22051974.us@saeinstitute.edu / administrator",
  status: 94,
  status_message: "Administrator reversed approval",
  full_name: "Eric Seith",
  field_1_r: "Mod 2",
  start_utc: "2022-12-29T15:00:00Z",
  finish_utc: "2022-12-29T17:00:00Z",
  email: "22051974.us@saeinstitute.edu",
  price_decimal: "1.00",
  role: 3,
  event: "create",
};

const editBookingPayload = {
  id: 81672782,
  start: "2023-02-21T10:00",
  finish: "2023-02-21T14:00",
  resource_id: 772666,
  created_on: "2022-12-22T17:27:49Z",
  user_id: 9118085,
  res_name: "SSL",
  created_by: "alfred.johnson@sae.edu / *",
  price: 100,
  deleted: true,
  updated_on: "2022-12-22T17:30:26Z",
  updated_by: "administrator",
  status: 94,
  status_message: "Administrator reversed approval",
  full_name: "Alfred Johnson",
  field_1_r: "Mod 3",
  start_utc: "2023-02-21T15:00:00Z",
  finish_utc: "2023-02-21T19:00:00Z",
  email: "alfred.johnson@sae.edu",
  price_decimal: "1.00",
  role: 3,
  event: "destroy",
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
