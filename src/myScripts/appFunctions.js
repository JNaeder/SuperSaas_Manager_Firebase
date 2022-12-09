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
  console.log("Google Sheet Starting");
  const sheetinfo = httpsCallable(functions, "getSheetInfo");
  const output = await sheetinfo();
  console.log("Done.");
  return output.data;
};

export const getSuperSaasInfo = async () => {
  const getSupersaasUsers = httpsCallable(functions, "getSupersaasUsers");
  const output = await getSupersaasUsers();
  return output.data;
};

export const processSuperSaasStudents = async () => {
  const processSuperSaasStudents = httpsCallable(
    functions,
    "processSuperSaasStudents"
  );
  const output = await processSuperSaasStudents();
  console.log(output);
  console.log("All Done");
};

export const updateAllInfo = async () => {
  console.log("Update all!");
  const sheetinfo = httpsCallable(functions, "getSheetInfo");
  const processSuperSaasStudents = httpsCallable(
    functions,
    "processSuperSaasStudents"
  );

  const sheetData = await sheetinfo();
  const supersaasData = await processSuperSaasStudents();

  console.log(sheetData);
  console.log(supersaasData);
  console.log("Done");
};
