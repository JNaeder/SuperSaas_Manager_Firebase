import "./App.css";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import StudentListPage from "./pages/StudentListPage";
import TeacherBookingPage from "./pages/TeacherBookingPage";
import TodayBookings from "./pages/TodayBookings";
import Testing from "./pages/Testing";

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

function App() {
  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage app={app} />} />
          <Route path="/studentlist" element={<StudentListPage app={app} />} />
          <Route
            path="/teacherbooking"
            element={<TeacherBookingPage app={app} />}
          />
          <Route path="/todaybookings" element={<TodayBookings app={app} />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
