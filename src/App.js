import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  getGoogleSheetInfo,
  processSuperSaasStudents,
  updateAllInfo,
} from "./myScripts/appFunctions";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import StudentListPage from "./pages/StudentListPage";
import TeacherBookingPage from "./pages/TeacherBookingPage";
import TodayBookings from "./pages/TodayBookings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/studentlist" element={<StudentListPage />} />
          <Route path="/teacherbooking" element={<TeacherBookingPage />} />
          <Route path="/todaybookings" element={<TodayBookings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
