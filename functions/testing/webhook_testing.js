const axios = require("axios");

const payload = {
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

const main = async () => {
  const url = `http://127.0.0.1:5001/sae-supersaas-manager/us-central1/addNewUserWebHook`;
  axios.post(url, payload);
};

main();
