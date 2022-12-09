const axios = require("axios");

const payload = {
  id: 81047153,
  start: "2022-12-09T14:00",
  finish: "2022-12-09T16:00",
  resource_id: 772666,
  created_on: "2022-11-29T15:02:29Z",
  user_id: 10862233,
  res_name: "SSL",
  created_by: "22041742.us@saeinstitute.edu",
  price: 100,
  deleted: false,
  updated_on: "2022-12-09T19:36:44Z",
  updated_by: "administrator",
  status: 104,
  status_message: "Approved (unlimited credit)  ",
  full_name: "JJ",
  field_1_r: "Mod 2",
  start_utc: "2022-12-09T19:00:00Z",
  finish_utc: "2022-12-09T21:00:00Z",
  email: "22041742.us@saeinstitute.edu",
  price_decimal: "1.00",
  role: 3,
  event: "create",
};

const main = async () => {
  const url = `http://127.0.0.1:5001/sae-supersaas-manager/us-central1/addNewUserWebHook`;
  axios.post(url, payload);
};

main();
