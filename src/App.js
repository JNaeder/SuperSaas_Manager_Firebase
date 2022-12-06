import "./App.css";
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

const getGoogeSheetInfo = async () => {
  console.log("Starting");
  const sheetinfo = httpsCallable(functions, "getSheetInfo");
  const output = await sheetinfo();
  console.log(output["data"]);
};

const getSuperSaasInfo = async () => {
  const supersaasTest = httpsCallable(functions, "supersaasTest");
  supersaasTest();
  console.log("Done with supersaas test!");
};

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={getSuperSaasInfo}>Click Me</button>
    </div>
  );
}

export default App;
