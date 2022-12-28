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

export const removeOldSupersaasAccounts = async () => {
  console.log("Remove Old Supersaas Accounts");
  const removeFunction = httpsCallable(functions, "removeOldSupersaasAccounts");
  const output = await removeFunction();
  console.log("Done");
  return output.data;
};

export const getSuperSaasInfo = async () => {
  console.log("Get Google Sheet Info");
  const getSupersaasUsers = httpsCallable(functions, "getSupersaasUsers");
  const output = await getSupersaasUsers();
  return output.data;
};

export const getTodayBookings = async () => {
  console.log("Get Today Bookings");
  const getTodayBookings = httpsCallable(functions, "getTodayBookings");
  const output = await getTodayBookings();
  return output;
};

export const processSuperSaasStudents = async () => {
  const processSuperSaasStudents = httpsCallable(
    functions,
    "processSuperSaasStudents"
  );
  await processSuperSaasStudents();
};

export const processAllBookings = async () => {
  console.log("Start Process oF Bookings");
  const processAllBookings = httpsCallable(functions, "processAllBookings");
  await processAllBookings();
  console.log("Done!");
};

export const teacherBookingFunction = async (bookingData) => {
  const teacherBooking = httpsCallable(functions, "teacherBooking");
  const output = await teacherBooking(bookingData);
  return output.data;
};
