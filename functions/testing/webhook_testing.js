const axios = require("axios");

const payload = {
  id: 81363312,
  start: "2022-12-19T10:00",
  finish: "2022-12-19T12:00",
  resource_id: 740584,
  created_on: "2022-12-11T04:05:32Z",
  user_id: 10880920,
  res_name: "02R",
  created_by: "21100888.us@saeinstitute.edu / administrator",
  price: 100,
  deleted: true,
  updated_on: "2022-12-11T04:05:41Z",
  updated_by: "21100888.us@saeinstitute.edu / administrator",
  status: 94,
  status_message: "Administrator reversed approval",
  full_name: "Devin Wagton",
  field_1_r: "Mod 1",
  start_utc: "2022-12-19T15:00:00Z",
  finish_utc: "2022-12-19T17:00:00Z",
  email: "21100888.us@saeinstitute.edu",
  price_decimal: "1.00",
  role: 3,
  event: "create",
};

const main = async () => {
  const url = `http://127.0.0.1:5001/sae-supersaas-manager/us-central1/addNewUserWebHook`;
  axios.post(url, payload);
};

main();
