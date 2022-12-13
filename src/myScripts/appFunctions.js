import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA_vtl1iTjk7KR_5JElhtFX5ycWAWjVpxE",
  authDomain: "sae-supersaas-manager.firebaseapp.com",
  databaseURL: "https://sae-supersaas-manager-default-rtdb.firebaseio.com",
  projectId: "sae-supersaas-manager",
  storageBucket: "sae-supersaas-manager.appspot.com",
  messagingSenderId: "212663505029",
  appId: "1:212663505029:web:3138ac3962e51817fe59ec",
  measurementId: "G-LRYRWPCL53",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
connectFunctionsEmulator(functions, "localhost", 5001);

export const getGoogleSheetInfo = async () => {
  console.log("Get Google Sheet Info");
  const sheetinfo = httpsCallable(functions, "getSheetInfo");
  const output = await sheetinfo();
  return output.data;
};

export const removeOldStudents = async () => {
  console.log("Remove Old Students");
  const removeFunction = httpsCallable(functions, "removeOldStudents");
  const output = await removeFunction();
  return output.data;
};

export const getSuperSaasInfo = async () => {
  console.log("Get Google Sheet Info");
  const getSupersaasUsers = httpsCallable(functions, "getSupersaasUsers");
  const output = await getSupersaasUsers();
  return output.data;
};

export const processSuperSaasStudents = async () => {
  const processSuperSaasStudents = httpsCallable(
    functions,
    "processSuperSaasStudents"
  );
  await processSuperSaasStudents();
};

export const processAllBookings = async () => {
  const processAllBookings = httpsCallable(functions, "processAllBookings");
  await processAllBookings();
};
